import React from "react";

export const BlueBtn = ({ text }) => {
  return (
    <a className="text-white bg-blue-400 hover:bg-blue-300  transition duration-300 py-3 px-14 rounded-full shadow-lg font-bold">
      {text}
    </a>
  );
};
