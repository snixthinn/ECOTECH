import { post } from "./apiClient.js";

export const TRASH_CATEGORIES = [
  {
    key: "organic",
    label: "Organic",
    description: "Food scraps, leaves, and biodegradable materials.",
    examples: ["Vegetable scraps", "Fruit peels", "Dry leaves"],
    pointsPerItem: 20,
  },
  {
    key: "plastic",
    label: "Plastic",
    description: "Bottles, plastic cups, and clean PET packaging.",
    examples: ["Water bottles", "Plastic cups", "Thick bags"],
    pointsPerItem: 40,
  },
  {
    key: "paper",
    label: "Paper",
    description: "Dry paper, cardboard, and folded boxes.",
    examples: ["Newspapers", "Shipping boxes", "Magazines"],
    pointsPerItem: 25,
  },
];

export function submitDisposal({ categoryKey, count }) {
  return post("/disposal", { categoryKey, count });
}
