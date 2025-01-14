import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'

export default function DashBoard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <SideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between mb-8">
          <SidebarTrigger className="-ml-1 dark:text-white" />
          <ModeToggle />
        </header>
        <DashBoardContent />
      </SidebarInset>
    </SidebarProvider>
  )
}

export const DashBoardContent = () => {
  return (
    <div>
      <h1 className="text-3xl dark:text-white ml-12 font-sans">Dashboard</h1>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-red-900" />
            <div className="aspect-video rounded-xl bg-red-900" />
            <div className="aspect-video rounded-xl bg-red-900" />
          </div>
          <div className="h-[60vh]  rounded-xl bg-green-700 " />
        </div>
    </div>
  )
}