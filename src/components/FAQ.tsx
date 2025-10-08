import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How does the 'free website' model work?",
          a: "I build your professional website completely free using my technical expertise as my portfolio project. You only pay for optional business automation tools (like booking systems, e-signatures, faxing) if and when you need them. No tricks, no hidden fees - I genuinely want to help rural businesses establish their online presence."
        },
        {
          q: "What's included in the free website?",
          a: "Everything you need: custom design, professional development, hosting setup, SSL certificate, mobile responsiveness, basic SEO, and 30 days of post-launch support. You get a complete, production-ready website that's yours to keep."
        },
        {
          q: "How long does it take to build a website?",
          a: "Most websites are completed in 8-12 weeks, depending on complexity. Simple sites can be done in 4-6 weeks. We'll provide a detailed timeline during our initial consultation based on your specific needs."
        }
      ]
    },
    {
      category: "Technical Details",
      questions: [
        {
          q: "What technology do you use?",
          a: "I use modern, professional-grade technology: React 18, TypeScript, TailwindCSS, and Node.js. Your website will be fast, secure, accessible, and built with the same tools used by Fortune 500 companies."
        },
        {
          q: "Will my website be mobile-friendly?",
          a: "Absolutely! Every website is built with a mobile-first approach, ensuring it looks and works perfectly on phones, tablets, and desktops. I also test on multiple devices and browsers."
        },
        {
          q: "How fast will my website load?",
          a: "Very fast! I optimize for Core Web Vitals with typical load times under 2 seconds. Your site will achieve 90+ performance scores on Google's PageSpeed Insights."
        },
        {
          q: "Is the website accessible for people with disabilities?",
          a: "Yes! All websites are built following WCAG 2.1 AA accessibility standards, including proper color contrast, keyboard navigation, and screen reader support."
        }
      ]
    },
    {
      category: "Business & Services",
      questions: [
        {
          q: "What are the optional automation tools?",
          a: "Tools include: online booking/scheduling, e-signatures, cloud faxing, automated invoicing, customer relationship management (CRM), email marketing integration, and payment processing. You only add these when your business needs them."
        },
        {
          q: "How much do the automation tools cost?",
          a: "Pricing is transparent and varies by tool. Most range from $10-50/month depending on features and usage. I'll help you choose cost-effective solutions that fit your budget and needs."
        },
        {
          q: "Do you offer ongoing support after launch?",
          a: "Yes! You get 30 days of post-launch support included. After that, you can choose monthly maintenance plans starting at $50/month, or reach out as needed for one-time updates."
        },
        {
          q: "Can you help with SEO and getting found on Google?",
          a: "Yes! Basic SEO is included (proper meta tags, structured data, sitemap). For advanced SEO (content strategy, link building, local SEO campaigns), I offer separate packages starting at $200/month."
        }
      ]
    },
    {
      category: "Process & Timeline",
      questions: [
        {
          q: "What's the first step to get started?",
          a: "Simply fill out the contact form or reach out directly. We'll schedule a free 30-minute consultation to discuss your business, goals, and vision. No commitment required."
        },
        {
          q: "What information do you need from me?",
          a: "Basic business details, your target audience, preferred colors/branding, competitor websites you like/dislike, and any specific features you need. Don't worry - I'll guide you through everything!"
        },
        {
          q: "How involved do I need to be during development?",
          a: "As much or as little as you want! I provide weekly progress updates and demos. Most clients spend 1-2 hours per week reviewing and providing feedback. I handle all the technical work."
        },
        {
          q: "What if I don't like something?",
          a: "We iterate until you're happy! I include multiple revision rounds during the design phase. Communication is key - I want you to love your website."
        }
      ]
    },
    {
      category: "Ownership & Control",
      questions: [
        {
          q: "Do I own the website?",
          a: "100% yes! You own all the code, design, and content. I provide full source code access and documentation. You're never locked in."
        },
        {
          q: "Can I make changes myself later?",
          a: "Yes! I provide training and documentation. For simple updates (text, images), you'll be able to do it yourself. For complex changes, I'm always available to help."
        },
        {
          q: "What if I want to move to another developer?",
          a: "No problem! Since you own everything, you can take your website anywhere. I'll provide all necessary files and documentation for a smooth transition."
        }
      ]
    },
    {
      category: "Trust & Security",
      questions: [
        {
          q: "Why should I trust you?",
          a: "Fair question! I have 15+ years of IT experience, relevant certifications, and a portfolio of successful projects. I provide references, detailed contracts, and transparent communication throughout."
        },
        {
          q: "Is my website secure?",
          a: "Absolutely! I implement industry-standard security: HTTPS/SSL encryption, secure authentication, regular security updates, and OWASP compliance. Your site and data are protected."
        },
        {
          q: "What about my business data and privacy?",
          a: "Your data is yours. I follow strict confidentiality agreements and GDPR principles. I never sell or share your information, and you control all business data."
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <HelpCircle className="w-4 h-4 mr-2" />
            Your Questions Answered
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about working with us. Can't find your answer? Just ask!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-strong border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{category.category}</CardTitle>
                  <CardDescription>{category.questions.length} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="glass-strong border-primary/20 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Reach out to us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#contact" className="inline-block">
                  <button className="px-6 py-3 bg-gradient-to-r from-primary to-bridge text-white rounded-lg hover:shadow-glow transition-all">
                    Contact Us
                  </button>
                </a>
                <a href="mailto:contact@rural-web-renaissance.com" className="inline-block">
                  <button className="px-6 py-3 border border-primary/50 rounded-lg glass hover:bg-primary/10 transition-all">
                    Email Directly
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
