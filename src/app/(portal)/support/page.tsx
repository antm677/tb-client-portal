import { Headset, Mail, MessageCircle, Send } from "lucide-react"

import { SectionTitle } from "@/components/challenges/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { TopBanner } from "@/components/top-banner"

const supportChannels = [
  {
    title: "Live Chat",
    description: "Chat with our team for quick answers.",
    icon: MessageCircle,
  },
  {
    title: "Email Support",
    description: "Send account and billing questions by email.",
    icon: Mail,
  },
  {
    title: "Telegram",
    description: "Get updates and community support in Telegram.",
    icon: Send,
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<Headset className="h-5 w-5" />}
        title="Support"
        subtitle="Contact options and assistance"
      />

      <div className="grid gap-3 md:grid-cols-3">
        {supportChannels.map((channel) => (
          <Card key={channel.title} className="rounded-lg border border-border py-0 shadow-xs">
            <CardContent className="space-y-2 p-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--deal)]/15 text-[var(--deal)]">
                <channel.icon className="h-4 w-4" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{channel.title}</h3>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
