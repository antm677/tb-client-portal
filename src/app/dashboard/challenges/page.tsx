"use client";

import { useMemo, useState } from "react";
import { Fustat } from "next/font/google";
import Image from "next/image";
import { Flag, MessageCircle, Puzzle, ReceiptText, Rocket } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  challengeAddonPrices,
  challengeAddons,
  challengePlans,
} from "@/data/mock-data";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usdPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const fustat = Fustat({ subsets: ["latin"], weight: ["600"] });

function ObjectiveInfoDialog({
  sections,
}: {
  sections: Array<{ subtitle: string; body: string }>;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--deal)] text-[10px] leading-none text-[var(--deal)]"
        aria-label="More information"
      >
        i
      </DialogTrigger>
      <DialogContent className="!max-w-[92vw] sm:!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Challenge objectives details</DialogTitle>
          <DialogDescription className="sr-only">
            Challenge objective details and explanations.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-left text-sm text-muted-foreground">
          {sections.map((section) => (
            <div key={section.subtitle} className="space-y-1.5">
              <div className="text-base font-semibold text-[var(--foreground)]">{section.subtitle}</div>
              <div className="whitespace-pre-line">{section.body}</div>
            </div>
          ))}
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}

export default function ChallengesPage() {
  const [selectedChallengeBalance, setSelectedChallengeBalance] = useState<number | null>(
    challengePlans.find((plan) => plan.balance === 10000)?.balance ?? challengePlans[0]?.balance ?? null,
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedChallenge = challengePlans.find((plan) => plan.balance === selectedChallengeBalance) ?? null;
  const selectedAddonPricing = challengeAddonPrices.find((entry) => entry.balance === selectedChallengeBalance) ?? null;
  const allAddonsSelected = selectedAddons.length === challengeAddons.length;

  const addonPriceMap = useMemo(() => {
    if (!selectedAddonPricing) {
      return new Map<string, number>();
    }

    return new Map<string, number>([
      ["Target profit", selectedAddonPricing.targetProfit],
      ["Daily drawdown", selectedAddonPricing.dailyDrawdown],
      ["Profit share", selectedAddonPricing.profitShare],
      ["Challenge duration", selectedAddonPricing.challengeDuration],
    ]);
  }, [selectedAddonPricing]);

  const cartItems = useMemo(() => {
    const items: Array<{ label: string; amount: number }> = [];

    if (selectedChallenge) {
      items.push({
        label: `Challenge ${usd.format(selectedChallenge.balance)}`,
        amount: selectedChallenge.price,
      });
    }

    if (allAddonsSelected && selectedChallenge) {
      items.push({ label: "Add-on bundle", amount: selectedChallenge.price });
    } else {
      selectedAddons.forEach((addonName) => {
        const price = addonPriceMap.get(addonName);
        if (price) {
          items.push({ label: `${addonName} add-on`, amount: price });
        }
      });
    }

    return items;
  }, [addonPriceMap, allAddonsSelected, selectedAddons, selectedChallenge]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const discountPercent = 10;
  const hasSpecialDeal = (selectedChallenge?.balance ?? 0) === 10000;
  const discountAmount = hasSpecialDeal ? totalPrice * (discountPercent / 100) : 0;
  const discountedTotal = hasSpecialDeal ? totalPrice * (1 - discountPercent / 100) : totalPrice;

  const addonSummaryLabel: Record<string, string> = {
    "Target profit": "Target profit: 8%",
    "Daily drawdown": "Daily drawdown: 7%",
    "Challenge duration": "Challenge duration: 60 days",
    "Profit share": "Profit share: 90%",
  };

  const addonDisplayName: Record<string, string> = {
    "Target profit": "Target profit: 8%",
    "Daily drawdown": "Daily drawdown: 7%",
    "Challenge duration": "Challenge duration: 60 days",
    "Profit share": "Profit share: 90%",
  };

  const addonDisplayOrder = ["Target profit", "Daily drawdown", "Challenge duration", "Profit share"];
  const objectiveInfoSections = [
    {
      subtitle: "Target Profit",
      body:
        "Target Profit is the main objective for any challenge. For instance, if your initial balance is $10,000, you need to goal is to increase your equity to $11,0000 to pass the challenge. Here's when the Target profit add-on is helpful. With that add-on you only need to $10,800 of equity to pass the challenge.",
    },
    {
      subtitle: "Daily Drawdown",
      body:
        "This is the risk constraint for the challenge. For example, if your equity on the beginning of the trading day is $10,000, your goal is to make sure it never reaches the $9,500. And the Daily Drawdown add-on can relax this requirement by allowing your equity to reach $9,300 without failing the challenge.",
    },
    {
      subtitle: "Max Drawdown",
      body:
        "This is another risk constraint which represents the absolute minimum for your equity. For example, if your initial balance is $10,000, your goal is to make sure it never reaches $9,000.",
    },
    {
      subtitle: "Minimum trading days",
      body: "Trade consistently and keep your risk within thresholds during at least 4 trading days to pass the challenge.",
    },
    {
      subtitle: "Challenge duration",
      body:
        "This is the maximum number of calendar days (excluding weekends) during which the challenge goal (Target Profit) must be achieved. Now, we understand that 7 days maybe to few, so we offer an add-on that relaxes this requirement and gives you 60 days to complete the challenge.",
    },
    {
      subtitle: "Profit share",
      body:
        "Once you pass the challenge, we'll be happy to fund you. You will be able to withdraw 80% of the profits you gain. And there's more to it... The Profit share add-on allows you to get 90% of generated profits.",
    },
  ];

  function toggleAddon(addonName: string) {
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((name) => name !== addonName) : [...prev, addonName],
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-8 xl:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6 p-0">
          <Card className="border-0 bg-transparent py-1 shadow-none ring-0">
            <CardHeader className="px-0 pb-2">
              <CardTitle className="text-inherit">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--deal)] text-[var(--primary-foreground)]">
                    <Flag className="h-5 w-5" />
                  </span>
                  <div className="space-y-0.5">
                    <h2 className={`${fustat.className} text-2xl font-semibold leading-tight`}>Choose your challenge</h2>
                    <p className="text-sm leading-tight text-[var(--muted-foreground)]">
                      Select one challenge and optional add-ons. All purchases are one time payments.
                    </p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-0 pb-0">
              <Accordion className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-5">
                <AccordionItem value="objectives">
                  <AccordionTrigger className="items-center hover:no-underline [&_[data-slot=accordion-trigger-icon]]:mt-0">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center text-[var(--deal)]">
                        <Rocket className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="font-semibold">1-Step Challenge</span>
                        <span className="text-xs text-[var(--muted-foreground)]">Single step to funded account</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between gap-3">
                          <span className="text-[var(--muted-foreground)]">Target profit</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                            <span>10% or 8%</span>
                            <ObjectiveInfoDialog sections={objectiveInfoSections} />
                          </span>
                        </li>
                        <li className="flex items-center justify-between gap-3">
                          <span className="text-[var(--muted-foreground)]">Daily drawdown</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                            <span>5% or 7%</span>
                            <ObjectiveInfoDialog sections={objectiveInfoSections} />
                          </span>
                        </li>
                        <li className="flex items-center justify-between gap-3">
                          <span className="text-[var(--muted-foreground)]">Max drawdown</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                            <span>10%</span>
                            <ObjectiveInfoDialog sections={objectiveInfoSections} />
                          </span>
                        </li>
                        <li className="flex items-center justify-between gap-3">
                          <span className="text-[var(--muted-foreground)]">Minimum trading days</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                            <span>4 days</span>
                            <ObjectiveInfoDialog sections={objectiveInfoSections} />
                          </span>
                        </li>
                        <li className="flex items-center justify-between gap-3">
                          <span className="text-[var(--muted-foreground)]">Challenge duration</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                            <span>7 days or 60 days</span>
                            <ObjectiveInfoDialog sections={objectiveInfoSections} />
                          </span>
                        </li>
                      </ul>
                      <div className="h-px w-full bg-[var(--border)] md:mb-4" />
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[var(--muted-foreground)]">Profit share on funded account</span>
                        <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                          <span>80% or 90%</span>
                          <ObjectiveInfoDialog sections={objectiveInfoSections} />
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {challengePlans.map((plan) => {
                  const active = plan.balance === selectedChallengeBalance;
                  const bestChoice = plan.balance === 10000;
                  const originalPrice = bestChoice ? plan.price : null;
                  const discountedPrice = bestChoice ? plan.price * 0.9 : plan.price;
                  return (
                    <label
                      key={plan.balance}
                      className={`relative block cursor-pointer rounded-lg border px-4 py-3 transition ${active
                        ? "border-[var(--challenge-cards-border)] bg-[image:var(--trade-gradient)] text-white shadow-[var(--trade-shadow)]"
                        : "border-[var(--challenge-cards-border)] bg-[var(--card)]"
                        }`}
                    >
                      <div className="space-y-0 leading-none">
                        {bestChoice ? (
                          <span className="absolute left-1/2 -top-2 m-0 inline-flex min-w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--deal)] px-3 py-0.5 text-xs font-semibold text-white md:text-[10px]">
                            10% off
                          </span>
                        ) : null}
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-sm font-medium ${active ? "text-white" : "text-[var(--muted-foreground)]"}`}>Balance</p>
                          {bestChoice && originalPrice ? (
                            <span className="inline-flex items-baseline gap-1 md:hidden">
                              <span className={`text-base font-semibold ${active ? "text-white" : "text-[var(--foreground)]"}`}>
                                {usdPrecise.format(discountedPrice)}
                              </span>
                              <span className={`text-xs line-through ${active ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>
                                {usdPrecise.format(originalPrice)}
                              </span>
                            </span>
                          ) : (
                            <span className={`text-base font-semibold ${active ? "text-white" : "text-[var(--foreground)]"} md:hidden`}>
                              {usdPrecise.format(discountedPrice)}
                            </span>
                          )}
                          <span className="relative hidden h-5 w-5 items-center justify-center md:inline-flex">
                            <input
                              type="radio"
                              name="challenge-balance"
                              className="peer sr-only"
                              checked={active}
                              onChange={() => setSelectedChallengeBalance(plan.balance)}
                            />
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--challenge-cards-border)] bg-white text-[10px] font-bold leading-none text-transparent peer-checked:text-[var(--primary)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--primary)]">
                              ✓
                            </span>
                          </span>
                        </div>
                        <div className="flex items-end justify-between gap-3 md:block">
                          <p className={`text-base font-semibold md:text-xl ${active ? "text-white" : "text-[var(--foreground)]"}`}>{usd.format(plan.balance)}</p>
                          <p className={`text-sm font-medium md:hidden ${active ? "text-white" : "text-[var(--muted-foreground)]"}`}>One time payment</p>
                        </div>
                        <div className="hidden h-px w-full bg-[var(--border)] md:mb-2 md:block" />
                        {bestChoice && originalPrice ? (
                          <div className="hidden md:block">
                            <p className={`text-base font-semibold leading-none ${active ? "text-white" : "text-[var(--foreground)]"}`}>
                              {usdPrecise.format(discountedPrice)}
                              <span className={`ml-1 text-xs line-through ${active ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>
                                {usdPrecise.format(originalPrice)}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className={`hidden text-base font-semibold leading-none md:block ${active ? "text-white" : "text-[var(--foreground)]"}`}>
                            {usdPrecise.format(discountedPrice)}
                          </p>
                        )}
                        <span className={`m-0 hidden text-left text-xs md:mt-1 md:block ${active ? "text-white" : "text-[var(--muted-foreground)]"}`}>One time payment</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="mt-12 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--deal)] text-[var(--primary-foreground)]">
                    <Puzzle className="h-5 w-5" />
                  </span>
                  <div className="space-y-0.5">
                    <h2 className={`${fustat.className} text-2xl font-semibold leading-tight`}>Select add-ons</h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm leading-tight text-[var(--muted-foreground)]">Add-ons help you pass the challenge quicker.</p>
                      <span className="inline-flex items-center rounded-full bg-[var(--deal)]/15 px-2 py-0.5 text-xs font-semibold text-black">
                        4 add-ons for {usdPrecise.format(selectedChallenge?.price ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {challengeAddons.map((addon) => {
                    const checked = selectedAddons.includes(addon.name);
                    const addonPrice = addonPriceMap.get(addon.name) ?? 0;

                    return (
                      <label
                        key={addon.name}
                        className={`relative block cursor-pointer rounded-lg p-3 transition ${checked
                          ? "bg-[image:var(--trade-gradient)] text-white shadow-[var(--trade-shadow)]"
                          : "bg-[var(--card)]"
                          }`}
                      >
                        <span className="pointer-events-none absolute inset-0 rounded-lg border border-[var(--challenge-cards-border)]" />
                        <div className={`relative z-10 ${checked ? "text-white" : ""}`}>
                          <div className="min-w-0 space-y-0.5 pr-14">
                            <p className={`text-sm font-medium ${checked ? "text-white" : "text-[var(--foreground)]"}`}>
                              {addonDisplayName[addon.name] ?? addon.name}
                            </p>
                            <p className={`text-xs ${checked ? "text-white" : "text-[var(--muted-foreground)]"}`}>{addon.effect}</p>
                          </div>
                          <div className="absolute inset-y-0 right-0 flex w-14 flex-col items-end">
                            <span className="inline-flex h-5 w-5 items-center justify-center">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={checked}
                                onChange={() => toggleAddon(addon.name)}
                                disabled={!selectedChallenge}
                              />
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--challenge-cards-border)] bg-white text-[10px] font-bold leading-none text-transparent peer-checked:text-[var(--primary)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--primary)]">
                                ✓
                              </span>
                            </span>
                            <p className={`my-auto pt-1 text-sm font-semibold ${checked ? "text-white" : "text-[var(--foreground)]"}`}>{usdPrecise.format(addonPrice)}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center gap-3 py-1 pb-2">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--deal)] text-white">
              <ReceiptText className="h-5 w-5" />
            </span>
            <div className="space-y-0.5">
              <h2 className={`${fustat.className} text-2xl font-semibold leading-tight`}>Start your challenge</h2>
              <p className="text-sm leading-tight text-[var(--muted-foreground)]">Verify challenge parameters</p>
            </div>
          </div>
          <Card className="mb-1 flex-1 rounded-lg border-[var(--challenge-cards-border)] p-2 shadow-none">
            <CardContent className="space-y-3 pt-2">
            <ul className="space-y-1">
              <li className="flex items-center gap-2 text-sm leading-tight">
                <Rocket className="h-5 w-5 shrink-0 text-[var(--deal)]" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--muted-foreground)]">
                      Challenge {usd.format(selectedChallenge?.balance ?? 0)}
                    </span>
                    <span className="font-semibold text-black">1-Step</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--muted-foreground)]">Account currency</span>
                    <span className="inline-flex items-center gap-2 font-semibold text-black">
                      <Image src="/usd-flag.svg" alt="USD flag" width={16} height={16} className="rounded-full object-cover" />
                      <span>USD</span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="border-t border-[var(--border)]" />

            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[var(--muted-foreground)]">Base price</span>
                <span className="font-semibold text-black">
                  {usdPrecise.format(selectedChallenge?.price ?? 0)}
                </span>
              </li>
              {allAddonsSelected ? (
                <li className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[var(--deal)]">Add-on bundle</span>
                  <span className="font-semibold text-[var(--deal)]">{usdPrecise.format(selectedChallenge?.price ?? 0)}</span>
                </li>
              ) : (
                addonDisplayOrder
                  .filter((addonName) => selectedAddons.includes(addonName))
                  .map((addonName) => {
                    const amount = addonPriceMap.get(addonName) ?? 0;
                    return (
                      <li key={addonName} className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-[var(--muted-foreground)]">
                          {addonSummaryLabel[addonName] ?? addonName}
                        </span>
                        <span className="font-semibold text-black">{usdPrecise.format(amount)}</span>
                      </li>
                    );
                  })
              )}
              {hasSpecialDeal ? (
                <li className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[var(--deal)]">Special deal 10% off</span>
                  <span className="font-semibold text-[var(--deal)]">-{usdPrecise.format(discountAmount)}</span>
                </li>
              ) : null}
            </ul>

            <div className="border-t border-[var(--border)] pt-3">
              <p className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[var(--muted-foreground)]">Total</span>
                <span className="flex flex-col items-end leading-tight">
                  {hasSpecialDeal ? (
                    <span className="text-xs text-[var(--muted-foreground)] line-through">{usdPrecise.format(totalPrice)}</span>
                  ) : null}
                  <span className="text-xl font-semibold text-black">{usdPrecise.format(discountedTotal)}</span>
                </span>
              </p>
            </div>
            <Button
              className="w-full rounded-xl border-0 bg-[image:var(--trade-gradient)] text-white shadow-[var(--trade-shadow)]"
              disabled={cartItems.length === 0}
            >
              Continue to payment
            </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-lg border border-[var(--border)] bg-[var(--muted)] py-0 shadow-sm ring-0">
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
    </div>
  );
}
