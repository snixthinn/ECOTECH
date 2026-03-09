import { createHeader } from "./components/layout/Header.js";
import { createSidebar } from "./components/layout/Sidebar.js";
import { initRouter } from "./router/index.js";
import { createHomePage } from "./pages/HomePage.js";
import { createDisposalPage } from "./pages/DisposalPage.js";
import { createRewardsPage } from "./pages/RewardsPage.js";
import { createProfilePage } from "./pages/ProfilePage.js";
import { createAuthPage } from "./pages/AuthPage.js";

const pageFactories = {
  home: createHomePage,
  disposal: createDisposalPage,
  rewards: createRewardsPage,
  profile: createProfilePage,
  auth: createAuthPage,
};

export function initApp(root) {
  root.innerHTML = "";

  const appShell = document.createElement("div");
  appShell.className = "et-app-shell";

  const header = createHeader();
  const sidebar = createSidebar();

  const main = document.createElement("main");
  main.className = "et-main";

  const mainInner = document.createElement("div");
  mainInner.className = "et-main-inner";
  main.appendChild(mainInner);

  appShell.appendChild(sidebar);
  appShell.appendChild(header);
  appShell.appendChild(main);

  root.appendChild(appShell);

  const renderPage = (pageName) => {
    mainInner.innerHTML = "";
    const pageFactory = pageFactories[pageName] || pageFactories.home;
    const pageEl = pageFactory();
    mainInner.appendChild(pageEl);
  };

  initRouter(renderPage);
}
