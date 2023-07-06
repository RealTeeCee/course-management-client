import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ImageCropUploadAntCom } from "../../../components/ant";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import { ButtonCom } from "../../../components/button";
import { CheckBoxCom } from "../../../components/checkbox";
import DividerCom from "../../../components/common/DividerCom";
import FormGroupCom from "../../../components/common/FormGroupCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingH1Com } from "../../../components/heading";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import {
  MAX_LENGTH_NAME,
  MAX_LENGTH_VARCHAR,
  MESSAGE_EMAIL_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_UPLOAD_REQUIRED,
} from "../../../constants/config";
import { onCreateUser } from "../../../store/admin/user/userSlice";

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

const AdminCreateUserPage = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPostUserSuccess, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isPostUserSuccess) navigate("/admin/users");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostUserSuccess]);

  const handleSubmitForm = (values) => {
    console.log(values);
    dispatch(
      onCreateUser({
        ...values,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create User</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "User",
              slug: "/admin/users",
            },
            {
              title: "Create",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="login-card bg-none items-baseline">
        <div className="login-main">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="first_name" isRequired>
                    First Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="first_name"
                    register={register}
                    placeholder="Input first name"
                    errorMsg={errors.first_name?.message}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="first_name" isRequired>
                    Last Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="last_name"
                    register={register}
                    placeholder="Input last name"
                    errorMsg={errors.last_name?.message}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom htmlFor="email" isRequired>
                    Email
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="email"
                    register={register}
                    placeholder="Input email"
                    errorMsg={errors.email?.message}
                  ></InputCom>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom htmlFor="password" isRequired>
                    Password
                  </LabelCom>
                  <InputCom
                    type="password"
                    control={control}
                    name="password"
                    register={register}
                    placeholder="Input password"
                    errorMsg={errors.password?.message}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-12 text-center">
                  <LabelCom htmlFor="image" isRequired>
                    Avatar
                  </LabelCom>
                  <div>
                    <ImageCropUploadAntCom
                      name="image"
                      onSetValue={setValue}
                      errorMsg={errors.image?.message}
                    ></ImageCropUploadAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="image"
                      register={register}
                    ></InputCom>
                  </div>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>

              <DividerCom />
              <ButtonCom type="submit" isLoading={isLoading} className="w-full">
                Create
              </ButtonCom>
            </div>
          </form>
        </div>
      </div>

      {/* <form className="theme-form" onSubmit={handleSubmit(handleSubmitForm)}>
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
        <GapYCom></GapYCom>
      </form> */}
    </>
  );
};

export default AdminCreateUserPage;
