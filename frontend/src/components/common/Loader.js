export function createLoader(label = "Memproses") {
  const wrapper = document.createElement("div");
  wrapper.className = "et-loader";

  const dot1 = document.createElement("span");
  const dot2 = document.createElement("span");
  const dot3 = document.createElement("span");
  dot1.className = "et-loader-dot";
  dot2.className = "et-loader-dot";
  dot3.className = "et-loader-dot";

  const text = document.createElement("span");
  text.textContent = label;

  wrapper.appendChild(dot1);
  wrapper.appendChild(dot2);
  wrapper.appendChild(dot3);
  wrapper.appendChild(text);

  return wrapper;
}
