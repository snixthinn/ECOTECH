const DEFAULT_ROUTE = "home";

const routeMap = {
  "": "home",
  "#/": "home",
  "#/home": "home",
  "#/disposal": "disposal",
  "#/rewards": "rewards",
  "#/profile": "profile",
  "#/auth": "auth",
};

function resolveRoute(hash) {
  return routeMap[hash] || DEFAULT_ROUTE;
}

export function navigateTo(routeKey) {
  const hash = routeKey === "home" ? "#/home" : `#/${routeKey}`;
  window.location.hash = hash;
}

export function initRouter(renderPage) {
  const handleChange = () => {
    const current = window.location.hash || "";
    const page = resolveRoute(current);
    renderPage(page);
  };

  window.addEventListener("hashchange", handleChange);
  handleChange();
}
