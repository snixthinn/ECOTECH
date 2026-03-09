export function createRewardProgressBar({ current, target }) {
  const container = document.createElement("div");

  const label = document.createElement("div");
  label.style.display = "flex";
  label.style.justifyContent = "space-between";
  label.style.fontSize = "12px";
  label.style.marginBottom = "4px";
  label.innerHTML = `
    <span>Points progress</span>
    <span>${current} / ${target}</span>
  `;

  const track = document.createElement("div");
  track.className = "et-progress-track";

  const fill = document.createElement("div");
  fill.className = "et-progress-fill";

  const pct = Math.max(0, Math.min(100, (current / target) * 100));
  fill.style.width = `${pct}%`;

  track.appendChild(fill);
  container.appendChild(label);
  container.appendChild(track);

  return container;
}
