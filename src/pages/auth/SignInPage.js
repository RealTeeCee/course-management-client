import React, { useState } from "react";
import LayoutAuthentication from "../../layouts/LayoutAuthentication";
import { HeadingFormH1Com, HeadingFormH5Com } from "../../components/heading";
import FormGroupCom from "../../components/common/FormGroupCom";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { CheckBoxCom } from "../../components/checkbox";
import { ButtonCom, ButtonSocialCom } from "../../components/button";
import { IconFacebookCom, IconGmailCom } from "../../components/icon";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schemaValidation = yup.object().shape({
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

const SignInPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (values) => {
    console.log(values);
    setIsLoading(!isLoading);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LayoutAuthentication>
      <form className="theme-form" onSubmit={handleSubmit(handleSignIn)}>
        {/* <HeadingFormH1Com class="text-center !text-[#818cf8] font-tw-primary font-light mb-3">
          Sign in your account
        </HeadingFormH1Com> */}
        <HeadingFormH5Com>Sign in your account</HeadingFormH5Com>
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
          <div class="form-group mb-0">
            <div class="checkbox p-0">
              <input id="checkbox1" type="checkbox"/>
                <label class="text-muted" for="checkbox1">Remember password
                </label>
            </div>
            <div>
              <a class="link" href="forget-password.html">Forgot password?</a>
            </div>
          </div>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Sign in
          </ButtonCom>
          
        </FormGroupCom>
        <h6 className="text-muted mt-4 or">Or sign up with</h6>
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
          Not yet have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
            to="/sign-in"
          >
            Sign up
          </Link>
        </p>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
