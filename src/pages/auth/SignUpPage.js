import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ButtonCom, ButtonSocialCom } from "../../components/button";
import { CheckBoxCom } from "../../components/checkbox";
import FormGroupCom from "../../components/common/FormGroupCom";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import useToggleBoolean from "../../hooks/useToggleBoolean";
import LayoutAuthentication from "../../layouts/LayoutAuthentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    first_name: yup.string().required(process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"),
  })
  .required();

const SignUpPage = () => {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { value: acceptTerm, handleToggleBoolean: handleToggleTerm } =
    useToggleBoolean();

  const handleSignUp = (values) => {
    console.log(values);
    setIsLoading(!isLoading);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  console.log(errors);
  return (
    <LayoutAuthentication>
      <form className="theme-form" onSubmit={handleSubmit(handleSignUp)}>
        <h4>Create your account</h4>
        <p>Enter your personal details to create account</p>
        <FormGroupCom>
          <LabelCom htmlFor="first_name">Your Name</LabelCom>
          <div className="row g-2">
            <div className="col-6">
              <InputCom
                control={control}
                type="text"
                name="first_name"
                placeholder="First name"
                errorMsg={errors.first_name?.message}
              ></InputCom>
            </div>
            <div className="col-6">
              <InputCom
                control={control}
                type="text"
                name="last_name"
                placeholder="Last name"
              ></InputCom>
            </div>
          </div>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="email">Email Address</LabelCom>
          <InputCom
            control={control}
            type="email"
            name="email"
            placeholder="test123@gmail.com"
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="password">Password</LabelCom>
          <InputCom
            control={control}
            type="password"
            name="password"
            placeholder="********"
            toggleShowHide={true}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          {/* If acceptTerm = true will checked */}
          <CheckBoxCom
            name="term"
            checked={acceptTerm}
            onClick={handleToggleTerm}
          >
            Agree with
            <Link
              className="ms-2 !text-primary hover:opacity-60 transition-all duration-300"
              to="#"
            >
              Privacy Policy
            </Link>
          </CheckBoxCom>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </ButtonCom>
        </FormGroupCom>
        <h6 className="text-muted mt-4 or">Or signup with</h6>
        <div className="social mt-4">
          <div className="btn-showcase">
            {/* <Link
              className="btn btn-light"
              to="https://www.linkedin.com/login"
              target="_blank"
            >
              <i className="txt-linkedin" data-feather="linkedin"></i>
              LinkedIn{" "}
            </Link> */}
            <ButtonSocialCom url="https://www.linkedin.com/login">
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
                className="feather feather-linkedin txt-linkedin inline"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </ButtonSocialCom>
            {/* <ButtonSocialCom url="https://twitter.com/login?lang=en">
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
                className="feather feather-twitter txt-twitter inline"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              Twitter
            </ButtonSocialCom> */}
            <ButtonSocialCom url="https://www.facebook.com/">
              {/* <i className="txt-fb" data-feather="facebook"></i> */}
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
                className="feather feather-facebook txt-fb inline"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </ButtonSocialCom>
          </div>
        </div>
        <p className="mt-4 mb-0">
          Already have an account?
          <Link
            className="ms-2 !text-primary hover:opacity-60 transition-all duration-300"
            to="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
