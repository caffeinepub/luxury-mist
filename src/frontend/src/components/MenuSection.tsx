import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import {
  type MenuCategory,
  type MenuItem,
  useMenuItems,
} from "../hooks/useQueries";

type TabValue = "all" | "starter" | "main" | "dessert";

const TABS: { value: TabValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "starter", label: "Starters" },
  { value: "main", label: "Mains" },
  { value: "dessert", label: "Desserts" },
];

function getDishImage(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("truffle") && lower.includes("risotto"))
    return "/assets/generated/dish-truffle-risotto.dim_600x600.jpg";
  if (lower.includes("scallop"))
    return "/assets/generated/dish-scallops.dim_600x600.jpg";
  if (lower.includes("filet") || lower.includes("mignon"))
    return "/assets/generated/dish-filet-mignon.dim_600x600.jpg";
  if (lower.includes("chocolate") && lower.includes("fondant"))
    return "/assets/generated/dish-chocolate-fondant.dim_600x600.jpg";
  if (
    lower.includes("mushroom") &&
    (lower.includes("velouté") || lower.includes("velout"))
  )
    return "/assets/generated/dish-mushroom-velout.dim_600x600.jpg";
  if (lower.includes("tartare"))
    return "/assets/generated/dish-beef-tartare.dim_600x600.jpg";
  if (lower.includes("rack") && lower.includes("lamb"))
    return "/assets/generated/dish-rack-of-lamb.dim_600x600.jpg";
  if (lower.includes("salmon"))
    return "/assets/generated/dish-smoked-salmon.dim_600x600.jpg";
  if (lower.includes("panna cotta") || lower.includes("elderflower"))
    return "/assets/generated/dish-panna-cotta.dim_600x600.jpg";
  if (lower.includes("cheese") && lower.includes("selection"))
    return "/assets/generated/dish-cheese-selection.dim_600x600.jpg";
  return null;
}

function formatPrice(priceCents: bigint): string {
  return `$${(priceCents / 100n).toString()}`;
}

function MenuItemCard({
  item,
  index,
}: {
  item: MenuItem;
  index: number;
}) {
  const imageSrc = getDishImage(item.name);

  return (
    <motion.article
      className="bg-white group cursor-default overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4) }}
      data-ocid={`menu.item.${index + 1}`}
    >
      {/* Dish image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(0.91_0.012_150)]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mb-3" />
              <span className="font-playfair text-sm italic text-[oklch(0.50_0.018_155)]">
                {item.name}
              </span>
              <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mt-3" />
            </div>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 font-inter text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-[oklch(0.13_0.022_160/0.85)] text-[oklch(0.52_0.10_155)]">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-playfair text-xl text-[oklch(0.18_0.025_160)] leading-tight">
            {item.name}
          </h3>
          <span className="font-playfair text-lg text-[oklch(0.52_0.10_155)] font-bold whitespace-nowrap flex-shrink-0 pt-0.5">
            {formatPrice(item.priceCents)}
          </span>
        </div>
        <p className="font-inter text-sm text-[oklch(0.50_0.018_155)] font-light leading-relaxed">
          {item.description}
        </p>
        {!item.available && (
          <span className="inline-block mt-3 font-inter text-xs tracking-wider uppercase text-[oklch(0.577_0.245_27.325)]">
            Seasonal — not available
          </span>
        )}
      </div>
    </motion.article>
  );
}

function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((key) => (
        <div
          key={key}
          className="bg-white shadow-card overflow-hidden"
          data-ocid="menu.loading_state"
        >
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-6 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const { data: menuItems, isLoading, isError } = useMenuItems();

  const filtered =
    activeTab === "all"
      ? (menuItems ?? [])
      : (menuItems ?? []).filter(
          (item) => item.category === (activeTab as MenuCategory),
        );

  return (
    <section id="menu" className="py-24 lg:py-32 bg-mist">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-[oklch(0.52_0.10_155)]">
              Curated Selections
            </span>
            <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-[oklch(0.18_0.025_160)] mb-5">
            Our Seasonal Menu
          </h2>
          <p className="font-inter text-base text-[oklch(0.50_0.018_155)] font-light max-w-lg mx-auto">
            Each dish is composed from the finest seasonal ingredients, sourced
            locally and crafted with care.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1 mb-12">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`font-inter text-sm tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 cursor-pointer ${
                activeTab === tab.value
                  ? "bg-[oklch(0.18_0.025_160)] text-mist"
                  : "text-[oklch(0.50_0.018_155)] hover:text-[oklch(0.18_0.025_160)] hover:bg-[oklch(0.91_0.012_150)]"
              }`}
              data-ocid="menu.tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <MenuSkeleton />
        ) : isError ? (
          <div className="text-center py-20" data-ocid="menu.error_state">
            <p className="font-inter text-sm text-[oklch(0.577_0.245_27.325)]">
              Unable to load menu. Please try again.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="menu.empty_state">
            <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mb-4" />
            <p className="font-playfair text-xl italic text-[oklch(0.50_0.018_155)]">
              No dishes in this category
            </p>
            <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mt-4" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => (
              <MenuItemCard key={String(item.id)} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
