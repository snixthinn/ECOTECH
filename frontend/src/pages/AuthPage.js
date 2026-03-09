import { createCard } from "../components/common/Card.js";
import { login } from "../context/AuthContext.js";
import { createModal } from "../components/common/Modal.js";

export function createAuthPage() {
  const container = document.createElement("div");

  const header = document.createElement("div");
  header.className = "et-page-header";
  header.innerHTML = `
    <div>
      <h1 class="et-page-title">Sign In / Register</h1>
      <p class="et-page-subtitle">
        Sign in to save your points progress and disposal history.
      </p>
    </div>
  `;

  const body = document.createElement("div");
  const form = document.createElement("form");

  const nameGroup = document.createElement("div");
  nameGroup.className = "et-input-group";
  const nameLabel = document.createElement("label");
  nameLabel.className = "et-input-label";
  nameLabel.textContent = "Full name";
  const nameInput = document.createElement("input");
  nameInput.className = "et-input-field";
  nameInput.placeholder = "e.g. Jane Eco Hero";
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);

  const emailGroup = document.createElement("div");
  emailGroup.className = "et-input-group";
  const emailLabel = document.createElement("label");
  emailLabel.className = "et-input-label";
  emailLabel.textContent = "Email";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.className = "et-input-field";
  emailInput.placeholder = "you@example.com";
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "et-btn et-btn-primary";
  submitBtn.textContent = "Save Profile";

  const help = document.createElement("div");
  help.className = "et-input-help";
  help.style.marginTop = "8px";
  help.textContent =
    "For this demo, data is stored on the front end only. Backend integration can be added later.";

  form.appendChild(nameGroup);
  form.appendChild(emailGroup);
  form.appendChild(submitBtn);
  form.appendChild(help);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim() || "Eco Hero";
    const email = emailInput.value.trim() || "hero@ecotech.app";
    login(name, email);

    const modal = createModal({
      title: "Profile Saved",
      body: "Your profile has been updated. Start earning more points!",
      primaryLabel: "OK",
    });
    document.body.appendChild(modal);
  });

  body.appendChild(form);

  const card = createCard({
    title: "Manage Your Profile",
    subtitle: "This data will be used to link points to your account.",
    body,
  });

  container.appendChild(header);
  container.appendChild(card);

  return container;
}
