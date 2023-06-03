import { Pagination } from "antd";
import React, { useEffect } from "react";
import { v4 } from "uuid";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { formatNumber } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { onCourseLoading } from "../../store/course/courseSlice";

const CoursePage = () => {
  const { startIndex, endIndex, currentPage, handleChangePage } =
    usePagination(1);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(onCourseLoading());
  }, [dispatch]);

  return (
    <>
      <HeadingH1Com number={formatNumber(data?.length)}>
        All Courses
      </HeadingH1Com>
      <GapYCom></GapYCom>
      <CourseGridMod>
        {data
          ? data.map((course, index) => {
              if (index >= startIndex && index < endIndex) {
                return (
                  <CourseItemMod
                    key={v4()}
                    isPaid={false}
                    isMyCourse={false}
                    url={`/courses/${course.slug}`}
                    course={course}
                  ></CourseItemMod>
                );
              }
              return null;
            })
          : Array(63)
              .fill(0)
              .map((item, index) => {
                if (index >= startIndex && index < endIndex) {
                  return (
                    <CourseItemMod
                      url={`/courses/learn-php-${++index}`}
                      key={v4()}
                    ></CourseItemMod>
                  );
                }
                return null;
              })}
      </CourseGridMod>
      <Pagination
        current={currentPage}
        defaultPageSize={LIMIT_PAGE}
        total={data?.length}
        onChange={handleChangePage}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default CoursePage;
