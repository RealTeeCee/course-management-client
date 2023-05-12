import { Pagination } from "antd";
import React from "react";
import { v4 } from "uuid";
import { HeadingH1Com } from "../../components/heading";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { formatNumber } from "../../utils/helper";

const MyCoursePage = () => {
  const { startOffSet, endOffSet, currentPage, handleChangePage } =
    usePagination(1);

  return (
    <>
      <HeadingH1Com number={formatNumber(5)}>My Courses</HeadingH1Com>
      <CourseGridMod>
        {Array(5)
          .fill(0)
          .map((item, index) => {
            if (index >= startOffSet && index < endOffSet) {
              return <CourseItemMod key={v4()} isPaid={true}></CourseItemMod>;
            }
            return null;
          })}
      </CourseGridMod>
      <Pagination
        current={currentPage}
        defaultPageSize={process.env.REACT_APP_LIMIT_PAGE}
        total={5}
        onChange={handleChangePage}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default MyCoursePage;
