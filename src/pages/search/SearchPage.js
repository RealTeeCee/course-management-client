import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import axiosInstance from "../../api/axiosInstance";
import { SpinAntCom } from "../../components/ant";
import { BreadcrumbCom } from "../../components/breadcrumb";
import EmptyDataCom from "../../components/common/EmptyDataCom";
import GapYCom from "../../components/common/GapYCom";
import LoadingCom from "../../components/common/LoadingCom";
import { HeadingH1Com } from "../../components/heading";
import { LIMIT_PAGE } from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { BlogItemMod } from "../../modules/blog";
import { formatNumber } from "../../utils/helper";

const SearchPage = () => {
  const { data: courses } = useSelector((state) => state.course);
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");

  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { startIndex, endIndex, currentPage, handleChangePage } = usePagination(
    1,
    LIMIT_PAGE
  );

  const getSearchData = async () => {
    setIsFetching(true);
    try {
      const res = await axiosInstance.post(`/home/search?name=${keyword}`);
      if (res.status === 200) setDataSearch(res.data);

      console.log("res:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com number={formatNumber(dataSearch?.length)}>
          Search Result
        </HeadingH1Com>
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
            {isFetching ? (
              <LoadingCom isChild />
            ) : dataSearch.length > 0 ? (
              dataSearch.map((item, index) => {
                if (index >= startIndex && index < endIndex) {
                  return (
                    <BlogItemMod
                      key={v4()}
                      item={item}
                      type={item.type}
                      objectOriginal={item.type === "COURSE" ? courses : null}
                    />
                  );
                }
                return null;
              })
            ) : (
              <EmptyDataCom text="No result" />
            )}
          </div>
          {dataSearch?.length > LIMIT_PAGE && (
            <Pagination
              current={currentPage}
              defaultPageSize={LIMIT_PAGE}
              total={dataSearch.length}
              onChange={handleChangePage}
              className="mt-[1rem] text-end"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
