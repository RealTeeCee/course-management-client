import React from "react";
import { Link } from "react-router-dom";
import { IconFolderCom } from "../../components/icon";
import { ImageCom } from "../../components/image";
import { CategoryTagMod } from "../category";
import { CourseAuthorMod, CourseDescMod, CourseTitleMod } from "../course";

const CourseItemMod = ({ url = "/", isPaid = false, isMyCourse, course }) => {
  return (
    <div className="c-card course-item">
      <Link to={url} className="tw-transition-all hover:opacity-80">
        <div className="c-card-header h-[158px]">
          <ImageCom srcSet={course?.image} alt={course?.slug}></ImageCom>
        </div>
        <div className="c-card-body py-[1rem]">
          <CategoryTagMod icon={<IconFolderCom />}>
            {course?.category_name}
          </CategoryTagMod>

          <CourseTitleMod className="font-tw-secondary">
            {course?.name}
          </CourseTitleMod>

          <CourseDescMod>{course?.description}</CourseDescMod>

          {isMyCourse && <p>Progress: {course?.progress}%</p>}

          {!isPaid && (
            <div className="c-meta flex items-start justify-between gap-x-5 mb-5">
              <div className="flex flex-col gap-y-1">
                <h4 className="text-gray-600 text-base font-semibold line-through">
                  ${course?.price}
                </h4>
                <span className="text-sm text-gray-400">
                  Sale only{" "}
                  <strong className="text-tw-light-pink">
                    ${course?.net_price}
                  </strong>
                </span>
              </div>

              <div className="flex flex-col gap-y-1">
                <h4 className="text-gray-600 text-base font-semibold">
                  {course?.enrollmentCount}
                </h4>
                <span className="text-sm text-gray-400">Total Purchased</span>
              </div>
            </div>
          )}

          <CourseAuthorMod
            authorName="FPT Aptech"
            rating={course?.rating}
          ></CourseAuthorMod>
        </div>
      </Link>
    </div>
  );
};

export default CourseItemMod;
