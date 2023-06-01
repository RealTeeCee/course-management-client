import { Pagination } from "antd";
import React from "react";
import { v4 } from "uuid";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { formatNumber } from "../../utils/helper";

const CoursePage = () => {
  const { startIndex, endIndex, currentPage, handleChangePage } =
    usePagination(1);

  return (
    <>
      <HeadingH1Com number={formatNumber(63)}>All Courses</HeadingH1Com>
      <GapYCom></GapYCom>
      <CourseGridMod>
        {Array(63)
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
        total={63}
        onChange={handleChangePage}
        className="mt-[1rem] text-center"
      />
    </>
  );
};

export default CoursePage;
