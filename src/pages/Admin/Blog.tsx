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

const blog = [
    {
        "title": "Understanding React",
        "author": "John Doe",
        "category": "Web Development",
        "description": "A comprehensive guide to getting started with React.js."
    },
    {
        "title": "CSS Best Practices",
        "author": "Jane Smith",
        "category": "Design",
        "description": "Tips and tricks for writing clean and maintainable CSS."
    },
    {
        "title": "Introduction to Python",
        "author": "Alice Johnson",
        "category": "Programming",
        "description": "Learn the basics of Python programming for beginners."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    },
    {
        "title": "Mastering Tailwind CSS",
        "author": "Robert Brown",
        "category": "UI/UX",
        "description": "A deep dive into building modern interfaces with Tailwind CSS."
    }
]

export const BlogContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("")

    const itemsPerPage = 10;
    const filteredBlogs = blog.filter((blog) =>
        Object.values(blog)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    // Calculate total pages
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlog = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    //handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleSearch = (value:string) =>{
        setSearchQuery(value);
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
                            {/* <TableHead>Description</TableHead> */}
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentBlog.map((blog, index) => (
                            <TableRow key={index}>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.author}</TableCell>
                                <TableCell>{blog.category}</TableCell>
                                {/* <TableCell >{blog.description}</TableCell> */}
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