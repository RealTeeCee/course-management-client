import React from "react";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
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
        <HeadingH2Com className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent !text-4xl !font-bold">
          Programming
        </HeadingH2Com>
      </div>
      <div className="course-detail-body">
        <div className="row">
          <div className="col-sm-7">
            <HeadingH1Com className="course-detail-title">
              Become Master PHP
            </HeadingH1Com>
            <div className="course-detail-description text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              officia quos mollitia laboriosam molestiae commodi, quidem dicta
              cupiditate architecto pariatur vel explicabo voluptate temporibus
              rem modi nobis, ipsam, suscipit inventore!
            </div>
          </div>
          <div className="col-sm-5">
            <div>
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

export default CourseDetailPage;
