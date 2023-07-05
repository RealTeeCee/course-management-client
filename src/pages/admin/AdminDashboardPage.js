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
import { RowCourseItem, RowUserItem } from "../../components/table/dashboard";
import { categoryItems, sortItems } from "../../constants/config";
import useShowMore from "../../hooks/useShowMore";
import { onGetCourses } from "../../store/admin/course/courseSlice";
import {
  onGetUsers,
  onGetUsersRegisteredToday,
} from "../../store/admin/user/userSlice";
import { convertIntToStrMoney, formatNumber } from "../../utils/helper";

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
  const [orderCourse, setOrderCourse] = useState(1);
  const [orderBlog, setOrderBlog] = useState("DESC");
  const {
    users,
    usersRegisteredToday,
    isUpdateUserSuccess,
    isLoading: isUserLoading,
  } = useSelector((state) => state.user);

  const {
    courses,
    isLoading: isCourseLoading,
    isUpdateCourseSuccess,
  } = useSelector((state) => state.adminCourse);
  const [sortUsers, setSortUsers] = useState([]);
  const [sortCourses, setSortCourses] = useState([]);

  const handleChangeSortUser = (value) => {
    setOrderUser(value);
  };

  const handleChangeSortCourse = (value) => {
    setOrderCourse(value);
  };

  const handleChangeSortBlog = (value) => {
    setOrderBlog(value);
  };

  useEffect(() => {
    dispatch(onGetUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    dispatch(onGetCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateCourseSuccess]);

  useEffect(() => {
    dispatch(onGetUsersRegisteredToday());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("usersRegisteredToday:", usersRegisteredToday);

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
  }, [users, orderUser]);

  // Sort Course
  useEffect(() => {
    // After fetching, sort Course by status and category ID
    if (courses) {
      const filterCourses = [...courses].sort((a, b) => {
        const compareStatus = Number(a.status) - Number(b.status);
        if (compareStatus !== 0) return compareStatus;

        if (orderCourse === a.category_id) {
          return -1; // Sort a before b
        } else if (orderCourse === b.category_id) {
          return 1; // Sort b before a
        }

        return 0; // Preserve the existing order
      });

      setSortCourses(filterCourses);
    }
  }, [courses, orderCourse]);

  const { showItems, isRemain, handleShowMore } = useShowMore(sortUsers);
  const {
    showItems: showCourseItems,
    isRemain: isCourseRemain,
    handleShowMore: handleShowMoreCourse,
  } = useShowMore(sortCourses);

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
                      <p>{formatNumber(users?.length ?? 0)} accounts</p>
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
                      <p>
                        {formatNumber(usersRegisteredToday?.length ?? 0)}{" "}
                        {usersRegisteredToday?.length > 1
                          ? "accounts"
                          : "account"}
                      </p>
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
            <div className="col-xl-5 appointment">
              <div className="card">
                <div className="card-header card-no-border">
                  <div className="header-top">
                    <h5 className="m-0">Employee</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={sortItems}
                          defaultValue={sortItems[0].value}
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
                              <RowUserItem
                                key={item?.id}
                                item={item}
                                users={users}
                              />
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
            <div className="col-xl-7 appointment">
              <div className="card">
                <div className="card-header card-no-border">
                  <div className="header-top">
                    <h5 className="m-0">Course</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={categoryItems}
                          defaultValue={categoryItems[0].label}
                          value={orderCourse}
                          onChange={handleChangeSortBlog}
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
                              <RowCourseItem
                                item={item}
                                courses={courses}
                                key={item?.id}
                              />
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
            <div className="col-xl-12 appointment">
              <div className="card">
                <div className="card-header card-no-border">
                  <div className="header-top">
                    <h5 className="m-0">Blog</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={sortItems}
                          defaultValue={sortItems[0].value}
                          value={orderBlog}
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
                              <RowCourseItem
                                key={item?.id}
                                item={item}
                                courses={courses}
                              />
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
        <div className="col-sm-1 p-0 flex flex-col">
          <div className="flex-grow">
            <div className="card bg-tw-dark h-full relative">
              <div className="card-header !py-5 px-0 !bg-tw-primary shadow-primary">
                <HeadingH2Com className="text-white text-center flex justify-center w-10 mx-auto">
                  <IconAdminCom />
                </HeadingH2Com>
              </div>
              <div className="card-body mx-auto p-0">
                <div className="sticky top-0 py-10">
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
      </div>
    </>
  );
};

const AdminMenuItems = ({ item, isLastItem = false }) => {
  return (
    <div className={`${isLastItem ? "" : "mb-3"}`}>
      <NavLink to={item.slug}>
        <ButtonCom
          className="px-3 py-2 w-20"
          minHeight="xs:min-h-[24px] md:min-h-[36px] xl:min-h-[42px]"
          backgroundColor="gradient"
        >
          {item.icon}
          <span>{item.title}</span>
        </ButtonCom>
      </NavLink>
    </div>
  );
};

export default AdminDashboardPage;
