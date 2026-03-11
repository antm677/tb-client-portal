"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3Icon,
  CircleHelpIcon,
  CreditCardIcon,
  HeadsetIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  WalletCardsIcon,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: (
        <HomeIcon
        />
      ),
    },
    {
      title: "My accounts",
      url: "/my-accounts",
      icon: (
        <WalletCardsIcon
        />
      ),
    },
    // {
    //   title: "Challenges",
    //   url: "/challenges",
    //   icon: (
    //     <FlagIcon
    //     />
    //   ),
    // },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: (
        <BarChart3Icon
        />
      ),
    },
    {
      title: "Community",
      url: "/community",
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Profile",
      url: "/profile",
      icon: (
        <UserIcon
        />
      ),
    },
    {
      title: "Billing",
      url: "/billing",
      icon: (
        <CreditCardIcon
        />
      ),
    },
    {
      title: "FAQ",
      url: "/faq",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Support",
      url: "/support",
      icon: (
        <HeadsetIcon
        />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const logoSrc = mounted && theme === "dark" ? "/trading_logo_dark.svg" : "/trading_logo.svg"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <img
                src={logoSrc}
                alt="Trading logo"
                className="h-10 w-auto group-data-[collapsible=icon]:hidden"
              />
              <img
                src="/trading_logo_collapsed.svg"
                alt="Trading logo"
                className="hidden h-8 w-8 group-data-[collapsible=icon]:block"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
