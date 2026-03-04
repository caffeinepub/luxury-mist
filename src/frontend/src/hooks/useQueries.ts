import { useMutation, useQuery } from "@tanstack/react-query";
import type { MenuItem, RestaurantInfo } from "../backend";
import { MenuCategory } from "../backend";
import { useActor } from "./useActor";

export { MenuCategory };
export type { MenuItem, RestaurantInfo };

const EXTRA_MENU_ITEMS = [
  {
    name: "Forest Mushroom Velouté",
    description:
      "Velvety wild mushroom soup with truffle oil, chive cream, and toasted sourdough.",
    priceCents: BigInt(1600),
    category: MenuCategory.starter,
    available: true,
  },
  {
    name: "Alpine Beef Tartare",
    description:
      "Hand-cut prime beef with capers, cornichons, Dijon mustard, and a quail egg.",
    priceCents: BigInt(2200),
    category: MenuCategory.starter,
    available: true,
  },
  {
    name: "Herb-Crusted Rack of Lamb",
    description:
      "New Zealand lamb rack with a rosemary and pistachio crust, roasted root vegetables, and mint jus.",
    priceCents: BigInt(4800),
    category: MenuCategory.main,
    available: true,
  },
  {
    name: "Mist-Smoked Salmon",
    description:
      "Cold-smoked wild salmon fillet with dill beurre blanc, fennel salad, and caviar pearls.",
    priceCents: BigInt(3800),
    category: MenuCategory.main,
    available: true,
  },
  {
    name: "Elderflower Panna Cotta",
    description:
      "Silky elderflower panna cotta with a blackcurrant coulis and crystallised violet petals.",
    priceCents: BigInt(1400),
    category: MenuCategory.dessert,
    available: true,
  },
  {
    name: "Alpine Cheese Selection",
    description:
      "A curated board of three mountain cheeses, fig jam, honeycomb, and walnut bread.",
    priceCents: BigInt(1900),
    category: MenuCategory.dessert,
    available: true,
  },
];

const EXPECTED_TOTAL = 4 + EXTRA_MENU_ITEMS.length;

export function useMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      // Seed base items (no-op if already seeded)
      try {
        await actor.seedMenuItems();
      } catch {
        // Already seeded — ignore
      }
      // Add extra items if not yet present
      const existing = await actor.getAllMenuItems();
      if (existing.length < EXPECTED_TOTAL) {
        const existingNames = new Set(existing.map((i) => i.name));
        await Promise.all(
          EXTRA_MENU_ITEMS.filter((item) => !existingNames.has(item.name)).map(
            (item) =>
              actor.addMenuItem(
                item.name,
                item.description,
                item.priceCents,
                item.category,
                item.available,
              ),
          ),
        );
        return actor.getAllMenuItems();
      }
      return existing;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRestaurantInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantInfo>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getRestaurantInfo();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 60 * 1000,
  });
}

export function useSubmitReservation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      date: string;
      time: string;
      partySize: number;
      notes: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      await actor.submitReservationRequest(
        data.name,
        data.email,
        data.date,
        data.time,
        BigInt(data.partySize),
        data.notes,
      );
    },
  });
}
