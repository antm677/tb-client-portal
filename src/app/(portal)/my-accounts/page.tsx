"use client"

import { RefreshCw, Rocket, WalletCards } from "lucide-react"
import { Fustat } from "next/font/google"
import challengeUi from "../../../../content/challenges/challenge-ui.json"

import { SectionTitle } from "@/components/challenges/section-title"
import {
  AccountDisplayCard,
  type AccountDisplayData,
} from "@/components/my-accounts/account-display-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopBanner } from "@/components/top-banner"

const fustat = Fustat({ subsets: ["latin"], weight: ["600"] })

type ChallengeGroup = {
  challengeId: string
  initialBalance: number
  createdAt: string
  challengeAccounts: AccountDisplayData[]
  fundedAccount: AccountDisplayData | null
  showFundedPlaceholder?: boolean
}

const objectiveSections = challengeUi.objectives.infoDialog.sections
const objectiveValues: Record<string, string> = {
  "Target Profit":
    challengeUi.objectives.rows.find((row) => row.label.toLowerCase().startsWith("target profit"))?.value ?? "",
  "Daily Drawdown":
    challengeUi.objectives.rows.find((row) => row.label.toLowerCase().startsWith("daily drawdown"))?.value ?? "",
  "Max Drawdown":
    challengeUi.objectives.rows.find((row) => row.label.toLowerCase().startsWith("max drawdown"))?.value ?? "",
  "Minimum trading days":
    challengeUi.objectives.rows.find((row) => row.label.toLowerCase().startsWith("minimum trading days"))?.value ?? "",
  "Challenge duration":
    challengeUi.objectives.rows.find((row) => row.label.toLowerCase().startsWith("challenge duration"))?.value ?? "",
  "Profit share": challengeUi.objectives.footer.value,
}

function buildFailReason(accountEquity: number, dailyStop: number, stopOut: number) {
  if (accountEquity <= stopOut) {
    return "Failed due to equity reaching the Stop Out."
  }
  if (accountEquity <= dailyStop) {
    return "Failed due to equity reaching the Daily Stop."
  }
  return undefined
}

const challengeGroups: ChallengeGroup[] = [
  {
    challengeId: "CH-5000-A",
    initialBalance: 5000,
    createdAt: "10/03/2026 09:16",
    challengeAccounts: [
      {
        accountId: "51010001",
        isFunded: false,
        statusId: 1,
        metrics: {
          accountEquity: 5000,
          target: 5500,
          targetPercentage: 10,
          dailyStop: 4750,
          dailyStopPercentage: 5,
          stopOut: 4500,
          stopOutPercentage: 10,
          initialBalance: 5000,
          elapsedTradingDays: 1,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: null,
    showFundedPlaceholder: true,
  },
  {
    challengeId: "CH-10000-B",
    initialBalance: 10000,
    createdAt: "08/03/2026 14:25",
    challengeAccounts: [
      {
        accountId: "51020001",
        isFunded: false,
        statusId: 2,
        metrics: {
          accountEquity: 10380,
          target: 11000,
          targetPercentage: 10,
          dailyStop: 9500,
          dailyStopPercentage: 5,
          stopOut: 9000,
          stopOutPercentage: 10,
          initialBalance: 10000,
          elapsedTradingDays: 3,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: null,
    showFundedPlaceholder: true,
  },
  {
    challengeId: "CH-25000-C",
    initialBalance: 25000,
    createdAt: "05/03/2026 12:42",
    challengeAccounts: [
      {
        accountId: "51030001",
        isFunded: false,
        statusId: 3,
        failReason: buildFailReason(22400, 22350, 22500),
        metrics: {
          accountEquity: 22400,
          target: 27500,
          targetPercentage: 10,
          dailyStop: 22350,
          dailyStopPercentage: 5,
          stopOut: 22500,
          stopOutPercentage: 10,
          initialBalance: 25000,
          elapsedTradingDays: 5,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: null,
  },
  {
    challengeId: "CH-50000-D",
    initialBalance: 50000,
    createdAt: "02/03/2026 10:08",
    challengeAccounts: [
      {
        accountId: "51040001",
        isFunded: false,
        statusId: 5,
        metrics: {
          accountEquity: 55720,
          target: 55000,
          targetPercentage: 10,
          dailyStop: 47500,
          dailyStopPercentage: 5,
          stopOut: 45000,
          stopOutPercentage: 10,
          initialBalance: 50000,
          elapsedTradingDays: 2,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: {
      accountId: "91040001",
      isFunded: true,
      statusId: 1,
      metrics: {
        accountEquity: 50000,
        target: 55000,
        targetPercentage: 10,
        dailyStop: 47500,
        dailyStopPercentage: 5,
        stopOut: 45000,
        stopOutPercentage: 10,
        withdrawableProfit: 0,
        initialBalance: 50000,
        elapsedTradingDays: 4,
        minimumTradingDays: 4,
      },
    },
  },
  {
    challengeId: "CH-5000-E",
    initialBalance: 5000,
    createdAt: "01/03/2026 11:43",
    challengeAccounts: [
      {
        accountId: "51050001",
        isFunded: false,
        statusId: 5,
        metrics: {
          accountEquity: 5610,
          target: 5500,
          targetPercentage: 10,
          dailyStop: 4750,
          dailyStopPercentage: 5,
          stopOut: 4500,
          stopOutPercentage: 10,
          initialBalance: 5000,
          elapsedTradingDays: 4,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: {
      accountId: "91050001",
      isFunded: true,
      statusId: 2,
      metrics: {
        accountEquity: 5425,
        target: 5500,
        targetPercentage: 10,
        dailyStop: 4750,
        dailyStopPercentage: 5,
        stopOut: 4500,
        stopOutPercentage: 10,
        withdrawableProfit: 425,
        initialBalance: 5000,
        elapsedTradingDays: 6,
        minimumTradingDays: 4,
      },
    },
  },
  {
    challengeId: "CH-10000-F",
    initialBalance: 10000,
    createdAt: "28/02/2026 16:22",
    challengeAccounts: [
      {
        accountId: "51060001",
        isFunded: false,
        statusId: 5,
        metrics: {
          accountEquity: 11210,
          target: 11000,
          targetPercentage: 10,
          dailyStop: 9500,
          dailyStopPercentage: 5,
          stopOut: 9000,
          stopOutPercentage: 10,
          initialBalance: 10000,
          elapsedTradingDays: 5,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: {
      accountId: "91060001",
      isFunded: true,
      statusId: 3,
      failReason: buildFailReason(9410, 9500, 9000),
      metrics: {
        accountEquity: 9410,
        target: 11000,
        targetPercentage: 10,
        dailyStop: 9500,
        dailyStopPercentage: 5,
        stopOut: 9000,
        stopOutPercentage: 10,
        withdrawableProfit: 0,
        initialBalance: 10000,
        elapsedTradingDays: 2,
        minimumTradingDays: 4,
      },
    },
  },
  {
    challengeId: "CH-25000-G",
    initialBalance: 25000,
    createdAt: "27/02/2026 08:11",
    challengeAccounts: [
      {
        accountId: "51070001",
        isFunded: false,
        statusId: 5,
        metrics: {
          accountEquity: 27890,
          target: 27500,
          targetPercentage: 10,
          dailyStop: 23750,
          dailyStopPercentage: 5,
          stopOut: 22500,
          stopOutPercentage: 10,
          initialBalance: 25000,
          elapsedTradingDays: 6,
          minimumTradingDays: 4,
          durationDays: 7,
        },
      },
    ],
    fundedAccount: {
      accountId: "91070001",
      isFunded: true,
      statusId: 4,
      metrics: {
        accountEquity: 28740,
        target: 27500,
        targetPercentage: 10,
        dailyStop: 23750,
        dailyStopPercentage: 5,
        stopOut: 22500,
        stopOutPercentage: 10,
        withdrawableProfit: 3740,
        initialBalance: 25000,
        elapsedTradingDays: 10,
        minimumTradingDays: 4,
      },
    },
  },
]

const usdNoDecimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function parseCreatedAtToTimestamp(value: string) {
  const [datePart, timePart] = value.split(" ")
  const [day, month, year] = datePart.split("/").map(Number)
  const [hours, minutes] = (timePart ?? "00:00").split(":").map(Number)
  return new Date(year, month - 1, day, hours, minutes).getTime()
}

function hasActiveOrPayoutUnlockedAccount(challenge: ChallengeGroup) {
  const challengeHasActiveOrPayout = challenge.challengeAccounts.some(
    (account) => account.statusId === 1 || account.statusId === 2 || account.statusId === 4
  )
  const fundedHasActiveOrPayout =
    challenge.fundedAccount?.statusId === 1 ||
    challenge.fundedAccount?.statusId === 2 ||
    challenge.fundedAccount?.statusId === 4

  return challengeHasActiveOrPayout || fundedHasActiveOrPayout
}

function FundedPlaceholderCard() {
  return (
    <div className="rounded-lg border border-transparent dark:bg-[var(--foreground)]/3 bg-[var(--foreground)]/1 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border-transparent bg-[var(--deal)]/15 px-3 py-1 text-sm text-foreground">
          Funded account
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-foreground">
          Pending creation
        </span>
      </div>
      <p className="text-sm text-muted-foreground pl-2">
        As soon as you pass the challenge, your funded account will be created and shown here.
      </p>
    </div>
  )
}

export default function MyAccountsPage() {
  const sortedByDateDesc = [...challengeGroups].sort(
    (a, b) => parseCreatedAtToTimestamp(b.createdAt) - parseCreatedAtToTimestamp(a.createdAt)
  )
  const topPriorityChallenges = sortedByDateDesc.filter(hasActiveOrPayoutUnlockedAccount)
  const remainingChallenges = sortedByDateDesc.filter(
    (challenge) => !hasActiveOrPayoutUnlockedAccount(challenge)
  )

  const renderChallengeCard = (challenge: ChallengeGroup, useSecondaryHeader: boolean) => (
    <Card
      key={challenge.challengeId}
      className={`gap-0 rounded-lg py-0 shadow-xs ring-0 ${useSecondaryHeader
        ? "border border-border dark:border-transparent"
        : "border-1 border-[var(--challenge-cards-border)] dark:border-border"
        }`}
    >
      <CardHeader
        className={`!flex !items-center !gap-0 !pb-0 h-11 border-b px-3 pt-1 ${useSecondaryHeader
          ? "bg-muted/80 dark:from-muted/85 dark:to-muted/70"
          : "bg-gradient-to-b from-[#75FBFD]/8 via-[#15B8D0]/6 to-[#009BB5]/8"
          }`}
      >
        <CardTitle
          className={`${fustat.className} flex h-full w-full items-center justify-between gap-3 text-xl leading-none`}
        >
          <span
            className={`inline-flex items-center gap-2 leading-none ${useSecondaryHeader ? "text-muted-foreground" : "text-foreground"
              }`}
          >
            <Rocket className="h-5 w-5 text-[#FFA301]" />
            <span>Challenge {usdNoDecimals.format(challenge.initialBalance)}</span>
          </span>
          <span className="text-sm leading-none font-normal text-muted-foreground">
            {challenge.createdAt}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {[
          ...challenge.challengeAccounts.map((account) => (
            <AccountDisplayCard
              key={account.accountId}
              {...account}
              objectiveSections={objectiveSections}
              objectiveValues={objectiveValues}
              isPastChallenge={useSecondaryHeader}
            />
          )),
          challenge.fundedAccount ? (
            <AccountDisplayCard
              key={challenge.fundedAccount.accountId}
              {...challenge.fundedAccount}
              objectiveSections={objectiveSections}
              objectiveValues={objectiveValues}
              isPastChallenge={useSecondaryHeader}
            />
          ) : challenge.showFundedPlaceholder ? (
            <FundedPlaceholderCard key={`${challenge.challengeId}-funded-placeholder`} />
          ) : null,
        ]
          .filter(Boolean)
          .map((item, index) => (
            <div key={`${challenge.challengeId}-row-${index}`}>
              {index > 0 ? <div className="h-px w-full bg-border" /> : null}
              {item}
            </div>
          ))}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
      <TopBanner />
      <div className="flex items-start justify-between gap-3">

        <SectionTitle
          icon={<WalletCards className="h-5 w-5" />}
          title="My accounts"
          subtitle="Challenges and funded accounts"
        />
        <Button type="button" variant="outline" className="mt-1 inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="scrollbar-transient min-h-0 flex-1 space-y-6 overflow-y-auto pb-0 pr-1">
        {topPriorityChallenges.map((challenge) => renderChallengeCard(challenge, false))}

        {remainingChallenges.length > 0 ? (
          <div className="my-3 flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-border/80" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Past challenges
            </span>
            <div className="h-px flex-1 bg-border/80" />
          </div>
        ) : null}

        {remainingChallenges.map((challenge) => renderChallengeCard(challenge, true))}
      </div>
    </div>
  )
}
