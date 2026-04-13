import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="noise-bg relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <WhyFiper />
        <ChooseCard />
        <HowItWorks />
        <TrustSecurity />
        <FourReasons />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
