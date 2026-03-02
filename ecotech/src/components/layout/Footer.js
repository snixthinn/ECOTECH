export function createFooter() {
  const footer = document.createElement("footer");
  footer.style.marginTop = "18px";
  footer.style.fontSize = "11px";
  footer.style.color = "var(--et-gray-500)";
  footer.style.display = "flex";
  footer.style.justifyContent = "space-between";

  footer.innerHTML = `
    <span>&copy; ${new Date().getFullYear()} Eco Tech.</span>
    <span>Every sorted item = real impact for the planet.</span>
  `;

  return footer;
}
