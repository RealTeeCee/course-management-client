import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";

const LabelCom = ({ htmlFor = "", className = "", children }) => {
  return (
    <label htmlFor={htmlFor} className={`col-form-label pt-0 ${className}`}>
      {children}
    </label>
  );
};

LabelCom.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};
export default withErrorBoundary(LabelCom, {
  FallbackComponent: ErrorCom,
});
