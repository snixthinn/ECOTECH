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
      <h1 class="et-page-title" style="background: linear-gradient(90deg, var(--et-gray-900), var(--et-green-dark)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hello, Eco Hero 🌱</h1>
      <p class="et-page-subtitle">
        Your daily dashboard for waste tracking and rewards.
      </p>
    </div>
  `;

  const headerActions = document.createElement("div");
  const primary = createButton({
    label: "Start Disposing",
    onClick: () => navigateTo("disposal"),
  });
  primary.classList.add("et-btn-primary");
  headerActions.appendChild(primary);
  header.appendChild(headerActions);

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const reward = getRewardState();

  const summaryBody = document.createElement("div");
  summaryBody.innerHTML = `
    <div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border-radius: 12px; margin-bottom: 20px;">
      <p style="font-size:14px; color: var(--et-green-dark); font-weight: 500; line-height: 1.5;">
        Every item you sort means less in the landfill. Thank you for your continued contribution!
      </p>
    </div>
    <ul class="et-list">
      <li class="et-list-item">
        <span style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">✨</span> 
          <span>Total Points Earned</span>
        </span>
        <span style="font-size: 16px;"><strong>${reward.points}</strong> pts</span>
      </li>
      <li class="et-list-item">
        <span style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">♻️</span> 
          <span>Total Items Recycled</span>
        </span>
        <span style="font-size: 16px;"><strong>${reward.totalItems}</strong> items</span>
      </li>
      <li class="et-list-item">
        <span style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">🏆</span> 
          <span>Current Impact Level</span>
        </span>
        <span style="font-size: 16px; color: var(--et-green); font-weight: 700;">${reward.level}</span>
      </li>
    </ul>
  `;

  const summaryCard = createCard({
    title: "Impact Summary",
    subtitle: "Lifetime contribution statistics.",
    badge: "Live",
    body: summaryBody,
  });

  const progressBody = document.createElement("div");
  const target = 500;

  const progWrapper = document.createElement("div");
  progWrapper.style.padding = "20px 0";
  progWrapper.appendChild(createRewardProgressBar({ current: reward.points, target }));
  progressBody.appendChild(progWrapper);

  const hint = document.createElement("div");
  hint.className = "et-input-help";
  hint.style.padding = "12px";
  hint.style.background = "var(--et-gray-100)";
  hint.style.borderRadius = "8px";
  hint.style.display = "flex";
  hint.style.alignItems = "center";
  hint.style.gap = "8px";
  hint.innerHTML = `<span style="font-size: 16px;">💡</span> <span><strong>Pro Tip:</strong> Clean plastic and metals yield the highest point multipliers.</span>`;
  progressBody.appendChild(hint);

  const progressCard = createCard({
    title: "Journey to Next Tier",
    subtitle: "Unlock exclusive merchant rewards.",
    body: progressBody,
  });

  grid.appendChild(summaryCard);
  grid.appendChild(progressCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
