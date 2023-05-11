import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextAreaCom = (props) => {
  const { register = () => {}, control, name, children, ...rest } = props;

  const { fields } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <textarea
      className="form-control dark:!placeholder-gray-300 dark:text-white"
      id={name}
      rows="5"
      {...register(name)}
      {...fields}
      {...rest}
    >
      {children}
    </textarea>
  );
};

TextAreaCom.propTypes = {
  control: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
};
export default withErrorBoundary(TextAreaCom, {
  FallbackComponent: ErrorCom,
});
