"use client"

import Link from "next/link"
import { Fustat } from "next/font/google"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const fustat = Fustat({ subsets: ["latin"], weight: ["600"] })

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-3">
        <SidebarMenu>
          <SidebarMenuItem className="my-1.5 flex items-center gap-2">
            <SidebarMenuButton
              tooltip="New TradeApp Challenge"
              className={`${fustat.className} min-w-8 h-11 justify-center gap-3 bg-[#FFA301] text-white text-base font-semibold duration-200 ease-linear hover:bg-[#e69500] hover:text-white active:bg-[#e69500] active:text-white`}
              render={<Link href="/challenges" />}
              onClick={handleNavigation}
            >
              <span className={`${fustat.className} font-semibold text-center group-data-[collapsible=icon]:hidden`}>
                New Challenge
              </span>
              <span className="hidden text-xl leading-none font-semibold group-data-[collapsible=icon]:inline">
                +
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className={`${fustat.className} gap-3 text-base [&_svg]:size-5`}
                render={<Link href={item.url} />}
                onClick={handleNavigation}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
