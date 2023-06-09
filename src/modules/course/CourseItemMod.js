import React from "react";
import { Link } from "react-router-dom";
import { IconFolderCom } from "../../components/icon";
import { ImageCom } from "../../components/image";
import { RatingMuiCom } from "../../components/mui";
import { CategoryTagMod } from "../category";
import { CourseAuthorMod, CourseDescMod, CourseTitleMod } from "../course";

const CourseItemMod = ({ url = "/", isPaid = false }) => {
  return (
    <div className="c-card course-item">
      <Link to={url} className="tw-transition-all hover:opacity-80">
        <div className="c-card-header h-[158px]">
          <ImageCom
            srcSet="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Default Thumb Header"
          ></ImageCom>
        </div>
        <div className="c-card-body py-[1rem]">
          <CategoryTagMod icon={<IconFolderCom />}>Programming</CategoryTagMod>

          <CourseTitleMod className="font-tw-secondary">
            PHP for Beginners - Become a PHP Master - with Laravel Framework
          </CourseTitleMod>

          <CourseDescMod>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sit
            architecto iusto quidem eos quia rerum doloribus reiciendis a culpa
            pariatur
          </CourseDescMod>

          {!isPaid && (
            <div className="c-meta flex items-start justify-between gap-x-5 mb-5">
              <div className="flex flex-col gap-y-1">
                <h4 className="text-gray-600 text-base font-semibold line-through">
                  $800
                </h4>
                <span className="text-sm text-gray-400">
                  Sale only <strong className="text-tw-light-pink">$300</strong>
                </span>
              </div>

              <div className="flex flex-col gap-y-1">
                <h4 className="text-gray-600 text-base font-semibold">1800</h4>
                <span className="text-sm text-gray-400">Total Purchased</span>
              </div>
            </div>
          )}

          <CourseAuthorMod
            authorName="FPT Aptech"
            rating={4.6}
          ></CourseAuthorMod>
        </div>
      </Link>
    </div>
  );
};

export default CourseItemMod;
