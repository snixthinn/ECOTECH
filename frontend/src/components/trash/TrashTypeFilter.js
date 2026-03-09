export function createTrashTypeFilter({ categories, onChange }) {
  const wrapper = document.createElement("div");
  wrapper.className = "et-pill-nav";

  categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.className =
      "et-pill-nav-btn" + (index === 0 ? " et-pill-nav-btn-active" : "");
    btn.textContent = cat.label;
    btn.dataset.key = cat.key;

    btn.addEventListener("click", () => {
      Array.from(wrapper.children).forEach((child) =>
        child.classList.remove("et-pill-nav-btn-active")
      );
      btn.classList.add("et-pill-nav-btn-active");
      if (typeof onChange === "function") onChange(cat);
    });

    wrapper.appendChild(btn);
  });

  return wrapper;
}
