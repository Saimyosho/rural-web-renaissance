import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" className="pt-20" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">Privacy Policy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-sunrise-text">
                Your Privacy Matters
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Last updated: January 10, 2025
              </p>
              <p className="text-lg text-muted-foreground">
                We are committed to protecting your privacy and being transparent about how we handle your information.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollArea className="h-full">
                <div className="space-y-12">
                  {/* Information We Collect */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Database className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            When you use our website and services, we may collect the following types of information:
                          </p>
                          <ul className="space-y-2 text-muted-foreground">
                            <li><strong>Contact Information:</strong> Name, email address, phone number, and company details when you fill out contact forms</li>
                            <li><strong>Technical Information:</strong> IP address, browser type, device information, and pages visited</li>
                            <li><strong>Analytics Data:</strong> Usage patterns, time spent on pages, and interaction data through Vercel Analytics</li>
                            <li><strong>Communication Records:</strong> Content of messages sent through our contact forms and email correspondence</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How We Use Information */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Eye className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            We use the collected information for the following purposes:
                          </p>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>To respond to your inquiries and provide customer support</li>
                            <li>To deliver requested services and maintain our business relationship</li>
                            <li>To improve our website functionality and user experience</li>
                            <li>To send important updates about our services (with your consent)</li>
                            <li>To analyze website traffic and optimize performance</li>
                            <li>To comply with legal obligations and protect our rights</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Storage and Security */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Lock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Data Storage & Security</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            We take data security seriously and implement industry-standard measures:
                          </p>
                          <ul className="space-y-2 text-muted-foreground">
                            <li><strong>Encryption:</strong> All data transmission is encrypted using HTTPS/TLS</li>
                            <li><strong>Secure Storage:</strong> Contact form submissions are securely stored in Supabase with row-level security</li>
                            <li><strong>Access Control:</strong> Limited access to personal data with strict authentication requirements</li>
                            <li><strong>Regular Updates:</strong> We maintain up-to-date security patches and best practices</li>
                            <li><strong>Data Minimization:</strong> We only collect data necessary for providing our services</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Third-Party Services */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <UserCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            We use the following third-party services that may collect data:
                          </p>
                          <ul className="space-y-3 text-muted-foreground">
                            <li>
                              <strong>Vercel Analytics:</strong> Collects anonymous usage data to help us improve website performance. 
                              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                                View their privacy policy
                              </a>
                            </li>
                            <li>
                              <strong>Supabase:</strong> Stores contact form submissions securely. 
                              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                                View their privacy policy
                              </a>
                            </li>
                            <li>
                              <strong>Unsplash:</strong> Provides images for our website. 
                              <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                                View their privacy policy
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Your Rights */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            You have the following rights regarding your personal data:
                          </p>
                          <ul className="space-y-2 text-muted-foreground">
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                            <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                            <li><strong>Object:</strong> Object to processing of your personal data in certain circumstances</li>
                          </ul>
                          <p className="text-muted-foreground mt-4">
                            To exercise these rights, please contact us using the information provided below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cookies */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Database className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Cookies & Tracking</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            We use minimal cookies and tracking technologies:
                          </p>
                          <ul className="space-y-2 text-muted-foreground">
                            <li><strong>Essential Cookies:</strong> Required for website functionality (session management)</li>
                            <li><strong>Analytics Cookies:</strong> Anonymous data collection through Vercel Analytics</li>
                            <li><strong>No Marketing Cookies:</strong> We do not use third-party advertising or tracking cookies</li>
                          </ul>
                          <p className="text-muted-foreground mt-4">
                            You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-muted-foreground mb-4">
                            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                          </p>
                          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                            <p className="text-foreground"><strong>Rural Web Renaissance</strong></p>
                            <p className="text-muted-foreground">Johnstown, PA</p>
                            <p className="text-muted-foreground">
                              Email: <a href="/#contact" className="text-primary hover:underline">Use contact form</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Changes to Policy */}
                  <div className="space-y-4">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-3">Changes to This Policy</h2>
                      <p className="text-muted-foreground">
                        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
