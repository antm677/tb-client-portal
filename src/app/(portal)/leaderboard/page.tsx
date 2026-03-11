"use client"

import { useMemo, useState } from "react"
import { BarChart3, Trophy } from "lucide-react"

import { SectionTitle } from "@/components/challenges/section-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TopBanner } from "@/components/top-banner"

type LeaderboardEntry = {
  id: string
  profit: number
  equity: number
  gainPercent: number
  initialBalance: number
  country: string
}

const challengeTabs = [5000, 10000, 25000, 50000] as const

const leaderboardData: LeaderboardEntry[] = [
  { id: "e1", profit: 12450, equity: 62450, gainPercent: 24.9, initialBalance: 50000, country: "United States" },
  { id: "e2", profit: 11820, equity: 36820, gainPercent: 47.3, initialBalance: 25000, country: "Germany" },
  { id: "e3", profit: 9640, equity: 19640, gainPercent: 96.4, initialBalance: 10000, country: "Canada" },
  { id: "e4", profit: 8210, equity: 58210, gainPercent: 16.4, initialBalance: 50000, country: "United Kingdom" },
  { id: "e5", profit: 7720, equity: 32720, gainPercent: 30.9, initialBalance: 25000, country: "Australia" },
  { id: "e6", profit: 7390, equity: 17390, gainPercent: 73.9, initialBalance: 10000, country: "Netherlands" },
  { id: "e7", profit: 7010, equity: 12010, gainPercent: 140.2, initialBalance: 5000, country: "France" },
  { id: "e8", profit: 6680, equity: 31680, gainPercent: 26.7, initialBalance: 25000, country: "Spain" },
  { id: "e9", profit: 6390, equity: 16390, gainPercent: 63.9, initialBalance: 10000, country: "Sweden" },
  { id: "e10", profit: 6120, equity: 11120, gainPercent: 122.4, initialBalance: 5000, country: "Italy" },
  { id: "e11", profit: 5890, equity: 30890, gainPercent: 23.6, initialBalance: 25000, country: "Poland" },
  { id: "e12", profit: 5530, equity: 15530, gainPercent: 55.3, initialBalance: 10000, country: "Portugal" },
  { id: "e13", profit: 5210, equity: 10210, gainPercent: 104.2, initialBalance: 5000, country: "Belgium" },
  { id: "e14", profit: 4970, equity: 29970, gainPercent: 19.9, initialBalance: 25000, country: "Greece" },
  { id: "e15", profit: 4710, equity: 14710, gainPercent: 47.1, initialBalance: 10000, country: "Ireland" },
  { id: "e16", profit: 4390, equity: 9390, gainPercent: 87.8, initialBalance: 5000, country: "Czechia" },
]

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const shortUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function formatChallengeTab(balance: number) {
  return `$${Math.round(balance / 1000)}k`
}

export default function LeaderboardPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>("all")
  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    []
  )

  const filteredEntries = useMemo(() => {
    if (selectedChallenge === "all") {
      return leaderboardData
    }

    const balance = Number(selectedChallenge)
    return leaderboardData.filter((entry) => entry.initialBalance === balance)
  }, [selectedChallenge])

  const leaders = filteredEntries.slice(0, 3)
  const participants = filteredEntries.slice(3, 10)

  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<BarChart3 className="h-5 w-5" />}
        title="Leaderboard"
        subtitle="Overview of currently most profitable active TradeApp Accounts."
      />

      <Tabs value={selectedChallenge} onValueChange={setSelectedChallenge}>
        <TabsList className="h-auto flex-wrap gap-1.5 p-1">
          <TabsTrigger value="all" className="px-3 py-1.5">
            All
          </TabsTrigger>
          {challengeTabs.map((balance) => (
            <TabsTrigger key={balance} value={String(balance)} className="px-3 py-1.5">
              {formatChallengeTab(balance)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{todayLabel}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {leaders.map((leader, index) => (
            <Card key={leader.id} className="rounded-lg border border-border shadow-xs dark:border-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Trophy className="h-5 w-5 text-[var(--deal)]" />
                  <span>#{index + 1}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Profit</span>
                  <span className="font-semibold">{usd.format(leader.profit)}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Equity</span>
                  <span className="font-semibold">{usd.format(leader.equity)}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gain %</span>
                  <span className="font-semibold">{leader.gainPercent.toFixed(1)}%</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Challenge</span>
                  <span className="font-semibold">{shortUsd.format(leader.initialBalance)}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="rounded-lg border border-border shadow-xs dark:border-transparent">
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Equity</TableHead>
                <TableHead>Gain %</TableHead>
                <TableHead>Initial balance</TableHead>
                <TableHead>Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{index + 4}</TableCell>
                  <TableCell>{usd.format(participant.profit)}</TableCell>
                  <TableCell>{usd.format(participant.equity)}</TableCell>
                  <TableCell>{participant.gainPercent.toFixed(1)}%</TableCell>
                  <TableCell>{shortUsd.format(participant.initialBalance)}</TableCell>
                  <TableCell>{participant.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
