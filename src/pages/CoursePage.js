import React from "react";
import { HeadingH1Com } from "../components/heading";
import LayoutHome from "../layouts/LayoutHome";
import { formatNumber } from "../utils/helper";
const CoursePage = () => {
  return (
    <LayoutHome>
      <HeadingH1Com number={formatNumber(190298)}>All Courses</HeadingH1Com>
      <div className="container-fluid product-wrapper">
        <div className="product-grid">
          {/* <div className="feature-products">
            <div className="row">
              <div className="col-md-6 products-total">
                <div className="square-product-setting d-inline-block">
                  <a
                    className="icon-grid grid-layout-view"
                    href="#"
                    data-original-title=""
                    title=""
                    data-bs-original-title=""
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-grid"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </a>
                </div>
                <div className="square-product-setting d-inline-block">
                  <a
                    className="icon-grid m-0 list-layout-view"
                    href="#"
                    data-original-title=""
                    title=""
                    data-bs-original-title=""
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-list"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3" y2="6"></line>
                      <line x1="3" y1="12" x2="3" y2="12"></line>
                      <line x1="3" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </a>
                </div>
                <span className="d-none-productlist filter-toggle">
                  Filters
                  <span className="ms-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-down toggle-data"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </span>
                <div className="grid-options d-inline-block">
                  <ul>
                    <li>
                      <a
                        className="product-2-layout-view"
                        href="#"
                        data-original-title=""
                        title=""
                        data-bs-original-title=""
                      >
                        <span className="line-grid line-grid-1 bg-primary"></span>
                        <span className="line-grid line-grid-2 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="product-3-layout-view"
                        href="#"
                        data-original-title=""
                        title=""
                        data-bs-original-title=""
                      >
                        <span className="line-grid line-grid-3 bg-primary"></span>
                        <span className="line-grid line-grid-4 bg-primary"></span>
                        <span className="line-grid line-grid-5 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="product-4-layout-view"
                        href="#"
                        data-original-title=""
                        title=""
                        data-bs-original-title=""
                      >
                        <span className="line-grid line-grid-6 bg-primary"></span>
                        <span className="line-grid line-grid-7 bg-primary"></span>
                        <span className="line-grid line-grid-8 bg-primary"></span>
                        <span className="line-grid line-grid-9 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="product-6-layout-view"
                        href="#"
                        data-original-title=""
                        title=""
                        data-bs-original-title=""
                      >
                        <span className="line-grid line-grid-10 bg-primary"></span>
                        <span className="line-grid line-grid-11 bg-primary"></span>
                        <span className="line-grid line-grid-12 bg-primary"></span>
                        <span className="line-grid line-grid-13 bg-primary"></span>
                        <span className="line-grid line-grid-14 bg-primary"></span>
                        <span className="line-grid line-grid-15 bg-primary"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <span className="f-w-600 m-r-5">
                  Showing Products 1 - 24 Of 200 Results
                </span>
                <div className="select2-drpdwn-product select-options d-inline-block">
                  <select className="form-control btn-square" name="select">
                    <option value="opt1">Featured</option>
                    <option value="opt2">Lowest Prices</option>
                    <option value="opt3">Highest Prices</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="product-sidebar">
                  <div className="filter-section">
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0 f-w-600">
                          Filters
                          <span className="pull-right">
                            <i className="fa fa-chevron-down toggle-data"></i>
                          </span>
                        </h6>
                      </div>
                      <div className="left-filter">
                        <div className="card-body filter-cards-view animate-chk">
                          <div className="product-filter">
                            <h6 className="f-w-600">Category</h6>
                            <div className="checkbox-animated mt-0">
                              <label className="d-block" htmlFor="edo-ani5">
                                <input
                                  className="radio_animated"
                                  id="edo-ani5"
                                  type="radio"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Man Shirt
                              </label>
                              <label className="d-block" htmlFor="edo-ani6">
                                <input
                                  className="radio_animated"
                                  id="edo-ani6"
                                  type="radio"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Man Jeans
                              </label>
                              <label className="d-block" htmlFor="edo-ani7">
                                <input
                                  className="radio_animated"
                                  id="edo-ani7"
                                  type="radio"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Woman Top
                              </label>
                              <label className="d-block" htmlFor="edo-ani8">
                                <input
                                  className="radio_animated"
                                  id="edo-ani8"
                                  type="radio"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Woman Jeans
                              </label>
                              <label className="d-block" htmlFor="edo-ani9">
                                <input
                                  className="radio_animated"
                                  id="edo-ani9"
                                  type="radio"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Man T-shirt
                              </label>
                            </div>
                          </div>
                          <div className="product-filter">
                            <h6 className="f-w-600">Brand</h6>
                            <div className="checkbox-animated mt-0">
                              <label className="d-block" htmlFor="chk-ani">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />{" "}
                                Levi's
                              </label>
                              <label className="d-block" htmlFor="chk-ani1">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani1"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Diesel
                              </label>
                              <label className="d-block" htmlFor="chk-ani2">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani2"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Lee
                              </label>
                              <label className="d-block" htmlFor="chk-ani3">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani3"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Hudson
                              </label>
                              <label className="d-block" htmlFor="chk-ani4">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani4"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Denizen
                              </label>
                              <label className="d-block" htmlFor="chk-ani5">
                                <input
                                  className="checkbox_animated"
                                  id="chk-ani5"
                                  type="checkbox"
                                  data-original-title=""
                                  title=""
                                  data-bs-original-title=""
                                />
                                Spykar
                              </label>
                            </div>
                          </div>
                          <div className="product-filter slider-product">
                            <h6 className="f-w-600">Colors</h6>
                            <div className="color-selector">
                              <ul>
                                <li className="white"></li>
                                <li className="gray"></li>
                                <li className="black"></li>
                                <li className="orange"></li>
                                <li className="green"></li>
                                <li className="pink"></li>
                                <li className="yellow"></li>
                                <li className="blue"></li>
                                <li className="red"></li>
                              </ul>
                            </div>
                          </div>
                          <div className="product-filter pb-0">
                            <h6 className="f-w-600">Price</h6>

                            <span className="irs js-irs-0 irs-with-grid">
                              <span className="irs">
                                <span className="irs-line" tabIndex="0">
                                  <span className="irs-line-left"></span>
                                  <span className="irs-line-mid"></span>
                                  <span className="irs-line-right"></span>
                                </span>

                                <span
                                  className="irs-min"
                                  style={{ visibility: "visible" }}
                                >
                                  $0
                                </span>
                                <span
                                  className="irs-max"
                                  style={{ visibility: "hidden" }}
                                >
                                  $1 000
                                </span>
                                <span
                                  className="irs-from"
                                  style={{
                                    visibility: "visible",
                                    left: "14.8724%",
                                  }}
                                >
                                  $200
                                </span>
                                <span
                                  className="irs-to"
                                  style={{
                                    visibility: "visible",
                                    left: "72.5425%",
                                  }}
                                >
                                  $800
                                </span>
                                <span
                                  className="irs-single"
                                  style={{
                                    visibility: "hidden",
                                    left: "36.7719%",
                                  }}
                                >
                                  $200 — $800
                                </span>
                              </span>
                              <span
                                className="irs-grid"
                                style={{ width: "96.2585%", left: "1.77075%" }}
                              >
                                <span
                                  className="irs-grid-pol"
                                  style={{ left: "0%" }}
                                ></span>
                                <span
                                  className="irs-grid-text js-grid-text-0"
                                  style={{
                                    left: "0%",
                                    marginLeft: "-2.07803%",
                                  }}
                                >
                                  0
                                </span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "20%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "15%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "10%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "5%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol"
                                  style={{ left: "25%" }}
                                ></span>
                                <span
                                  className="irs-grid-text js-grid-text-1"
                                  style={{
                                    left: "25%",
                                    visibility: "visible",
                                    marginLeft: "-4.05772%",
                                  }}
                                >
                                  250
                                </span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "45%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "40%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "35%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "30%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol"
                                  style={{ left: "50%" }}
                                ></span>
                                <span
                                  className="irs-grid-text js-grid-text-2"
                                  style={{
                                    left: "50%",
                                    visibility: "visible",
                                    marginLeft: "-4.12946%",
                                  }}
                                >
                                  500
                                </span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "70%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "65%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "60%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "55%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol"
                                  style={{ left: "75%" }}
                                ></span>
                                <span
                                  className="irs-grid-text js-grid-text-3"
                                  style={{
                                    left: "75%",
                                    visibility: "visible",
                                    marginLeft: "-3.94345%",
                                  }}
                                >
                                  750
                                </span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "95%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "90%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "85%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol small"
                                  style={{ left: "80%" }}
                                ></span>
                                <span
                                  className="irs-grid-pol"
                                  style={{ left: "100%" }}
                                ></span>
                                <span
                                  className="irs-grid-text js-grid-text-4"
                                  style={{
                                    left: "100%",
                                    marginLeft: "-5.39168%",
                                  }}
                                >
                                  1 000
                                </span>
                              </span>
                              <span
                                className="irs-bar"
                                style={{ left: "21.1224%", width: "57.7551%" }}
                              ></span>
                              <span
                                className="irs-shadow shadow-from"
                                style={{ display: "none" }}
                              ></span>
                              <span
                                className="irs-shadow shadow-to"
                                style={{ display: "none" }}
                              ></span>
                              <span
                                className="irs-slider from"
                                style={{ left: "19.2517%" }}
                              ></span>
                              <span
                                className="irs-slider to type_last"
                                style={{ left: "77.0068%" }}
                              ></span>
                            </span>
                            <input
                              id="u-range-03"
                              type="text"
                              className="irs-hidden-input"
                              tabIndex="-1"
                              readOnly=""
                              data-bs-original-title=""
                              title=""
                            />
                            <h6 className="f-w-600">New Products</h6>
                          </div>
                          <div className="product-filter pb-0 new-products">
                            <div
                              className="owl-carousel owl-theme owl-loaded owl-drag"
                              id="testimonial"
                            >
                              <div className="owl-stage-outer">
                                <div
                                  className="owl-stage tw-transition-all"
                                  style={{
                                    transform: `translate3d(-648px, 0px, 0px)`,
                                    width: "1944px",
                                  }}
                                >
                                  <div
                                    className="owl-item cloned"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="owl-item cloned"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="owl-item active"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="owl-item"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="owl-item cloned"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="owl-item cloned"
                                    style={{
                                      width: "294px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <div className="item">
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/01.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/02.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-box row">
                                        <div className="product-img col-md-5">
                                          <img
                                            className="img-fluid img-100"
                                            src="../assets/images/ecommerce/03.jpg"
                                            alt=""
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="product-details col-md-7 text-start">
                                          <span>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning me-1"></i>
                                            <i className="fa fa-star font-warning"></i>
                                          </span>
                                          <p className="mb-0">Fancy Shirt</p>
                                          <div className="product-price">
                                            $100.00{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="owl-nav">
                                <button
                                  type="button"
                                  role="presentation"
                                  className="owl-prev"
                                >
                                  <span aria-label="Previous">‹</span>
                                </button>
                                <button
                                  type="button"
                                  role="presentation"
                                  className="owl-next"
                                >
                                  <span aria-label="Next">›</span>
                                </button>
                              </div>
                              <div className="owl-dots disabled"></div>
                            </div>
                          </div>
                          <div className="product-filter text-center">
                            <img
                              className="img-fluid banner-product"
                              src="../assets/images/ecommerce/banner.jpg"
                              alt=""
                              data-original-title=""
                              title=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-sm-12">
                <form>
                  <div className="form-group m-0">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search.."
                      data-original-title=""
                      title=""
                      data-bs-original-title=""
                    />
                    <i className="fa fa-search"></i>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
          <div
            className="product-wrapper-grid list-view"
            style={{ opacity: 1 }}
          >
            <div className="row">
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/01.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/01.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Man's Shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <div className="ribbon ribbon-danger">Sale</div>
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter1"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter1"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter1"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter2"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter2"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter2"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        {" "}
                        200$
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <div className="ribbon ribbon-success ribbon-right">
                        50%
                      </div>
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/04.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter3"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter3"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter3"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/04.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Man's Suit</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        200$
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter4"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter4"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter4"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">$26.00 </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="ribbon ribbon-secondary ribbon-vertical-left">
                      <i className="icon-gift"></i>
                    </div>
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter5"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter5"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter5"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">$26.00 </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/01.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter6"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter6"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter6"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/01.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">$26.00 </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter7"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter7"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter7"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter8"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter8"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter8"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/04.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter9"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter9"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter9"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/04.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter10"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter10"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter10"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter11"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter11"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter11"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <div className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-info">
                        <i className="icofont icofont-love"></i>
                      </div>
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter12"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter12"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter12"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter13"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter13"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter13"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <div className="ribbon ribbon-clip ribbon-warning">
                        Hot
                      </div>
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/04.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter14"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter14"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter14"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/04.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter15"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter15"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter15"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter16"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter16"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter16"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/01.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter17"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter17"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter17"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/01.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter18"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter18"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter18"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter19"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter19"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter19"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/04.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter20"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter20"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter20"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/04.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/02.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter21"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter21"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter21"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter22"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter22"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter22"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3 col-xl-12">
                <div className="card">
                  <div className="product-box">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        src="../assets/images/ecommerce/03.jpg"
                        alt=""
                      />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-shopping-cart"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalCenter23"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn"
                              type="button"
                              data-bs-original-title=""
                              title=""
                            >
                              <i className="icofont icofont-law-alt-2"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalCenter23"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenter23"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-lg modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="product-box row">
                              <div className="product-img col-lg-6">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/ecommerce/03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="product-details col-lg-6 text-start">
                                <h4>Woman T-shirt</h4>
                                <div className="product-price">
                                  $26.00
                                  <del>$350.00 </del>
                                </div>
                                <div className="product-view">
                                  <h6 className="f-w-600">Product Details</h6>
                                  <p className="mb-0">
                                    Sed ut perspiciatis, unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam eaque ipsa,
                                    quae ab illo.
                                  </p>
                                </div>
                                <div className="product-size">
                                  <ul>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        M
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        L
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        Xl
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-qnty">
                                  <h6 className="f-w-600">Quantity</h6>
                                  <fieldset>
                                    <div className="input-group bootstrap-touchspin">
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-down"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span
                                        className="input-group-text bootstrap-touchspin-prefix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <input
                                        className="touchspin text-center form-control"
                                        type="text"
                                        value="5"
                                        style={{ display: "block" }}
                                        data-bs-original-title=""
                                        title=""
                                      />
                                      <span
                                        className="input-group-text bootstrap-touchspin-postfix"
                                        style={{ display: "none" }}
                                      ></span>
                                      <button
                                        className="btn btn-primary btn-square bootstrap-touchspin-up"
                                        type="button"
                                        data-bs-original-title=""
                                        title=""
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </fieldset>
                                  <div className="addcart-btn">
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      Add to Cart
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-original-title=""
                              title=""
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h4>Woman T-shirt</h4>
                      <p>Simply dummy text of the printing.</p>
                      <div className="product-price">
                        $26.00
                        <del>$350.00 </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default CoursePage;
