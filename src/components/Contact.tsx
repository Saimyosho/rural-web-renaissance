import { useState, useEffect } from "react";
import { Mail, MapPin, Send, Phone, Sparkles, Facebook, Instagram, Linkedin, Github, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Contact = () => {
  const { toast } = useToast();
  const [selectedComponents, setSelectedComponents] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    inspiration1: "",
    inspiration2: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check for selected components from showcase
    const selections = sessionStorage.getItem("selectedComponents");
    if (selections) {
      setSelectedComponents(selections);
      // Clear after retrieving
      sessionStorage.removeItem("selectedComponents");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase (if configured)
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.business || null,
            message: formData.message,
            interested_in: selectedComponents || `Inspiration: ${formData.inspiration1}, ${formData.inspiration2}`,
          }
        ]);

      if (error) {
        console.log('Supabase not configured or error:', error.message);
        // Continue with mailto even if Supabase fails
      }
    } catch (err) {
      console.log('Supabase save skipped - not configured');
      // Continue with mailto
    }

    // Create email body with form data
    const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Business: ${formData.business || 'Not provided'}
Inspiration Website 1: ${formData.inspiration1 || 'Not provided'}
Inspiration Website 2: ${formData.inspiration2 || 'Not provided'}
${selectedComponents ? `\nSelected Components: ${selectedComponents}\n` : ''}
Message:
${formData.message}`;

    // Create mailto link
    const mailtoLink = `mailto:SheldonGunby@icloud.com?subject=Website Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`;

    // Short delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Open email client
    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client 📧",
      description: "Your message has been prepared. Please send the email to complete your request!",
    });

    setFormData({ name: "", email: "", business: "", inspiration1: "", inspiration2: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Build Something <span className="gradient-accent-text">Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready for your free enterprise-level website? Let's discuss your vision and create something that makes your business stand out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {[
                    "Custom design built from scratch",
                    "Award-worthy visual standards",
                    "Modern, fast, responsive",
                    "Mobile-optimized experience",
                    "Security best practices",
                    "Performance optimization",
                    "Free hosting guidance",
                    "Ongoing support options",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <a 
                  href="mailto:SheldonGunby@icloud.com"
                  className="glass rounded-xl p-6 flex items-center gap-4 hover-lift block"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-sm text-muted-foreground">SheldonGunby@icloud.com</div>
                  </div>
                </a>

                <a 
                  href="tel:+17244908102"
                  className="glass rounded-xl p-6 flex items-center gap-4 hover-lift block"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent-glow text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-sm text-muted-foreground">724-490-8102</div>
                  </div>
                </a>

                <div className="glass rounded-xl p-6 flex items-center gap-4 hover-lift">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <div className="text-sm text-muted-foreground">Ferndale, PA • Serving Johnstown Area</div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  <span className="text-foreground font-semibold">Free for portfolio building.</span> Tips appreciated
                  but never required. I keep showcase rights to display your project. Limited availability - taking 3-5
                  projects initially.
                </p>
                
                <a
                  href="https://buymeacoffee.com/saimyosho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:shadow-glow transition-all hover:scale-105 mb-6 w-full justify-center"
                >
                  <Coffee className="w-5 h-5" />
                  <span>Buy Me a Coffee ☕</span>
                </a>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-semibold mb-3 text-sm">Connect With Me</h4>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/SheldonGunby/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-glow"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/dachiz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-glow"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sheldongunby/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-glow"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/Saimyosho"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-glow"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://discord.gg/XjMpamVuk7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-glow"
                      aria-label="Discord"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-8">
              {selectedComponents && (
                <div className="mb-6 p-4 rounded-xl bg-primary/10 border-2 border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-primary">Components You Selected</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    These will be included in your message:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponents.split(", ").map((component, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full glass border border-primary/30 text-xs font-semibold"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm font-semibold mb-2">
                    Business Name
                  </label>
                  <Input
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="Your Business LLC"
                  />
                </div>

                <div>
                  <label htmlFor="inspiration1" className="block text-sm font-semibold mb-2">
                    Inspiration Website #1 * <span className="text-xs text-muted-foreground font-normal">(Required)</span>
                  </label>
                  <Input
                    id="inspiration1"
                    name="inspiration1"
                    type="url"
                    value={formData.inspiration1}
                    onChange={handleChange}
                    required
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="https://example-site-you-like.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Share a website whose design or features you admire</p>
                </div>

                <div>
                  <label htmlFor="inspiration2" className="block text-sm font-semibold mb-2">
                    Inspiration Website #2 * <span className="text-xs text-muted-foreground font-normal">(Required)</span>
                  </label>
                  <Input
                    id="inspiration2"
                    name="inspiration2"
                    type="url"
                    value={formData.inspiration2}
                    onChange={handleChange}
                    required
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="https://another-example-site.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Share another website for style/feature reference</p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Tell Me About Your Project *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="glass border-primary/30 focus:border-primary min-h-[150px]"
                    placeholder="What kind of website do you need? Tell me about your business and vision..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-500"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
