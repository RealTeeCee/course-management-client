import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SelectDefaultAntCom, SpinAntCom } from "../../components/ant";
import { BreadcrumbCom } from "../../components/breadcrumb";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
import {
  IconAdminCom,
  IconBlogCom,
  IconLearnCom,
  IconUserCom,
} from "../../components/icon";
import { ImageCom } from "../../components/image";
import { AVATAR_DEFAULT, sortItems } from "../../constants/config";
import useShowMore from "../../hooks/useShowMore";
import { onCourseLoading } from "../../store/course/courseSlice";
import { onGetUsers, onUpdateUser } from "../../store/user/userSlice";
import {
  convertDateTime,
  convertIntToStrMoney,
  formatNumber,
  sliceText,
} from "../../utils/helper";

const adminMenuItems = [
  {
    id: 1,
    title: "Learn",
    slug: "/admin/courses",
    icon: <IconLearnCom className="mx-auto" />,
  },
  {
    id: 2,
    title: "User",
    slug: "/admin/users",
    icon: <IconUserCom className="mx-auto" />,
  },
  {
    id: 3,
    title: "Blog",
    slug: "/admin/blogs",
    icon: <IconBlogCom className="mx-auto" />,
  },
];

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const [orderUser, setOrderUser] = useState("DESC");
  const [orderCourse, setOrderCourse] = useState("DESC");
  const {
    users,
    isUpdateUserSuccess,
    isLoading: isUserLoading,
  } = useSelector((state) => state.user);
  const { data, isLoading: isCourseLoading } = useSelector(
    (state) => state.course
  );
  const [sortUsers, setSortUsers] = useState([]);
  const [sortCourses, setSortCourses] = useState([]);
  console.log("sortCourses:", sortCourses);

  const handleChangeSortUser = (value) => {
    setOrderUser(value);
  };

  const handleChangeSortCourse = (value) => {
    setOrderCourse(value);
  };

  useEffect(() => {
    dispatch(onGetUsers());
    dispatch(onCourseLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateUserSuccess]);

  // Handle Sort Users
  useEffect(() => {
    // After fetching, sort users by status
    if (users) {
      const filterUsers = [...users].sort((a, b) => {
        const compareStatus = Number(a.status) - Number(b.status);
        if (compareStatus !== 0) return compareStatus;

        return orderUser === "ASC"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      });
      setSortUsers(filterUsers);
    }

    if (data) {
      const filterCourses = [...data].sort(
        (a, b) => Number(a.status) - Number(b.status)
      );
      setSortCourses(filterCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, data]);

  const { showItems, isRemain, handleShowMore } = useShowMore(sortUsers);
  const {
    showItems: showCourseItems,
    isRemain: isCourseRemain,
    handleShowMore: handleShowMoreCourse,
  } = useShowMore(sortCourses);

  const RowUserItem = ({ item }) => {
    const handleClickStatus = (userId, isActive) => {
      //update new status of user
      const data = users.find((item) => item.id === userId);

      dispatch(
        onUpdateUser({
          ...data,
          status: isActive === 1 ? 0 : 1,
        })
      );
    };

    return (
      <tr>
        <td>
          <div className="w-10">
            <ImageCom
              srcSet={item?.imageUrl ?? AVATAR_DEFAULT}
              alt={item?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {item?.status === 0 && <div className="status-circle bg-primary" />}
        </td>
        <td className="img-content-box">
          <span className="d-block">{sliceText(item?.name, 10)}</span>
          <span className="font-roboto">{item?.role}</span>
        </td>
        <td>
          <p className="m-0 text-tw-primary">
            {convertDateTime(item?.created_at, false)}
          </p>
        </td>
        <td
          className="text-end"
          onClick={() => handleClickStatus(item?.id, item?.status)}
        >
          {item?.status === 1 ? (
            <div className="button btn btn-success">
              Approve
              <i className="fa fa-check-circle ms-2" />
            </div>
          ) : (
            <div className="button btn btn-danger">
              Not yet
              <i className="fa fa-clock-o ms-2" />
            </div>
          )}
        </td>
      </tr>
    );
  };

  const RowCourseItem = ({ item }) => {
    // const handleClickStatus = (userId, isActive) => {
    //   //update new status of user
    //   const data = users.find((item) => item.id === userId);

    //   dispatch(
    //     onUpdateUser({
    //       ...data,
    //       status: isActive === 1 ? 0 : 1,
    //     })
    //   );
    // };

    return (
      <tr>
        <td>
          <div className="w-10">
            <ImageCom
              srcSet={item?.image ?? AVATAR_DEFAULT}
              alt={item?.slug}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {item?.status === 0 && <div className="status-circle bg-primary" />}
        </td>
        <td className="img-content-box">
          <span className="d-block">{sliceText(item?.name, 50)}</span>
          <span className="font-roboto">{item?.category_name}</span>
        </td>
        <td>
          <p className="m-0 text-tw-primary">
            {/* {convertDateTime(item?.created_at, false)} */}
            ${item?.price === 0
              ? "Free"
              : item?.net_price > 0
              ? convertIntToStrMoney(item?.net_price)
              : convertIntToStrMoney(item?.price)}
          </p>
        </td>
        <td
          className="text-end"
          // onClick={() => handleClickStatus(item?.id, item?.status)}
        >
          {item?.status === 1 ? (
            <div className="button btn btn-success">
              Approve
              <i className="fa fa-check-circle ms-2" />
            </div>
          ) : (
            <div className="button btn btn-danger">
              Not yet
              <i className="fa fa-clock-o ms-2" />
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Dashboard</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Dashboard",
              slug: "/admin",
              isActive: true,
            },
          ]}
        />
      </div>

      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-11 relative">
          <div className="card earning-card">
            <div className="card-body p-0">
              <div className="row border-top m-0">
                <div className="col-xl-3 col-md-6 col-sm-6 ps-0">
                  <div className="media p-0">
                    <div className="media-left">
                      {/* Icon Revenue */}
                      {/* <i className="icofont icofont-crown" /> */}
                      <IconUserCom />
                    </div>
                    <div className="media-body">
                      <h6>Total Users</h6>
                      <p>{formatNumber(250293)} accounts</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-sm-6">
                  <div className="media p-0">
                    <div className="media-left !bg-tw-light-pink">
                      {/* Icon Heart */}
                      {/* <i className="icofont icofont-heart-alt" /> */}
                      <IconUserCom />
                    </div>
                    <div className="media-body">
                      <h6>Today Registered</h6>
                      <p>{formatNumber(2402)} accounts</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="media p-0">
                    <div className="media-left">
                      <i className="icofont icofont-cur-dollar" />
                    </div>
                    <div className="media-body">
                      <h6>Total Revenue</h6>
                      <p>${convertIntToStrMoney(18234)}/year</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 pe-0">
                  <div className="media p-0">
                    <div className="media-left !bg-tw-light-pink">
                      <i className="icofont icofont-cur-dollar" />
                    </div>
                    <div className="media-body">
                      <h6>Today Revenue</h6>
                      <p>${convertIntToStrMoney(6789)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 appointment">
              <div className="card">
                <div className="card-header card-no-border">
                  <div className="header-top">
                    <h5 className="m-0">Employee</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={sortItems}
                          defaultValue={"DESC"}
                          value={orderUser}
                          onChange={handleChangeSortUser}
                          className="custom-dropdown"
                        ></SelectDefaultAntCom>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {isUserLoading ? (
                    <SpinAntCom loadingText={"Loading ..."} />
                  ) : (
                    <div className="appointment-table table-responsive">
                      <table className="table table-bordernone">
                        <tbody>
                          {showItems?.length > 0 &&
                            showItems.map((item) => (
                              <RowUserItem item={item} key={item?.id} />
                            ))}
                        </tbody>
                      </table>
                      {isRemain && (
                        <ButtonCom
                          className="w-full mt-2"
                          onClick={handleShowMore}
                        >
                          Show more
                        </ButtonCom>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 appointment">
              <div className="card">
                <div className="card-header card-no-border">
                  <div className="header-top">
                    <h5 className="m-0">Course</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={sortItems}
                          defaultValue={"DESC"}
                          value={orderUser}
                          onChange={handleChangeSortCourse}
                          className="custom-dropdown"
                        ></SelectDefaultAntCom>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {isCourseLoading ? (
                    <SpinAntCom loadingText={"Loading ..."} />
                  ) : (
                    <div className="appointment-table table-responsive">
                      <table className="table table-bordernone">
                        <tbody>
                          {showCourseItems?.length > 0 &&
                            showCourseItems.map((item) => (
                              <RowCourseItem item={item} key={item?.id} />
                            ))}
                        </tbody>
                      </table>
                      {isCourseRemain && (
                        <ButtonCom
                          className="w-full mt-2"
                          onClick={handleShowMoreCourse}
                        >
                          Show more
                        </ButtonCom>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1 p-0">
          <div className="sticky top-0">
            <div className="card">
              <div className="card-header 2xl:!py-5 !bg-tw-light-pink">
                <HeadingH2Com className="text-white text-center flex justify-center">
                  <IconAdminCom />
                </HeadingH2Com>
              </div>
              <div className="card-body mx-auto p-0 !py-10">
                {adminMenuItems.map((item, index) => (
                  <AdminMenuItems
                    key={item.id}
                    item={item}
                    isLastItem={index === adminMenuItems.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminMenuItems = ({ item, isLastItem = false }) => {
  return (
    <div className={`${isLastItem ? "" : "mb-3"}`}>
      <NavLink to={item.slug}>
        <ButtonCom className="px-3 py-2 w-20" backgroundColor="gradient">
          {item.icon}
          <span>{item.title}</span>
        </ButtonCom>
      </NavLink>
    </div>
  );
};

export default AdminDashboardPage;
