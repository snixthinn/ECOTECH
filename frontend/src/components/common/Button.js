export function createButton({ label, variant = "primary", onClick }) {
  const btn = document.createElement("button");
  btn.className = `et-btn ${variant === "ghost" ? "et-btn-ghost" : variant === "light" ? "et-btn-light" : "et-btn-primary"}`;
  btn.textContent = label;
  if (typeof onClick === "function") {
    btn.addEventListener("click", onClick);
  }
  return btn;
}
