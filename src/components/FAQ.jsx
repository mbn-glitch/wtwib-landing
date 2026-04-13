import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does card activation take?",
    a: "Virtual Card: within 5 minutes. Physical Card: 5–10 minutes after ordering. You can start using your Virtual Card immediately after activation.",
  },
  {
    q: "Can I withdraw cash from ATMs?",
    a: "Yes, with the Physical Card you can withdraw up to $2,000 per week from ATMs worldwide. The Virtual Card does not support ATM withdrawals.",
  },
  {
    q: "How long does Physical Card delivery take?",
    a: "Physical Card delivery typically takes 1–2 weeks depending on your location. You'll receive tracking information once your card is shipped.",
  },
  {
    q: "Can I freeze my card?",
    a: "Yes, you can instantly freeze and unfreeze your card from your dashboard with a single click. This provides full control over your card's security at all times.",
  },
  {
    q: "Do I need a Fiper account to get a card?",
    a: "Yes, you need to create a Fiper account first to order and manage your card. Account creation takes just a few minutes.",
  },
  {
    q: "Who determines the FX rate?",
    a: "The FX rate is determined by the card issuer based on prevailing market rates. Rates are applied at the time of transaction.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-200 group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-white pr-8 group-hover:text-zinc-200 sm:text-lg">
          {faq.q}
        </span>
        <span className="flex-shrink-0 rounded-full border border-white/10 p-1.5 text-zinc-500 transition-all duration-300 group-hover:border-white/20 group-hover:text-white">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-zinc-400 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 pb-16 md:pb-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">
            FAQ
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Questions?
            <span className="text-zinc-500"> Answered.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            Everything you need to know about Fiper Card.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
