import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { v4 } from "uuid";
import { ButtonCom } from "../components/button";
import GapYCom from "../components/common/GapYCom";
import { HeadingH2Com } from "../components/heading";
import { categoryItems, LIMIT_HOME_PAGE } from "../constants/config";
import usePagination from "../hooks/usePagination";
import { CategoryGridMod, CategoryItemMod } from "../modules/category";
import { CourseGridMod, CourseItemMod } from "../modules/course";
import {
  onBestSellerCourseLoading,
  onCourseLoading,
  onFreeCourseLoading,
} from "../store/course/courseSlice";
import { sliceText } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

const HomePage = () => {
  // const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const {
    startIndex: startIndexBestSeller,
    endIndex: endIndexBestSeller,
    currentPage: currentPageBestSeller,
    handleChangePage: handleChangePageBestSeller,
  } = usePagination(1, LIMIT_HOME_PAGE);
  const {
    startIndex: startIndexFreeCourse,
    endIndex: endIndexFreeCourse,
    currentPage: currentPageFreeCourse,
    handleChangePage: handleChangePageFreeCourse,
  } = usePagination(1, LIMIT_HOME_PAGE);
  const { data, freeCourse, bestSellerCourse, relatedCourse } = useSelector(
    (state) => state.course
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(onCourseLoading());
    dispatch(onFreeCourseLoading());
    dispatch(onBestSellerCourseLoading());
    // dispatch(onRelatedCourseLoading({ categoryId: 1, tagId: 1 }));
  }, [dispatch]);

  return (
    <>
      <div className="h-[100vh] relative">
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
                    {sliceText(c.name, 50)}
                  </h2>
                  <p className="mb-[.75rem] text-xl">
                    Only{" "}
                    <span className="text-tw-light-pink font-bold">
                      ${c.net_price}
                    </span>
                  </p>
                  <div className="flex items-center gap-x-3 mb-8">
                    {c.tags
                      .split(",")
                      .slice(0, 3)
                      .map((tag) => (
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
                    onClick={() => navigate(`/courses/${c.slug}`)}
                  >
                    See more
                  </ButtonCom>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 -mt-[60vh] pt-3 min-h-screen bg-tw-light">
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

        {bestSellerCourse && bestSellerCourse.length > 0 ? (
          <>
            <CourseGridMod>
              {bestSellerCourse.map((course, index) => {
                if (
                  index >= startIndexBestSeller &&
                  index < endIndexBestSeller
                ) {
                  return (
                    <CourseItemMod
                      key={v4()}
                      url={`/courses/${course?.slug}`}
                      course={course}
                    ></CourseItemMod>
                  );
                }
                return null;
              })}
            </CourseGridMod>
            <Pagination
              current={currentPageBestSeller}
              defaultPageSize={4}
              total={bestSellerCourse?.length}
              onChange={handleChangePageBestSeller}
              className="mt-[1rem] text-end"
            />
          </>
        ) : (
          <HeadingH2Com className="text-black text-4xl text-center py-10">
            No data
          </HeadingH2Com>
        )}

        {/* Free Course */}
        <HeadingH2Com className="text-tw-primary">Free Courses</HeadingH2Com>
        <GapYCom className="mb-3"></GapYCom>

        <CourseGridMod>
          {freeCourse.map((course, index) => {
            if (index >= startIndexFreeCourse && index < endIndexFreeCourse) {
              return (
                <CourseItemMod
                  key={v4()}
                  url={`/courses/${course?.slug}`}
                  course={course}
                ></CourseItemMod>
              );
            }
            return null;
          })}
        </CourseGridMod>
        <Pagination
          current={currentPageFreeCourse}
          defaultPageSize={4}
          total={freeCourse?.length}
          onChange={handleChangePageFreeCourse}
          className="mt-[1rem] text-end"
        />
      </div>
    </>
  );
};

export default HomePage;
