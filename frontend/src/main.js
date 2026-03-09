import './styles/base/reset.css'
import './styles/base/variables.css'
import './styles/layout.css'
import './styles/components.css'
import { initApp } from "./app.js";
import { applyThemeToDocument } from "./utils/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  applyThemeToDocument();
  const root = document.getElementById("app");
  if (!root) {
    // Fallback: create root if missing
    const el = document.createElement("div");
    el.id = "app";
    document.body.appendChild(el);
    initApp(el);
  } else {
    initApp(root);
  }
});

