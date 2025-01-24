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
import { Link } from "react-router-dom"
import Pagination from "@/AppComponent/pagination"
import { useState } from "react"
import Search from "@/AppComponent/search"

export default function Users() {
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
                    <UsersContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

const users = [
    { name: "Ben Beno", email: "Beno@gmail.com", phone: "1234567890", role: "Admin" },
    // Add your other users here
    // Example data:
    { name: "Jane Doe", email: "jane.doe@example.com", phone: "9876543210", role: "Author" },
    { name: "John Smith", email: "john.smith@example.com", phone: "5551234567", role: "Author" },
    { name: "Ben Beno", email: "Beno@gmail.com", phone: "1234567890", role: "Admin" },
    // Add your other users here
    // Example data:
    { name: "Jane Doe", email: "jane.doe@example.com", phone: "9876543210", role: "Author" },
    { name: "John Smith", email: "john.smith@example.com", phone: "5551234567", role: "Author" },
    { name: "Ben Beno", email: "Beno@gmail.com", phone: "1234567890", role: "Admin" },
    // Add your other users here
    // Example data:
    { name: "Jane Doe", email: "jane.doe@example.com", phone: "9876543210", role: "Author" },
    { name: "John Smith", email: "john.smith@example.com", phone: "5551234567", role: "Author" },
    { name: "Ben Beno", email: "Beno@gmail.com", phone: "1234567890", role: "Admin" },
    // Add your other users here
    // Example data:
    { name: "Jane Doe", email: "jane.doe@example.com", phone: "9876543210", role: "Author" },
    { name: "John Smith", email: "john.smith@example.com", phone: "5551234567", role: "Author" },
    // Add more users to exceed 10 for testing
];

export const UsersContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("")

    const itemsPerPage = 10;

    const filteredUsers = users.filter((user) =>
        Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstBlog, indexOfLastBlog);

    //handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleSearch = (value:string) =>{
      setSearchQuery(value);
    }

    return (
        <div className="ml-8 mr-12 stick">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Users</h1>
                <Search query={searchQuery} onSearch={handleSearch} />
                <Link to="/authorized/createUser">
                    <Button className="">Create User</Button>
                </Link>

            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell >{user.role}</TableCell>
                                <TableCell>
                                    <Button className="mr-2 mb-2"><Pen /></Button>
                                    <Button><Trash2 /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageCHange={handlePageChange}
                />
            </div>
        </div>
    )
}