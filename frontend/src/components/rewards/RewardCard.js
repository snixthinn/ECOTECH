import { getRewardState, redeemReward } from "../../context/RewardContext.js";
import { createModal } from "../common/Modal.js";

export function createRewardCard(reward, { currentPoints, onRedeemed } = {}) {
  const card = document.createElement("div");
  card.className = "et-card";

  const header = document.createElement("div");
  header.className = "et-card-header";

  const titleBox = document.createElement("div");
  const title = document.createElement("div");
  title.className = "et-card-title";
  title.textContent = reward.title;
  const subtitle = document.createElement("div");
  subtitle.className = "et-card-subtitle";
  subtitle.textContent = reward.provider;
  titleBox.appendChild(title);
  titleBox.appendChild(subtitle);

  const badge = document.createElement("div");
  badge.className = "et-card-badge";
  badge.textContent = `${reward.cost} pts`;

  header.appendChild(titleBox);
  header.appendChild(badge);

  const body = document.createElement("div");
  body.innerHTML = `
    <p style="font-size:13px;margin-bottom:8px;">${reward.description}</p>
    <div class="et-input-help">Valid until ${reward.validUntil}</div>
  `;

  const points = currentPoints ?? getRewardState().points;
  const canRedeem = points >= reward.cost;

  const redeemBtn = document.createElement("button");
  redeemBtn.className = "et-btn " + (canRedeem ? "et-btn-primary" : "et-btn-light");
  redeemBtn.textContent = "Redeem";
  redeemBtn.disabled = !canRedeem;
  redeemBtn.style.marginTop = "10px";

  redeemBtn.addEventListener("click", () => {
    if (!redeemReward(reward.cost)) return;
    document.body.appendChild(
      createModal({
        title: "Reward Redeemed!",
        body: `You have redeemed <strong>${reward.title}</strong>. Redemption code or instructions will be sent to your email.`,
        primaryLabel: "Done",
      })
    );
    if (typeof onRedeemed === "function") onRedeemed();
  });

  body.appendChild(redeemBtn);

  card.appendChild(header);
  card.appendChild(body);

  return card;
}
