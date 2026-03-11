import { CreditCard } from "lucide-react"

import { SectionTitle } from "@/components/challenges/section-title"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TopBanner } from "@/components/top-banner"

type BillingAction =
  | "Order created"
  | "Order paid"
  | "Payouts requested"
  | "Payouts processed"

type BillingTransaction = {
  id: string
  time: string
  action: BillingAction
  amount: string
  description: string
}

const transactions: BillingTransaction[] = [
  {
    id: "t1",
    time: "2026-03-10 09:14",
    action: "Order created",
    amount: "$99.00",
    description:
      "Challenge $5k, Target profit: 10.00%, Max Drawdown: 10.00%, Daily drawdown: 5.00%, Min Trading Days: 4 days, Duration: 7 days",
  },
  {
    id: "t2",
    time: "2026-03-10 09:16",
    action: "Order paid",
    amount: "$99.00",
    description:
      "Challenge $5k, Target profit: 10.00%, Max Drawdown: 10.00%, Daily drawdown: 5.00%, Min Trading Days: 4 days, Duration: 7 days",
  },
  {
    id: "t3",
    time: "2026-03-08 14:22",
    action: "Order created",
    amount: "$275.00",
    description:
      "Challenge $10k, Target profit: 8.00%, Max Drawdown: 10.00%, Daily drawdown: 7.00%, Min Trading Days: 4 days, Duration: 60 days",
  },
  {
    id: "t4",
    time: "2026-03-08 14:25",
    action: "Order paid",
    amount: "$275.00",
    description:
      "Challenge $10k, Target profit: 8.00%, Max Drawdown: 10.00%, Daily drawdown: 7.00%, Min Trading Days: 4 days, Duration: 60 days",
  },
  {
    id: "t5",
    time: "2026-03-06 18:40",
    action: "Payouts requested",
    amount: "$1,240.00",
    description:
      "Funded account payout request for TradeApp 1-Step account. Profit period closed and payout queued for processing.",
  },
  {
    id: "t6",
    time: "2026-03-07 10:05",
    action: "Payouts processed",
    amount: "$1,240.00",
    description:
      "Payout processed successfully for funded account. Funds transferred to the selected withdrawal method.",
  },
  {
    id: "t7",
    time: "2026-03-01 11:32",
    action: "Payouts requested",
    amount: "$890.00",
    description:
      "Funded account payout request for TradeApp 1-Step account. Profit period closed and payout queued for processing.",
  },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<CreditCard className="h-5 w-5" />}
        title="Billing"
        subtitle="Transaction history."
      />

      <Card className="rounded-lg border border-border shadow-xs dark:border-transparent">
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.time}</TableCell>
                  <TableCell>{transaction.action}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell className="max-w-3xl whitespace-normal text-muted-foreground">
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
