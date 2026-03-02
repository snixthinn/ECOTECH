import { navigateTo } from "../../router/index.js";

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "disposal", label: "Dispose Waste" },
  { key: "rewards", label: "Rewards" },
  { key: "profile", label: "Profile" },
];

export function createSidebar() {
  const container = document.createElement("aside");
  container.className = "et-sidebar";

  const inner = document.createElement("div");
  inner.className = "et-sidebar-inner";

  const nav = document.createElement("nav");
  nav.className = "et-sidebar-nav";

  const sectionTitle = document.createElement("div");
  sectionTitle.className = "et-sidebar-section-title";
  sectionTitle.textContent = "Navigation";

  nav.appendChild(sectionTitle);

  NAV_ITEMS.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "et-btn et-btn-light";
    btn.style.justifyContent = "flex-start";
    btn.style.width = "100%";
    btn.textContent = item.label;
    btn.addEventListener("click", () => navigateTo(item.key));
    nav.appendChild(btn);
  });

  inner.appendChild(nav);

  const footer = document.createElement("div");
  footer.className = "et-sidebar-footer";
  footer.innerHTML = `
    Eco Tech helps you sort waste and turn green actions into reward points.
  `;

  inner.appendChild(footer);
  container.appendChild(inner);

  return container;
}
