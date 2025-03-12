import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <SidebarInset className="min-h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            {/* <UserProfile /> */}
            Admin
          </div>
        </header>
        <div className="flex-1 overflow-auto rounded-xl bg-muted/50">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
