import React from "react";
import { Link } from "react-router-dom";
import { IconFolderCom } from "../../components/icon";
import { RatingMuiCom } from "../../components/mui";
import { CategoryTagMod } from "../category";

const CategoryItemMod = () => {
  return (
    <div className="c-card category-item">
      <Link to="/" className="tw-transition-all hover:opacity-80">
        <div className="c-card-header h-[158px]">
          <img
            srcSet="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="c-card-body py-[1rem]">
          <CategoryTagMod icon={<IconFolderCom />}>Programming</CategoryTagMod>

          <h3 className="font-semibold text-black mb-1 text-lg">
            Top Programming Course
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sit
            architecto iusto quidem eos quia rerum doloribus reiciendis a culpa
            pariatur
          </p>
          <div className="flex items-start justify-between gap-x-5 mb-5">
            <div className="flex flex-col gap-y-1">
              <h4 className="text-gray-600 text-sm font-semibold">$800</h4>
              <span className="text-xs text-gray-400">Sale only $300</span>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-gray-600 text-sm font-semibold">1800</h4>
              <span className="text-xs text-gray-400">Total Purchased</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <img
                srcSet="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                className="w-8 h-8 rounded-full object-cover"
                alt="User Avatar"
              />
              <p className="text-xs text-gray-400">
                By{" "}
                <span className="text-gray-600 font-semibold">FPT Aptech</span>
              </p>
            </div>
            <RatingMuiCom defaultValue={4.6} readOnly></RatingMuiCom>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItemMod;
