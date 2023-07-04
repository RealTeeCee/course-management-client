import React from "react";
import { NavLink } from "react-router-dom";
import { ProgressAntCom } from "../../components/ant";
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
                    <h5 className="m-0">Blog</h5>
                    <div className="card-header-right-icon">
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          id="dropdownMenuButton"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Today
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuButton"
                          style={{}}
                        >
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                          <a className="dropdown-item" href="#">
                            Tomorrow
                          </a>
                          <a className="dropdown-item" href="#">
                            Yesterday
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="appointment-table table-responsive">
                    <table className="table table-bordernone">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              className="img-fluid img-40 rounded-circle mb-3"
                              src="https://i.ibb.co/PZ1mLcR/1ccad4bd825948071148.jpg"
                              alt="img description"
                            />
                            <div className="status-circle bg-primary" />
                          </td>
                          <td className="img-content-box">
                            <span className="d-block">Venter Loren</span>
                            <span className="font-roboto">Now</span>
                          </td>
                          <td>
                            <p className="m-0 font-primary">28 Sept</p>
                          </td>
                          <td className="text-end">
                            <div className="button btn btn-primary">
                              Done
                              <i className="fa fa-check-circle ms-2" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              className="img-fluid img-40 rounded-circle"
                              src="https://i.ibb.co/PZ1mLcR/1ccad4bd825948071148.jpg"
                              alt="img description"
                            />
                            <div className="status-circle bg-primary" />
                          </td>
                          <td className="img-content-box">
                            <span className="d-block">John Loren</span>
                            <span className="font-roboto">11:00</span>
                          </td>
                          <td>
                            <p className="m-0 font-primary">22 Sept</p>
                          </td>
                          <td className="text-end">
                            <div className="button btn btn-danger">
                              Pending
                              <i className="fa fa-clock-o ms-2" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
