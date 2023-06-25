import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { CollapseAntCom } from "../../components/ant";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
import {
  IconCheckCom,
  IconCircleCom,
  IconClockCom,
  IconImportantCom,
  IconLearnCom,
  IconStarCom,
} from "../../components/icon";
import { ImageCom } from "../../components/image";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";
import { selectAllCourseState } from "../../store/course/courseSelector";
import {
  onGetLearning,
  onRelatedCourseLoading,
} from "../../store/course/courseSlice";
import {
  convertIntToStrMoney,
  convertSecondToDiffForHumans,
  convertStrToSlug,
} from "../../utils/helper";

const sectionItems = [
  {
    id: 1,
    name: "Introduce",
  },
  {
    id: 2,
    name: "How to install PHP",
  },
];

const lessionItems = [
  {
    id: 1,
    name: "What is PHP",
    duration: 178,
    sectionId: 1,
  },
  {
    id: 2,
    name: "What is Laravel",
    duration: 358,
    sectionId: 1,
  },
  {
    id: 3,
    name: "Install XamPP",
    duration: 138,
    sectionId: 2,
  },
  {
    id: 4,
    name: "Install phpMyAdmin",
    duration: 378,
    sectionId: 2,
  },
];

// const sessionIds = sectionItems.map((item) => String(item.id));
// const totalLession = 2;

const CourseDetailPage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams();
  // const [openKeys, setOpenKeys] = useState(["1"]);
  // const [openKeys, setOpenKeys] = useState(String(sectionItems[0].id));
  const { courseId, learning, sectionId } = useSelector(selectAllCourseState);

  console.log("learning: ", learning);
  const relatedCourseLimitPage = 4;
  const { startIndex, endIndex, currentPage, handleChangePage } = usePagination(
    1,
    relatedCourseLimitPage
  );

  const { data, relatedCourse } = useSelector((state) => state.course);

  const courseBySlug = data.find((item, index) => item.slug === slug);
  console.log("courseBySlug: ", courseBySlug);

  useEffect(() => {
    if (courseBySlug?.id) {
      // dispatch(onGetEnrollId({ course_id: courseId, user_id: userId }));
      dispatch(onGetLearning(courseBySlug?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseBySlug?.id]);

  useEffect(() => {
    if (courseBySlug)
      dispatch(
        onRelatedCourseLoading({ categoryId: courseBySlug.category_id })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseBySlug]);

  const [openKeys, setOpenKeys] = useState(
    String(learning.sectionDto.length > 0 ? learning.sectionDto[0].id : 0)
  );

  useEffect(() => {
    if (sectionId) {
      setOpenKeys(sectionId);
    }
  }, [sectionId]);

  const handleChangeCollapse = (keys) => {
    setOpenKeys(keys);
    setIsOpen(false);
    if (keys.length === learning.sectionDto.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // const handleChangeCollapse = (keys) => {
  //   setOpenKeys(keys);
  //   if (keys.length === sectionItems.length) {
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenKeys([]);
    }
  };
  return (
    <>
      <div
        className="course-detail-banner bg-cover bg-no-repeat bg-center bg-opacity-40 text-white h-32 rounded-3xl flex items-center justify-center mb-5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(54, 12, 46, 0) -1.75%, #000 90%),url(https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)`,
        }}
      >
        <HeadingH2Com className="bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent !text-4xl !font-bold">
          <Link
            to={`/categories/${convertStrToSlug(courseBySlug?.category_name)}`}
            className="tw-transition-all hover:text-white"
          >
            {courseBySlug?.category_name}
          </Link>
        </HeadingH2Com>
      </div>
      <div className="course-detail-body">
        <div className="row">
          <div className="col-sm-7 relative">
            <div className="course-detail-header">
              <HeadingH1Com className="course-detail-title !mb-3">
                {courseBySlug?.name}
              </HeadingH1Com>
              <GapYCom></GapYCom>
              <div
                className="course-detail-description"
                dangerouslySetInnerHTML={{ __html: courseBySlug?.description }}
              ></div>
            </div>
            <GapYCom></GapYCom>
            <hr />
            <GapYCom></GapYCom>
            <div className="course-detail-body">
              {courseBySlug?.achievements &&
                courseBySlug.achievements.trim() !== "" && (
                  <>
                    <HeadingH2Com>What will you achieve?</HeadingH2Com>
                    <GapYCom></GapYCom>
                    <div className="course-detail-archives row">
                      {(courseBySlug?.achievements)
                        .split(",")
                        // eslint-disable-next-line array-callback-return
                        .map((item, index) => {
                          if (index <= 3)
                            return (
                              <ArchiveItems
                                key={v4()}
                                title={item}
                              ></ArchiveItems>
                            );
                        })}
                    </div>
                    <GapYCom></GapYCom>
                  </>
                )}
              <div className="course-detail-description">
                <HeadingH2Com className="text-tw-primary">
                  Course Description
                </HeadingH2Com>
                <GapYCom></GapYCom>
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex gap-x-3">
                    <span className="">
                      Sections:{" "}
                      <strong className="text-tw-light-pink">
                        {learning?.sectionDto.length}
                      </strong>
                    </span>
                    <span className="">
                      Lessions:{" "}
                      <strong className="text-tw-light-pink">
                        {learning?.lessonDto.length}
                      </strong>
                    </span>
                    <span className="">
                      Timing:{" "}
                      <strong className="text-tw-light-pink">
                        {convertSecondToDiffForHumans(courseBySlug?.duration)}
                      </strong>
                    </span>
                  </div>
                  <div
                    onClick={handleToggleOpen}
                    className={`transition-all duration-300 cursor-pointer p-2 font-medium ${
                      isOpen ? "text-tw-light-pink" : "text-tw-success"
                    }`}
                  >
                    {isOpen ? "Close all" : "Open All"}
                  </div>
                </div>
                {/* <CollapseAntCom
                  isOpen={isOpen}
                  onChange={handleChangeCollapse}
                  openKeys={openKeys}
                  parentItems={sectionItems}
                  childItems={lessionItems}
                ></CollapseAntCom> */}
                <CollapseAntCom
                  isOpen={isOpen}
                  onChange={handleChangeCollapse}
                  openKeys={openKeys}
                  parentItems={learning.sectionDto}
                  childItems={learning.lessonDto}
                  slug={slug}
                ></CollapseAntCom>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="sticky top-0">
              <div className="course-detail-image h-60">
                <ImageCom
                  srcSet={courseBySlug?.image}
                  alt="Default Course Detail Thumb"
                ></ImageCom>
              </div>
              <GapYCom></GapYCom>
              <div className="text-center mx-auto">
                {courseBySlug?.price === 0 ? (
                  <HeadingH2Com className="text-tw-light-pink !text-3xl">
                    Free Course
                  </HeadingH2Com>
                ) : (
                  <HeadingH2Com className="!text-3xl">
                    Buy only{" "}
                    <span className="text-tw-light-pink">
                      $
                      {courseBySlug?.net_price > 0
                        ? convertIntToStrMoney(courseBySlug?.net_price)
                        : convertIntToStrMoney(courseBySlug?.price)}
                    </span>
                  </HeadingH2Com>
                )}
                <GapYCom></GapYCom>
                <Link to={`/checkout/${slug}`}>
                  <ButtonCom backgroundColor="gradient">
                    Enrolling Now
                  </ButtonCom>
                </Link>
                <GapYCom></GapYCom>
                <div className="pl-[10.5rem] mx-auto text-start text-sm">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                      {courseBySlug?.level === 1 ? (
                        <>
                          <IconCircleCom className="text-tw-danger bg-tw-danger rounded-full"></IconCircleCom>
                          <div className="flex-1">Advance Course</div>
                        </>
                      ) : (
                        <>
                          <IconCircleCom className="text-tw-success bg-tw-success rounded-full"></IconCircleCom>
                          <div className="flex-1">Basic Course</div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconLearnCom className="text-tw-info"></IconLearnCom>
                      <div className="flex-1">
                        Total:{" "}
                        <span className="font-medium">
                          {learning?.lessonDto.length}
                        </span>{" "}
                        lessons
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconClockCom className="text-tw-primary"></IconClockCom>
                      <div className="flex-1">
                        Time learning:{" "}
                        <span className="font-medium">
                          {convertSecondToDiffForHumans(courseBySlug?.duration)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconStarCom className="text-tw-warning"></IconStarCom>
                      <div className="flex-1">
                        Rating:{" "}
                        <span className="font-medium">
                          {courseBySlug?.rating} / 5
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconImportantCom className="text-tw-danger"></IconImportantCom>
                      <div className="flex-1">
                        Requirement:{" "}
                        {courseBySlug?.requirement ? (
                          <span className="font-medium">
                            {courseBySlug?.requirement}
                          </span>
                        ) : (
                          <span className="font-medium">No</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GapYCom></GapYCom>
        {/* Free Course */}
        <HeadingH2Com
          className="text-tw-primary"
          number={relatedCourse && relatedCourse.length}
        >
          Related Course
        </HeadingH2Com>
        <GapYCom></GapYCom>
        <CourseGridMod>
          {relatedCourse && relatedCourse.length > 0 ? (
            relatedCourse.map((course, index) => {
              if (index >= startIndex && index < endIndex) {
                return (
                  <CourseItemMod
                    key={v4()}
                    isPaid={false}
                    isMyCourse={false}
                    course={course}
                    url={`/courses/${course?.slug}`}
                  ></CourseItemMod>
                );
              }
              return null;
            })
          ) : (
            <HeadingH2Com className="text-black text-4xl text-center py-10">
              No data
            </HeadingH2Com>
          )}
        </CourseGridMod>
        {relatedCourse.length > relatedCourseLimitPage && (
          <Pagination
            current={currentPage}
            defaultPageSize={relatedCourseLimitPage}
            total={relatedCourse.length}
            onChange={handleChangePage}
            className="mt-[1rem] text-end"
          />
        )}
      </div>
    </>
  );
};

const ArchiveItems = ({ title }) => (
  <div className="archive-item col-sm-6 mb-3">
    <div className="flex gap-x-2 items-center">
      <IconCheckCom className="text-tw-success"></IconCheckCom>
      <p className="flex-1 bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent hover:text-black">
        {title}
      </p>
    </div>
  </div>
);

export default CourseDetailPage;
