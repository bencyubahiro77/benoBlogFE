import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsAction } from "../../redux/action/blogs";
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from "react";
import { Blogs } from "@/types/types";

const LatestNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogsByPage, status } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogsAction(1));
  }, [dispatch]);

  const sortedBlog = Object.values(blogsByPage).flat().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestBlogs = sortedBlog.slice(0, 5);

  return (
    <div>
      <div className="mt-4">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : latestBlogs.length === 0 ? (
          <div className="text-center pt-20 h-[20vh]">
            <span className="text-md dark:text-white">No Blogs found</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8 mt-8">
            {latestBlogs.map((blog: Blogs) => (
              <div key={blog.uuid} className="mb-4">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-64 object-cover object-top rounded-md mb-2"
                />
                <div className="flex items-center">
                  <h2 className="pr-2">{blog.author}</h2>
                  ~
                  <p className="pl-2">
                    {new Date(blog.createdAt || '').toDateString()}
                  </p>
                </div>
                <h2 className="text-xl font-semibold mt-2">
                  {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNews;