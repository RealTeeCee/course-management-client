import React from "react";
import { v4 } from "uuid";
import { HeadingH2Com } from "../components/heading";
import LayoutHome from "../layouts/LayoutHome";
import { CategoryGridMod, CategoryItemMod } from "../modules/category";

const HomePage = () => {
  return (
    <LayoutHome>
      <HeadingH2Com number={4}>Category</HeadingH2Com>
      <CategoryGridMod>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CategoryItemMod key={v4()}></CategoryItemMod>
          ))}
      </CategoryGridMod>
      <HeadingH2Com>Best Selling Course</HeadingH2Com>
      <HeadingH2Com>Free Course</HeadingH2Com>
    </LayoutHome>
  );
};

export default HomePage;
