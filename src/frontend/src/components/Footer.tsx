const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[oklch(0.11_0.018_160)] border-t border-[oklch(0.52_0.10_155/0.15)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="text-center">
            <p className="font-playfair text-xl tracking-[0.18em] text-[oklch(0.52_0.10_155)] uppercase font-bold mb-2">
              Luxury Mist
            </p>
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-mist/30">
              Fine Dining · Est. 2012
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <span className="flex-1 h-px bg-[oklch(0.52_0.10_155/0.2)]" />
            <span className="w-1.5 h-1.5 bg-[oklch(0.52_0.10_155)] rotate-45" />
            <span className="flex-1 h-px bg-[oklch(0.52_0.10_155/0.2)]" />
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-inter text-xs tracking-[0.2em] uppercase text-mist/50 hover:text-[oklch(0.52_0.10_155)] transition-colors duration-300 cursor-pointer"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-center space-y-1">
            <p className="font-inter text-xs text-mist/30 font-light">
              © {year} Luxury Mist. All rights reserved.
            </p>
            <p className="font-inter text-xs text-mist/20 font-light">
              Built with{" "}
              <span className="text-[oklch(0.52_0.10_155/0.6)]">♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist/30 hover:text-[oklch(0.52_0.10_155/0.7)] transition-colors duration-300"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
