import { motion } from "framer-motion";

const platforms = [
  {
    name: "MetaTrader 5",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0L2 4v8c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12V4L12 0zm0 2.18l8 3.27v6.55c0 4.52-3.4 8.78-8 9.93-4.6-1.15-8-5.41-8-9.93V5.45l8-3.27zM11 7v2H9v2h2v6h2v-6h2v-2h-2V7h-2z" />
      </svg>
    ),
  },
  {
    name: "cTrader",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    name: "TradingView",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3 17h4v-4H3v4zm6 0h4v-8H9v8zm6 0h4V7h-4v10zM3 3v2h18V3H3z" />
      </svg>
    ),
  },
  {
    name: "Binance",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2L7.5 6.5l1.41 1.41L12 4.83l3.09 3.08L16.5 6.5 12 2zM6.5 7.5L2 12l4.5 4.5 1.41-1.41L4.83 12l3.08-3.09L6.5 7.5zM17.5 7.5l-1.41 1.41L19.17 12l-3.08 3.09 1.41 1.41L22 12l-4.5-4.5zM12 9a3 3 0 100 6 3 3 0 000-6zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM7.5 17.5L12 22l4.5-4.5-1.41-1.41L12 19.17l-3.09-3.08-1.41 1.41z" />
      </svg>
    ),
  },
  {
    name: "Bybit",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 4v10h2V7H8zm6 0v10h2V7h-2z" />
      </svg>
    ),
  },
  {
    name: "OKX",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zm-5 10h6v6H9v-6z" />
      </svg>
    ),
  },
];

function PlatformItem({ platform }) {
  return (
    <span className="flex items-center gap-2.5 text-zinc-500 transition-all duration-300 hover:text-white group cursor-default whitespace-nowrap">
      <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0 group-hover:text-fiper">
        {platform.svg}
      </span>
      <span className="text-sm font-medium tracking-wide opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {platform.name}
      </span>
    </span>
  );
}

function PlatformList() {
  return (
    <div className="flex items-center gap-8">
      {platforms.map((p, i) => (
        <span key={p.name} className="flex items-center gap-8">
          {i > 0 && (
            <span className="h-4 w-px bg-white/10 flex-shrink-0" />
          )}
          <PlatformItem platform={p} />
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
        {doubled.map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            {i > 0 && (
              <span className="h-4 w-px bg-white/10 flex-shrink-0" />
            )}
            <PlatformItem platform={p} />
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
