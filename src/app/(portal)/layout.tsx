import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background px-0 dark:bg-[#001923] lg:bg-background lg:px-6 dark:lg:bg-[#001923]">
      <div className="mx-auto min-h-0 flex-1 w-full max-w-7xl">
        <div className="h-full rounded-none shadow-none lg:rounded-xl lg:shadow-none">
          <SidebarProvider
            className="relative h-full overflow-x-clip"
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset className="min-h-0 overflow-hidden md:peer-data-[variant=inset]:shadow-none">
              <SiteHeader />
              <div className="flex min-h-0 flex-1 flex-col bg-[#f4f7ff] dark:bg-[#001923]">
                <div className="@container/main flex min-h-0 flex-1 flex-col gap-2">
                  <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-0 md:gap-6 md:p-6">{children}</div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}
