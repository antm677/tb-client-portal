"use client"

type AddonCardProps = {
  title: string
  effect: string
  priceFormatted: string
  checked: boolean
  disabled?: boolean
  onToggle: () => void
}

export function AddonCard({
  title,
  effect,
  priceFormatted,
  checked,
  disabled,
  onToggle,
}: AddonCardProps) {
  return (
    <label
      className={`relative block cursor-pointer rounded-lg border border-border p-3 transition dark:border-transparent ${checked ? "bg-[image:var(--trade-gradient)] text-white shadow-[var(--trade-shadow)]" : "bg-[var(--card)] shadow-xs"}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-lg" />
      <div className={`relative z-10 ${checked ? "text-white" : ""}`}>
        <div className="min-w-0 space-y-0.5 pr-14">
          <p className={`text-sm font-medium ${checked ? "text-white" : "text-[var(--foreground)]"}`}>{title}</p>
          <p className={`text-xs ${checked ? "text-white" : "text-[var(--muted-foreground)]"}`}>{effect}</p>
        </div>
        <div className="absolute inset-y-0 right-0 flex w-14 flex-col items-end">
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <input type="checkbox" className="peer sr-only" checked={checked} onChange={onToggle} disabled={disabled} />
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-white text-[10px] font-bold leading-none text-transparent peer-checked:text-[var(--primary)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--primary)] dark:border-transparent dark:bg-[var(--secondary)]">
              ✓
            </span>
          </span>
          <p className={`my-auto pt-1 text-sm font-semibold ${checked ? "text-white" : "text-[var(--foreground)]"}`}>{priceFormatted}</p>
        </div>
      </div>
    </label>
  )
}
