'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FarmCertificationsProps } from './types';
import { formatDate } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';

export default function FarmCertifications({ certifications }: FarmCertificationsProps) {
  const t = useTranslations('Farm.Certifications');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
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
                    <h3 id={`cert-${cert.id}-name`} className="font-semibold">
                      {cert.name}
                    </h3>
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
                  <div>
                    <Label>{t('issuedBy')}</Label>
                    <p>{cert.issuer}</p>
                  </div>
                </div>
                <CardContent className="grid gap-4 p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>{t('issueDate')}</Label>
                      <p className="font-medium">{formatDate(cert.issueDate)}</p>
                    </div>
                    <div>
                      <Label>{t('expiryDate')}</Label>
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
                            {t('viewCertificate')}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('openCertificateInNewTab')}</p>
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
