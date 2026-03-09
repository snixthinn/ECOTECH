import { get } from "./apiClient.js";

export const MOCK_REWARDS = [
  {
    id: 0,
    title: "Eco Tech Sticker",
    provider: "Eco Tech",
    description: "Exclusive sticker to support the green movement.",
    cost: 50,
    validUntil: "Dec 31, 2027",
  },
  {
    id: 1,
    title: "Green Shopping Voucher $25",
    provider: "Eco Mart",
    description: "Discount on eco-friendly products.",
    cost: 250,
    validUntil: "Dec 31, 2026",
  },
  {
    id: 2,
    title: "Mango Tree Sapling",
    provider: "Green Nursery",
    description: "Sapling to plant at home or in the community.",
    cost: 400,
    validUntil: "Jun 30, 2026",
  },
  {
    id: 3,
    title: "Environmental Education 1-Month Access",
    provider: "Eco Academy",
    description: "Access to online classes on low-waste living.",
    cost: 600,
    validUntil: "Mar 31, 2027",
  },
];

export function fetchRewards() {
  return get("/rewards").then(() => MOCK_REWARDS);
}
