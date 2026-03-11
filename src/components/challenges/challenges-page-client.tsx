"use client"

import { useState } from "react"
import { Flag, Puzzle } from "lucide-react"

import { NeedHelpPanel } from "@/components/need-help-panel"
import { QuizSection } from "@/components/challenges/quiz-section"
import { SectionTitle } from "@/components/challenges/section-title"
import { ObjectivesSection } from "@/components/challenges/objectives-section"
import { ChallengeCard } from "@/components/challenges/challenge-card"
import { AddonCard } from "@/components/challenges/addon-card"
import { SummaryCart } from "@/components/challenges/summary-cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  ChallengeAddon,
  ChallengeAddonId,
  ChallengeAddonPriceEntry,
  ChallengePlan,
  ChallengesUiContent,
} from "@/types/challenges"
import { TopBanner } from "../top-banner"

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const usdPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

type ChallengesPageClientProps = {
  plans: ChallengePlan[]
  addons: ChallengeAddon[]
  addonPrices: ChallengeAddonPriceEntry[]
  ui: ChallengesUiContent
}

type CartItem = {
  label: string
  amount: number
  deal?: boolean
}

export function ChallengesPageClient({ plans, addons, addonPrices, ui }: ChallengesPageClientProps) {
  const [selectedChallengeBalance, setSelectedChallengeBalance] = useState<number | null>(
    plans.find((plan) => plan.balance === ui.defaults.selectedBalance)?.balance ?? plans[0]?.balance ?? null
  )
  const [selectedAddons, setSelectedAddons] = useState<ChallengeAddonId[]>([])

  const selectedChallenge = plans.find((plan) => plan.balance === selectedChallengeBalance) ?? null
  const selectedAddonPricing = addonPrices.find((entry) => entry.balance === selectedChallengeBalance) ?? null
  const allAddonsSelected = selectedAddons.length === addons.length

  const selectedAddonPriceById = selectedAddonPricing?.prices

  const addonBundlePrice = selectedChallenge?.price ?? 0

  const cartItems: CartItem[] = allAddonsSelected
    ? [{ label: ui.summary.addonBundleLabel, amount: addonBundlePrice, deal: true }]
    : addons
      .filter((addon) => selectedAddons.includes(addon.id))
      .map((addon) => ({
        label: addon.summaryLabel,
        amount: selectedAddonPriceById?.[addon.id] ?? 0,
      }))

  const basePrice = selectedChallenge?.price ?? 0
  const itemsTotal = cartItems.reduce((sum, item) => sum + item.amount, 0)
  const totalPrice = basePrice + itemsTotal
  const hasSpecialDeal = (selectedChallenge?.balance ?? 0) === ui.defaults.bestChoiceBalance
  const discountAmount = hasSpecialDeal ? totalPrice * (ui.defaults.discountPercent / 100) : 0
  const discountedTotal = hasSpecialDeal ? totalPrice - discountAmount : totalPrice

  function toggleAddon(addonId: ChallengeAddonId) {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-6 overflow-y-auto">
      <TopBanner />
      <div className="grid gap-8 xl:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6 p-0">
          <Card className="border-0 bg-transparent py-1 shadow-none ring-0">
            <CardHeader className="px-0 pb-2">
              <CardTitle className="text-inherit">
                <SectionTitle
                  icon={<Flag className="h-5 w-5" />}
                  title={ui.sections.challenge.title}
                  subtitle={ui.sections.challenge.subtitle}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-0 pb-0">
              <ObjectivesSection objectives={ui.objectives} />

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {plans.map((plan) => {
                  const isActive = plan.balance === selectedChallengeBalance
                  const isBestChoice = plan.balance === ui.defaults.bestChoiceBalance
                  const originalPrice = isBestChoice ? plan.price : undefined
                  const discountedPrice = isBestChoice ? plan.price * 0.9 : plan.price

                  return (
                    <ChallengeCard
                      key={plan.balance}
                      balanceLabel={ui.challengeCard.balanceLabel}
                      paymentLabel={ui.challengeCard.paymentLabel}
                      badgeText={ui.challengeCard.bestChoiceBadge}
                      balanceFormatted={usd.format(plan.balance)}
                      priceFormatted={usdPrecise.format(discountedPrice)}
                      originalPriceFormatted={originalPrice ? usdPrecise.format(originalPrice) : undefined}
                      isActive={isActive}
                      isBestChoice={isBestChoice}
                      onSelect={() => setSelectedChallengeBalance(plan.balance)}
                    />
                  )
                })}
              </div>

              <div className="mt-12 space-y-3">
                <SectionTitle
                  icon={<Puzzle className="h-5 w-5" />}
                  title={ui.sections.addons.title}
                  subtitle={ui.sections.addons.subtitle}
                  inlineExtra
                  extra={
                    <span className="inline-flex items-center rounded-full bg-[var(--deal)]/15 px-2 py-0.5 text-xs font-semibold text-black dark:text-[var(--foreground)]">
                      {ui.sections.addons.bundlePrefix} {usdPrecise.format(addonBundlePrice)}
                    </span>
                  }
                />

                <div className="grid gap-2.5 md:grid-cols-2">
                  {addons.map((addon) => {
                    const checked = selectedAddons.includes(addon.id)
                    const addonPrice = selectedAddonPriceById?.[addon.id] ?? 0

                    return (
                      <AddonCard
                        key={addon.id}
                        title={addon.displayName}
                        effect={addon.effect}
                        checked={checked}
                        disabled={!selectedChallenge}
                        priceFormatted={usdPrecise.format(addonPrice)}
                        onToggle={() => toggleAddon(addon.id)}
                      />
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SummaryCart
          title={ui.sections.summary}
          summaryText={ui.summary}
          selectedBalanceFormatted={usd.format(selectedChallenge?.balance ?? 0)}
          challengeType={ui.summary.challengeType}
          basePriceFormatted={usdPrecise.format(basePrice)}
          cartItems={cartItems.map((item) => ({
            label: item.label,
            amountFormatted: usdPrecise.format(item.amount),
            deal: item.deal,
          }))}
          discountAmountFormatted={usdPrecise.format(discountAmount)}
          totalFormatted={usdPrecise.format(totalPrice)}
          discountedTotalFormatted={usdPrecise.format(discountedTotal)}
          hasSpecialDeal={hasSpecialDeal}
          disabled={!selectedChallenge}
        />
      </div>

      <NeedHelpPanel />
    </div>
  )
}
