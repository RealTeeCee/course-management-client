import React from "react";
import { IconSearchCom } from "../components/icon";

const HomeSearchMod = () => {
  return (
    <div className="bg-tw-light rounded-full shadow-[10px_10px_20px_rgba(218,213,213,0.15)] p-2 w-full flex items-center">
      <div className="flex-1 px-2">
        <input
          type="text"
          placeholder="Search course, video, blog..."
          className="bg-transparent text-sm placeholder:text-gray-400 text-black w-full pl-3 py-2 rounded-full"
        />
      </div>
      <button className="w-[72px] h-10 rounded-full bg-primary text-tw-light flex items-center justify-center flex-shrink-0">
        <IconSearchCom></IconSearchCom>
      </button>
    </div>
  );
};

export default HomeSearchMod;
