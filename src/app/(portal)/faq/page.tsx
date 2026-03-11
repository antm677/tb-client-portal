import { CircleHelp } from "lucide-react"

import { SectionTitle } from "@/components/challenges/section-title"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { TopBanner } from "@/components/top-banner"

const faqItems = [
  {
    question: "How do I start a new challenge?",
    answer:
      "Use the New Challenge button in the sidebar, choose balance and add-ons, then proceed to payment.",
  },
  {
    question: "When can I request payouts?",
    answer:
      "Payouts are available after your account reaches the required target and unlock conditions are met.",
  },
  {
    question: "Where can I review account objectives?",
    answer:
      "Open My Accounts, click the 3-dots menu on an account, then choose Objectives.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Go to the Support page from the sidebar and use your preferred contact channel.",
  },
]

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<CircleHelp className="h-5 w-5" />}
        title="FAQ"
        subtitle="Frequently asked questions"
      />

      <Card className="rounded-lg border border-border py-0 shadow-xs">
        <CardContent className="p-0">
          <Accordion className="divide-y divide-border">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-none px-4">
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
