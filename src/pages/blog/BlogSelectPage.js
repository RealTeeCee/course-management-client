import React from "react";
import { AiOutlineClockCircle, AiOutlineTags } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { blog } from "../../assets/blog_data/data";
import Carousel_3 from "../../assets/blog_image/Carousel_3.jpg";
import { HeadingFormH1Com } from "../../components/heading";
import { Pagination } from "antd";
import usePagination from "../../hooks/usePagination";

const BlogSelectPage = () => {
  const limit = 6;
  const { startIndex, endIndex, currentPage, handleChangePage } = usePagination(
    1,
    limit
  );
  return (
    <>
      <div className="max-w-[1240px] mx-auto py-6 px-4 text-center">
        <HeadingFormH1Com>MY BLOG </HeadingFormH1Com>
        <h2 className="py-4">
          <div>
            We’ve got everything you need to deliver flexible and effective
            skills development for your entire workforce.
          </div>
          <div>
            Teach what you know and help learners explore their interests, gain
            new skills, and advance their careers.
          </div>
          <div>
            Publish the course you want, in the way you want, and always have
            control of your own content.
          </div>
          <div>
            Expand your professional network, build your expertise, and earn
            money on each paid enrollment.
          </div>
        </h2>
      </div>
      <section className="my-12">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {Array(20)
            .fill(0)
            .map((item, index) => {
              if (index >= startIndex && index < endIndex) {
                return (
                  <Link key={blog.id} to={`/blogs/${2}`}>
                    <div
                      key={index}
                      className="transition-all duration-[0.5s] border-solid border-[1px] border-[#e6e6e6] rounded-[12px] p-[20px] bg-white hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]"
                    >
                      <div id="img">
                        <img
                          src={Carousel_3}
                          alt=""
                          className="w-full h-[250px] object-cover rounded-[10px] mb-[20px]"
                        />
                      </div>
                      <div className="flex items-center mb-3">
                        <AiOutlineTags className="mr-[10px] text-[25px]" />
                        <label className="block mr-[20px] mb-0 text-[#999] text-[15px]">
                          NextJs
                        </label>
                      </div>
                      <div id="details">
                        <div className="text-black border-none bg-none outline-none cursor-pointer no-underline list-none text-[17px]">
                          <h3 className="font-[500]">
                            Ghost CMS is a popular content management system
                            that many devs and companies use to host their
                            blogs...
                          </h3>
                        </div>
                        <p className="text-[#999] font-[400] my-[20px] text-[17px] leading-[25px]">
                          You might be using a comment system to manage your
                          blog's discussions and comments...
                        </p>
                        <div id="date" className="flex items-center mt-3">
                          <AiOutlineClockCircle className="mr-[10px] text-[40px]" />
                          <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                            May 13, 2022
                          </label>
                          <BsFillPersonVcardFill className="mr-[10px] text-[40px]" />
                          <label className="block mr-[20px] mb-0 text-[#999] text-[13px]">
                            Rajdeep Singh
                          </label>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
              return null;
            })}
        </div>
      </section>
      <Pagination
        current={currentPage}
        onChange={handleChangePage}
        total={20}
        defaultPageSize={limit}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default BlogSelectPage;
