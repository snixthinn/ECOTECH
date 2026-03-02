import { createCard } from "../components/common/Card.js";
import { createRewardCard } from "../components/rewards/RewardCard.js";
import { fetchRewards } from "../services/rewardService.js";
import { createLoader } from "../components/common/Loader.js";
import { getRewardState, subscribeToPointsChange } from "../context/RewardContext.js";

export function createRewardsPage() {
  const container = document.createElement("div");

  const reward = getRewardState();

  const header = document.createElement("div");
  header.className = "et-page-header";
  header.innerHTML = `
    <div>
      <h1 class="et-page-title">Rewards</h1>
      <p class="et-page-subtitle">
        Redeem the points you've collected for rewards of your choice.
      </p>
    </div>
    <div class="et-badge-pill et-badge-success">
      <span>Points available: <strong class="et-rewards-points">${reward.points}</strong></span>
    </div>
  `;

  subscribeToPointsChange(() => {
    const el = container.querySelector(".et-rewards-points");
    if (el && el.isConnected) el.textContent = getRewardState().points;
  });

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const listBody = document.createElement("div");
  const loader = createLoader("Loading rewards...");
  listBody.appendChild(loader);

  function renderRewards(rewards) {
    listBody.innerHTML = "";
    const pts = getRewardState().points;
    rewards.forEach((r) =>
      listBody.appendChild(
        createRewardCard(r, {
          currentPoints: pts,
          onRedeemed: () => renderRewards(rewards),
        })
      )
    );
  }

  fetchRewards().then((rewards) => {
    renderRewards(rewards);
  });

  const listCard = createCard({
    title: "Reward List",
    subtitle: "Choose the reward that interests you most.",
    body: listBody,
  });

  const tipsBody = document.createElement("div");
  tipsBody.innerHTML = `
    <ul class="et-list">
      <li class="et-list-item">
        <span>1 clean plastic item</span>
        <span>~40 pts</span>
      </li>
      <li class="et-list-item">
        <span>1 dry paper item</span>
        <span>~25 pts</span>
      </li>
      <li class="et-list-item">
        <span>1 organic item</span>
        <span>~20 pts</span>
      </li>
    </ul>
    <div class="et-input-help" style="margin-top:8px;">
      The more consistently you sort waste, the faster points add up.
      Focus on high-value items like clean plastic and dry paper.
    </div>
  `;

  const tipsCard = createCard({
    title: "How to Maximize Points?",
    subtitle: "Simple strategies for daily action.",
    body: tipsBody,
  });

  grid.appendChild(listCard);
  grid.appendChild(tipsCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
