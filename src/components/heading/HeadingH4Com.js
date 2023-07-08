import React from "react";

const HeadingH4Com = ({
  className = "font-medium text-sm text-tw-light-pink",
  children,
}) => {
  return <h4 className={className}>{children}</h4>;
};

export default HeadingH4Com;
