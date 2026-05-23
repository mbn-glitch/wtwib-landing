import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const REGISTRATION_URL = "https://crm.wtradersworld.com/registration-live";

export default function StickyMobileCTA() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const nearFooter =
        window.innerHeight + window.scrollY > document.body.offsetHeight - 400;
      setShow(scrolled > 600 && !nearFooter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
    >
      <div className="px-4 py-3 bg-black/85 backdrop-blur-xl border-t border-white/10">
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 w-full rounded-full bg-fiper px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fiper/30"
        >
          {t("nav.becomePartner")}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1 rtl-flip"
          />
        </a>
      </div>
    </div>
  );
}
