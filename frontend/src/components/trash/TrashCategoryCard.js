export function createTrashCategoryCard(category) {
  const card = document.createElement("div");
  card.className = "et-card";

  const header = document.createElement("div");
  header.className = "et-card-header";

  const titleBox = document.createElement("div");
  const title = document.createElement("div");
  title.className = "et-card-title";
  title.textContent = category.label;
  const subtitle = document.createElement("div");
  subtitle.className = "et-card-subtitle";
  subtitle.textContent = category.description;
  titleBox.appendChild(title);
  titleBox.appendChild(subtitle);

  const badge = document.createElement("div");
  badge.className = "et-card-badge";
  badge.textContent = `${category.pointsPerItem} pts/item`;

  header.appendChild(titleBox);
  header.appendChild(badge);

  const body = document.createElement("div");
  body.innerHTML = `
    <div class="et-input-help">
      Examples: ${category.examples.join(", ")}
    </div>
  `;

  card.appendChild(header);
  card.appendChild(body);

  return card;
}
