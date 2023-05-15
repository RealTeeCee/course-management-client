import { Pagination } from "antd";
import React, { useState } from "react";
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
} from "../../components/icon";
import { ImageCom } from "../../components/image";
import usePagination from "../../hooks/usePagination";
import { CourseGridMod, CourseItemMod } from "../../modules/course";

const sessionItems = [
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
    duration: "02:58",
    section_id: 1,
  },
  {
    id: 2,
    name: "What is Laravel",
    duration: "05:58",
    section_id: 1,
  },
  {
    id: 3,
    name: "Install XamPP",
    duration: "02:18",
    section_id: 2,
  },
  {
    id: 4,
    name: "Install phpMyAdmin",
    duration: "06:18",
    section_id: 2,
  },
];

const sessionIds = sessionItems.map((item) => String(item.id));
const totalLession = 2;

const CourseDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams();
  // const [openKeys, setOpenKeys] = useState(["1"]);
  const [openKeys, setOpenKeys] = useState(String(sessionItems[0].id));
  const relatedCourseLimitPage = 4;
  const { startOffSet, endOffSet, currentPage, handleChangePage } =
    usePagination(1, relatedCourseLimitPage);

  const handleChangeCollapse = (keys) => {
    setOpenKeys(keys);
    if (keys.length === sessionItems.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

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
          Programming
        </HeadingH2Com>
      </div>
      <div className="course-detail-body">
        <div className="row">
          <div className="col-sm-7 relative">
            <div className="course-detail-header">
              <HeadingH1Com className="course-detail-title !mb-3">
                Become Master PHP
              </HeadingH1Com>
              <div className="course-detail-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                officia quos mollitia laboriosam molestiae commodi, quidem dicta
                cupiditate architecto pariatur vel explicabo voluptate
                temporibus rem modi nobis, ipsam, suscipit inventore!
              </div>
            </div>
            <GapYCom></GapYCom>
            <div className="course-detail-body">
              <HeadingH2Com>What will you achieve?</HeadingH2Com>
              <div className="course-detail-archives row">
                {Array(4)
                  .fill(0)
                  .map((item, index) => (
                    <ArchiveItems
                      key={index}
                      title="Become Master with PHP - Laravel"
                    ></ArchiveItems>
                  ))}
              </div>

              <div className="course-detail-description">
                <HeadingH2Com className="text-tw-primary">
                  Course Description
                </HeadingH2Com>
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex gap-x-3">
                    <span className="">
                      Sessions:{" "}
                      <strong className="text-tw-light-pink">2</strong>
                    </span>
                    <span className="">
                      Lessions:{" "}
                      <strong className="text-tw-light-pink">4</strong>
                    </span>
                    <span className="">
                      Timing:{" "}
                      <strong className="text-tw-light-pink">15 minute</strong>
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
                <CollapseAntCom
                  isOpen={isOpen}
                  onChange={handleChangeCollapse}
                  openKeys={openKeys}
                  parentItems={sessionItems}
                  childItems={lessionItems}
                ></CollapseAntCom>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="sticky top-0">
              <div className="course-detail-image h-60">
                <ImageCom
                  srcSet="https://media.istockphoto.com/id/1477080857/photo/online-course-learn-to-code-sign-with-headset-microphone-and-coffee.jpg?b=1&s=170667a&w=0&k=20&c=DLFOezLOyv0MMFqNjYO1Li4Yvqt5qixce_LU1naZXV0="
                  alt="Default Course Detail Thumb"
                ></ImageCom>
              </div>
              <GapYCom></GapYCom>
              <div className="text-center mx-auto">
                {false ? (
                  <HeadingH2Com className="text-tw-light-pink !text-3xl">
                    Free Course
                  </HeadingH2Com>
                ) : (
                  <HeadingH2Com className="!text-3xl">
                    Buy only <span className="text-tw-light-pink">$300</span>
                  </HeadingH2Com>
                )}
                <Link to={`/checkout/${slug}`}>
                  <ButtonCom
                    backgroundColor="gradient"
                    className="rounded transition-all duration-300 hover:bg-gradient-to-l"
                  >
                    Enrolling Now
                  </ButtonCom>
                </Link>
                <GapYCom></GapYCom>
                <div className="pl-[10.5rem] mx-auto text-start text-sm">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                      {false ? (
                        <IconCircleCom className="text-tw-danger bg-tw-danger rounded-full"></IconCircleCom>
                      ) : (
                        <IconCircleCom className="text-tw-success bg-tw-success rounded-full"></IconCircleCom>
                      )}
                      <div className="flex-1">Basic Course</div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconLearnCom className="text-tw-info"></IconLearnCom>
                      <div className="flex-1">
                        Total: <span className="font-medium">4</span> courses
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconClockCom className="text-tw-primary"></IconClockCom>
                      <div className="flex-1">
                        Time learning:{" "}
                        <span className="font-medium">15 minute</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <IconImportantCom className="text-tw-danger"></IconImportantCom>
                      <div className="flex-1">
                        Requirement:{" "}
                        {true ? (
                          <span className="font-medium">
                            Know basic programming
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
        <HeadingH2Com className="text-tw-primary" number={23}>
          Related Course
        </HeadingH2Com>
        <CourseGridMod>
          {Array(23)
            .fill(0)
            .map((item, index) => {
              if (index >= startOffSet && index < endOffSet) {
                return <CourseItemMod key={v4()}></CourseItemMod>;
              }
              return null;
            })}
        </CourseGridMod>
        <Pagination
          current={currentPage}
          defaultPageSize={relatedCourseLimitPage}
          total={23}
          onChange={handleChangePage}
          className="mt-[1rem] text-end"
        />
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
