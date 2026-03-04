import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "oklch(0.13 0.022 160)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-restaurant.dim_1920x1080.jpg')",
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,15,10,0.72) 0%, rgba(8,15,10,0.55) 50%, rgba(8,15,10,0.80) 100%)",
        }}
      />

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[oklch(0.52_0.10_155/0.5)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-[oklch(0.52_0.10_155)] font-light">
            Est. 2012 · Fine Dining
          </span>
          <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl text-mist leading-tight tracking-tight">
            Experience
            <br />
            <em className="italic font-normal text-[oklch(0.52_0.10_155)]">
              The Art of Taste
            </em>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="font-inter text-base md:text-lg text-mist/70 font-light tracking-wide max-w-xl mx-auto mt-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          A culinary journey inspired by heritage and innovation.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button
            type="button"
            onClick={scrollToMenu}
            className="group font-inter text-sm tracking-[0.2em] uppercase px-10 py-4 bg-[oklch(0.52_0.10_155)] text-[oklch(0.13_0.022_160)] font-medium hover:bg-[oklch(0.65_0.09_155)] transition-all duration-300 shadow-moss cursor-pointer"
            data-ocid="hero.primary_button"
          >
            <span className="flex items-center gap-3">
              Explore Menu
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.96 0.010 150))",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-inter text-xs tracking-[0.25em] uppercase text-mist/40">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-mist/40 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
