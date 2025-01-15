import { ChevronUp, Home, Book, Users, User2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/admin/blog",
    icon: Book,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
]

export function SideBar() {
  const location = useLocation() 
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl justify-center mb-4 mt-4 font-extrabold">Beno Blog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => {
                const isActive = location.pathname === item.url; 
                return (
                  <SidebarMenuItem
                    className={`py-2 ${isActive ? "bg-color1 text-white rounded-lg " : ""}`} 
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="text-lg pl-4 font-semibold opacity-100 hover:bg-inherit rounded-lg hover:text-white"
                      asChild
                    >
                      <Link to={item.url}>
                        <item.icon className="mr-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <LogoutSideBar />
    </Sidebar>
  )
}

export function LogoutSideBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton >
          <User2 /> Benjamin Cyubahiro
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem>
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
