import { motion } from "motion/react";
import { useRestaurantInfo } from "../hooks/useQueries";

const FALLBACK_ABOUT =
  "Founded on the belief that exceptional dining is an art form, Luxury Mist blends the serenity of mountain wilderness with contemporary culinary innovation. Every dish is a celebration of the finest seasonal ingredients — foraged from mist-kissed highlands, crafted with precision and served with warmth.";

export default function AboutSection() {
  const { data: info } = useRestaurantInfo();

  const aboutText = info?.about ?? FALLBACK_ABOUT;

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      data-ocid="about.section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left — text */}
        <div className="bg-[oklch(0.13_0.022_160)] flex items-center px-8 md:px-16 lg:px-20 py-24 lg:py-32">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-[oklch(0.52_0.10_155)]" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-[oklch(0.52_0.10_155)]">
                Our Story
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl text-mist leading-tight mb-8">
              Crafted with{" "}
              <em className="italic text-[oklch(0.52_0.10_155)]">Passion</em>
            </h2>

            <p className="font-inter text-base text-mist/70 font-light leading-loose mb-10">
              {aboutText}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-[oklch(0.52_0.10_155/0.2)] pt-8">
              {[
                { value: "12+", label: "Years" },
                { value: "4", label: "Michelin Stars" },
                { value: "48", label: "Seasonal dishes" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-playfair text-2xl text-[oklch(0.52_0.10_155)] font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="font-inter text-xs tracking-wider uppercase text-mist/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          className="relative min-h-[400px] lg:min-h-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/generated/about-interior.dim_1200x800.jpg"
            alt="Luxury Mist interior"
            className="w-full h-full object-cover"
          />
          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, oklch(0.13 0.022 160 / 0.3) 0%, transparent 40%)",
            }}
          />

          {/* Floating quote card */}
          <motion.div
            className="absolute bottom-10 left-10 right-10 md:left-8 md:right-auto md:max-w-xs bg-[oklch(0.13_0.022_160/0.90)] backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-8 h-px bg-[oklch(0.52_0.10_155)] mb-3" />
            <p className="font-playfair text-sm italic text-mist leading-relaxed">
              "Where the forest breathes, the table awakens."
            </p>
            <p className="font-inter text-xs text-[oklch(0.52_0.10_155)] mt-3 tracking-widest uppercase">
              — Chef Laurent
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
