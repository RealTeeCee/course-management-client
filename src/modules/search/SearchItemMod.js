import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchItemMod = ({ item }) => {
  const { data: courses } = useSelector((state) => state.course);
  let newItem = [];
  let slug = "/";
  let sub = "";
  switch (item.type) {
    case "COURSE":
      newItem = courses.find((c) => c.id === item.id);
      slug = `/courses/${newItem.slug}`;
      break;
    case "BLOG":
      slug = `/blogs/${newItem.id}`;
      break;
    case "AUTHOR":
      break;
    default:
      break;
  }
  console.log("newItem:", newItem);
  return (
    <Link to={slug}>
      <div className="c-search-item flex items-center gap-x-5">
        <img
          srcSet={newItem.image}
          className="w-[50px] h-[50px] object-cover flex-shrink-0 rounded-xl"
          alt="Search Results"
        />
        <div className="flex-1 text-sm">
          <h3 className="mb-[.25rem]">
            <strong>{newItem.category_name}</strong> {newItem.name}
          </h3>
          <p className="text-gray-400">By FPT Aptech</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItemMod;
