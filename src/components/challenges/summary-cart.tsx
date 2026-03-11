"use client"

import Image from "next/image"
import { ReceiptText, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionTitle } from "@/components/challenges/section-title"
import type { ChallengesUiContent } from "@/types/challenges"

type CartItem = {
  label: string
  amountFormatted: string
  deal?: boolean
}

type SummaryCartProps = {
  title: ChallengesUiContent["sections"]["summary"]
  summaryText: ChallengesUiContent["summary"]
  selectedBalanceFormatted: string
  challengeType: string
  cartItems: CartItem[]
  basePriceFormatted: string
  discountAmountFormatted: string
  totalFormatted: string
  discountedTotalFormatted: string
  hasSpecialDeal: boolean
  disabled?: boolean
}

export function SummaryCart({
  title,
  summaryText,
  selectedBalanceFormatted,
  challengeType,
  cartItems,
  basePriceFormatted,
  discountAmountFormatted,
  totalFormatted,
  discountedTotalFormatted,
  hasSpecialDeal,
  disabled,
}: SummaryCartProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3 py-1 pb-2">
        <SectionTitle
          icon={<ReceiptText className="h-5 w-5 text-white" />}
          title={title.title}
          subtitle={title.subtitle}
        />
      </div>

      <Card className="mb-1 flex-1 rounded-lg p-2 shadow-xs">
        <CardContent className="space-y-3 pt-2">
          <ul className="space-y-1">
            <li className="flex items-center gap-2 text-sm leading-tight">
              <Rocket className="h-5 w-5 shrink-0 text-[var(--deal)]" />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--muted-foreground)]">
                    {summaryText.challengePrefix} {selectedBalanceFormatted}
                  </span>
                  <span className="font-semibold text-black dark:text-[var(--foreground)]">{challengeType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--muted-foreground)]">{summaryText.accountCurrencyLabel}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-black dark:text-[var(--foreground)]">
                    <Image
                      src="/usd-flag.svg"
                      alt={summaryText.accountCurrencyFlagAlt}
                      width={16}
                      height={16}
                      className="rounded-full object-cover"
                    />
                    <span>{summaryText.accountCurrencyValue}</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>

          <div className="border-t border-[var(--border)]" />

          <ul className="space-y-2">
            <li className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[var(--muted-foreground)]">{summaryText.basePriceLabel}</span>
              <span className="font-semibold text-black dark:text-[var(--foreground)]">{basePriceFormatted}</span>
            </li>

            {cartItems.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className={`font-semibold ${item.deal ? "text-[var(--deal)]" : "text-[var(--muted-foreground)]"}`}>{item.label}</span>
                <span className={`font-semibold ${item.deal ? "text-[var(--deal)]" : "text-black"}`}>{item.amountFormatted}</span>
              </li>
            ))}

            {hasSpecialDeal ? (
              <li className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[var(--deal)]">{summaryText.specialDealLabel}</span>
                <span className="font-semibold text-[var(--deal)]">-{discountAmountFormatted}</span>
              </li>
            ) : null}
          </ul>

          <div className="border-t border-[var(--border)] pt-3">
            <p className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[var(--muted-foreground)]">{summaryText.totalLabel}</span>
              <span className="flex flex-col items-end leading-tight">
                {hasSpecialDeal ? <span className="text-xs text-[var(--muted-foreground)] line-through">{totalFormatted}</span> : null}
                <span className="text-xl font-semibold text-black dark:text-[var(--foreground)]">{discountedTotalFormatted}</span>
              </span>
            </p>
          </div>

          <Button
            className="h-9 w-full rounded-xl border-0 bg-[#FFA301] text-white shadow-none hover:bg-[#e69500] hover:text-white active:bg-[#e69500] active:text-white dark:bg-[#FFA301] dark:text-white dark:hover:bg-[#e69500] dark:hover:text-white"
            disabled={disabled}
          >
            {summaryText.checkoutCta}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
