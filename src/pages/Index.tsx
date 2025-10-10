import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <SocialProof />
      <section id="faq-teaser" className="py-16 px-6 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have questions?</h2>
          <p className="text-muted-foreground mb-8">Find detailed answers on our FAQ page.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-1">How the free site works</h3>
              <p className="text-sm text-muted-foreground">What’s included and why it’s free.</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Timeline and process</h3>
              <p className="text-sm text-muted-foreground">What to expect each step.</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Ownership & support</h3>
              <p className="text-sm text-muted-foreground">You own everything; support options.</p>
            </div>
          </div>
          <div className="mt-8">
            <a href="/faq" className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-glow transition-all">
              View all FAQs
            </a>
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
