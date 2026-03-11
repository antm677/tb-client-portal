"use server"

import { readFile } from "node:fs/promises"
import path from "node:path"

import type { ChallengesDataBundle } from "@/types/challenges"

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "content", "challenges", filename)
  const fileContent = await readFile(filePath, "utf-8")
  return JSON.parse(fileContent) as T
}

export async function fetchChallengesData(): Promise<ChallengesDataBundle> {
  // Simulate backend latency.
  await new Promise((resolve) => setTimeout(resolve, 120))

  const [plans, addons, addonPrices, ui] = await Promise.all([
    readJsonFile<ChallengesDataBundle["plans"]>("challenge-plans.json"),
    readJsonFile<ChallengesDataBundle["addons"]>("challenge-addons.json"),
    readJsonFile<ChallengesDataBundle["addonPrices"]>("challenge-addon-prices.json"),
    readJsonFile<ChallengesDataBundle["ui"]>("challenge-ui.json"),
  ])

  return {
    plans,
    addons,
    addonPrices,
    ui,
  }
}
