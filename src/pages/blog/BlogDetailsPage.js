import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosBearer } from "../../api/axiosInstance";
import { FaEye } from "react-icons/fa";
import ButtonBackCom from "../../components/button/ButtonBackCom";
import moment from "moment/moment";
import { BreadcrumbCom } from "../../components/breadcrumb";
import { useSelector } from "react-redux";
import { getBlogViewCount, setBlogViewCount } from "../../utils/authBlog";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateViewCount(); // Call updateViewCount to update new view_count
        const response = await axiosBearer.get(`/blog/${slug}`);
        setBlogs({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
          view_count: response.data.view_count,
          created_at: response.data.created_at
            ? moment(response.data.created_at).format("DD/MM/YYYY")
            : "", // Format the date
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [slug]);

  const updateViewCount = async () => {
    try {
      const cookieViewCount = getBlogViewCount(slug);
      if (cookieViewCount === 0) {
        await axiosBearer.put(`/blog/view-count/${slug}`, {
          view_count: viewCount + 1,
        });
        setViewCount((prevCount) => prevCount + 1);
        setBlogViewCount(slug, viewCount + 1); // Tạo cookie mới
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {blogs ? (
        <section className="bg-white max-w-[1240px] mx-auto py-10 px-24">
          <div className="container">
            <div className="flex justify-center">
              <img
                className="w-full h-80 rounded-2xl object-cover"
                src={blogs.image}
                alt=""
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                  <AiOutlineClockCircle className="mr-[10px] text-[20px]" />
                  <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                    Date: {blogs.created_at}
                  </label>
                </div>
                <div className="flex justify-end">
                  <FaEye className="mr-[10px] text-[20px]" />
                  <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                    {blogs.view_count}
                  </label>
                </div>
              </div>

              <h1 className="text-3xl font-medium">{blogs.name}</h1>
              <h3 className="my-5 text-lg capitalize leading-7">
                {/* {ReactHtmlParser(blogs.description)} */}
                <div
                  dangerouslySetInnerHTML={{ __html: blogs.description }}
                ></div>
              </h3>
              <div className="flex justify-between items-center">
                {user && user.role === "ADMIN" ? (
                  <BreadcrumbCom
                    items={[
                      {
                        title: "Admin",
                        slug: "/admin",
                      },
                      {
                        title: "Blog Detail",
                        isActive: true,
                      },
                    ]}
                  />
                ) : (
                  <ButtonBackCom />
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogDetailsPage;
