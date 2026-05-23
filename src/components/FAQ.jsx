import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

/* Inject FAQPage JSON-LD into <head>. Uses EN strings — Google parses English,
   AR is parallel content. Schema is keyed by a stable id so re-renders don't
   duplicate. */
function useFaqSchema(faqsEn) {
  useEffect(() => {
    const id = "faq-jsonld";
    let el = document.getElementById(id);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqsEn.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const stale = document.getElementById(id);
      if (stale) stale.remove();
    };
  }, [faqsEn]);
}

function FAQItem({ q, a, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
    >
      <div
        className={`relative rounded-2xl transition-all duration-500 ${
          isOpen
            ? "bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 p-px shadow-[0_0_30px_-5px_rgba(201,169,97,0.15)]"
            : "bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] p-px"
        }`}
      >
        <div
          className={`rounded-2xl transition-all duration-500 ${
            isOpen
              ? "bg-gradient-to-b from-amber-500/[0.05] to-black/95"
              : "bg-black/90 hover:bg-white/[0.02]"
          }`}
        >
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-between px-7 py-6 text-left group"
            aria-expanded={isOpen}
          >
            <span
              className={`text-base font-medium pe-8 transition-colors duration-300 sm:text-lg ${
                isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
              }`}
            >
              {q}
            </span>
            <span
              className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                isOpen
                  ? "bg-fiper/20 border border-fiper/30 text-fiper"
                  : "bg-white/5 border border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-white"
              }`}
            >
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block text-sm font-light leading-none"
              >
                +
              </motion.span>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3, delay: 0.1 },
                }}
                className="overflow-hidden"
              >
                <div className="px-7 pb-7 pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-5" />
                  <p className="text-base leading-relaxed text-zinc-400 max-w-3xl">
                    {a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  /* Schema is always emitted from the EN bundle so it doesn't change on
     language switch. Read directly from the resource store. */
  const enBundle = i18n.getResourceBundle("en", "translation") || {};
  const faqsEn = FAQ_KEYS.map((k) => ({
    q: enBundle?.faq?.[`${k}Question`] || t(`faq.${k}Question`),
    a: enBundle?.faq?.[`${k}Answer`] || t(`faq.${k}Answer`),
  }));
  useFaqSchema(faqsEn);

  const faqs = FAQ_KEYS.map((k) => ({
    q: t(`faq.${k}Question`),
    a: t(`faq.${k}Answer`),
  }));

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 lg:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-fiper">
            {t("faq.sectionLabel")}
          </p>
          <h2
            id="faq-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("faq.title")}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={FAQ_KEYS[i]}
              q={f.q}
              a={f.a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
