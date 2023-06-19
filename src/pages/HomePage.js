import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { v4 } from "uuid";
import { ButtonCom } from "../components/button";
import GapYCom from "../components/common/GapYCom";
import { HeadingH2Com } from "../components/heading";
import { categoryItems } from "../constants/config";
import usePagination from "../hooks/usePagination";
import { CategoryGridMod, CategoryItemMod } from "../modules/category";
import { CourseGridMod, CourseItemMod } from "../modules/course";
import {
  onBestSellerCourseLoading,
  onCourseLoading,
  onFreeCourseLoading,
} from "../store/course/courseSlice";

const HomePage = () => {
  // const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { startIndex, endIndex, currentPage, handleChangePage } =
    usePagination(1);
  const { data, freeCourse, bestSellerCourse, relatedCourse } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(onCourseLoading());
    dispatch(onFreeCourseLoading());
    dispatch(onBestSellerCourseLoading());
    // dispatch(onRelatedCourseLoading({ categoryId: 1, tagId: 1 }));
  }, [dispatch]);

  return (
    <>
      <div className="h-[200vh] relative">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          grabCursor="true"
          className="!sticky top-0"
          autoplay
        >
          {bestSellerCourse.slice(0, 4).map((c) => (
            <SwiperSlide key={c.id}>
              <div className="w-full h-[300px] rounded-lg relative">
                <div className="overlay tw-bg-gradient-dark absolute inset-0 rounded-lg"></div>
                <img
                  src={c.image}
                  alt={c.category_name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute left-5 bottom-10 w-full text-white">
                  <h2 className="font-bold text-3xl mb-[.75rem] w-[30rem]">
                    {c.achievements}
                  </h2>
                  <p className="mb-[.75rem] text-xl">
                    Only{" "}
                    <span className="text-tw-light-pink font-bold">
                      ${c.net_price}
                    </span>
                  </p>
                  <div className="flex items-center gap-x-3 mb-8">
                    {c.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 border border-white rounded-md"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
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
          ))}
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
          {bestSellerCourse.map((course, index) => {
            if (index >= startIndex && index < endIndex) {
              return <CourseItemMod key={v4()} course={course}></CourseItemMod>;
            }
            return null;
          })}
        </CourseGridMod>

        {/* Free Course */}
        <HeadingH2Com className="text-tw-primary">Free Courses</HeadingH2Com>
        <GapYCom className="mb-3"></GapYCom>

        <CourseGridMod>
          {freeCourse.map((course, index) => {
            if (index >= startIndex && index < endIndex) {
              return <CourseItemMod key={v4()} course={course}></CourseItemMod>;
            }
            return null;
          })}
        </CourseGridMod>
      </div>
    </>
  );
};

export default HomePage;
