'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FarmCertificationsProps } from './types';
import { formatDate } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function FarmCertifications({
  certifications,
}: FarmCertificationsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Certifications & Compliance</CardTitle>
          <CardDescription>
            Our quality standards and certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <Card 
                key={cert.id} 
                className="overflow-hidden"
                role="article"
                aria-labelledby={`cert-${cert.id}-name`}
              >
                <div className="border-b bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 id={`cert-${cert.id}-name`} className="font-semibold">{cert.name}</h3>
                    <Badge
                      variant={
                        cert.status === 'active'
                          ? 'success'
                          : cert.status === 'pending'
                          ? 'warning'
                          : 'destructive'
                      }
                      role="status"
                      aria-label={`Certification status: ${cert.status}`}
                    >
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Issued by {cert.issuer}
                  </p>
                </div>
                <CardContent className="grid gap-4 p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{formatDate(cert.issueDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{formatDate(cert.expiryDate)}</p>
                    </div>
                  </div>
                  {cert.documentUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              if (!cert.documentUrl) return;
                              try {
                                const url = new URL(cert.documentUrl);
                                if (['http:', 'https:'].includes(url.protocol)) {
                                  window.open(url.href, '_blank', 'noopener,noreferrer');
                                }
                              } catch (error) {
                                console.error('Invalid URL:', error);
                              }
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Certificate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open certificate in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 