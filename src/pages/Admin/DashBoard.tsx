import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Book, ThumbsUp, Users } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchUsersAction } from "../../redux/action/users"
import { fetchBlogsAction } from "../../redux/action/blogs"
import { Loader2 } from "lucide-react"

export default function DashBoard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
        } as React.CSSProperties
      }
    >
      <SideBar />
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
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, currentPage, totalUsers, status } = useSelector((state: RootState) => state.users);
  const { blogsByPage, totalBlogs, totalComments } = useSelector((state: RootState) => state.blogs);

  // Get cached users for the current page
  usersByPage[currentPage] || []
  blogsByPage[currentPage] || []

  useEffect(() => {
    if (!usersByPage[currentPage]) {
      dispatch(fetchUsersAction(currentPage))
    }
  }, [dispatch, currentPage, usersByPage]);

  useEffect(() => {
    if (!blogsByPage[currentPage]) {
      dispatch(fetchBlogsAction(currentPage))
    }
  }, [dispatch, currentPage, blogsByPage]);

  return (
    <div>
      <h1 className="text-3xl dark:text-white ml-8 font-bold">Dashboard</h1>
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10">
          <Loader2 className="animate-spin text-color3 w-12 h-12" />
        </div>
      )}

      <div className={`flex flex-1 flex-col gap-4 py-4 px-8 transition-opacity ${status === "loading" ? "opacity-50": "opacity-100"}`}>
        <div className="grid auto-rows-min gap-4 xl:grid-cols-4">

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">User</h1>
              <h2 className="font-bold text-2xl">{totalUsers}</h2>
            </div>
            <div className="font-semibold bg-color2 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">Blog</h1>
              <h2 className="font-bold text-2xl">{totalBlogs}</h2>
            </div>
            <div className="font-semibold bg-color5 h-14 w-14 mt-1 rounded-3xl items-center justify-center flex text-white ">
              <Book className="w-6 h-6" />
            </div>
          </div>

          <div className="aspect-video rounded-xl bg-white dark:bg-color4 drop-shadow-2xl flex justify-between p-4">
            <div className="text-lg dark:text-white">
              <h1 className="pb-6 font-semibold text-color3- opacity-60">Comment</h1>
              <h2 className="font-bold text-2xl">{totalComments}</h2>
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