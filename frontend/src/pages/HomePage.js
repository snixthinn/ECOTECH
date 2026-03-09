import { createCard } from "../components/common/Card.js";
import { createButton } from "../components/common/Button.js";
import { createRewardProgressBar } from "../components/rewards/RewardProgressBar.js";
import { getRewardState } from "../context/RewardContext.js";
import { navigateTo } from "../router/index.js";

export function createHomePage() {
  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "et-page-header";
  header.innerHTML = `
    <div>
      <h1 class="et-page-title">Hello, Eco Hero 🌱</h1>
      <p class="et-page-subtitle">
        Dispose waste by type, earn points, and redeem rewards.
      </p>
    </div>
  `;

  const headerActions = document.createElement("div");
  const primary = createButton({
    label: "Start Disposing",
    onClick: () => navigateTo("disposal"),
  });
  headerActions.appendChild(primary);
  header.appendChild(headerActions);

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const reward = getRewardState();

  const summaryBody = document.createElement("div");
  summaryBody.innerHTML = `
    <p style="font-size:13px;margin-bottom:10px;">
      Thanks for sorting your waste. Every item you sort means less in the landfill.
    </p>
    <ul class="et-list">
      <li class="et-list-item">
        <span>Total points</span>
        <span><strong>${reward.points}</strong> pts</span>
      </li>
      <li class="et-list-item">
        <span>Total items disposed</span>
        <span><strong>${reward.totalItems}</strong> items</span>
      </li>
      <li class="et-list-item">
        <span>Level</span>
        <span>${reward.level}</span>
      </li>
    </ul>
  `;

  const summaryCard = createCard({
    title: "Green Action Summary",
    subtitle: "Quick view of your contribution.",
    badge: "Live",
    body: summaryBody,
  });

  const progressBody = document.createElement("div");
  const target = 500;
  progressBody.appendChild(
    createRewardProgressBar({ current: reward.points, target })
  );
  const hint = document.createElement("div");
  hint.className = "et-input-help";
  hint.style.marginTop = "8px";
  hint.textContent =
    "Tip: Clean plastic gives the highest points per item.";
  progressBody.appendChild(hint);

  const progressCard = createCard({
    title: "Next Reward",
    subtitle: "Earn enough points to unlock new rewards.",
    body: progressBody,
  });

  grid.appendChild(summaryCard);
  grid.appendChild(progressCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
