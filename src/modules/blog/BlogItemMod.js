import React from "react";
import { Link } from "react-router-dom";
import { HeadingH5Com } from "../../components/heading";
import { ImageCom } from "../../components/image";
import { IMAGE_DEFAULT } from "../../constants/config";
import { getItemsAfterCallApiSearch } from "../../utils/helper";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../../components/common/ErrorCom";
import { useSelector } from "react-redux";

const BlogItemMod = ({ item, type }) => {
  const { data: courses } = useSelector((state) => state.course);
  const newItem = getItemsAfterCallApiSearch(item, type, courses, 250);

  return (
    <Link to={newItem.slug} className="tw-transition-all">
      <div className="blog-box blog-list row">
        <div className="col-md-2">
          <div className="w-full h-[150px]">
            <ImageCom
              srcSet={newItem.image ?? IMAGE_DEFAULT}
              alt={newItem.name}
            ></ImageCom>
          </div>
        </div>
        <div className="col-md-10">
          <div className="blog-details">
            <HeadingH5Com>{newItem.name}</HeadingH5Com>
            <div className="blog-bottom-content">
              <ul className="blog-social">
                <li>by: FPT Aptech</li>
                <li>{newItem.countText}</li>
              </ul>
              <hr />
              <p className="mt-0">{newItem.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

BlogItemMod.propTypes = {
  item: PropTypes.object,
  type: PropTypes.oneOf(["BLOG", "COURSE", "AUTHOR"]),
  children: PropTypes.node,
};
export default withErrorBoundary(BlogItemMod, {
  FallbackComponent: ErrorCom,
});
