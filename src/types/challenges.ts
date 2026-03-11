export type ChallengePlan = {
  balance: number
  price: number
}

export type ChallengeAddonId =
  | "targetProfit"
  | "dailyDrawdown"
  | "profitShare"
  | "challengeDuration"

export type ChallengeAddon = {
  id: ChallengeAddonId
  name: string
  displayName: string
  summaryLabel: string
  effect: string
}

export type ChallengeAddonPriceEntry = {
  balance: number
  prices: Record<ChallengeAddonId, number>
}

export type ObjectiveInfoSection = {
  subtitle: string
  body: string
}

export type ChallengeObjectiveRow = {
  label: string
  value: string
  showInfo: boolean
}

export type ChallengesUiContent = {
  defaults: {
    selectedBalance: number
    discountPercent: number
    bestChoiceBalance: number
  }
  quiz: {
    text: string
    cta: string
  }
  sections: {
    challenge: {
      title: string
      subtitle: string
    }
    addons: {
      title: string
      subtitle: string
      bundlePrefix: string
    }
    summary: {
      title: string
      subtitle: string
    }
  }
  challengeCard: {
    balanceLabel: string
    paymentLabel: string
    bestChoiceBadge: string
  }
  objectives: {
    title: string
    subtitle: string
    rows: ChallengeObjectiveRow[]
    footer: {
      label: string
      value: string
      showInfo: boolean
    }
    infoDialog: {
      ariaLabel: string
      srTitle: string
      srDescription: string
      sections: ObjectiveInfoSection[]
    }
  }
  summary: {
    challengePrefix: string
    challengeType: string
    accountCurrencyLabel: string
    accountCurrencyValue: string
    accountCurrencyFlagAlt: string
    basePriceLabel: string
    addonBundleLabel: string
    specialDealLabel: string
    totalLabel: string
    checkoutCta: string
  }
}

export type ChallengesDataBundle = {
  plans: ChallengePlan[]
  addons: ChallengeAddon[]
  addonPrices: ChallengeAddonPriceEntry[]
  ui: ChallengesUiContent
}
