import React from "react";

const HeadingH2Com = ({ children, className = "text-tw-primary", number = null }) => {
  return (
    <h2
      className={`text-lg font-semibold font-tw-secondary mb-[1.25rem] ${className}`}
    >
      {children}
      {number && <span className="text-tw-light-pink"> {`(${number})`}</span>}
    </h2>
  );
};

export default HeadingH2Com;
