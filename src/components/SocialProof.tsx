import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Marcus Williams",
      business: "Williams Auto Repair",
      role: "Owner",
      rating: 5,
      text: "Best investment we've made! The appointment booking system and customer portal have streamlined our operations. Our customers love the convenience, and we've seen a 40% increase in bookings.",
      location: "Altoona, PA"
    },
    {
      name: "Lisa Thompson",
      business: "Thompson Law Practice",
      role: "Attorney",
      rating: 5,
      text: "I was skeptical about the 'free website' model, but Sheldon delivered enterprise-level quality. The e-signature integration saves us hours each week. Worth every penny of the automation tools!",
      location: "Somerset, PA"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-7xl">
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What <span className="gradient-sunrise-text">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from businesses we've helped grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-strong border-primary/20 hover:border-primary/40 transition-all h-full">
                  <CardContent className="pt-6">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="border-t border-primary/20 pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProof;
