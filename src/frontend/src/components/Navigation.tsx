import { motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.13_0.022_160/0.97)] backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-playfair text-xl tracking-[0.18em] font-bold text-moss uppercase cursor-pointer"
            data-ocid="nav.link"
          >
            Luxury Mist
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-inter text-sm font-light tracking-widest uppercase text-mist opacity-85 hover:opacity-100 hover:text-moss transition-all duration-300 cursor-pointer"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="font-inter text-sm font-light tracking-widest uppercase px-6 py-2.5 border border-moss text-moss hover:bg-moss hover:text-[oklch(0.13_0.022_160)] transition-all duration-300 cursor-pointer"
              data-ocid="nav.link"
            >
              Reserve
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-mist transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-mist transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-mist transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            className="md:hidden border-t border-[oklch(0.52_0.10_155/0.2)] py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-inter text-sm font-light tracking-widest uppercase text-mist opacity-85 text-left cursor-pointer"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="font-inter text-sm font-light tracking-widest uppercase px-6 py-3 border border-moss text-moss w-full text-center cursor-pointer"
                data-ocid="nav.link"
              >
                Reserve a Table
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
