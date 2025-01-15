import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pen, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Link } from "react-router-dom"
  

export default function Blog() {
    return (
        <div>
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
                    <BlogContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export const BlogContent = () => {
    return (
        <div className="ml-8 mr-12">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Users</h1>
                <Input placeholder="Search" className="w-72" />
                <Link to="/authorized/createUser">
                   <Button className="">Create User</Button> 
                </Link>
               
            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Ben Beno</TableCell>
                            <TableCell>Beno@gmail.com</TableCell>
                            <TableCell>Business</TableCell>
                            <TableCell >Admin</TableCell>
                            <TableCell>
                                <Button className="mr-2 mb-2"><Pen /></Button>
                                <Button><Trash2 /></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}