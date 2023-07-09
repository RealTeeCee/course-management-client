import { Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import axiosInstance from "../../api/axiosInstance";
import { SelectDefaultAntCom } from "../../components/ant";
import { BreadcrumbCom } from "../../components/breadcrumb";
import EmptyDataCom from "../../components/common/EmptyDataCom";
import GapYCom from "../../components/common/GapYCom";
import LoadingCom from "../../components/common/LoadingCom";
import { HeadingH1Com } from "../../components/heading";
import {
  categoryItems,
  LIMIT_PAGE,
  sortSearchItems,
} from "../../constants/config";
import usePagination from "../../hooks/usePagination";
import { BlogItemMod } from "../../modules/blog";
import { formatNumber } from "../../utils/helper";

const SearchPage = () => {
  const { data: courses } = useSelector((state) => state.course);
  const { authors } = useSelector((state) => state.author);

  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");

  // Initial Data Search using for filter when empty value
  const [initialDataSearch, setInitialDataSearch] = useState([]);
  // Output Data
  const [dataSearch, setDataSearch] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [result, setResult] = useState("");

  const [orderSearch, setOrderSearch] = useState(sortSearchItems[0].value);
  const [orderCategory, setOrderCategory] = useState(categoryItems[0].value);
  const { startIndex, endIndex, currentPage, handleChangePage } = usePagination(
    1,
    LIMIT_PAGE
  );
  //******************** Fetching API *********************
  const getSearchData = async () => {
    try {
      const res = await axiosInstance.post(`/home/search?name=${keyword}`);
      if (res.status === 200) {
        setInitialDataSearch(res.data);
        setDataSearch(res.data);
      }

      console.log("res:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const filterSearchData = () => {
    let resultData = [...initialDataSearch];
    if (result !== "") {
      resultData = resultData.filter((item) => {
        return item.name.toLowerCase().includes(result.toLowerCase());
      });
    }

    let sortData = resultData.sort((a, b) => {
      if (orderSearch === a.type) return -1;
      else if (orderSearch === b.type) return 1;
      return 0;
    });

    console.log("sortData:", sortData);
    const updatedSortData = sortData.map((item) => {
      const course = courses.find((c) => c.id === item.id);
      if (course) {
        return {
          ...course,
          type: item.type,
        };
      }
      return item;
    });

    console.log("updatedSortData:", updatedSortData);

    sortData = [...sortData].sort((a, b) => {
      if (orderCategory === a.category_id) return -1;
      else if (orderCategory === b.category_id) return 1;
      return 0;
    });

    console.log("after clone:", sortData);

    setDataSearch(sortData);
  };

  useEffect(() => {
    let timerId;

    const delayedSearch = () => {
      clearTimeout(timerId);
      setIsFetching(true);
      timerId = setTimeout(() => {
        getSearchData();
      }, 1000);
    };

    delayedSearch();

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    filterSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderSearch, orderCategory, result]);

  const handleChangeSortSearch = (value) => {
    setOrderSearch(value);
  };

  const handleChangeSortCategory = (value) => {
    setOrderCategory(value);
  };

  const handleChangeResult = (e) => {
    setResult(e.target.value);
    // setIsLoading(true);
  };

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
      <div className="sort-bar flex justify-between bg-dark px-3 py-4 rounded-lg gap-x-2">
        <div className="search-results flex-1">
          <input
            type="text"
            name="result"
            placeholder="Find the results..."
            className="border-2 solid border-tw-primary bg-transparent text-sm placeholder:text-tw-light-green text-white w-full pl-3 py-2 rounded-full outline-none hover:shadow-primary tw-transition-all"
            onChange={handleChangeResult}
          />
        </div>
        <div className="flex justify-end gap-x-2">
          <div>
            <SelectDefaultAntCom
              listItems={categoryItems}
              defaultValue={categoryItems[0].value}
              value={orderCategory}
              onChange={handleChangeSortCategory}
              className="custom-dropdown"
            ></SelectDefaultAntCom>
          </div>
          <div>
            <SelectDefaultAntCom
              listItems={sortSearchItems}
              defaultValue={sortSearchItems[0].value}
              value={orderSearch}
              onChange={handleChangeSortSearch}
              className="custom-dropdown"
            ></SelectDefaultAntCom>
          </div>
        </div>
      </div>
      <GapYCom></GapYCom>

      <div className="row">
        <div className="col-12">
          <div className="cards">
            {isFetching ? (
              <>
                <LoadingCom isChild />
                {Array(8)
                  .fill(0)
                  .map((item) => (
                    <Skeleton
                      key={v4()}
                      avatar={{
                        shape: "square",
                      }}
                      paragraph={{ rows: 2 }}
                      active
                      size="large"
                    />
                  ))}
              </>
            ) : dataSearch.length > 0 ? (
              dataSearch.map((item, index) => {
                if (index >= startIndex && index < endIndex) {
                  return (
                    <BlogItemMod
                      key={v4()}
                      item={item}
                      type={item.type}
                      isShowType
                      objectOriginal={
                        item.type === "COURSE"
                          ? courses
                          : item.type === "AUTHOR"
                          ? authors
                          : null
                      }
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
