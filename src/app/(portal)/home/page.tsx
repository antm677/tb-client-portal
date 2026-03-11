import { Megaphone } from "lucide-react"

import { SectionTitle } from "@/components/challenges/section-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopBanner } from "@/components/top-banner"

const promotions = [
  {
    title: "Spring Challenge Deal",
    description:
      "Get 10% off selected challenge plans this week. Perfect time to start and test your strategy with lower entry cost.",
    cta: "Use code SPRING10",
  },
  {
    title: "Add-on Bundle Offer",
    description:
      "Unlock all 4 add-ons at a reduced bundled price when purchasing a new challenge. Save more and accelerate your progress.",
    cta: "Bundle from $49.00",
  },
  {
    title: "Referral Bonus",
    description:
      "Invite a trader and receive account credit after their first paid challenge. Share your link and grow together.",
    cta: "Earn up to $100 credit",
  },
  {
    title: "Weekend Learning Pack",
    description:
      "Access curated tutorials and practical sessions to improve execution and risk management before your next challenge.",
    cta: "New content every week",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<Megaphone className="h-5 w-5" />}
        title="Home"
        subtitle="Latest promotions and opportunities"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {promotions.map((promotion) => (
          <Card key={promotion.title} className="rounded-lg border border-border shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{promotion.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p className="text-sm text-muted-foreground">{promotion.description}</p>
              <p className="text-sm font-semibold text-[var(--deal)]">{promotion.cta}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
