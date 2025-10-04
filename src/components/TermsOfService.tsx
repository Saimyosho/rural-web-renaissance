import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, CheckCircle2, DollarSign, Calendar, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService = ({ isOpen, onClose }: TermsOfServiceProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-primary/20">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Terms of Service</h2>
                    <p className="text-sm text-muted-foreground">Effective Date: January 2025</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-8">
                  {/* Free Service */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">1. Free Website Development Service</h3>
                    </div>
                    <div className="space-y-3 text-muted-foreground pl-11">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Initial Development is Free:</strong> Sheldon Gunby ("Developer") provides custom website design and development services at no upfront cost to clients ("Client") as part of portfolio building efforts.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Scope of Free Service:</strong> Includes initial consultation, custom design, development, deployment, and basic optimization. This covers the creation and launch of your website.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Tips Appreciated, Never Required:</strong> While voluntary tips or gratuities are welcomed, they are never expected or required. The free service remains completely free regardless of whether a tip is provided.
                        </span>
                      </p>
                    </div>
                  </section>

                  {/* Post-Deployment Management */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/20">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">2. Post-Deployment Management & Maintenance</h3>
                    </div>
                    <div className="space-y-3 text-muted-foreground pl-11">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Ongoing Management is Separate:</strong> After your website is deployed and live, any ongoing maintenance, updates, content changes, or technical support constitutes post-deployment management services.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Pricing at Developer's Discretion:</strong> Post-deployment management services are priced based on the scope, complexity, and time requirements of the requested work, as determined solely by the Developer.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">No Obligation:</strong> Clients are under no obligation to purchase post-deployment management services. The Developer is under no obligation to provide free ongoing support beyond the initial deployment.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Billing Structure:</strong> Management services may be billed hourly, per project, monthly retainer, or another structure as agreed upon between Developer and Client prior to work commencing.
                        </span>
                      </p>
                    </div>
                  </section>

                  {/* Portfolio Rights */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">3. Portfolio & Showcase Rights</h3>
                    </div>
                    <div className="space-y-3 text-muted-foreground pl-11">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Portfolio Display:</strong> By accepting free development services, Client grants Developer perpetual, worldwide rights to display, showcase, and reference the completed website in Developer's portfolio, case studies, and marketing materials.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Client Owns Their Site:</strong> Client retains full ownership of their website content, branding, and intellectual property. Developer retains rights to code, design patterns, and technical implementations as part of Developer's portfolio work.
                        </span>
                      </p>
                    </div>
                  </section>

                  {/* Service Limitations */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/20">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">4. Service Limitations & Liability</h3>
                    </div>
                    <div className="space-y-3 text-muted-foreground pl-11">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Limited Availability:</strong> Developer is accepting 3-5 free projects initially. Acceptance of projects is at Developer's sole discretion based on availability, project fit, and portfolio needs.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">No Guarantees:</strong> Services are provided "as-is" with no warranties or guarantees of specific outcomes, traffic, conversions, or business results.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Timeline Estimates:</strong> Project timelines are estimates only and may vary based on project complexity, client responsiveness, and Developer's availability.
                        </span>
                      </p>
                    </div>
                  </section>

                  {/* Client Responsibilities */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">5. Client Responsibilities</h3>
                    </div>
                    <div className="space-y-3 text-muted-foreground pl-11">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Content Provision:</strong> Client is responsible for providing all content, images, text, logos, and materials needed for the website. Developer may provide guidance on content sourcing if needed.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Timely Feedback:</strong> Client agrees to provide timely feedback and responses to Developer inquiries to keep the project moving forward.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Reference Agreement:</strong> Client agrees to serve as a reference if satisfied with the completed work.
                        </span>
                      </p>
                    </div>
                  </section>

                  {/* Modifications */}
                  <section className="border-t border-border/50 pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Modifications:</strong> Developer reserves the right to modify these Terms of Service at any time. Clients will be notified of material changes. Continued use of services after changes constitutes acceptance of modified terms.
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      <strong className="text-foreground">Contact:</strong> Questions about these terms? Contact Sheldon Gunby at{" "}
                      <a href="mailto:SheldonGunby@icloud.com" className="text-primary hover:underline">
                        SheldonGunby@icloud.com
                      </a>{" "}
                      or{" "}
                      <a href="tel:+17244908102" className="text-primary hover:underline">
                        724-490-8102
                      </a>
                      .
                    </p>
                  </section>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Last updated: January 2025
                </p>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  I Understand
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsOfService;
