const DEFAULT_MENU = {
  "ICED COFFEE": [
    { title: "Salted Caramel", price12oz: 80, price16oz: 105, image: "/products/iced-coffee/salted-caramel.jpg" },
  ],
  "NON-COFFEE (ICED)": [],
  "HOT COFFEE": [],
  "RICE MEALS": [],
  "BURGERS": [],
  "DESSERTS": [],
};

export function getMenu() {
  const data = localStorage.getItem("menuData");
  if (!data) {
    localStorage.setItem("menuData", JSON.stringify(DEFAULT_MENU));
    return DEFAULT_MENU;
  }
  return JSON.parse(data);
}

export function saveMenu(menu) {
  localStorage.setItem("menuData", JSON.stringify(menu));
}
