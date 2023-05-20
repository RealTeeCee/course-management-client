import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../components/common/ErrorCom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MESSAGE_UNAUTHORIZE } from "../constants/config";

const LayoutAuthentication = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  if (user) return <></>;

  return (
    // Dark Mode: add dark:bg-tw-dark, then in HTML tag add class="dark"
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="login-card">
            <div>
              <div>
                <Link to="/">
                  <img
                    className="img-fluid for-light w-[200px] object-cover mx-auto"
                    srcSet="/logo192.png"
                    alt="Course Management Logo"
                  />
                </Link>
              </div>
              <div className="login-main">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LayoutAuthentication.propTypes = {
  children: PropTypes.node,
};
export default withErrorBoundary(LayoutAuthentication, {
  FallbackComponent: ErrorCom,
});
