import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import axiosInstance from "../../api/axiosInstance";
import { BreadcrumbCom } from "../../components/breadcrumb";
import EmptyDataCom from "../../components/common/EmptyDataCom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { BlogItemMod } from "../../modules/blog";

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
            {dataSearch.length > 0 ? (
              dataSearch.map((item, index) => (
                <BlogItemMod key={v4()} item={item} type={item.type} />
              ))
            ) : (
              <EmptyDataCom text="No result" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
