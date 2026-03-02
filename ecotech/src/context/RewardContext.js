const rewardState = {
  points: 120,
  level: "Eco Starter",
  totalItems: 12,
};

const listeners = [];

export function getRewardState() {
  return rewardState;
}

export function subscribeToPointsChange(callback) {
  listeners.push(callback);
  return () => {
    const i = listeners.indexOf(callback);
    if (i >= 0) listeners.splice(i, 1);
  };
}

function notifyListeners() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.warn("RewardContext listener error:", e);
    }
  });
}

export function addRewardPoints(count, pointsPerItem) {
  const added = count * pointsPerItem;
  rewardState.points += added;
  rewardState.totalItems += count;
  if (rewardState.points >= 500) rewardState.level = "Eco Warrior";
  if (rewardState.points >= 1500) rewardState.level = "Eco Guardian";
  notifyListeners();
  return added;
}

export function redeemReward(cost) {
  if (rewardState.points < cost) return false;
  rewardState.points -= cost;
  notifyListeners();
  return true;
}
