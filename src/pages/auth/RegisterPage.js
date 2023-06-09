import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
import {
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../api/url";
import OAuth2Page from "./OAuth2Page";
import {
  MAX_LENGTH_NAME,
  MAX_LENGTH_VARCHAR,
  MESSAGE_EMAIL,
  MESSAGE_REQUIRED,
} from "../../constants/config";

const schemaValidation = yup.object().shape({
  first_name: yup
    .string()
    .required(MESSAGE_REQUIRED ?? "This fields is required")
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME ?? 100, `Maximum ${MAX_LENGTH_NAME ?? 100} letters`),
  last_name: yup
    .string()
    .required(MESSAGE_REQUIRED ?? "This fields is required")
    .min(3, "Minimum is 3 letters")
    .max(MAX_LENGTH_NAME ?? 100, `Maximum ${MAX_LENGTH_NAME ?? 100} letters`),
  email: yup
    .string()
    .required(MESSAGE_REQUIRED ?? "This fields is required")
    .email(MESSAGE_EMAIL ?? "Invalid email"),
  password: yup
    .string()
    .required(MESSAGE_REQUIRED ?? "This fields is required")
    .min(8, "Minimum is 8 letters")
    .max(
      MAX_LENGTH_VARCHAR ?? 255,
      `Maximum ${MAX_LENGTH_VARCHAR ?? 255} letters`
    ),
});

const RegisterPage = () => {
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

  const handleRegister = (values) => {
    console.log(values);
    setIsLoading(!isLoading);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  console.log(errors);
  return (
    <>
      <form className="theme-form" onSubmit={handleSubmit(handleRegister)}>
        {/* <HeadingFormH5Com>Create your account</HeadingFormH5Com>
        <p>Enter your personal details to create account</p> */}
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
        <h6 className="text-muted mt-4 or">Or register with</h6>
        <OAuth2Page />
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
