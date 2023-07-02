import { Checkbox } from "antd";
import React from "react";
import { HeadingFormH5Com } from "../heading";

const CheckBoxAntCom = ({
  onChange = () => {},
  children,
  isChecked = false,
  ...rest
}) => {
  return (
    <Checkbox onChange={onChange} size="large" {...rest}>
      <HeadingFormH5Com
        className={`text-xl font-bold tw-transition-all ${
          isChecked && "text-tw-success"
        }`}
      >
        {children}
      </HeadingFormH5Com>
    </Checkbox>
  );
};

export default CheckBoxAntCom;
