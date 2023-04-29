import React from "react";
import { Link } from "react-router-dom";
import LayoutAuthentication from "../../layouts/LayoutAuthentication";

const SignUpPage = () => {
  return (
    <LayoutAuthentication>
      <form className="theme-form">
        <h4>Create your account</h4>
        <p>Enter your personal details to create account</p>
        <div className="form-group">
          <label className="col-form-label pt-0">Your Name</label>
          <div className="row g-2">
            <div className="col-6">
              <input
                className="form-control"
                type="text"
                required=""
                placeholder="First name"
              />
            </div>
            <div className="col-6">
              <input
                className="form-control"
                type="text"
                required=""
                placeholder="Last name"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-form-label">Email Address</label>
          <input
            className="form-control"
            type="email"
            required=""
            placeholder="Test@gmail.com"
          />
        </div>
        <div className="form-group">
          <label className="col-form-label">Password</label>
          <div className="form-input position-relative">
            <input
              className="form-control"
              type="password"
              name="login[password]"
              required=""
              placeholder="*********"
            />
            <div className="show-hide">
              <span className="show"></span>
            </div>
          </div>
        </div>
        <div className="form-group mb-0">
          <div className="checkbox p-0">
            <input id="checkbox1" type="checkbox" />
            <label className="text-muted" htmlFor="checkbox1">
              Agree with
              <Link className="ms-2" to="#">
                Privacy Policy
              </Link>
            </label>
          </div>
          <button className="btn btn-primary btn-block w-100" type="submit">
            Create Account
          </button>
        </div>
        <h6 className="text-muted mt-4 or">Or signup with</h6>
        <div className="social mt-4">
          <div className="btn-showcase">
            <Link
              className="btn btn-light"
              to="https://www.linkedin.com/login"
              target="_blank"
            >
              <i className="txt-linkedin" data-feather="linkedin"></i>
              LinkedIn{" "}
            </Link>
            <Link
              className="btn btn-light"
              to="https://twitter.com/login?lang=en"
              target="_blank"
            >
              <i className="txt-twitter" data-feather="twitter"></i>twitter
            </Link>
            <Link
              className="btn btn-light"
              to="https://www.facebook.com/"
              target="_blank"
            >
              <i className="txt-fb" data-feather="facebook"></i>facebook
            </Link>
          </div>
        </div>
        <p className="mt-4 mb-0">
          Already have an account?
          <a className="ms-2" href="login.html">
            Sign in
          </a>
        </p>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
