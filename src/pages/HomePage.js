import React from "react";
import { v4 } from "uuid";
import { HeadingH2Com } from "../components/heading";
import LayoutHome from "../layouts/LayoutHome";
import { CategoryGridMod, CategoryItemMod } from "../modules/category";
import { CourseGridMod, CourseItemMod } from "../modules/course";
import { Swiper, SwiperSlide } from "swiper/react";
import { ButtonCom } from "../components/button";
import GapYCom from "../components/common/GapYCom";

const HomePage = () => {
  return (
    <LayoutHome>
      <Swiper
        // slidesPerView={3}
        slidesPerView={"auto"}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        grabCursor="true"
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
      <GapYCom></GapYCom>
      {/* Category  */}
      <HeadingH2Com className="text-tw-primary" number={4}>Category</HeadingH2Com>
      <CategoryGridMod>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CategoryItemMod key={v4()}></CategoryItemMod>
          ))}
      </CategoryGridMod>
      <GapYCom></GapYCom>
      {/* Selling Course */}
      <HeadingH2Com className="text-tw-primary">Best Selling Course</HeadingH2Com>
      <CourseGridMod>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CourseItemMod key={v4()}></CourseItemMod>
          ))}
      </CourseGridMod>

      <GapYCom></GapYCom>
      {/* Free Course */}
      <HeadingH2Com className="text-tw-primary">Free Course</HeadingH2Com>
      <CourseGridMod>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CourseItemMod key={v4()}></CourseItemMod>
          ))}
      </CourseGridMod>
    </LayoutHome>
  );
};

export default HomePage;
