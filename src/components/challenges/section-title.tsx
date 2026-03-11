import type { ReactNode } from "react"

import { Fustat } from "next/font/google"

const fustat = Fustat({ subsets: ["latin"], weight: ["600"] })

type SectionTitleProps = {
  icon: ReactNode
  title: string
  subtitle?: string
  extra?: ReactNode
  inlineExtra?: boolean
}

export function SectionTitle({ icon, title, subtitle, extra, inlineExtra = false }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--deal)] text-[var(--primary-foreground)]">
        {icon}
      </span>
      <div className="space-y-0.5">
        <h2 className={`${fustat.className} text-2xl font-semibold leading-tight`}>{title}</h2>
        {inlineExtra ? (
          <div className="flex flex-wrap items-center gap-2">
            {subtitle ? <p className="text-sm leading-tight text-[var(--muted-foreground)]">{subtitle}</p> : null}
            {extra}
          </div>
        ) : (
          <>
            {subtitle ? <p className="text-sm leading-tight text-[var(--muted-foreground)]">{subtitle}</p> : null}
            {extra}
          </>
        )}
      </div>
    </div>
  )
}
