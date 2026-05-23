import useDirection from "./hooks/useDirection";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import KeyBenefits from "./components/KeyBenefits";
import EarningsCalculator from "./components/EarningsCalculator";
import HowItWorks from "./components/HowItWorks";
import WhyWtraders from "./components/WhyWtraders";
import MarketingTools from "./components/MarketingTools";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import StickyMobileCTA from "./components/StickyMobileCTA";

function App() {
  useDirection();

  return (
    <div className="noise-bg relative min-h-screen bg-black text-white">
      <a href="#home" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="cv-auto"><KeyBenefits /></div>
        <div className="cv-auto"><EarningsCalculator /></div>
        <div className="cv-auto"><HowItWorks /></div>
        <div className="cv-auto"><WhyWtraders /></div>
        <div className="cv-auto"><MarketingTools /></div>
        <div className="cv-auto"><FAQ /></div>
        <div className="cv-auto"><FinalCTA /></div>
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  );
}

export default App;
