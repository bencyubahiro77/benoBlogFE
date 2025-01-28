import React, { useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBlogsAction } from "../../redux/action/blogs"
import { setCurrentPage } from "../../redux/slice/blogs"
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
import { AppDispatch, RootState } from '../../redux/store';
import Search from "@/AppComponent/search"
import { Blogs } from "../../types/types"

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
    const dispatch = useDispatch<AppDispatch>();
    const hasFetched = useRef(false);
    const { blogs, currentPage, totalPages, status, } = useSelector((state: RootState) => state.blogs);
    const [searchQuery, setSearchQuery] = React.useState("");

    const fetchBlogs = useCallback(() => {
        if (!hasFetched.current) {
            dispatch(fetchBlogsAction(currentPage));
            hasFetched.current = true;
        }
    }, [currentPage, dispatch]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs])

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    }

    const filteredBlogs = blogs ? blogs.filter((blog: Blogs) =>
        Object.values(blog)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    ) : [];

    //handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <div className="ml-8 mr-12">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Blogs</h1>
                <Search query={searchQuery} onSearch={handleSearch} />
                <Link to="/authorized/createBlog">
                    <Button className="">Create Blog</Button>
                </Link>
            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
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
                        ) : filteredBlogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ):(
                        filteredBlogs.map((blog: Blogs, index) => (
                        <TableRow key={index}>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.author}</TableCell>
                            <TableCell>{blog.category}</TableCell>
                            <TableCell >{blog.description.length > 20 
                              ? `${blog.description.substring(0, 20)}...`
                              :  blog.description}
                            </TableCell>
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