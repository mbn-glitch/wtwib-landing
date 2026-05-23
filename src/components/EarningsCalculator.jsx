import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

const REGISTRATION_URL = "https://crm.wtradersworld.com/registration-live";

/* Locked formula — CEO source of truth.
   1 active referred client = 15 std lots × $16 fee × 40% = $96/month */
const EARNINGS_PER_CLIENT = 15 * 16 * 0.4; // 96
const SLIDER_MIN = 10;
const SLIDER_MAX = 500;
const SLIDER_STEP = 10;
const SLIDER_DEFAULT = 100;
const TICKS = [10, 100, 250, 500];

/* Always en-US so numerals stay ASCII in both EN and AR (CEO requirement). */
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function pctOf(value) {
  return ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
}

export default function EarningsCalculator() {
  const { t, i18n } = useTranslation();
  const reduced = useReducedMotion();

  const [clients, setClients] = useState(SLIDER_DEFAULT);
  const target = clients * EARNINGS_PER_CLIENT;
  const [displayed, setDisplayed] = useState(target);

  /* Smoothly tween the displayed number toward the target whenever the slider
     changes. animate() auto-cancels the prior tween on re-trigger, so dragging
     never produces a jittery double-animation. */
  useEffect(() => {
    if (reduced) {
      setDisplayed(target);
      return;
    }
    const controls = animate(displayed, target, {
      duration: 0.3,
      ease: "easeOut",
      onUpdate: (v) => setDisplayed(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);

  const fillPct = pctOf(clients);
  const isRtl = i18n.dir() === "rtl";

  return (
    <section
      id="earnings"
      aria-labelledby="earnings-calc-title"
      className="relative py-24 sm:py-28 lg:py-32"
    >
      {/* Single soft gold glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[700px] h-[700px] rounded-full bg-amber-500/[0.05] blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-fiper">
            {t("earningsCalculator.sectionLabel")}
          </p>
          <h2
            id="earnings-calc-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl text-balance"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("earningsCalculator.title")}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-400 text-balance">
            {t("earningsCalculator.subtitle")}
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mt-14 lg:mt-16 mx-auto max-w-3xl gpu-layer"
        >
          {/* Inner glow accent at the top-center of the card */}
          <div
            aria-hidden="true"
            className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
          />

          <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-10 lg:p-12 backdrop-blur-sm">
            {/* Subtle top-center inner glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 -translate-y-1/4 rounded-full bg-amber-500/[0.06] blur-3xl pointer-events-none"
            />

            <div className="relative">
              {/* Gold pill badge */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-fiper px-4 py-1.5 text-xs font-semibold">
                  <TrendingUp size={12} />
                  {t("earningsCalculator.badge")}
                </span>
              </div>

              {/* Result number */}
              <div className="mt-6 text-center">
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight tabular-nums"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {usdFormatter.format(Math.round(displayed))}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {t("earningsCalculator.resultLabel")}
                </p>
                <p className="mt-3 text-xs text-zinc-500 tabular-nums">
                  {t("earningsCalculator.formulaBreakdown", {
                    count: integerFormatter.format(clients),
                  })}
                </p>
              </div>

              {/* Slider */}
              <div className="mt-10 lg:mt-12">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <label
                    htmlFor="earnings-slider"
                    className="text-sm text-zinc-400"
                  >
                    {t("earningsCalculator.sliderLabel")}
                  </label>
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {integerFormatter.format(clients)}
                  </span>
                </div>

                <input
                  id="earnings-slider"
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  step={SLIDER_STEP}
                  value={clients}
                  onChange={(e) => setClients(Number(e.target.value))}
                  aria-label={t("earningsCalculator.sliderLabel")}
                  aria-valuemin={SLIDER_MIN}
                  aria-valuemax={SLIDER_MAX}
                  aria-valuenow={clients}
                  className="earnings-slider"
                  style={{
                    "--fill-pct": `${fillPct}%`,
                    "--fill-dir": isRtl ? "to left" : "to right",
                  }}
                />

                {/* Tick marks */}
                <div className="relative mt-3 h-4 select-none">
                  {TICKS.map((tick) => (
                    <span
                      key={tick}
                      className="absolute top-0 -translate-x-1/2 text-[10px] text-zinc-600 tabular-nums"
                      style={{
                        [isRtl ? "right" : "left"]: `${pctOf(tick)}%`,
                      }}
                    >
                      {integerFormatter.format(tick)}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 lg:mt-12 flex justify-center">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-fiper px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02]"
                >
                  {t("earningsCalculator.cta")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 rtl-flip"
                  />
                </a>
              </div>

              {/* Footnote */}
              <p className="mt-8 text-xs text-zinc-600 leading-relaxed text-center max-w-prose mx-auto italic">
                {t("earningsCalculator.footnote")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
