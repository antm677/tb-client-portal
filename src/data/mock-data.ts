export type ChallengePlan = {
  balance: number;
  price: number;
};

export type ChallengeAddon = {
  name: string;
  effect: string;
};

export type ChallengeAddonPrice = {
  balance: number;
  targetProfit: number;
  dailyDrawdown: number;
  profitShare: number;
  challengeDuration: number;
};

export const challengePlans: ChallengePlan[] = [
  { balance: 5000, price: 49 },
  { balance: 10000, price: 99 },
  { balance: 25000, price: 199 },
  { balance: 50000, price: 299 },
];

export const challengeAddons: ChallengeAddon[] = [
  { name: "Target profit", effect: "Complete your challenge quicker" },
  { name: "Daily drawdown", effect: "Increas your risk tolerance" },
  { name: "Profit share", effect: "Withdraw more profit" },
  { name: "Challenge duration", effect: "Trade with no rush" },
];

export const challengeAddonPrices: ChallengeAddonPrice[] = [
  {
    balance: 5000,
    targetProfit: 19,
    dailyDrawdown: 24,
    profitShare: 29,
    challengeDuration: 34,
  },
  {
    balance: 10000,
    targetProfit: 29,
    dailyDrawdown: 39,
    profitShare: 49,
    challengeDuration: 59,
  },
  {
    balance: 25000,
    targetProfit: 49,
    dailyDrawdown: 69,
    profitShare: 89,
    challengeDuration: 99,
  },
  {
    balance: 50000,
    targetProfit: 89,
    dailyDrawdown: 119,
    profitShare: 149,
    challengeDuration: 159,
  },
];
