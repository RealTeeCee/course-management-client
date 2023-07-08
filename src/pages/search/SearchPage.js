import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { BreadcrumbCom } from "../../components/breadcrumb";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH5Com } from "../../components/heading";
import { ImageCom } from "../../components/image";
import { IMAGE_DEFAULT } from "../../constants/config";

const SearchPage = () => {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");
  console.log("keyword:", keyword);

  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchData = async () => {
    try {
      const res = await axiosInstance.post(`/home/search?name=${keyword}`);
      if (res.status === 200) setDataSearch(res.data);

      console.log("res:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Search Result</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Home",
              slug: "/",
            },
            {
              title: "Search",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <Link to={`/`}>
              <div className="blog-box blog-list row">
                <div className="col-md-2">
                  <div className="w-full h-[150px]">
                    <ImageCom
                      srcSet={IMAGE_DEFAULT}
                      alt="search-thumb"
                    ></ImageCom>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="blog-details">
                    <HeadingH5Com>Title</HeadingH5Com>
                    <div className="blog-bottom-content">
                      <ul className="blog-social">
                        <li>by: FPT Aptech</li>
                        <li>0 enrolled</li>
                      </ul>
                      <hr />
                      <p className="mt-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio eius fuga tempora quibusdam rem sunt possimus
                        itaque enim a consectetur. Nihil iste labore dolores,
                        tempora laboriosam animi molestias ab iure?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
