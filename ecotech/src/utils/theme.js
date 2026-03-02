export const theme = {
  brand: {
    green: "#1e9f6e",
    greenSoft: "#e4f6ee",
    greenDark: "#167754",
    greenAccent: "#74d8a2",
    white: "#ffffff",
  },
  gray: {
    100: "#f2f4f7",
    200: "#e4e7ec",
    300: "#d0d5dd",
    500: "#667085",
    700: "#344054",
  },
};

export function applyThemeToDocument() {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--et-green",
    theme.brand.green
  );
}
