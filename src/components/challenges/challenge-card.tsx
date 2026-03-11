"use client"

type ChallengeCardProps = {
  balanceLabel: string
  paymentLabel: string
  badgeText: string
  balanceFormatted: string
  priceFormatted: string
  originalPriceFormatted?: string
  isActive: boolean
  isBestChoice: boolean
  onSelect: () => void
}

export function ChallengeCard({
  balanceLabel,
  paymentLabel,
  badgeText,
  balanceFormatted,
  priceFormatted,
  originalPriceFormatted,
  isActive,
  isBestChoice,
  onSelect,
}: ChallengeCardProps) {
  return (
    <label
      className={`relative block cursor-pointer overflow-visible rounded-lg border border-border transition dark:border-transparent ${isActive ? "shadow-[var(--trade-shadow)]" : "shadow-xs"}`}
    >
      <div
        className={`space-y-0 overflow-hidden rounded-lg leading-none px-4 pt-3 pb-3 md:pb-0 ${isActive ? "bg-[image:var(--trade-gradient)] text-white" : "bg-linear-to-t from-primary/5 to-card dark:bg-card"}`}
      >
        {isBestChoice ? (
          <span className="absolute left-1/2 -top-2 m-0 inline-flex min-w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--deal)] px-3 py-0.5 text-xs font-semibold text-white md:text-[10px]">
            {badgeText}
          </span>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm font-medium ${isActive ? "text-white" : "text-[var(--muted-foreground)]"}`}>{balanceLabel}</p>
          {originalPriceFormatted ? (
            <span className="inline-flex items-baseline gap-1 whitespace-nowrap md:hidden">
              <span className={`text-base font-semibold ${isActive ? "text-white" : "text-[var(--foreground)]"}`}>{priceFormatted}</span>
              <span className={`text-xs line-through ${isActive ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>{originalPriceFormatted}</span>
            </span>
          ) : (
            <span className={`text-base font-semibold ${isActive ? "text-white" : "text-[var(--foreground)]"} md:hidden`}>{priceFormatted}</span>
          )}
          <span className="relative hidden h-5 w-5 items-center justify-center md:inline-flex">
            <input type="radio" name="challenge-balance" className="peer sr-only" checked={isActive} onChange={onSelect} />
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-white text-[10px] font-bold leading-none text-transparent peer-checked:text-[var(--primary)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--primary)] dark:border-transparent dark:bg-[var(--secondary)]">
              ✓
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 md:block">
          <p className={`text-base font-semibold md:text-xl ${isActive ? "text-white" : "text-[var(--muted-foreground)]"}`}>{balanceFormatted}</p>
          <p className={`text-sm font-medium md:hidden ${isActive ? "text-white" : "text-[var(--muted-foreground)]"}`}>{paymentLabel}</p>
        </div>

        <div className="relative isolate hidden -mx-4 border-t border-[var(--border)] bg-muted/50 px-4 py-3 md:block">
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-0 opacity-60 ${isActive ? "bg-[image:var(--trade-gradient)]" : "bg-linear-to-t from-primary/5 to-card dark:bg-card"}`}
          />
          {originalPriceFormatted ? (
            <p className="relative z-20 whitespace-nowrap text-base font-semibold leading-none text-[var(--foreground)] dark:text-foreground">
              {priceFormatted}
              <span className="ml-1 text-xs text-[var(--foreground)]/70 line-through dark:text-foreground/70">{originalPriceFormatted}</span>
            </p>
          ) : (
            <p className="relative z-20 text-base font-semibold leading-none text-[var(--foreground)] dark:text-foreground">{priceFormatted}</p>
          )}
          <span className="relative z-20 m-0 mt-1 block text-left text-xs text-[var(--foreground)] dark:text-foreground">{paymentLabel}</span>
        </div>
      </div>
    </label>
  )
}
