import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AlertAntCom } from "../../components/ant/index";
import { ButtonCom } from "../../components/button";
import { CheckBoxCom } from "../../components/checkbox";
import FormGroupCom from "../../components/common/FormGroupCom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingFormH1Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import {
  APP_KEY_NAME,
  MESSAGE_EMAIL_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_VERIFY_SUCCESS,
} from "../../constants/config";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";
import { onLogin } from "../../store/auth/authSlice";
import OAuth2Page from "./OAuth2Page";
import { toast } from "react-toastify";

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED ?? "This fields is required")
    .email(MESSAGE_EMAIL_INVALID ?? "Invalid email"),
  password: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED ?? "This fields is required"),
});

const LoginPage = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const { isLoading, isLoginSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );
  console.log(errorMessage);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const isVerify = searchParams.get("verify"); //=== "verified";
  const { value: isRemember, handleToggleBoolean: setIsRemember } =
    useClickToggleBoolean();

  const handleLogin = (values) => {
    dispatch(onLogin(values));
  };

  useEffect(() => {
    if (isLoginSuccess) {
      if (isRemember) {
        const { email, password } = getValues();
        Cookies.set(`${APP_KEY_NAME}__${email}`, password);
      }
      navigate("/");
    }
  }, [isLoginSuccess, navigate, isRemember, getValues]);
  if (errorMessage) toast.error(errorMessage);
  return (
    <>
      {!isVerify ? null : isVerify === "success" ? (
        <AlertAntCom type="success" msg={MESSAGE_VERIFY_SUCCESS} />
      ) : (
        <AlertAntCom type="success" msg="Email have already actived" />
      )}

      <form className="theme-form" onSubmit={handleSubmit(handleLogin)}>
        {/* <HeadingFormH1Com className="text-center !text-[#818cf8] font-tw-primary font-light mb-3">
          Sign in your account
        </HeadingFormH1Com> */}
        {/* <HeadingFormH5Com>Login your account</HeadingFormH5Com> */}
        <HeadingFormH1Com>Login Page</HeadingFormH1Com>
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
            errorMsg={errors.password?.message}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <CheckBoxCom
            name="remember"
            onClick={setIsRemember}
            checked={isRemember}
          >
            Remember password
          </CheckBoxCom>
          <div>
            <a className="link" href="forget-password.html">
              Forgot password?
            </a>
          </div>
          <GapYCom></GapYCom>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Login
          </ButtonCom>
          <GapYCom></GapYCom>
        </FormGroupCom>
        <h6 className="text-muted or">Or login with</h6>
        <GapYCom></GapYCom>
        <OAuth2Page></OAuth2Page>
        <p className="mt-4 mb-0">
          Don't have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
