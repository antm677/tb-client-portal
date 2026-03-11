import { cn } from "@/lib/utils"
import type { ObjectiveInfoSection } from "@/types/challenges"

type ChallengeObjectivesProps = {
  sections: ObjectiveInfoSection[]
  objectiveValues?: Record<string, string>
  className?: string
}

function normalizeObjectiveKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function ChallengeObjectives({
  sections,
  objectiveValues,
  className,
}: ChallengeObjectivesProps) {
  const normalizedValues = Object.fromEntries(
    Object.entries(objectiveValues ?? {}).map(([key, value]) => [normalizeObjectiveKey(key), value])
  )

  return (
    <div className={cn("space-y-4 text-left text-sm text-muted-foreground", className)}>
      {sections.map((section) => (
        <div key={section.subtitle} className="space-y-1.5">
          <div className="text-base font-semibold text-[var(--foreground)]">
            {section.subtitle}
            {normalizedValues[normalizeObjectiveKey(section.subtitle)]
              ? `: ${normalizedValues[normalizeObjectiveKey(section.subtitle)]}`
              : ""}
          </div>
          <div className="whitespace-pre-line">{section.body}</div>
        </div>
      ))}
    </div>
  )
}
