import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";

const ButtonCom = (props) => {
  const {
    type = "button",
    className = "",
    isLoading = false,
    children,
    backgroundColor = "btn-primary",
    ...rest
  } = props;

  // If isLoading will show animate loadding spin
  // <div class="loader-box">
  //   <div class="loader-15"></div>
  // </div>;

  // !!isLoading convert to boolean
  const child = !!isLoading ? (
    <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-b-transparent animate-spin mx-auto"></div>
  ) : (
    children
  );

  return (
    <button
      className={`${backgroundColor} btn-block rounded-md transition-all duration-300 min-h-[42px] !leading-[0] ${className} ${
        !!isLoading ? "opacity-80 pointer-events-none" : "hover:opacity-80"
      }`}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

ButtonCom.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default withErrorBoundary(ButtonCom, {
  FallbackComponent: ErrorCom,
});
