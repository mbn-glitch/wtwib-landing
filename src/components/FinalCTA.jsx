import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const REGISTRATION_URL = "https://crm.wtradersworld.com/registration-live";

export default function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden"
    >
      {/* Ambient gold orb + dividers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.12) 0%, rgba(201,169,97,0.04) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fiper/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="final-cta-title"
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl text-balance"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-gradient-red">{t("finalCta.title")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl text-balance">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-12 relative inline-block">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 scale-110 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(201,169,97,0.4) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-12 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_-10px_rgba(201,169,97,0.5)] transition-all duration-300 hover:shadow-[0_25px_60px_-10px_rgba(201,169,97,0.7)] hover:scale-105"
            >
              {t("finalCta.cta")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl-flip"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
