import { fetchChallengesData } from "@/app/actions/challenges"
import { ChallengesPageClient } from "@/components/challenges/challenges-page-client"

export default async function ChallengesPage() {
  const data = await fetchChallengesData()

  return <ChallengesPageClient {...data} />
}
