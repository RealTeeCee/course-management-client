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
import { sortItems } from "../../constants/config";
import useShowMore from "../../hooks/useShowMore";
import { onGetUsers, onUpdateUser } from "../../store/user/userSlice";
import {
  convertDateTime,
  convertIntToStrMoney,
  convertSecondToDiffForHumans,
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
  const [order, setOrder] = useState("DESC");
  const { users, isUpdateUserSuccess, isUserLoading } = useSelector(
    (state) => state.user
  );
  const [sortUsers, setSortUsers] = useState([]);
  console.log("users:", users);
  const handleChangeSortUser = (value) => {
    setOrder(value);
  };

  useEffect(() => {
    dispatch(onGetUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateUserSuccess]);

  // Handle Sort Users
  useEffect(() => {
    // After fetching, sort users by status
    if (users) {
      const filters = [...users].sort((a, b) => {
        const compareStatus = Number(a.status) - Number(b.status);
        if (compareStatus !== 0) return compareStatus;

        return order === "ASC"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      });
      setSortUsers(filters);
    }
  }, [users, order]);

  const { showItems, isRemain, handleShowMore } = useShowMore(sortUsers);

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
          <div className="w-10 bg-tw-light">
            <ImageCom
              srcSet={item?.imageUrl}
              alt={item?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {item?.status === 0 && <div className="status-circle bg-primary" />}
        </td>
        <td className="img-content-box">
          <span className="d-block">{sliceText(item?.name, 10)}</span>
          <span className="font-roboto">
            {convertDateTime(item?.created_at, false)}
          </span>
        </td>
        <td>
          <p className="m-0 font-primary">25 Jul</p>
        </td>
        <td
          className="text-end"
          onClick={() => handleClickStatus(item?.id, item?.status)}
        >
          {item?.status === 1 ? (
            <div className="button btn btn-primary">
              Done
              <i className="fa fa-check-circle ms-2" />
            </div>
          ) : (
            <div className="button btn btn-danger">
              Not approve
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
        <div className="col-sm-11 relative h-[200vh]">
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
                    <h5 className="m-0">User</h5>
                    <div className="card-header-right-icon">
                      <div>
                        <SelectDefaultAntCom
                          listItems={sortItems}
                          defaultValue={"DESC"}
                          value={order}
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
