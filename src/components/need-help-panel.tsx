import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function NeedHelpPanel({ className }: { className?: string }) {
  return (
    <Card className={cn("rounded-lg border border-[var(--border)] bg-[var(--muted)] py-0 shadow-sm ring-0 dark:border-transparent", className)}>
      <CardContent className="py-5">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex items-center gap-3 md:contents">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFA301] text-white">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Need some help?</p>
              <p className="text-sm text-[var(--muted-foreground)]">We are here for you, Write us a message</p>
            </div>
          </div>
          <Button className="bg-[#FFA301] text-white hover:bg-[#e69500] md:justify-self-end">Chat with us</Button>
        </div>
      </CardContent>
    </Card>
  )
}
