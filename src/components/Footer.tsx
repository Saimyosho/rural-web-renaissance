import { Heart, Facebook, Instagram, Linkedin, Github, Coffee, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="py-16 border-t border-border/50 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">Sheldon Gunby</div>
              <p className="text-muted-foreground text-sm mb-4">
                Enterprise quality. Small business heart. Rural roots.
              </p>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Johnstown, PA<br />Serving Pennsylvania</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">
                    Web Development
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/ai-agents")} className="hover:text-primary transition-colors">
                    AI Agents & Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/expertise")} className="hover:text-primary transition-colors">
                    Technical Expertise
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/process")} className="hover:text-primary transition-colors">
                    Development Process
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("portfolio")} className="hover:text-primary transition-colors">
                    Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/pricing")} className="hover:text-primary transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/trust")} className="hover:text-primary transition-colors">
                    Trust & Security
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>
                  <button onClick={() => navigate("/faq")} className="hover:text-primary transition-colors">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>

              {/* Social & Support */}
              <div>
                <h4 className="font-semibold mb-3 text-sm">Connect</h4>
                <div className="flex gap-3 mb-4">
                  <a
                    href="https://www.facebook.com/SheldonGunby/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm glass hover:bg-primary/10 transition-all hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/dachiz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm glass hover:bg-primary/10 transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sheldongunby/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm glass hover:bg-primary/10 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Saimyosho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm glass hover:bg-primary/10 transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="https://buymeacoffee.com/saimyosho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:shadow-glow transition-all hover:scale-105 text-sm"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Support</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Sheldon Gunby. Built with <Heart className="w-4 h-4 text-accent fill-accent" /> for rural
              businesses.
            </p>
          </div>
        </div>
      </div>

      <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  );
};

export default Footer;
