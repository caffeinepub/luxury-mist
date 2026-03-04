import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: MenuItemId;
    name: string;
    description: string;
    available: boolean;
    category: MenuCategory;
    priceCents: bigint;
}
export interface ReservationRequest {
    date: string;
    name: string;
    time: string;
    email: string;
    notes: string;
    partySize: bigint;
}
export type MenuItemId = bigint;
export interface RestaurantInfo {
    about: string;
    hours: string;
    tagline: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export enum MenuCategory {
    dessert = "dessert",
    starter = "starter",
    main = "main"
}
export interface backendInterface {
    addMenuItem(name: string, description: string, priceCents: bigint, category: MenuCategory, available: boolean): Promise<MenuItemId>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getAllReservationRequests(): Promise<Array<ReservationRequest>>;
    getMenuItemsByCategory(category: MenuCategory): Promise<Array<MenuItem>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    removeMenuItem(id: MenuItemId): Promise<void>;
    seedMenuItems(): Promise<void>;
    submitReservationRequest(name: string, email: string, date: string, time: string, partySize: bigint, notes: string): Promise<void>;
    updateMenuItem(id: MenuItemId, name: string, description: string, priceCents: bigint, category: MenuCategory, available: boolean): Promise<void>;
}
