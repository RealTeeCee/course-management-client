import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";

const InputCom = (props) => {
  const {
    register = () => {},
    onChange = () => {},
    control,
    name,
    type = "text",
    isTypePassword = false,
    errorMsg = "",
    children,
    ...rest
  } = props;

  const { fields } = useController({
    control,
    name,
    defaultValue: "",
  });

  const {
    value: showPassword,
    handleToggleBoolean: handleClickToggleShowHide,
  } = useClickToggleBoolean();

  return (
    <>
      <div className="form-input position-relative">
        <input
          id={name}
          className={`form-control tw-transition-all ${
            errorMsg && errorMsg.length > 0 && "is-invalid border-tw-danger text-tw-danger"
          }`}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          onChange={onChange}
          {...register(name)}
          {...fields}
          {...rest}
        />
        {isTypePassword && (
          <div className="show-hide">
            <span
              className={`mr-2 px-1 bg-tw-light ${showPassword ? "" : "show"}`}
              onClick={handleClickToggleShowHide}
            ></span>
          </div>
        )}
        {children}
      </div>
      {errorMsg && errorMsg.length > 0 && (
        <span className="text-tw-danger text-sm">{errorMsg}</span>
      )}
    </>
  );
};

InputCom.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  control: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  children: PropTypes.node,
};
export default withErrorBoundary(InputCom, {
  FallbackComponent: ErrorCom,
});
