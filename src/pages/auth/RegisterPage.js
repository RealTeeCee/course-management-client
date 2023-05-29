import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCom, ButtonSocialCom } from "../../components/button";
import { CheckBoxCom } from "../../components/checkbox";
import FormGroupCom from "../../components/common/FormGroupCom";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HeadingFormH1Com, HeadingFormH5Com } from "../../components/heading";
import { IconFacebookCom, IconGmailCom } from "../../components/icon";
import OAuth2Page from "./OAuth2Page";
import {
  MAX_LENGTH_NAME,
  MAX_LENGTH_VARCHAR,
  MESSAGE_EMAIL_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_POLICY_REQUIRED,
} from "../../constants/config";
import { useDispatch } from "react-redux";
import { onRegister } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import GapYCom from "../../components/common/GapYCom";
import { useGoogleLogin } from "@react-oauth/google";

const schemaValidation = yup.object().shape({
  first_name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME, `Maximum ${MAX_LENGTH_NAME} letters`),
  last_name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME, `Maximum ${MAX_LENGTH_NAME} letters`),
  email: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .email(MESSAGE_EMAIL_INVALID),
  password: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(8, "Minimum is 8 letters")
    .max(MAX_LENGTH_VARCHAR, `Maximum ${MAX_LENGTH_VARCHAR} letters`),
});

const RegisterPage = () => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { value: acceptTerm, handleToggleBoolean: handleToggleTerm } =
    useClickToggleBoolean();

  const handleRegister = async (values) => {
    if (!acceptTerm) {
      toast.warning(MESSAGE_POLICY_REQUIRED);
      return;
    }
    setIsLoading(!isLoading);
    dispatch(onRegister({ ...values, permissions: [] }));
    setTimeout(() => {
      reset();
      setIsLoading(false);
      navigate("/login");
    }, 3000);
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <>
      <form className="theme-form" onSubmit={handleSubmit(handleRegister)}>
        <HeadingFormH1Com>Register Form</HeadingFormH1Com>
        <FormGroupCom>
          <LabelCom htmlFor="first_name" isRequired>
            Your Name
          </LabelCom>
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
                errorMsg={errors.last_name?.message}
              ></InputCom>
            </div>
          </div>
        </FormGroupCom>
        <FormGroupCom>
          <LabelCom htmlFor="email" isRequired>
            Email Address
          </LabelCom>
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
          <LabelCom htmlFor="password" isRequired>
            Password
          </LabelCom>
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
          <GapYCom></GapYCom>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </ButtonCom>
        </FormGroupCom>
        <h6 className="text-muted mt-4 or">Or register with</h6>
        <GapYCom></GapYCom>
        {/* <OAuth2Page /> */}
        <ButtonSocialCom onClick={() => handleLoginGoogle()}>
          <div className="flex justify-center items-center">
            <IconGmailCom></IconGmailCom>
            <span className="ml-2">Gmail</span>
          </div>
        </ButtonSocialCom>
        <p className="mt-4 mb-0">
          Already have an account?
          <Link
            className="ms-2 text-tw-primary hover:opacity-60 tw-transition-all"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
