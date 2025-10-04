import { Heart } from "lucide-react";
import { useState } from "react";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">Sheldon Gunby</div>
              <p className="text-muted-foreground text-sm">
                Enterprise quality. Small business heart. Rural roots.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact
                  </a>
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
            </div>

            <div>
              <h4 className="font-semibold mb-4">Location</h4>
              <p className="text-sm text-muted-foreground">
                Ferndale, Pennsylvania
                <br />
                Serving Johnstown Area
                <br />
                Available for remote projects
              </p>
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
