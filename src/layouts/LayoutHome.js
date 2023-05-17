import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { Outlet } from "react-router-dom";
import { ButtonCom } from "../components/button";
import GapYCom from "../components/common/GapYCom";
import Overlay from "../components/common/Overlay";
import { HeadingFormH5Com } from "../components/heading";
import { IconRemoveCom } from "../components/icon";
import { LabelCom } from "../components/label";
import { HomeSidebarMod, HomeTopbarMod } from "../modules/sidebar";
import * as yup from "yup";
import { InputCom } from "../components/input";
import { MESSAGE_FIELD_REQUIRED } from "../constants/config";

const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED ?? "This fields is required"),
});

const LayoutHome = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (values) => {
    const { name, category_id } = values;
    console.log(values);
    setIsLoading(!isLoading);

    // After done, remove loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="px-10 py-6 bg-tw-light text-black min-h-screen">
      <ReactModal
        isOpen={false}
        overlayClassName="modal-overplay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className="modal-content scroll-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg outline-none"
      >
        <div className="card-header bg-tw-primary flex justify-between text-white">
          <HeadingFormH5Com className="text-2xl">Edit View</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitForm)}
            id="form-create"
          >
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="name" isRequired>
                    Course Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input Course Name"
                    errorMsg={errors.name?.message}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="image">Image</LabelCom>
                  <InputCom
                    type="file"
                    control={control}
                    name="image"
                    register={register}
                    placeholder="Input Image"
                    errorMsg={errors.image?.message}
                  ></InputCom>
                </div>
              </div>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Apply
              </ButtonCom>
              <ButtonCom backgroundColor="danger" type="reset">
                Cancel
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
      <Overlay></Overlay>
      <HomeTopbarMod></HomeTopbarMod>
      <div className="flex gap-x-10 items-start">
        <HomeSidebarMod></HomeSidebarMod>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <GapYCom></GapYCom>
      <div className="bg-black text-white flex justify-center items-center text-4xl h-[30vh] z-10 relative">
        Footer
      </div>
    </div>
  );
};

export default LayoutHome;
