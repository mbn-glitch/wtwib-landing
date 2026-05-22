import { motion } from "framer-motion";

export default function WtradersCard3D({ variant = "virtual" }) {
  const isPhysical = variant === "physical";

  if (isPhysical) {
    return (
      <motion.div
        className="relative w-[340px] h-[215px] sm:w-[380px] sm:h-[240px] gpu-layer"
        style={{ perspective: "1200px" }}
        initial={{ y: 0 }}
        whileInView={{ y: [-10, 10, -10] }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: "rotateY(-15deg) rotateX(10deg)",
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(201,169,97,0.18))",
          }}
        >
          <img
            src="/wtraders-physical-card.webp"
            alt="Wtraders Physical Card"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-[340px] h-[215px] sm:w-[380px] sm:h-[240px] gpu-layer"
      style={{ perspective: "1200px" }}
      initial={{ y: 0 }}
      whileInView={{ y: [-10, 10, -10] }}
      viewport={{ margin: "-50px" }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 40%, #050505 70%, #000000 100%)",
          transform: "rotateY(-15deg) rotateX(10deg)",
          transformStyle: "preserve-3d",
          boxShadow: "0 30px 80px -15px rgba(201,169,97,0.25), 0 0 60px -10px rgba(201,169,97,0.15)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative h-full p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <img src="/wtraders-logo.png" alt="Wtraders" className="h-16 w-auto object-contain" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              Virtual
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="rounded-md flex items-center justify-center overflow-hidden w-10 h-7"
              style={{ background: "linear-gradient(135deg, #d4af37 0%, #f0d060 30%, #b8860b 70%, #d4af37 100%)" }}
            >
              <div className="w-full h-full flex flex-col justify-center gap-[3px] px-1.5">
                <div className="h-px bg-black/20" />
                <div className="h-px bg-black/15" />
                <div className="h-px bg-black/20" />
                <div className="h-px bg-black/15" />
                <div className="h-px bg-black/20" />
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M8.5 14.5A5 5 0 0 1 7 11a5 5 0 0 1 1.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 17a8 8 0 0 1-2.5-5.5A8 8 0 0 1 12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15.5 19.5A11 11 0 0 1 12 11a11 11 0 0 1 3.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-lg tracking-[0.15em] text-white/80">
              •••• •••• •••• 4242
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider mb-0.5 text-white/40">Valid Thru</p>
                <p className="text-xs font-mono text-white/70">12/29</p>
              </div>
              <p className="font-bold text-xl text-white/80 tracking-[0.08em]">WTRADERS</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
