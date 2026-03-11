"use client"

import { Copy, MoreHorizontal } from "lucide-react"
import { useState } from "react"

import { ChallengeObjectives } from "@/components/challenges/challenge-objectives"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { ObjectiveInfoSection } from "@/types/challenges"

export type AccountStatusId = 1 | 2 | 3 | 4 | 5

export type AccountMetrics = {
  accountEquity: number
  target: number
  targetPercentage?: number
  dailyStop: number
  dailyStopPercentage?: number
  stopOut: number
  stopOutPercentage?: number
  withdrawableProfit?: number
  initialBalance: number
  elapsedTradingDays: number
  minimumTradingDays: number
  durationDays?: number
}

export type AccountDisplayData = {
  accountId: string
  statusId: AccountStatusId
  isFunded: boolean
  metrics: AccountMetrics
  failReason?: string
}

type AccountDisplayCardProps = AccountDisplayData & {
  objectiveSections: ObjectiveInfoSection[]
  objectiveValues?: Record<string, string>
  isPastChallenge?: boolean
}

type DisplayMetric = {
  key: string
  label: string
  value: string
  toneClassName: string
}

const statusLabelById: Record<AccountStatusId, string> = {
  1: "New",
  2: "Active",
  3: "Failed",
  4: "Payouts unlocked",
  5: "Completed",
}

function statusBadgeClassName(statusId: AccountStatusId) {
  switch (statusId) {
    case 1:
      return "bg-muted text-sm text-foreground"
    case 2:
      return "bg-cyan-100 text-sm text-foreground dark:bg-cyan-900/40"
    case 3:
      return "bg-red-100 text-sm text-foreground dark:bg-red-900/40"
    case 4:
      return "bg-cyan-100 text-sm text-foreground dark:bg-cyan-900/40"
    case 5:
      return "bg-emerald-100 text-sm text-foreground dark:bg-emerald-900/40"
    default:
      return "bg-muted text-sm text-foreground"
  }
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function withOptionalPercent(value: number, percent?: number) {
  void percent
  return formatMoney(value)
}

function baseTone() {
  return "text-foreground"
}

function formatTradingDays(elapsed: number, minimum: number) {
  if (elapsed >= minimum) {
    return `${minimum} of ${minimum}`
  }
  return `${elapsed} of ${minimum}`
}

function formatDateDDMMYYYY(date: Date) {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function calculateNextPayoutDate(elapsed: number, minimum: number) {
  const remainingDays = Math.max(minimum - elapsed, 0)
  const baseDate = new Date()
  baseDate.setHours(0, 0, 0, 0)
  baseDate.setDate(baseDate.getDate() + remainingDays)
  return formatDateDDMMYYYY(baseDate)
}

function getMetricPopoverText(label: string) {
  switch (label) {
    case "Account Equity":
      return "Your current Realized and Unrealized PL."
    case "Challenge Target":
      return "Your Profit target is 10% from the Initial Balance."
    case "Target Equity":
      return "Required Profit to unlock payouts is 3% from the Initial Balance."
    case "Daily Stop":
      return "Daily drawdown is 5% (trailing)."
    case "Stop Out":
      return "Maximum drawdown is 10% from the Initial Balance."
    case "Withdrawable Profit":
      return "The amount available for Payouts."
    case "Trading days":
      return "Completed trading days toward the minimum required number of trading days."
    default:
      return "Additional metric details are not available."
  }
}

function getEquityTone(statusId: AccountStatusId, metrics: AccountMetrics) {
  if (statusId === 3) {
    return "text-[#FB7272]"
  }
  if (statusId === 5) {
    return "text-[#00C887]"
  }
  if (statusId === 2 || statusId === 4) {
    if (metrics.accountEquity > metrics.initialBalance) {
      return "text-[#00C887]"
    }
    if (metrics.accountEquity < metrics.initialBalance) {
      return "text-[#FB7272]"
    }
  }
  return baseTone()
}

function buildVisibleMetrics(data: AccountDisplayData): DisplayMetric[] | null {
  const { statusId, isFunded, metrics } = data

  // Not applicable cases.
  if (!isFunded && statusId === 4) {
    return null
  }
  if (isFunded && statusId === 5) {
    return null
  }

  const targetLabel = isFunded ? "Target Equity" : "Challenge Target"
  const equityTone = getEquityTone(statusId, metrics)
  const dailyStopTone =
    statusId === 3 && metrics.accountEquity <= metrics.dailyStop ? "text-[#FB7272]" : baseTone()
  const stopOutTone =
    statusId === 3 && metrics.accountEquity <= metrics.stopOut ? "text-[#FB7272]" : baseTone()

  const base: DisplayMetric[] = [
    {
      key: "accountEquity",
      label: "Account Equity",
      value: formatMoney(metrics.accountEquity),
      toneClassName: equityTone,
    },
    {
      key: "target",
      label: targetLabel,
      value: withOptionalPercent(metrics.target, metrics.targetPercentage),
      toneClassName: baseTone(),
    },
    {
      key: "dailyStop",
      label: "Daily Stop",
      value: withOptionalPercent(metrics.dailyStop, metrics.dailyStopPercentage),
      toneClassName: dailyStopTone,
    },
    {
      key: "stopOut",
      label: "Stop Out",
      value: withOptionalPercent(metrics.stopOut, metrics.stopOutPercentage),
      toneClassName: stopOutTone,
    },
  ]

  if (!isFunded) {
    const tradingDaysMetric: DisplayMetric = {
      key: "tradingDays",
      label: "Trading days",
      value: formatTradingDays(metrics.elapsedTradingDays, metrics.minimumTradingDays),
      toneClassName: baseTone(),
    }

    if (statusId === 5) {
      return [...base.slice(0, 2), tradingDaysMetric]
    }
    return [...base, tradingDaysMetric]
  }

  // Funded
  if (statusId === 1 || statusId === 3) {
    return base
  }
  if (statusId === 2 || statusId === 4) {
    return [
      ...base,
      {
        key: "withdrawableProfit",
        label: "Withdrawable Profit",
        value: formatMoney(metrics.withdrawableProfit ?? 0),
        toneClassName: baseTone(),
      },
    ]
  }

  return base
}

export function AccountDisplayCard({
  accountId,
  statusId,
  isFunded,
  metrics,
  failReason,
  objectiveSections,
  objectiveValues,
  isPastChallenge = false,
}: AccountDisplayCardProps) {
  const [objectivesOpen, setObjectivesOpen] = useState(false)
  const visibleMetrics = buildVisibleMetrics({ accountId, statusId, isFunded, metrics })
  const showTradeButton = statusId === 1 || statusId === 2 || statusId === 4
  const showNextPayoutLine = isFunded && statusId === 4
  const nextPayoutDate = showNextPayoutLine
    ? calculateNextPayoutDate(metrics.elapsedTradingDays, metrics.minimumTradingDays)
    : ""

  if (!visibleMetrics) {
    return null
  }

  const handleCopyAccountId = async () => {
    if (!window.isSecureContext || !navigator.clipboard?.writeText) {
      return
    }

    await navigator.clipboard.writeText(accountId)
  }

  return (
    <div
      className={`rounded-lg border border-transparent p-4 ${
        isPastChallenge
          ? "bg-muted/55 dark:bg-muted/45"
          : isFunded
            ? "dark:bg-[var(--foreground)]/3 bg-[var(--foreground)]/1"
            : "bg-card"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                isFunded
                  ? "border-transparent bg-[var(--deal)]/15 text-foreground"
                  : "border border-border bg-transparent text-foreground"
              }`}
            >
              {isFunded ? "Funded account" : "Challenge account"}
            </span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 ${statusBadgeClassName(statusId)}`}>
              {statusLabelById[statusId]}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
              <span>Account ID: {accountId}</span>
              <button
                type="button"
                onClick={handleCopyAccountId}
                aria-label="Copy account ID"
                className="inline-flex items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
            </span>
          </div>
          {showNextPayoutLine ? (
            <p className="mt-2 pl-2 text-sm font-semibold text-foreground">
              Next payout: <span className="text-foreground">{nextPayoutDate}</span>
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {showTradeButton ? (
            <Button size="sm" className="bg-[#FFA301] text-sm text-black hover:bg-[#e69500]">
              Trade
            </Button>
          ) : null}
          <Dialog open={objectivesOpen} onOpenChange={setObjectivesOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Account actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6} className="min-w-44">
                <DropdownMenuItem onClick={() => requestAnimationFrame(() => setObjectivesOpen(true))}>
                  Objectives
                </DropdownMenuItem>
                <DropdownMenuItem>View trading log</DropdownMenuItem>
                {isFunded && statusId === 4 ? <DropdownMenuItem>Request payout</DropdownMenuItem> : null}
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="!max-w-[92vw] sm:!max-w-2xl">
              <DialogHeader>
                <DialogTitle className="sr-only">Challenge objectives details</DialogTitle>
                <DialogDescription className="sr-only">
                  Challenge objective details and explanations.
                </DialogDescription>
              </DialogHeader>
              <ChallengeObjectives
                sections={objectiveSections}
                objectiveValues={objectiveValues}
                className="max-h-[60vh] overflow-y-auto pr-2"
              />
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {statusId === 3 && failReason ? (
        <p className="mb-3 pl-2 text-sm font-semibold text-muted-foreground">{failReason}</p>
      ) : null}

      <ul className="flex flex-wrap gap-2">
        {visibleMetrics.map((metric) => (
          <li key={metric.key}>
            <Popover>
              <PopoverTrigger
                aria-label={`${metric.label} details`}
                className={`inline-flex min-w-[9rem] cursor-pointer flex-col items-center justify-center rounded-md border border-border/50 px-3 py-2 text-center transition-colors hover:border-[#FFA301] ${
                  isPastChallenge ? "" : "shadow-sm"
                }`}
              >
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className={`text-sm font-semibold ${metric.toneClassName}`}>{metric.value}</span>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-72 border border-[#FFA301] text-center">
                {getMetricPopoverText(metric.label)}
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  )
}
