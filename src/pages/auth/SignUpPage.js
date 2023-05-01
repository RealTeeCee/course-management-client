import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ButtonCom, ButtonSocialCom } from "../../components/button";
import { CheckBoxCom } from "../../components/checkbox";
import FormGroupCom from "../../components/common/FormGroupCom";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";
import LayoutAuthentication from "../../layouts/LayoutAuthentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HeadingFormH5Com } from "../../components/heading";
import { IconFacebookCom, IconGmailCom } from "../../components/icon";

const schemaValidation = yup.object().shape({
  first_name: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    )
    .min(3, "Minimum is 3 letters")
    .max(
      process.env.REACT_APP_MAX_LENGTH_NAME ?? 100,
      `Maximum ${process.env.REACT_APP_MAX_LENGTH_NAME ?? 100} letters`
    ),
  email: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    )
    .email(process.env.REACT_APP_MESSAGE_EMAIL ?? "Invalid email"),
  password: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    )
    .min(8, "Minimum is 8 letters")
    .max(
      process.env.REACT_APP_MAX_LENGTH_VARCHAR ?? 255,
      `Maximum ${process.env.REACT_APP_MAX_LENGTH_VARCHAR ?? 255} letters`
    ),
});

const SignUpPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { value: acceptTerm, handleToggleBoolean: handleToggleTerm } =
    useClickToggleBoolean();

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
        <HeadingFormH5Com>Create your account</HeadingFormH5Com>
        <p>Enter your personal details to create account</p>
        <FormGroupCom>
          <LabelCom htmlFor="first_name">Your Name</LabelCom>
          <div className="row g-2">
            <div className="col-6">
              <InputCom
                control={control}
                name="first_name"
                register={register}
                placeholder="First name"
                errorMsg={errors.first_name?.message}
              ></InputCom>
            </div>
            <div className="col-6">
              <InputCom
                control={control}
                name="last_name"
                register={register}
                placeholder="Last name"
              ></InputCom>
            </div>
          </div>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="email">Email Address</LabelCom>
          <InputCom
            type="text"
            control={control}
            name="email"
            register={register}
            placeholder="test123@gmail.com"
            errorMsg={errors.email?.message}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="password">Password</LabelCom>
          <InputCom
            type="password"
            control={control}
            name="password"
            register={register}
            placeholder="Input your password"
            isTypePassword={true}
            errorMsg={errors.password?.message}
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
              className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
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
            <ButtonSocialCom url="https://www.gmail.com/">
              <div className="flex justify-center items-center">
                <IconGmailCom></IconGmailCom>
                <span className="ml-1">Gmail</span>
              </div>
            </ButtonSocialCom>
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

            <ButtonSocialCom url="https://www.facebook.com/" className="">
              <IconFacebookCom></IconFacebookCom>
              <span>Facebook</span>
            </ButtonSocialCom>
          </div>
        </div>
        <p className="mt-4 mb-0">
          Already have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
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
