export function createModal({ title, body, primaryLabel = "OK", onClose }) {
  const backdrop = document.createElement("div");
  backdrop.className = "et-modal-backdrop";

  const modal = document.createElement("div");
  modal.className = "et-modal";

  const header = document.createElement("div");
  header.className = "et-modal-header";
  const titleEl = document.createElement("div");
  titleEl.className = "et-modal-title";
  titleEl.textContent = title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "et-btn et-btn-light";
  closeBtn.textContent = "Close";

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  const bodyEl = document.createElement("div");
  bodyEl.className = "et-modal-body";
  bodyEl.innerHTML = body;

  const footer = document.createElement("div");
  footer.className = "et-modal-footer";
  const primaryBtn = document.createElement("button");
  primaryBtn.className = "et-btn et-btn-primary";
  primaryBtn.textContent = primaryLabel;
  footer.appendChild(primaryBtn);

  modal.appendChild(header);
  modal.appendChild(bodyEl);
  modal.appendChild(footer);
  backdrop.appendChild(modal);

  function close() {
    backdrop.remove();
    if (typeof onClose === "function") onClose();
  }

  closeBtn.addEventListener("click", close);
  primaryBtn.addEventListener("click", close);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  return backdrop;
}
