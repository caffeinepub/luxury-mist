import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type MenuItemId = Nat;

  type MenuCategory = {
    #starter;
    #main;
    #dessert;
  };

  type MenuItem = {
    id : MenuItemId;
    name : Text;
    description : Text;
    priceCents : Nat;
    category : MenuCategory;
    available : Bool;
  };

  module MenuItem {
    public func compare(menuItem1 : MenuItem, menuItem2 : MenuItem) : Order.Order {
      Nat.compare(menuItem1.id, menuItem2.id);
    };
  };

  let menuItems = Map.empty<MenuItemId, MenuItem>();

  var nextMenuItemId = 1;

  type RestaurantInfo = {
    name : Text;
    tagline : Text;
    about : Text;
    address : Text;
    phone : Text;
    email : Text;
    hours : Text;
  };

  let restaurantInfo : RestaurantInfo = {
    name = "The Golden Bistro";
    tagline = "Exquisite Fine Dining Experience";
    about = "The Golden Bistro offers a unique culinary journey, blending classic flavors with modern techniques. Our chefs use only the finest ingredients to create unforgettable dishes in a warm and elegant atmosphere.";
    address = "123 Fine Dining Avenue, Gourmet City, 12345";
    phone = "+1-555-123-4567";
    email = "info@goldenbistro.com";
    hours = "Mon-Sun: 5pm - 11pm";
  };

  type ReservationRequest = {
    name : Text;
    email : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    notes : Text;
  };

  let reservationRequests = List.empty<ReservationRequest>();

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : MenuCategory) : async [MenuItem] {
    menuItems.filter(
      func(_id, item) {
        item.category == category;
      }
    ).values().toArray().sort();
  };

  public shared ({ caller }) func addMenuItem(name : Text, description : Text, priceCents : Nat, category : MenuCategory, available : Bool) : async MenuItemId {
    let id = nextMenuItemId;
    let menuItem : MenuItem = {
      id;
      name;
      description;
      priceCents;
      category;
      available;
    };
    menuItems.add(id, menuItem);
    nextMenuItemId += 1;
    id;
  };

  public shared ({ caller }) func updateMenuItem(id : MenuItemId, name : Text, description : Text, priceCents : Nat, category : MenuCategory, available : Bool) : async () {
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?_) {
        let updatedItem : MenuItem = {
          id;
          name;
          description;
          priceCents;
          category;
          available;
        };
        menuItems.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func removeMenuItem(id : MenuItemId) : async () {
    menuItems.remove(id);
  };

  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    restaurantInfo;
  };

  public shared ({ caller }) func submitReservationRequest(name : Text, email : Text, date : Text, time : Text, partySize : Nat, notes : Text) : async () {
    let reservation : ReservationRequest = {
      name;
      email;
      date;
      time;
      partySize;
      notes;
    };
    reservationRequests.add(reservation);
  };

  public query ({ caller }) func getAllReservationRequests() : async [ReservationRequest] {
    reservationRequests.toArray();
  };

  public shared ({ caller }) func seedMenuItems() : async () {
    if (menuItems.size() > 0) { Runtime.trap("Menu is already seeded") };

    ignore await addMenuItem(
      "Truffle Risotto",
      "Creamy arborio rice with black truffles and parmesan cheese.",
      2800,
      #main,
      true,
    );

    ignore await addMenuItem(
      "Pan Seared Scallops",
      "Fresh scallops with a lemon butter sauce and seasonal vegetables.",
      3200,
      #main,
      true,
    );

    ignore await addMenuItem(
      "Lobster Bisque",
      "Rich and creamy soup with lobster chunks and a touch of brandy.",
      1800,
      #starter,
      true,
    );

    ignore await addMenuItem(
      "Chocolate Lava Cake",
      "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
      1500,
      #dessert,
      true,
    );
  };
};
