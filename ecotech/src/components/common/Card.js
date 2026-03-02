export function createCard({ title, subtitle, badge, body }) {
  const card = document.createElement("section");
  card.className = "et-card";

  if (title || subtitle || badge) {
    const header = document.createElement("div");
    header.className = "et-card-header";

    const titleBox = document.createElement("div");
    if (title) {
      const titleEl = document.createElement("div");
      titleEl.className = "et-card-title";
      titleEl.textContent = title;
      titleBox.appendChild(titleEl);
    }
    if (subtitle) {
      const subEl = document.createElement("div");
      subEl.className = "et-card-subtitle";
      subEl.textContent = subtitle;
      titleBox.appendChild(subEl);
    }

    header.appendChild(titleBox);

    if (badge) {
      const badgeEl = document.createElement("div");
      badgeEl.className = "et-card-badge";
      badgeEl.textContent = badge;
      header.appendChild(badgeEl);
    }

    card.appendChild(header);
  }

  if (body instanceof HTMLElement) {
    card.appendChild(body);
  } else if (typeof body === "string") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = body;
    card.appendChild(wrapper);
  }

  return card;
}
