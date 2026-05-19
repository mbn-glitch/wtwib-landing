import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.cards"), href: "#cards" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.faq"), href: "#faq" },
    { label: t("nav.helpCenter"), href: "/help-center", isRoute: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "features", "cards", "how-it-works", "faq"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <a href="#home" className="flex-shrink-0" aria-label="Fiper — go to top">
            <img
              src="/Fiper_Logo_white2.png"
              alt="Fiper"
              className="h-24 md:h-28 w-auto object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = !link.isRoute && link.href === `#${activeSection}`;
              const baseClasses = "px-4 py-2 text-sm transition-colors duration-200 rounded-lg";
              const stateClasses = isActive
                ? "text-white bg-white/5"
                : "text-zinc-400 hover:text-white hover:bg-white/5";
              return link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`${baseClasses} text-zinc-400 hover:text-white hover:bg-white/5`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://crm.fiper.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fiper px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-lg hover:shadow-red-500/20"
            >
              {t("nav.getYourCard")}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = !link.isRoute && link.href === `#${activeSection}`;
                const stateClasses = isActive
                  ? "text-white bg-white/5"
                  : "text-zinc-400 hover:text-white hover:bg-white/5";
                return link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-base text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block px-4 py-3 text-base rounded-lg transition-colors ${stateClasses}`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 space-y-3">
                <LanguageSwitcher className="w-full justify-center" />
                <a
                  href="https://crm.fiper.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center rounded-full bg-fiper px-6 py-3 text-sm font-semibold text-white"
                >
                  {t("nav.getYourCard")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
