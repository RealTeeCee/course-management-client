import React from "react";
import { CollapseAntCom } from "../../components/ant";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
import { IconCheckCom } from "../../components/icon";
import { ImageCom } from "../../components/image";

const CourseDetailPage = () => {
  return (
    <>
      <div
        className="course-detail-banner bg-cover bg-no-repeat bg-center bg-opacity-40 text-white h-32 rounded-3xl flex items-center justify-center mb-5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(54, 12, 46, 0) -1.75%, #000 90%),url(https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)`,
        }}
      >
        <HeadingH2Com className="bg-gradient-to-r from-pink-500 to-green-500 bg-clip-text text-transparent !text-4xl !font-bold">
          Programming
        </HeadingH2Com>
      </div>
      <div className="course-detail-body">
        <div className="row">
          <div className="col-sm-7">
            <div className="course-detail-header">
              <HeadingH1Com className="course-detail-title">
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
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="">3 Lessions</span>
                    <span className="">58 Sessions</span>
                    <span className="">Timing: 18 hours 30 minute</span>
                  </div>
                  <div>Open All</div>
                </div>
                <CollapseAntCom></CollapseAntCom>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="h-60">
              <ImageCom
                srcSet="https://media.istockphoto.com/id/1477080857/photo/online-course-learn-to-code-sign-with-headset-microphone-and-coffee.jpg?b=1&s=170667a&w=0&k=20&c=DLFOezLOyv0MMFqNjYO1Li4Yvqt5qixce_LU1naZXV0="
                alt="Default Course Detail Thumb"
              ></ImageCom>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ArchiveItems = ({ title }) => (
  <div className="archive-item col-sm-6 mb-3">
    <div className="flex gap-x-2 items-center">
      <IconCheckCom className="text-tw-success"></IconCheckCom>
      <p className="flex-1">{title}</p>
    </div>
  </div>
);

export default CourseDetailPage;
