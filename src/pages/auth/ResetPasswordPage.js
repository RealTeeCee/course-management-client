import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { HeadingFormH1Com } from "../../components/heading";
import FormGroupCom from "../../components/common/FormGroupCom";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { ButtonCom } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import {
  MESSAGE_CONFIRM_PASSWORD_INVALID,
  MESSAGE_FIELD_REQUIRED,
} from "../../constants/config";
import {
  onLogin,
  onResetPassword,
  onResetPasswordSuccess,
} from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import useClickToggleBoolean from "../../hooks/useClickToggleBoolean";
import { setRememberPassword } from "../../utils/auth";
import jwt_decode from "jwt-decode";
import { CheckBoxCom } from "../../components/checkbox";

const schemaValidation = yup.object().shape({
  password: yup.string().required(MESSAGE_FIELD_REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], MESSAGE_CONFIRM_PASSWORD_INVALID)
    .required(MESSAGE_FIELD_REQUIRED),
});

const ResetPasswordPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { isLoading, isResetPasswordSuccess } = useSelector(
    (state) => state.auth
  );
  const { value: isRemember, handleToggleBoolean: setIsRemember } =
    useClickToggleBoolean();

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    // First time go to this page, set onResetPasswordSuccess false
    dispatch(onResetPasswordSuccess(false));
    if (isResetPasswordSuccess) {
      const { password } = getValues();
      const email = jwt_decode(token)?.sub;
      if (isRemember) setRememberPassword(email, password);
      dispatch(onLogin({ email, password }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetPasswordSuccess]);

  const handleSubmitForm = (values) => {
    dispatch(
      onResetPassword({
        ...values,
        token,
      })
    );
  };

  return (
    <>
      <form className="theme-form" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeadingFormH1Com>Reset Password</HeadingFormH1Com>
        <FormGroupCom>
          <LabelCom htmlFor="password" isRequired>
            New password
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
          <LabelCom htmlFor="password" isRequired>
            Confirm password
          </LabelCom>
          <InputCom
            type="password"
            control={control}
            name="confirmPassword"
            register={register}
            placeholder="Same new password"
            errorMsg={errors.confirmPassword?.message}
          ></InputCom>
        </FormGroupCom>
        <FormGroupCom>
          <CheckBoxCom
            name="remember"
            onClick={setIsRemember}
            checked={isRemember}
          >
            Remember password after change
          </CheckBoxCom>
        </FormGroupCom>
        <FormGroupCom>
          <ButtonCom type="submit" className="w-full" isLoading={isLoading}>
            Change
          </ButtonCom>
        </FormGroupCom>
        <p className="mt-4 mb-0">
          Don't have account?
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

export default ResetPasswordPage;
