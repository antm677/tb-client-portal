"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChallengeObjectives } from "@/components/challenges/challenge-objectives"
import type { ObjectiveInfoSection } from "@/types/challenges"

type ObjectiveInfoDialogProps = {
  ariaLabel: string
  srTitle: string
  srDescription: string
  sections: ObjectiveInfoSection[]
  objectiveValues?: Record<string, string>
}

export function ObjectiveInfoDialog({
  ariaLabel,
  srTitle,
  srDescription,
  sections,
  objectiveValues,
}: ObjectiveInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--deal)] text-[10px] leading-none text-[var(--deal)]"
        aria-label={ariaLabel}
      >
        i
      </DialogTrigger>
      <DialogContent className="!max-w-[92vw] sm:!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{srTitle}</DialogTitle>
          <DialogDescription className="sr-only">{srDescription}</DialogDescription>
        </DialogHeader>
        <ChallengeObjectives
          sections={sections}
          objectiveValues={objectiveValues}
          className="max-h-[60vh] overflow-y-auto pr-2"
        />
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
