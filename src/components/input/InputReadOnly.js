import React from "react";

const InputReadOnly = ({ name = "", ...rest }) => {
  return (
    <div className="form-input position-relative">
      <input
        id={name}
        className="form-control tw-transition-all placeholder:italic"
        type="text"
        readOnly
        {...rest}
      />
    </div>
  );
};

export default InputReadOnly;
