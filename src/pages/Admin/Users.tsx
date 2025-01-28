import React, { useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUsersAction } from "../../redux/action/users"
import { setCurrentPage } from "../../redux/slice/users"
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
import { User } from '../../types/types';
import Pagination from "@/AppComponent/pagination"
import { AppDispatch, RootState } from '../../redux/store';
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

export const UsersContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hasFetched = useRef(false)
    const { users, currentPage, totalPages, status, } = useSelector((state: RootState) => state.users);
    const [searchQuery, setSearchQuery] = React.useState("");


    const fetchUsers = useCallback(() => {
        if (!hasFetched.current) {
            dispatch(fetchUsersAction(currentPage));
            hasFetched.current = true;
        }
    }, [currentPage, dispatch])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const filteredUsers = users ? users.filter((user: User) =>
        Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    ) : [];

    //handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                        {status === "loading" ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white">Loading...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user: User, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell >{user.role}</TableCell>
                                    <TableCell>
                                        <Button className="mr-2 mb-2"><Pen /></Button>
                                        <Button><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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