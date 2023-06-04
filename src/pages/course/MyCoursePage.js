import { Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { onMyCourseLoading } from "../../store/course/courseSlice";
import { formatNumber } from "../../utils/helper";

const MyCoursePage = () => {
  const { startIndex, endIndex, currentPage, handleChangePage } =
    usePagination(1);

  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onMyCourseLoading(user.id));
  }, [dispatch, user.id]);
  return (
    <>
      <HeadingH1Com number={formatNumber(data?.length)}>
        My Courses
      </HeadingH1Com>
      <GapYCom></GapYCom>
      <CourseGridMod>
        {data
          ? data.map((course, index) => {
              if (index >= startIndex && index < endIndex) {
                return (
                  <CourseItemMod
                    key={v4()}
                    isPaid={true}
                    isMyCourse={true}
                    url={`/learn/${course.slug}`}
                    course={course}
                  ></CourseItemMod>
                );
              }
              return null;
            })
          : Array(5)
              .fill(0)
              .map((item, index) => {
                if (index >= startIndex && index < endIndex) {
                  return (
                    <CourseItemMod
                      key={v4()}
                      isPaid={true}
                      url="/learn/php-01?id=1"
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

export default MyCoursePage;
