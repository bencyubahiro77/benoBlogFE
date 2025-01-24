import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Book,ThumbsUp, Users} from "lucide-react"

export default function DashBoard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
        } as React.CSSProperties
      }
    >
      <SideBar  />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between mb-4">
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
      <h1 className="text-3xl dark:text-white ml-8 font-bold">Dashboard</h1>
      <div className="flex flex-1 flex-col gap-4 py-4 px-8">
        <div className="grid auto-rows-min gap-4 xl:grid-cols-4">

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">User</h1>
              <h2 className="font-bold text-2xl">40,635</h2>
            </div>
            <div className="font-semibold bg-color2 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <Users className="w-6 h-6" />
            </div>
          </div>
          
          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">Blog</h1>
              <h2 className="font-bold text-2xl">435</h2>
            </div>
            <div className="font-semibold bg-color5 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <Book className="w-6 h-6" />
            </div>
          </div>

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">Comment</h1>
              <h2 className="font-bold text-2xl">40,635</h2>
            </div>
            <div className="font-semibold bg-color6 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <Book className="w-6 h-6" />
            </div>
          </div>

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">Like</h1>
              <h2 className="font-bold text-2xl">400,635</h2>
            </div>
            <div className="font-semibold bg-color1 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <ThumbsUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="h-[60vh]  rounded-xl bg-white dark:bg-color4 drop-shadow-2xl" />
      </div>
    </div>
  )
}