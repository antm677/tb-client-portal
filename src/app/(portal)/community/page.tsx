import Link from "next/link"
import { Fustat } from "next/font/google"
import { Users } from "lucide-react"
import {
  siDiscord,
  siFacebook,
  siInstagram,
  siTelegram,
  siTiktok,
  siX,
  siYoutube,
} from "simple-icons/icons"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { NeedHelpPanel } from "@/components/need-help-panel"
import { SectionTitle } from "@/components/challenges/section-title"
import { TopBanner } from "@/components/top-banner"

const fustat = Fustat({ subsets: ["latin"], weight: ["600"] })

const socialResources = [
  {
    title: "Facebook",
    description: "Community engagement",
    href: "https://www.facebook.com/profile.php?id=61567826653731",
    icon: siFacebook,
  },
  {
    title: "Instagram",
    description: "Visual highlights & trader features",
    href: "https://www.instagram.com/tradeapp_fund/",
    icon: siInstagram,
  },
  {
    title: "Telegram",
    description: "Regular updates on trading news",
    href: "https://t.me/TradeApp_social",
    icon: siTelegram,
  },
  {
    title: "X (Twitter)",
    description: "Stay updated with market insights",
    href: "https://x.com/STradeapp",
    icon: siX,
    iconClassName: "h-7 w-7",
  },
  {
    title: "Discord",
    description: "Join live discussions now",
    href: "https://discord.gg/Cx93VxRHDh",
    icon: siDiscord,
  },
  {
    title: "TickTok",
    description: "See how everything works",
    href: "https://www.tiktok.com/@tradeapp.prop",
    icon: siTiktok,
  },
  {
    title: "YouTube",
    description: "Tutorials & success stories",
    href: "https://www.youtube.com/@TradeApp354",
    icon: siYoutube,
  },
] as const

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <TopBanner />

      <SectionTitle
        icon={<Users className="h-5 w-5" />}
        title="Connect, Learn & Grow"
        subtitle="Be part of a thriving community of traders, share your journey, and celebrate success. Follow us on social media and join the conversation!"
      />

      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid-cols-2 xl:grid-cols-3 dark:*:data-[slot=card]:bg-card">
        {socialResources.map((resource) => {
          return (
            <Card key={resource.title} className="@container/card gap-0">
              <CardHeader className="h-[4.5rem] px-4 py-2">
                <div className="flex h-full w-full items-center justify-start gap-3 text-left">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className={`${resource.iconClassName ?? "h-8 w-8"} shrink-0`}
                      fill={`#${resource.icon.hex}`}
                    >
                      <path d={resource.icon.path} />
                    </svg>
                  </span>
                  <span className={`${fustat.className} block leading-tight line-clamp-1 text-xl font-semibold`}>
                    {resource.title}
                  </span>
                </div>
              </CardHeader>
              <CardContent />
              <CardFooter className="flex-col items-start gap-1 py-2">
                <p className="overflow-hidden text-sm leading-4 text-muted-foreground line-clamp-1">{resource.description}</p>
                <Link
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-4 font-medium text-primary hover:underline"
                >
                  Follow on {resource.title}
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <NeedHelpPanel />
    </div>
  )
}
