import { Pagination } from "antd";
import React from "react";
import { v4 } from "uuid";
import { HeadingH1Com } from "../../components/heading";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { formatNumber } from "../../utils/helper";

const CoursePage = () => {
  const { startOffSet, endOffSet, currentPage, handleChangePage } =
    usePagination(1);

  return (
    <>
      <HeadingH1Com number={formatNumber(63)}>All Courses</HeadingH1Com>
      <CourseGridMod>
        {Array(63)
          .fill(0)
          .map((item, index) => {
            if (index >= startOffSet && index < endOffSet) {
              return <CourseItemMod key={v4()}></CourseItemMod>;
            }
            return null;
          })}
      </CourseGridMod>
      <Pagination
        current={currentPage}
        defaultPageSize={process.env.REACT_APP_LIMIT_PAGE}
        total={63}
        onChange={handleChangePage}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default CoursePage;
