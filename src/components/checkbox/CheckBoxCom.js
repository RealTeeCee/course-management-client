import React from "react";

const CheckBoxCom = (props) => {
  const { checked = false, name = "", onClick = () => {}, children } = props;
  
  return (
    <div className="checkbox p-0">
      <input type="checkbox" id={name} name={name} onChange={() => {}} />
      {children && (
        <label className="text-muted" htmlFor={name} onClick={onClick}>
          {children}
        </label>
      )}
    </div>
  );
};

export default CheckBoxCom;
