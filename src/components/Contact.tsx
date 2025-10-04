import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! 🎉",
      description: "I'll get back to you within 24 hours. Looking forward to building something amazing together!",
    });

    setFormData({ name: "", email: "", business: "", message: "" });
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
                <div className="glass rounded-xl p-6 flex items-center gap-4 hover-lift">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-sm text-muted-foreground">sheldon@example.com</div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 flex items-center gap-4 hover-lift">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent-glow text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <div className="text-sm text-muted-foreground">Ferndale, PA • Serving Johnstown Area</div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Free for portfolio building.</span> Tips appreciated
                  but never required. I keep showcase rights to display your project. Limited availability - taking 3-5
                  projects initially.
                </p>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-8">
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
