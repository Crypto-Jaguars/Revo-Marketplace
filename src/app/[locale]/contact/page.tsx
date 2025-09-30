'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
    } catch (error) {
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-green-500" />,
      title: 'Email',
      content: 'revolutionaryfarmers@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-500" />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm EST',
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-500" />,
      title: 'Address',
      content: '123 Farm Street, Agriculture City, AC 12345',
      description: 'Our headquarters location',
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: 'Support Hours',
      content: 'Monday - Friday: 8am - 6pm EST',
      description: 'We aim to respond within 24 hours',
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'farmer', label: 'Farmer Application' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' },
  ];

  return (
    <Bounded>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about Revolutionary Farmers? We&apos;re here to help. Reach out to us and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Choose the best way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                      <p className="text-green-400 font-medium">{info.content}</p>
                      <p className="text-gray-300 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className="justify-start text-white hover:bg-white/10"
                    onClick={() => (window.location.href = '/faq')}
                  >
                    Frequently Asked Questions
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-white hover:bg-white/10"
                    onClick={() => (window.location.href = '/join-farmer')}
                  >
                    Become a Farmer
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-white hover:bg-white/10"
                    onClick={() => (window.location.href = '/privacy-policy')}
                  >
                    Privacy Policy
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-white hover:bg-white/10"
                    onClick={() => (window.location.href = '/terms-of-use')}
                  >
                    Terms of Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we&apos;ll get back to you soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-white">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Email Us Button */}
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-4"
                  onClick={() => {
                    const subject = encodeURIComponent(t('emailSubject'));
                    const body = t('emailBody'); // Already URL-encoded in translation
                    window.location.href = `mailto:revolutionaryfarmers@gmail.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              For urgent technical issues or account problems, check our FAQ section first. Most
              common questions are answered there with immediate solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = '/faq')}
              >
                View FAQ
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const subject = encodeURIComponent(t('emailSubject'));
                  const body = t('emailBody'); // Already URL-encoded in translation
                  window.location.href = `mailto:revolutionaryfarmers@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
}
