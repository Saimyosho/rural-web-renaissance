import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import StickyCTA from "@/components/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <SocialProof />
      <Portfolio />
      <section id="faq-teaser" className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Have questions?</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-8">Find detailed answers on our FAQ page.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-left">
            <div className="glass p-3 md:p-4 rounded-lg">
              <h3 className="text-sm md:text-base font-semibold mb-1">How the free site works</h3>
              <p className="text-xs md:text-sm text-muted-foreground">What's included and why it's free.</p>
            </div>
            <div className="glass p-3 md:p-4 rounded-lg">
              <h3 className="text-sm md:text-base font-semibold mb-1">Timeline and process</h3>
              <p className="text-xs md:text-sm text-muted-foreground">What to expect each step.</p>
            </div>
            <div className="glass p-3 md:p-4 rounded-lg">
              <h3 className="text-sm md:text-base font-semibold mb-1">Ownership & support</h3>
              <p className="text-xs md:text-sm text-muted-foreground">You own everything; support options.</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <a href="/faq" className="inline-block px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm md:text-base font-semibold hover:shadow-glow transition-all">
              View all FAQs
            </a>
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
      <StickyCTA />
      <BackToTop />
    </div>
  );
};

export default Index;
