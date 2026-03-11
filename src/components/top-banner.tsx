"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { QuizSection } from "./challenges/quiz-section"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  siDiscord,
  siFacebook,
  siInstagram,
  siTelegram,
  siTiktok,
  siX,
  siYoutube,
} from "simple-icons/icons"

const socialLinks = [
  { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61567826653731", icon: siFacebook },
  { title: "Instagram", href: "https://www.instagram.com/tradeapp_fund/", icon: siInstagram },
  { title: "Telegram", href: "https://t.me/TradeApp_social", icon: siTelegram },
  { title: "X (Twitter)", href: "https://x.com/STradeapp", icon: siX },
  { title: "Discord", href: "https://discord.gg/Cx93VxRHDh", icon: siDiscord },
  { title: "TickTok", href: "https://www.tiktok.com/@tradeapp.prop", icon: siTiktok },
  { title: "YouTube", href: "https://www.youtube.com/@TradeApp354", icon: siYoutube },
] as const

const bannerSlides = [
  // {
  //   kind: "default" as const,
  //   text: "New to Prop Trading? Not sure what challenge fits you? We're here to help! Answer 5 simple questions and we'll tell you which one is best for you!",
  //   cta: "Start Quiz",
  // },
  // {
  //   kind: "default" as const,
  //   text: "Track your progress in one place. Review challenge objectives and monitor your next funding milestone.",
  //   cta: "View Objectives",
  // },
  // {
  //   kind: "default" as const,
  //   text: "Need support with setup or billing? Reach out anytime and our team will help you move forward.",
  //   cta: "Contact Support",
  // },
  {
    kind: "social-cta",
    text: "",
    cta: "",
    heading: "Join the Next Generation of Funded Traders",
    body: "Enhance your trading expertise with our comprehensive suite of educational resources.",
  },
]

export function TopBanner() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="flex w-full pb-5 items-center rounded-xl border-1 border-border/10 justify-center bg-card text-sm font-medium text-foreground">
      <Carousel
        className="h-full w-full max-w-none"
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0 h-full">
          {bannerSlides.map((slide) => (
            <CarouselItem key={slide.kind === "default" ? slide.text : slide.heading} className="h-full pl-0">
              {slide.kind === "default" ? (
                <QuizSection text={slide.text} cta={slide.cta} />
              ) : (
                <div
                  className="relative flex h-full flex-col py-3 px-6 items-center justify-center overflow-hidden rounded-xl bg-center bg-no-repeat text-center"
                  style={{
                    backgroundColor: "#001A24",
                    backgroundImage: "url('/cta.bg.png')",
                    backgroundSize: "100% auto",
                  }}
                >
                  <h3 className="relative z-10 text-xl leading-tight font-semibold text-white sm:text-2xl">
                    <span>Join the Next Generation</span>
                    <br />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(231.63deg, #75fbfd 18.65%, #3dd4e3 39.99%, #15b8d0 57.91%, #05adc9 67.16%)",
                      }}
                    >
                      of Funded Traders
                    </span>
                  </h3>
                  <p className="relative z-10 mt-2 max-w-2xl text-sm font-medium text-white/90">
                    {slide.body}
                  </p>
                  <div className="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-2">
                    {socialLinks.map((resource) => (
                      <Link
                        key={resource.title}
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={resource.title}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/90 transition hover:bg-white"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill={`#${resource.icon.hex}`}>
                          <path d={resource.icon.path} />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute right-0 bottom-[-13] left-0 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${current === index ? "w-7 bg-[var(--accent)]" : "w-3 bg-muted-foreground/45 hover:bg-muted-foreground/65"
                }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
