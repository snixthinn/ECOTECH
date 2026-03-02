import { createCard } from "../components/common/Card.js";
import { getAuthState } from "../context/AuthContext.js";
import { getRewardState } from "../context/RewardContext.js";

export function createProfilePage() {
  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "et-page-header";
  header.innerHTML = `
    <div>
      <h1 class="et-page-title">Profile</h1>
      <p class="et-page-subtitle">
        View your identity and your green action history.
      </p>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const auth = getAuthState();
  const reward = getRewardState();

  const profileBody = document.createElement("div");
  profileBody.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
      <div style="
        width:42px;height:42px;border-radius:999px;
        background:radial-gradient(circle at 30% 20%,#bbf7d0 0,#22c55e 45%,#15803d 100%);
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:700;font-size:18px;
      ">
        ${auth.user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <div style="font-weight:600;">${auth.user.name}</div>
        <div class="et-input-help">${auth.user.email}</div>
      </div>
    </div>
    <ul class="et-list">
      <li class="et-list-item">
        <span>Account status</span>
        <span>${auth.isAuthenticated ? "Active" : "Guest"}</span>
      </li>
      <li class="et-list-item">
        <span>Eco Tech level</span>
        <span>${reward.level}</span>
      </li>
    </ul>
  `;

  const profileCard = createCard({
    title: "User Identity",
    subtitle: "Your Eco Tech account summary.",
    body: profileBody,
  });

  const statsBody = document.createElement("div");
  statsBody.innerHTML = `
    <ul class="et-list">
      <li class="et-list-item">
        <span>Total items disposed</span>
        <span><strong>${reward.totalItems}</strong> items</span>
      </li>
      <li class="et-list-item">
        <span>Total points earned</span>
        <span><strong>${reward.points}</strong> pts</span>
      </li>
    </ul>
    <div class="et-input-help" style="margin-top:8px;">
      This is a summary of your contribution and can be synced with backend data later.
    </div>
  `;

  const statsCard = createCard({
    title: "Green Action Footprint",
    subtitle: "Summary of your recorded contributions.",
    body: statsBody,
  });

  grid.appendChild(profileCard);
  grid.appendChild(statsCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
