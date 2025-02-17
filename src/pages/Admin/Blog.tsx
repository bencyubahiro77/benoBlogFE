import React, { useEffect, useMemo, useState } from "react"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Pen, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "@/AppComponent/pagination"
import { AppDispatch, RootState } from '../../redux/store';
import Search from "@/AppComponent/search"
import { Blogs } from "../../types/types"
import { unwrapResult } from '@reduxjs/toolkit';
import { useToast } from "@/hooks/use-toast"
import { deleteBlogAction } from "@/redux/action/deleteBlog"

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
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blogs | null>(null)

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()
    const navigate = useNavigate()
    const { blogsByPage, currentPage, totalPages, status, } = useSelector((state: RootState) => state.blogs);
    const loading = useSelector((state: RootState) => state.deleteBlog.loading);

    const blogs = blogsByPage[currentPage] || [];

    useEffect(() => {
        if (!blogsByPage[currentPage]) {
            dispatch(fetchBlogsAction(currentPage));
        }
    }, [dispatch, currentPage, blogsByPage]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog: Blogs) =>
            Object.values(blog)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    }, [blogs, searchQuery])

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    }

    //handle page change
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const canEditOrDelete = (blogAuthorId: string) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        const userId = user ? user.id : null;
        const userRole = user ? user.role : null;

        // Check if the user is an admin or the author of the blog
        return userRole === 'admin' || userId === blogAuthorId;
    };

    const handleDeleteBlog = (blog: Blogs) => {
        setBlogToDelete(blog)
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setBlogToDelete(null);
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async (blogId: any) => {
        if (blogToDelete) {
            try {
                const resultAction = await dispatch(deleteBlogAction(blogId));
                unwrapResult(resultAction);
                const successMessage = resultAction.payload?.message;
                toast({
                    description: successMessage,
                });
            } catch (error: any) {
                const errorMessage = error?.message || 'Failed to delete blog';
                toast({
                    variant: "destructive",
                    description: errorMessage,
                })
            }
            finally {
                setBlogToDelete(null);
                setIsDialogOpen(false);
            }
        }
    };

    const handleEditBlog = (blog:Blogs) =>{
        navigate("/authorized/createBlog", {state:{ blogToEdit: blog}});
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
                            <TableHead>Comments</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {status === "loading" ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white flex">
                                            <Loader2 className="animate-spin" />
                                            <p className="pl-2">Loading...</p>
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredBlogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-md dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredBlogs.map((blog: Blogs) => (
                                <TableRow key={blog.uuid}>
                                    <TableCell>{blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}</TableCell>
                                    <TableCell>{blog.author}</TableCell>
                                    <TableCell>{blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}</TableCell>
                                    <TableCell >{blog.description
                                        ? `${blog.description.slice(0, 10)}...`
                                        : blog.description}
                                    </TableCell>
                                    <TableCell>{blog.comments.length}</TableCell>
                                    {canEditOrDelete(blog.authorId) && (
                                        <TableCell>
                                            <div className="flex gap-2 items-center justify-center">
                                                <Pen className="cursor-pointer h-[1.3em]" onClick={() => handleEditBlog(blog)} />
                                                <Trash2 className="cursor-pointer h-[1.3em]" onClick={() => handleDeleteBlog(blog)}/>
                                            </div>
                                        </TableCell>
                                    )}
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
            {isDialogOpen && blogToDelete && (
                <Dialog open={isDialogOpen} onOpenChange={handleCancel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Are you sure you want to delete {blogToDelete.title} ?</DialogTitle>
                            <DialogDescription className="pt-4 justify-center flex ">
                                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                <Button variant="destructive" className="ml-4" disabled={loading} onClick={() => handleConfirmDelete(blogToDelete.uuid)}>
                                    {loading ? <Loader2 className='animate-spin' /> : 'Confirm'}
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}