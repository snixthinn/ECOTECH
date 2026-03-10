import { createCard } from "../components/common/Card.js";
import { createTrashCategoryCard } from "../components/trash/TrashCategoryCard.js";
import { createTrashTypeFilter } from "../components/trash/TrashTypeFilter.js";
import { TRASH_CATEGORIES, submitDisposal } from "../services/trashService.js";
import { addRewardPoints } from "../context/RewardContext.js";
import { createModal } from "../components/common/Modal.js";
import { createLoader } from "../components/common/Loader.js";

export function createDisposalPage() {
  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "et-page-header";
  header.innerHTML = `
    <div>
      <h1 class="et-page-title">Smart Scanner 🔄</h1>
      <p class="et-page-subtitle">
        Sort your waste to earn points. Select the category and simulate scanning.
      </p>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const formBody = document.createElement("div");

  let selectedCategory = TRASH_CATEGORIES[0];

  // Visual Scanning Area - Premium UI Addition
  const scanArea = document.createElement("div");
  scanArea.innerHTML = `
    <div style="height: 140px; border-radius: 16px; background: rgba(16, 185, 129, 0.05); border: 2px dashed rgba(16, 185, 129, 0.3); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; position: relative; overflow: hidden;" id="et-scan-zone">
      <div id="et-radar" style="position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent); opacity: 0;"></div>
      <div style="text-align: center; z-index: 1;">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">📷</span>
        <span style="font-size: 13px; font-weight: 600; color: var(--et-green-dark);">Ready to Scan</span>
      </div>
    </div>
  `;
  formBody.appendChild(scanArea);

  const filter = createTrashTypeFilter({
    categories: TRASH_CATEGORIES,
    onChange: (cat) => {
      selectedCategory = cat;
      updatePreview();
      
      // Trigger a mini-animation on category change
      const zone = scanArea.querySelector('#et-scan-zone');
      zone.style.transform = 'scale(0.98)';
      setTimeout(() => zone.style.transform = 'scale(1)', 150);
    },
  });

  formBody.appendChild(filter);

  const inputGroup = document.createElement("div");
  inputGroup.className = "et-input-group";
  inputGroup.style.marginTop = "16px";
  const label = document.createElement("label");
  label.className = "et-input-label";
  label.textContent = "Quantity (Items)";
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.step = "1";
  input.placeholder = "e.g. 5";
  input.className = "et-input-field";
  
  const help = document.createElement("div");
  help.className = "et-input-help";
  help.textContent = "Higher quantities yield bonus points multipliers.";

  inputGroup.appendChild(label);
  inputGroup.appendChild(input);
  inputGroup.appendChild(help);

  formBody.appendChild(inputGroup);

  const preview = document.createElement("div");
  preview.className = "et-input-help";
  preview.style.marginTop = "8px";
  preview.style.padding = "12px";
  preview.style.background = "rgba(16, 185, 129, 0.1)";
  preview.style.borderRadius = "8px";
  preview.style.fontWeight = "600";
  preview.style.color = "var(--et-green-dark)";

  function updatePreview() {
    const count = Math.max(0, parseInt(input.value || "0", 10) || 0);
    const pts = count * selectedCategory.pointsPerItem;
    preview.textContent =
      count > 0
        ? `✨ Estimated Reward: +${pts} pts`
        : "Enter quantity to see reward.";
  }

  input.addEventListener("input", updatePreview);
  updatePreview();

  const submitBtn = document.createElement("button");
  submitBtn.className = "et-btn et-btn-primary";
  submitBtn.style.width = "100%";
  submitBtn.style.marginTop = "16px";
  submitBtn.innerHTML = `<span>Scan & Dispose</span>`;

  const status = document.createElement("div");
  status.style.marginTop = "12px";
  status.style.textAlign = "center";
  status.className = "et-input-help";

  submitBtn.addEventListener("click", async () => {
    const count = Math.max(0, parseInt(input.value || "0", 10) || 0);
    if (count <= 0) {
      status.textContent = "Please enter at least 1 item.";
      return;
    }

    submitBtn.disabled = true;
    status.innerHTML = "";
    status.appendChild(createLoader("Scanning..."));

    // Animate the radar
    const radar = scanArea.querySelector('#et-radar');
    radar.style.transition = 'left 1.5s ease-in-out, opacity 0.3s';
    radar.style.opacity = '1';
    radar.style.left = '100%';

    // Simulate network/scanner delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset radar
    radar.style.transition = 'none';
    radar.style.left = '-100%';
    radar.style.opacity = '0';

    await submitDisposal({ categoryKey: selectedCategory.key, count });
    const added = addRewardPoints(count, selectedCategory.pointsPerItem);

    status.innerHTML = "";
    status.textContent = `Success! +${added} points added to your balance.`;
    status.style.color = "var(--et-green-dark)";
    status.style.fontWeight = "700";

    const modal = createModal({
      title: "Waste Accepted ✅",
      body: `You safely disposed of ${count} ${selectedCategory.label.toLowerCase()} items. You earned ${added} points! Keep being an Eco Hero.`,
      primaryLabel: "Awesome",
    });
    document.body.appendChild(modal);

    submitBtn.disabled = false;
    input.value = "";
    updatePreview();
  });

  formBody.appendChild(preview);
  formBody.appendChild(submitBtn);
  formBody.appendChild(status);

  const formCard = createCard({
    title: "Manual Entry Simulator",
    subtitle: "Input waste manually if auto-detection fails.",
    body: formBody,
  });

  const infoBody = document.createElement("div");
  infoBody.className = "et-grid";
  infoBody.style.gap = "12px";

  TRASH_CATEGORIES.forEach((cat) => {
    infoBody.appendChild(createTrashCategoryCard(cat));
  });

  const infoCard = createCard({
    title: "Supported Waste Types",
    subtitle: "Earn different point values based on material value.",
    body: infoBody,
  });

  grid.appendChild(formCard);
  grid.appendChild(infoCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
