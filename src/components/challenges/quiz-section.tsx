import { Button } from "@/components/ui/button"

type QuizSectionProps = {
  text: string
  cta: string
}

export function QuizSection({ text, cta }: QuizSectionProps) {
  return (
    <div className="flex h-full w-full flex-col gap-3 px-0 py-0 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--foreground)]">
        {text}
      </p>
      <Button type="button" className="bg-[#FFA301] text-white hover:bg-[#e69500] sm:shrink-0">
        {cta}
      </Button>
    </div>
  )
}
