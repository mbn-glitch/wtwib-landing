import { motion } from "framer-motion";

export default function FiperCard3D({ variant = "virtual" }) {
  const isPhysical = variant === "physical";

  return (
    <motion.div
      className="relative w-[340px] h-[215px] sm:w-[380px] sm:h-[240px]"
      style={{ perspective: "1200px" }}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden ${
          isPhysical
            ? "border border-white/10"
            : ""
        }`}
        style={{
          background: isPhysical
            ? "linear-gradient(145deg, #27272a 0%, #18181b 35%, #09090b 65%, #18181b 100%)"
            : "linear-gradient(135deg, #DC2626 0%, #991B1B 40%, #7F1D1D 70%, #450A0A 100%)",
          transform: "rotateY(-15deg) rotateX(10deg)",
          transformStyle: "preserve-3d",
          boxShadow: isPhysical
            ? "0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px -10px rgba(220,38,38,0.15)"
            : "0 30px 80px -15px rgba(220,38,38,0.4), 0 0 60px -10px rgba(220,38,38,0.3)",
        }}
      >
        {/* Physical card: metallic light reflection */}
        {isPhysical && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, transparent 35%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.03) 55%, transparent 65%)",
            }}
          />
        )}

        {/* Physical card: top-left radial sheen */}
        {isPhysical && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.1) 0%, transparent 45%)",
            }}
          />
        )}

        {/* Physical card: inner edge highlights */}
        {isPhysical && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(0,0,0,0.4), inset 1px 0 0 0 rgba(255,255,255,0.03), inset -1px 0 0 0 rgba(255,255,255,0.03)",
            }}
          />
        )}

        {/* Physical card: diagonal red accent line */}
        {isPhysical && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute h-px w-[180%] origin-top-left"
              style={{
                top: "0",
                left: "-20%",
                background:
                  "linear-gradient(90deg, transparent 20%, rgba(220,38,38,0.4) 45%, rgba(220,38,38,0.4) 55%, transparent 80%)",
                transform: "rotate(25deg)",
              }}
            />
          </div>
        )}

        {/* Virtual card: shine overlay */}
        {!isPhysical && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
            }}
          />
        )}

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Top row: Logo + Type */}
          <div className="flex items-start justify-between">
            <img
              src="/Fiper_Logo_white2.png"
              alt="Fiper"
              className="h-16 w-auto object-contain"
            />
            <span
              className={`text-[10px] font-medium uppercase ${
                isPhysical
                  ? "tracking-[0.3em] text-zinc-400"
                  : "tracking-[0.2em] text-white/50"
              }`}
            >
              {isPhysical ? "Physical · Metal" : "Virtual"}
            </span>
          </div>

          {/* Chip */}
          <div className="flex items-center gap-4">
            <div
              className={`rounded-md flex items-center justify-center overflow-hidden ${
                isPhysical ? "w-12 h-9" : "w-10 h-7"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, #d4af37 0%, #f0d060 30%, #b8860b 70%, #d4af37 100%)",
              }}
            >
              <div className="w-full h-full flex flex-col justify-center gap-[3px] px-1.5">
                <div className="h-px bg-black/20" />
                <div className="h-px bg-black/15" />
                <div className="h-px bg-black/20" />
                <div className="h-px bg-black/15" />
                <div className="h-px bg-black/20" />
              </div>
            </div>
            {/* Contactless icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={isPhysical ? "text-zinc-500" : "text-white/40"}
            >
              <path
                d="M8.5 14.5A5 5 0 0 1 7 11a5 5 0 0 1 1.5-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 17a8 8 0 0 1-2.5-5.5A8 8 0 0 1 12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15.5 19.5A11 11 0 0 1 12 11a11 11 0 0 1 3.5-8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Card number + details */}
          <div className="space-y-3">
            <p
              className={`font-mono text-lg tracking-[0.15em] ${
                isPhysical ? "text-zinc-300" : "text-white/80"
              }`}
            >
              •••• •••• •••• 4242
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p
                  className={`text-[9px] uppercase tracking-wider mb-0.5 ${
                    isPhysical ? "text-zinc-500" : "text-white/40"
                  }`}
                >
                  Valid Thru
                </p>
                <p
                  className={`text-xs font-mono ${
                    isPhysical ? "text-zinc-400" : "text-white/70"
                  }`}
                >
                  12/29
                </p>
              </div>
              <p
                className={`font-bold ${
                  isPhysical
                    ? "text-xl text-zinc-300 tracking-wide"
                    : "text-xl text-white/80 tracking-[0.08em]"
                }`}
                style={
                  isPhysical ? { letterSpacing: "-0.02em" } : undefined
                }
              >
                FIPER
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
