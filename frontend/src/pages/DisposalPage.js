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
      <h1 class="et-page-title">Dispose Waste</h1>
      <p class="et-page-subtitle">
        Choose waste type, enter the number of items, and see the points you earn.
      </p>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "et-grid et-grid-2";

  const formBody = document.createElement("div");

  let selectedCategory = TRASH_CATEGORIES[0];

  const filter = createTrashTypeFilter({
    categories: TRASH_CATEGORIES,
    onChange: (cat) => {
      selectedCategory = cat;
      updatePreview();
    },
  });

  formBody.appendChild(filter);

  const inputGroup = document.createElement("div");
  inputGroup.className = "et-input-group";
  const label = document.createElement("label");
  label.className = "et-input-label";
  label.textContent = "Number of items";
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.step = "1";
  input.placeholder = "e.g. 5";
  input.className = "et-input-field";
  const help = document.createElement("div");
  help.className = "et-input-help";
  help.textContent =
    "Ensure items are clean and dry to maximize recycling value.";

  inputGroup.appendChild(label);
  inputGroup.appendChild(input);
  inputGroup.appendChild(help);

  formBody.appendChild(inputGroup);

  const preview = document.createElement("div");
  preview.className = "et-input-help";
  preview.style.marginTop = "4px";

  function updatePreview() {
    const count = Math.max(0, parseInt(input.value || "0", 10) || 0);
    const pts = count * selectedCategory.pointsPerItem;
    preview.textContent =
      count > 0
        ? `Estimated points: ~${pts} pts for ${count} ${selectedCategory.label.toLowerCase()} item(s).`
        : "Enter quantity to see estimated points.";
  }

  input.addEventListener("input", updatePreview);
  updatePreview();

  const submitBtn = document.createElement("button");
  submitBtn.className = "et-btn et-btn-primary";
  submitBtn.textContent = "Confirm Disposal";

  const status = document.createElement("div");
  status.style.marginTop = "8px";
  status.className = "et-input-help";

  submitBtn.addEventListener("click", async () => {
    const count = Math.max(0, parseInt(input.value || "0", 10) || 0);
    if (count <= 0) {
      status.textContent = "Please enter at least 1 item.";
      return;
    }

    submitBtn.disabled = true;
    status.innerHTML = "";
    status.appendChild(createLoader("Submitting..."));

    await submitDisposal({ categoryKey: selectedCategory.key, count });
    const added = addRewardPoints(count, selectedCategory.pointsPerItem);

    status.innerHTML = "";
    status.textContent = `Success! You earned ${added} new points.`;

    const modal = createModal({
      title: "Thank you!",
      body: `You just kept ${selectedCategory.label.toLowerCase()} waste out of the landfill. Keep up the good habit.`,
      primaryLabel: "Continue",
    });
    document.body.appendChild(modal);

    submitBtn.disabled = false;
  });

  formBody.appendChild(preview);
  formBody.appendChild(submitBtn);
  formBody.appendChild(status);

  const formCard = createCard({
    title: "Disposal Details",
    subtitle: "Record each sorted item you dispose.",
    body: formBody,
  });

  const infoBody = document.createElement("div");
  infoBody.className = "et-grid";
  infoBody.style.gap = "10px";

  TRASH_CATEGORIES.forEach((cat) => {
    infoBody.appendChild(createTrashCategoryCard(cat));
  });

  const infoCard = createCard({
    title: "Supported Waste Types",
    subtitle: "From organic to recyclable plastic.",
    body: infoBody,
  });

  grid.appendChild(formCard);
  grid.appendChild(infoCard);

  container.appendChild(header);
  container.appendChild(grid);

  return container;
}
