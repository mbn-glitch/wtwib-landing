import Navbar from "./components/Navbar";
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
  return (
    <div className="noise-bg relative min-h-screen bg-black text-white">
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
