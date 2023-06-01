import React from "react";

const Overlay = ({ onClick = () => {} }) => {
  // Làm Search hiện Search Result thì gỡ class opacity-0 invisible ra
  return (
    <div
      className="overlay fixed inset-0 z-40 bg-black bg-opacity-20 opacity-0 invisible"
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
