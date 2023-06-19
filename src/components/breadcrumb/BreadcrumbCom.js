import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";

const BreadcrumbCom = ({ items = [] }) => {
  return (
    <ol className="breadcrumb">
      {items.map((item, i) => (
        <li
          key={item.slug}
          className={`breadcrumb-item ${item.isActive ? "active" : ""}`}
        >
          {item.isActive ? (
            item.title
          ) : (
            <Link
              to={item.slug}
              title={`${item.title} Page`}
              className={`${item.isActive ? "" : "text-tw-primary"}`}
            >
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
};

BreadcrumbCom.propTypes = {
  items: PropTypes.array.isRequired,
};
export default withErrorBoundary(BreadcrumbCom, {
  FallbackComponent: ErrorCom,
});
