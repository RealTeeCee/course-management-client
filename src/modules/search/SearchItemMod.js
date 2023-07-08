import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sliceText } from "../../utils/helper";

const SearchItemMod = ({ item }) => {
  const { data: courses } = useSelector((state) => state.course);
  let newItem = [];
  let slug = "/";
  let subText = "";
  switch (item.type) {
    case "COURSE":
      newItem = courses.find((c) => c.id === item.id);
      slug = `/courses/${newItem?.slug}`;
      subText = sliceText(newItem?.description, 115);
      break;
    case "BLOG":
      newItem = item;
      slug = `/blogs/${newItem?.id}`;
      subText = sliceText(newItem?.description, 115);
      break;
    case "AUTHOR":
      newItem = item;
      slug = `/authors/${newItem?.id}`;
      subText = sliceText(newItem?.description, 115);
      break;
    default:
      break;
  }
  // console.log("newItem:", newItem);
  return (
    <Link to={slug} className="tw-transition-all">
      <div className="c-search-item flex items-center gap-x-5 px-[0.5rem] tw-transition-all hover:border-l-[6px] hover:solid hover:border-tw-primary hover:bg-tw-light">
        <img
          srcSet={newItem?.image}
          className="w-[50px] h-[50px] object-cover flex-shrink-0 rounded-xl"
          alt={newItem?.name}
        />
        <div className="flex-1 text-sm">
          <h3 className="mb-[.25rem]">
            {newItem?.category_name && <strong>{newItem.category_name}</strong>}{" "}
            {newItem?.name}
          </h3>
          <p className="text-gray-400">{subText}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItemMod;
