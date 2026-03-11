"use client"

import { Rocket } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ObjectiveInfoDialog } from "@/components/challenges/objective-info-dialog"
import type { ChallengesUiContent } from "@/types/challenges"

type ObjectivesSectionProps = {
  objectives: ChallengesUiContent["objectives"]
}

export function ObjectivesSection({ objectives }: ObjectivesSectionProps) {
  const objectiveValues: Record<string, string> = {
    "Target Profit": objectives.rows.find((row) => row.label.toLowerCase().startsWith("target profit"))?.value ?? "",
    "Daily Drawdown": objectives.rows.find((row) => row.label.toLowerCase().startsWith("daily drawdown"))?.value ?? "",
    "Max Drawdown": objectives.rows.find((row) => row.label.toLowerCase().startsWith("max drawdown"))?.value ?? "",
    "Minimum trading days":
      objectives.rows.find((row) => row.label.toLowerCase().startsWith("minimum trading days"))?.value ?? "",
    "Challenge duration":
      objectives.rows.find((row) => row.label.toLowerCase().startsWith("challenge duration"))?.value ?? "",
    "Profit share": objectives.footer.value,
  }

  return (
    <Accordion className="rounded-lg border border-border bg-[var(--card)] px-5 shadow-xs dark:border-transparent">
      <AccordionItem value="objectives">
        <AccordionTrigger className="items-center hover:no-underline [&_[data-slot=accordion-trigger-icon]]:mt-0">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center text-[var(--deal)]">
              <Rocket className="h-5 w-5" />
            </span>
            <span className="flex flex-col text-left">
              <span className="font-semibold">{objectives.title}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{objectives.subtitle}</span>
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <ul className="space-y-2">
              {objectives.rows.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-3">
                  <span className="text-[var(--muted-foreground)]">{row.label}</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                    <span>{row.value}</span>
                    {row.showInfo ? (
                      <ObjectiveInfoDialog
                        ariaLabel={objectives.infoDialog.ariaLabel}
                        srTitle={objectives.infoDialog.srTitle}
                        srDescription={objectives.infoDialog.srDescription}
                        sections={objectives.infoDialog.sections}
                        objectiveValues={objectiveValues}
                      />
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            <div className="h-px w-full bg-[var(--border)] md:mb-4" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-[var(--muted-foreground)]">{objectives.footer.label}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                <span>{objectives.footer.value}</span>
                {objectives.footer.showInfo ? (
                  <ObjectiveInfoDialog
                    ariaLabel={objectives.infoDialog.ariaLabel}
                    srTitle={objectives.infoDialog.srTitle}
                    srDescription={objectives.infoDialog.srDescription}
                    sections={objectives.infoDialog.sections}
                    objectiveValues={objectiveValues}
                  />
                ) : null}
              </span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
