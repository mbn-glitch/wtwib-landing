import { motion } from "framer-motion";

const platforms = [
  "MetaTrader 5",
  "cTrader",
  "TradingView",
  "Binance",
  "Bybit",
  "OKX",
];

function PlatformList({ className = "" }) {
  return (
    <div className={`flex items-center gap-8 ${className}`}>
      {platforms.map((name, i) => (
        <span key={name} className="flex items-center gap-8">
          {i > 0 && (
            <span className="h-4 w-px bg-white/10 flex-shrink-0" />
          )}
          <span className="text-sm font-medium tracking-wide text-zinc-500 whitespace-nowrap transition-opacity duration-300 opacity-60 hover:opacity-100 cursor-default">
            {name}
          </span>
        </span>
      ))}
    </div>
  );
}

function MarqueeTrack() {
  const doubled = [...platforms, ...platforms];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center gap-10">
            {i > 0 && (
              <span className="h-4 w-px bg-white/10 flex-shrink-0" />
            )}
            <span className="text-sm font-medium tracking-wide text-zinc-500 whitespace-nowrap opacity-60">
              {name}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="relative border-t border-white/5 border-b border-b-white/5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-zinc-600 mb-8">
          Trusted by traders on leading platforms
        </p>

        {/* Desktop: static centered row */}
        <div className="hidden md:flex justify-center">
          <PlatformList />
        </div>

        {/* Mobile: scrolling marquee */}
        <div className="md:hidden">
          <MarqueeTrack />
        </div>
      </motion.div>
    </section>
  );
}
