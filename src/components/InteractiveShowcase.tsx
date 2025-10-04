import { useState } from "react";
import { 
  MousePointer, 
  Layers, 
  Menu, 
  LayoutGrid,
  Sparkles,
  Heart,
  Check
} from "lucide-react";
import WireframeBackground from "./WireframeBackground";
import MarqueeDemo from "./showcase/MarqueeDemo";
import CarouselDemo from "./showcase/CarouselDemo";
import ButtonShowcase from "./showcase/ButtonShowcase";
import CardShowcase from "./showcase/CardShowcase";
import FormShowcase from "./showcase/FormShowcase";
import AnimationShowcase from "./showcase/AnimationShowcase";
import HeroShowcase from "./showcase/HeroShowcase";

const InteractiveShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Components", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "heroes", label: "Hero Sections", icon: <Sparkles className="w-4 h-4" /> },
    { id: "carousels", label: "Carousels", icon: <Layers className="w-4 h-4" /> },
    { id: "buttons", label: "Buttons", icon: <MousePointer className="w-4 h-4" /> },
    { id: "cards", label: "Cards", icon: <Menu className="w-4 h-4" /> },
    { id: "forms", label: "Forms", icon: <Sparkles className="w-4 h-4" /> },
    { id: "animations", label: "Animations", icon: <Sparkles className="w-4 h-4" /> },
  ];

  const showcaseItems = [
    {
      id: "heroes",
      category: "heroes",
      title: "Hero Section Styles",
      description: "8 different hero section layouts used across modern websites",
      useCase: "Perfect for: Landing pages, Home pages, Product launches",
      complexity: "Moderate",
      component: <HeroShowcase />,
    },
    {
      id: "marquee",
      category: "carousels",
      title: "Infinite Marquee",
      description: "Smooth scrolling ticker for logos, announcements, or features",
      useCase: "Perfect for: Client logos, News tickers, Feature highlights",
      complexity: "Simple",
      component: <MarqueeDemo />,
    },
    {
      id: "carousel",
      category: "carousels",
      title: "Image Carousel",
      description: "Auto-playing slider with manual controls and smooth transitions",
      useCase: "Perfect for: Product galleries, Testimonials, Portfolio items",
      complexity: "Moderate",
      component: <CarouselDemo />,
    },
    {
      id: "buttons",
      category: "buttons",
      title: "Interactive Buttons",
      description: "Magnetic, ripple, glow, and loading button effects",
      useCase: "Perfect for: CTAs, Forms, Navigation",
      complexity: "Simple",
      component: <ButtonShowcase />,
    },
    {
      id: "cards",
      category: "cards",
      title: "Dynamic Cards",
      description: "3D tilt, flip, expand, and parallax card interactions",
      useCase: "Perfect for: Services, Products, Team members",
      complexity: "Moderate",
      component: <CardShowcase />,
    },
    {
      id: "forms",
      category: "forms",
      title: "Smart Forms",
      description: "Floating labels, validation, multi-step wizards",
      useCase: "Perfect for: Contact forms, Signups, Surveys",
      complexity: "Moderate",
      component: <FormShowcase />,
    },
    {
      id: "animations",
      category: "animations",
      title: "Scroll Animations",
      description: "Fade, slide, scale effects that trigger on scroll",
      useCase: "Perfect for: Content reveals, Page sections, Storytelling",
      complexity: "Simple",
      component: <AnimationShowcase />,
    },
  ];

  const filteredItems = activeFilter === "all" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeFilter);

  const toggleSelection = (id: string) => {
    setSelectedComponents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section
      id="showcase"
      className="py-32 relative overflow-hidden"
    >
      <WireframeBackground variant="dots" density="low" animate={true} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Interactive <span className="gradient-accent-text">Component Library</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore real, working examples of components you can have on your website. 
              Click, hover, and interact with each one. Select your favorites!
            </p>

            {/* Selection Counter */}
            {selectedComponents.length > 0 && (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white font-semibold">
                <Heart className="w-5 h-5 fill-current" />
                <span>{selectedComponents.length} component{selectedComponents.length !== 1 ? 's' : ''} selected</span>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow"
                    : "glass hover:bg-primary/10"
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Showcase Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-strong rounded-3xl p-8 relative group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                        {item.complexity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      {item.useCase}
                    </p>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => toggleSelection(item.id)}
                    className={`flex-shrink-0 p-3 rounded-full transition-all duration-300 ${
                      selectedComponents.includes(item.id)
                        ? "bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow"
                        : "glass hover:bg-primary/10"
                    }`}
                  >
                    {selectedComponents.includes(item.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Heart className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Interactive Demo */}
                <div className="mt-6 rounded-2xl overflow-hidden bg-background/50 p-6 min-h-[300px] flex items-center justify-center">
                  {item.component}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Components Summary */}
          {selectedComponents.length > 0 && (
            <div className="glass-strong rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Your Selected Components
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {selectedComponents.map((id) => {
                  const item = showcaseItems.find(i => i.id === id);
                  return (
                    <div
                      key={id}
                      className="px-4 py-2 rounded-full glass border-2 border-primary/30"
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </div>
              <p className="text-muted-foreground mb-6">
                Ready to get these components on your website? Let's talk about your project!
              </p>
              <button
                onClick={() => {
                  // Scroll to contact and pre-populate with selections
                  const selections = selectedComponents
                    .map(id => showcaseItems.find(i => i.id === id)?.title)
                    .join(", ");
                  sessionStorage.setItem("selectedComponents", selections);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white font-semibold hover:shadow-glow transition-all duration-300"
              >
                Get Started with These Components
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
