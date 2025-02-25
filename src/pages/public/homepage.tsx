import { useSelector, useDispatch } from "react-redux"
import { fetchBlogsAction } from "../../redux/action/blogs"
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from "react";
import { ArrowRightCircle } from "lucide-react"
import NavBar from "@/AppComponent/navBar";
import Footer from "@/AppComponent/footer";
import BlogHealth from "./BlogHealth";
import BlogPolitics from "./BlogPolitics";
import BlogSports from "./BlogSports";
import BlogTechnology from "./BlogTechnology";
import LatestNews from "./LatestNews";


const homepage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { blogsByPage, status } = useSelector((state: RootState) => state.blogs);

    const latestBlog = blogsByPage[1]?.[0];

    useEffect(() => {
        dispatch(fetchBlogsAction(1));
    }, [dispatch]);

    return (
        <div className="md:mx-12 m-1 my-4">
            <NavBar />
            <div className="mt-4">
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : latestBlog ? (
                    <div>
                        <img
                            src={latestBlog.coverImage}
                            alt={latestBlog.title}
                            className="w-full max-h-[80vh] object-cover object-top rounded-md"
                        />
                        <div className="flex items-center justify-between mt-2">
                            <h2 className="border p-2 rounded-md">{latestBlog.category.charAt(0).toUpperCase() + latestBlog.category.slice(1)}</h2>
                            <p className="text-sm text-gray-500 mt-2">
                                {new Date(latestBlog.createdAt || '').toDateString()}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <h2 className="text-xl font-semibold mt-2">
                                {latestBlog.title.charAt(0).toUpperCase() + latestBlog.title.slice(1)}
                            </h2>
                            <h2 className="flex gap-1">
                                <a href={`/blogs/${latestBlog.uuid}`}>
                                    Read Article
                                </a>
                                <ArrowRightCircle />
                            </h2>
                        </div>
                    </div>
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
            <div>
                <div className="flex justify-between items-center border-b-2 mt-12 pb-2">
                    <h1 className="font-bold text-xl">LATEST NEWS</h1>
                    <h2 className="flex gap-1">
                        <a>
                            View All
                        </a>
                        <ArrowRightCircle />
                    </h2>
                </div>
                <LatestNews />
            </div>
            <div>
                <div className="flex justify-between items-center border-b-2 mt-12 pb-2">
                    <h1 className="font-bold text-xl">POLITICS</h1>
                    <h2 className="flex gap-1">
                        <a>
                            View All
                        </a>
                        <ArrowRightCircle />
                    </h2>
                </div>
                <BlogPolitics />
            </div>
            <div>
                <div className="flex justify-between items-center border-b-2 mt-12 pb-2">
                    <h1 className="font-bold text-xl">TECHNOLOGY</h1>
                    <h2 className="flex gap-1">
                        <a>
                            View All
                        </a>
                        <ArrowRightCircle />
                    </h2>
                </div>
                <BlogTechnology />
            </div>

            <div>
                <div className="flex justify-between items-center border-b-2 mt-12 pb-2">
                    <h1 className="font-bold text-xl">HEALTH</h1>
                    <h2 className="flex gap-1">
                        <a>
                            View All
                        </a>
                        <ArrowRightCircle />
                    </h2>
                </div>
                <BlogHealth />
            </div>
            <div className="mb-12">
                <div className="flex justify-between items-center border-b-2 mt-12 pb-2">
                    <h1 className="font-bold text-xl">SPORTS</h1>
                    <h2 className="flex gap-1">
                        <a>
                            View All
                        </a>
                        <ArrowRightCircle />
                    </h2>
                </div>
                <BlogSports />
            </div>
            <Footer />
        </div>
    );
};

export default homepage;