import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BreadcrumbCom } from "../../components/breadcrumb";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import {
  MAX_LENGTH_VARCHAR,
  MESSAGE_FIELD_REQUIRED,
} from "../../constants/config";
import FormGroupCom from "../../components/common/FormGroupCom";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { onUserChangePassword } from "../../store/auth/authSlice";

const schemaValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(8, "Minimum is 8 letters")
    .max(MAX_LENGTH_VARCHAR, `Maximum ${MAX_LENGTH_VARCHAR} letters`),
  password: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(8, "Minimum is 8 letters")
    .max(MAX_LENGTH_VARCHAR, `Maximum ${MAX_LENGTH_VARCHAR} letters`),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Confirm password not match with password"
    )
    .min(8, "Minimum is 8 letters")
    .max(MAX_LENGTH_VARCHAR, `Maximum ${MAX_LENGTH_VARCHAR} letters`)
    .required(MESSAGE_FIELD_REQUIRED),
});

const UserChangePasswordPage = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(user);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (values) => {
    dispatch(
      onUserChangePassword({
        ...values,
        email: user?.email,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Change password</HeadingH1Com>
        {/* <ButtonBackCom></ButtonBackCom> */}
        <BreadcrumbCom
          items={[
            {
              title: "Home",
              slug: "/",
            },
            {
              title: "Change Password",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="login-card bg-none block p-0">
        <div className="login-main m-0">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitForm)}
            id="form-create"
          >
            <FormGroupCom>
              <LabelCom htmlFor="oldPassword" isRequired>
                Old password
              </LabelCom>
              <InputCom
                type="password"
                control={control}
                name="oldPassword"
                register={register}
                placeholder="Your old password"
                errorMsg={errors.oldPassword?.message}
              ></InputCom>
            </FormGroupCom>
            <FormGroupCom>
              <LabelCom htmlFor="password" isRequired>
                New Password
              </LabelCom>
              <InputCom
                type="password"
                control={control}
                name="password"
                register={register}
                placeholder="Input new password"
                errorMsg={errors.password?.message}
              ></InputCom>
            </FormGroupCom>
            <FormGroupCom>
              <LabelCom htmlFor="confirmPassword" isRequired>
                Confirm Password
              </LabelCom>
              <InputCom
                type="password"
                control={control}
                name="confirmPassword"
                register={register}
                placeholder="Input confirm password"
                errorMsg={errors.confirmPassword?.message}
              ></InputCom>
            </FormGroupCom>
            <ButtonCom type="submit" isLoading={isLoading}>
              Save
            </ButtonCom>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserChangePasswordPage;
