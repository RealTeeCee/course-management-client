import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";
import useToggleBoolean from "../../hooks/useToggleBoolean";

const InputCom = (props) => {
  const {
    control,
    name,
    type = "text",
    toggleShowHide = false,
    errorMsg = "",
    children,
    ...rest
  } = props;

  const { fields } = useController({
    control,
    name,
    defaultValue: "",
  });

  const { value: showPassword, handleToggleBoolean: handleToggleShowHide } =
    useToggleBoolean();

  return (
    <div className="form-input position-relative">
      <input
        id={name}
        className={`form-control ${errorMsg && "is-invalid !border-danger"}`}
        required=""
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...rest}
        {...fields}
      />
      {toggleShowHide && (
        <div className="show-hide">
          <span
            className={showPassword ? "" : "show"}
            onClick={handleToggleShowHide}
          ></span>
        </div>
      )}
      {children}
      {errorMsg && <span className="!text-danger">{errorMsg}</span>}
    </div>
  );
};

InputCom.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  control: PropTypes.any.isRequired,
  children: PropTypes.node,
};
export default withErrorBoundary(InputCom, {
  FallbackComponent: ErrorCom,
});
