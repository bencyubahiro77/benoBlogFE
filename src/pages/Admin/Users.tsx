import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Button } from "@/components/ui/button"

export default function User() {
    return (
        <div>
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
                    <UserContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export const UserContent = () => {
    return (
        <div>
            <div className="flex justify-between ml-12 mr-12">
                <h1 className="text-3xl dark:text-white">Users</h1>
                <Button>Create User</Button>
            </div>

        </div>
    )
}