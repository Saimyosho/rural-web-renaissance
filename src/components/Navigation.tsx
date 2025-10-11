import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / windowHeight) * 100;
      setScrollProgress(progress);

      const sections = ["home", "about", "services", "portfolio", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      id: "home", 
      label: "Home", 
      isRoute: false,
      action: () => scrollToSection("home")
    },
    { 
      id: "services", 
      label: "Services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Web Development", path: "/#services", description: "Custom websites & apps" },
        { label: "AI Agents", path: "/ai-agents", description: "Intelligent automation" },
        { label: "All Services", path: "/#services", description: "View complete offerings" }
      ]
    },
    { 
      id: "about", 
      label: "About",
      hasDropdown: true,
      dropdownItems: [
        { label: "Expertise", path: "/expertise", description: "Skills & technologies" },
        { label: "Process", path: "/process", description: "How we work" },
        { label: "About Me", path: "/#about", description: "My background" }
      ]
    },
    { 
      id: "portfolio", 
      label: "Portfolio", 
      isRoute: false,
      action: () => scrollToSection("portfolio")
    },
    { 
      id: "resources", 
      label: "Resources",
      hasDropdown: true,
      dropdownItems: [
        { label: "FAQ", path: "/faq", description: "Common questions" },
        { label: "Pricing", path: "/pricing", description: "Transparent rates" },
        { label: "Trust & Security", path: "/trust", description: "Our commitment" },
        { label: "Privacy Policy", path: "/privacy", description: "Data protection" }
      ]
    },
    { 
      id: "contact", 
      label: "Contact", 
      isRoute: false,
      action: () => scrollToSection("contact")
    },
  ];

  const scrollToSection = (id: string) => {
    const isHomePage = location.pathname === '/';
    
    if (!isHomePage) {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleMobileDropdownToggle = (id: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === id ? null : id);
  };

  const handleDropdownItemClick = (path: string) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileOpenDropdown(null);
    
    if (path.startsWith('/#')) {
      const section = path.substring(2);
      if (location.pathname === '/') {
        scrollToSection(section);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(section), 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary-glow transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
          isScrolled ? "glass-strong py-3 shadow-lg border-b border-border/10" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => scrollToSection("home"), 100);
            }}
            className="flex items-center gap-2 group"
          >
            <div className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              SG
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.id)}
                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
              >
                <button
                  onClick={() => !item.hasDropdown && item.action && item.action()}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                    activeSection === item.id && !item.hasDropdown
                      ? "text-primary" 
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      openDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.id && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 glass-strong rounded-lg shadow-xl border border-border/20 overflow-hidden animate-fade-in"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.dropdownItems?.map((dropItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownItemClick(dropItem.path)}
                        className="w-full px-4 py-3 text-left hover:bg-foreground/5 transition-colors border-b border-border/10 last:border-0"
                      >
                        <div className="font-medium text-sm text-foreground">{dropItem.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{dropItem.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm"
          >
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2 hover:bg-foreground/5 rounded-sm transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[98] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
          <div className="relative h-full overflow-y-auto pt-24 pb-8 px-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleMobileDropdownToggle(item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-foreground/5 rounded-sm transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${
                          mobileOpenDropdown === item.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {mobileOpenDropdown === item.id && (
                        <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                          {item.dropdownItems?.map((dropItem, index) => (
                            <button
                              key={index}
                              onClick={() => handleDropdownItemClick(dropItem.path)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-foreground/5 rounded-sm transition-colors"
                            >
                              <div className="font-medium text-foreground">{dropItem.label}</div>
                              <div className="text-xs text-muted-foreground">{dropItem.description}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={item.action}
                      className="w-full px-4 py-3 text-left font-medium hover:bg-foreground/5 rounded-sm transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-6 px-5 py-3 rounded-sm bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
