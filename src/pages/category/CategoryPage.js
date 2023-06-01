import { Pagination } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { categoryItems, LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { CategoryGridMod, CategoryItemMod } from "../../modules/category";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { formatNumber } from "../../utils/helper";

const CategoryPage = () => {
  return (
    <>
      <HeadingH1Com number={formatNumber(4)}>All Categories</HeadingH1Com>
      <GapYCom></GapYCom>
      <CategoryGridMod>
        {categoryItems.map((item) => (
          <CategoryItemMod key={item.value} item={item}></CategoryItemMod>
        ))}
      </CategoryGridMod>
    </>
  );
};

export default CategoryPage;
