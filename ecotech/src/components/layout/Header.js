import { navigateTo } from "../../router/index.js";
import { getRewardState, subscribeToPointsChange } from "../../context/RewardContext.js";

export function createHeader() {
  const header = document.createElement("header");
  header.className = "et-header";

  const inner = document.createElement("div");
  inner.className = "et-header-inner";

  const logo = document.createElement("div");
  logo.className = "et-logo";
  logo.innerHTML = `
    <div class="et-logo-mark">E</div>
    <div>
      <div class="et-logo-text-main">Eco Tech</div>
      <div class="et-logo-text-sub">Smart Waste & Rewards</div>
    </div>
  `;

  logo.addEventListener("click", () => navigateTo("home"));

  const actions = document.createElement("div");
  actions.className = "et-header-actions";

  const reward = getRewardState();

  const pointsChip = document.createElement("div");
  pointsChip.className = "et-chip";
  pointsChip.innerHTML = `
    <span class="et-chip-dot"></span>
    <span class="et-points-value">${reward.points} pts</span>
  `;

  subscribeToPointsChange(() => {
    if (pointsChip.isConnected) {
      const el = pointsChip.querySelector(".et-points-value");
      if (el) el.textContent = `${getRewardState().points} pts`;
    }
  });

  const cta = document.createElement("button");
  cta.className = "et-btn et-btn-primary";
  cta.textContent = "Dispose Waste";
  cta.addEventListener("click", () => navigateTo("disposal"));

  actions.appendChild(pointsChip);
  actions.appendChild(cta);

  inner.appendChild(logo);
  inner.appendChild(actions);
  header.appendChild(inner);

  return header;
}
