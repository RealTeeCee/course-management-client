import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { blog } from "../../assets/blog_data/data";
import { HeadingH2Com } from "../../components/heading";
import { axiosBearer } from "../../api/axiosInstance";
import Carousel_4 from "../../assets/blog_image/Carousel_4.jpg";
import { FaEye } from "react-icons/fa";
import ButtonBackCom from "../../components/button/ButtonBackCom";
import moment from "moment/moment";
import { create } from "lodash";
import { BreadcrumbCom } from "../../components/breadcrumb";
import { useSelector } from "react-redux";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [viewCount, setViewCount] = useState(0);// Lưu trữ số lượt truy cập


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosBearer.get(`/blog/${id}`);
  //       console.log(response);
  //       setBlogs({
  //         name: response.data.name,
  //         description: response.data.description,
  //         image: response.data.image,
  //         view_count: response.data.view_count,
  //         created_at: response.data.created_at
  //           ? moment(response.data.created_at).format("DD/MM/YYYY")
  //           : "", // Format the date
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const fetchData = async () => {
    try {
      const response = await axiosBearer.get(`/blog/${id}`);
      console.log(response);
      const blogData = {
        name: response.data.name,
        description: response.data.description,
        image: response.data.image,
        view_count: response.data.view_count,
        created_at: response.data.created_at
          ? moment(response.data.created_at).format("DD/MM/YYYY")
          : "",
      };
      setBlogs(blogData);
  
      // Increase view count
      const updatedViewCount = blogData.view_count + 1;
      setViewCount(updatedViewCount);
      console.log("count",updatedViewCount)
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchData();
  
  
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
                <div dangerouslySetInnerHTML={{ __html: blogs.description }}></div>
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
