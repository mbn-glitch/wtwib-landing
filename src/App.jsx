import useDirection from "./hooks/useDirection";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppButton from "./components/WhatsAppButton";
import StickyMobileCTA from "./components/StickyMobileCTA";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import WhyFiper from "./components/WhyFiper";
import ChooseCard from "./components/ChooseCard";
import HowItWorks from "./components/HowItWorks";
import TrustSecurity from "./components/TrustSecurity";
import FourReasons from "./components/FourReasons";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  useDirection();

  return (
    <div className="noise-bg relative min-h-screen bg-black text-white">
      <a href="#home" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="cv-auto"><TrustStrip /></div>
        <div className="cv-auto"><WhyFiper /></div>
        <div className="cv-auto"><ChooseCard /></div>
        <div className="cv-auto"><HowItWorks /></div>
        <div className="cv-auto"><TrustSecurity /></div>
        <div className="cv-auto"><FourReasons /></div>
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
