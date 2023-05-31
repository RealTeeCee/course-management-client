import React, { useEffect } from "react";
import { v4 } from "uuid";
import { HeadingH2Com } from "../components/heading";
import { CategoryGridMod, CategoryItemMod } from "../modules/category";
import { CourseGridMod, CourseItemMod } from "../modules/course";
import { Swiper, SwiperSlide } from "swiper/react";
import { ButtonCom } from "../components/button";
import GapYCom from "../components/common/GapYCom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { API_COURSE_URL } from "../constants/endpoint";
import { categoryItems } from "../constants/config";

const HomePage = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axiosPrivate.get(API_COURSE_URL);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="h-[200vh] relative">
        <Swiper
          // slidesPerView={3}
          slidesPerView={"auto"}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          grabCursor="true"
          className="!sticky top-0"
        >
          <SwiperSlide>
            <div className="w-full h-[300px] rounded-lg relative">
              <div className="overlay tw-bg-gradient-dark absolute inset-0 rounded-lg"></div>
              <img
                src="https://media.istockphoto.com/id/1321058115/vi/anh/k%E1%BA%BFt-xu%E1%BA%A5t-3d-c%E1%BB%A7a-blockchain-tr%C3%AAn-n%E1%BB%81n-t%E1%BA%A3ng-c%C3%B4ng-ngh%E1%BB%87.jpg?s=2048x2048&w=is&k=20&c=QoC7d4ZnAtBVR5PCS9U-itYA7MKfvZx-2pLM2K8AXxE="
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute left-5 bottom-10 w-full text-white">
                <h2 className="font-bold text-3xl mb-[.75rem] w-[30rem]">
                  Become Master ReactJS with Backend Laravel
                </h2>
                <p className="mb-[.75rem] text-xl">
                  Saling only{" "}
                  <span className="text-tw-light-pink font-bold">$300</span>
                </p>
                <div className="flex items-center gap-x-3 mb-8">
                  <span className="px-4 py-2 border border-white rounded-md">
                    Programming
                  </span>
                  <span className="px-4 py-2 border border-white rounded-md">
                    Front-end
                  </span>
                  <span className="px-4 py-2 border border-white rounded-md">
                    Back-end
                  </span>
                </div>
                <ButtonCom
                  className="font-tw-secondary font-semibold"
                  // onClick={() => navigate(`/movie/${id}`)}
                >
                  View Detail
                </ButtonCom>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
        </Swiper>
      </div>

      <div className="relative z-10 -mt-[160vh] pt-3 min-h-screen bg-tw-light">
        {/* Category  */}
        <HeadingH2Com className="text-tw-primary" number={4}>
          Categories
        </HeadingH2Com>
        <GapYCom className="mb-3"></GapYCom>
        <CategoryGridMod>
          {categoryItems.map((item) => (
            <CategoryItemMod key={item.value} item={item}></CategoryItemMod>
          ))}
        </CategoryGridMod>

        {/* Selling Course */}
        <HeadingH2Com className="text-tw-primary">
          Best Selling Courses
        </HeadingH2Com>
        <GapYCom className="mb-3"></GapYCom>
        <CourseGridMod>
          {Array(4)
            .fill(0)
            .map((item) => (
              <CourseItemMod key={v4()}></CourseItemMod>
            ))}
        </CourseGridMod>

        {/* Free Course */}
        <HeadingH2Com className="text-tw-primary">Free Courses</HeadingH2Com>
        <GapYCom className="mb-3"></GapYCom>
        <CourseGridMod>
          {Array(4)
            .fill(0)
            .map((item) => (
              <CourseItemMod key={v4()}></CourseItemMod>
            ))}
        </CourseGridMod>
      </div>
    </>
  );
};

export default HomePage;
