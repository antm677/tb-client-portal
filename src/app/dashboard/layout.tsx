import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f4f7ff] px-0 pb-4 pt-0 dark:bg-[#001923] lg:bg-white lg:px-6 lg:pb-6 lg:pt-0 dark:lg:bg-[#001923]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-none shadow-none lg:rounded-2xl lg:shadow-sm">
          <SidebarProvider
            className="relative overflow-x-clip"
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset className="md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none">
              <SiteHeader />
              <div className="flex flex-1 flex-col bg-[#f4f7ff] dark:bg-[#001923]">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 px-5 py-0 md:gap-6 md:p-6">{children}</div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}
