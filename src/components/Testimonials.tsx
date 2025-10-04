import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Green Valley Farm Market",
      role: "Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      quote: "Working with Sheldon transformed our online presence. We went from having no website to a stunning, professional site that brings in customers daily. The quality is unmatched!",
      rating: 5,
      results: "+150% online inquiries",
    },
    {
      name: "Mike Rodriguez",
      business: "Mountain Peak Construction",
      role: "General Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      quote: "I couldn't believe it was free! The website looks like something a Fortune 500 company would have. Our competitors are jealous, and we're getting more leads than ever.",
      rating: 5,
      results: "+200% project inquiries",
    },
    {
      name: "Emily Chen",
      business: "Riverside Coffee Roasters",
      role: "Co-Founder",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
      quote: "The attention to detail is incredible. Sheldon didn't just build a website; he built an experience. Our online orders have tripled since launch!",
      rating: 5,
      results: "+300% online sales",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background/50 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Client <span className="gradient-accent-text">Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real businesses across rural Pennsylvania
            </p>
          </div>

          {/* Main Testimonial Carousel */}
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-primary/10 -rotate-12" />
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-full"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-white p-2 rounded-full">
                          <Star className="w-6 h-6 fill-current" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-lg">{testimonial.name}</div>
                          <div className="text-muted-foreground">
                            {testimonial.role} • {testimonial.business}
                          </div>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                          <span className="font-semibold gradient-text">{testimonial.results}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "w-8 bg-gradient-to-r from-primary to-accent"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center hover-lift">
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover-lift">
              <div className="text-4xl font-bold gradient-accent-text mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover-lift">
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover-lift">
              <div className="text-4xl font-bold gradient-accent-text mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
