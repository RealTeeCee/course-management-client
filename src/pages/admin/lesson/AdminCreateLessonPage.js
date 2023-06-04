import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../../components/heading";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../../components/button";
import "react-quill/dist/quill.snow.css";
import GapYCom from "../../../components/common/GapYCom";
import { toast } from "react-toastify";
import {
  MESSAGE_GENERAL_FAILED,
  MESSAGE_FIELD_INVALID,
  MESSAGE_UPLOAD_REQUIRED,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_NUMBER_POSITIVE,
} from "../../../constants/config";
import axiosInstance from "../../../api/axiosInstance";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { API_COURSE_URL, IMG_BB_URL } from "../../../constants/endpoint";
import { useNavigate } from "react-router-dom/dist";
import { showMessageError } from "../../../utils/helper";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  duration: yup
    .string(MESSAGE_NUMBER_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(1, MESSAGE_NUMBER_POSITIVE),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  status: yup.number().default(1),
  // created_at: yup.date().required(MESSAGE_FIELD_REQUIRED),
});


const AdminCreateLessonPage = () => {
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


  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const { id,sectionId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const resetValues = () => {
    // setcourseSelected(null);
    reset();
  };


   //Description
  //  const modules = useMemo(
  //   () => ({
  //     toolbar: [
  //       ["bold", "italic", "underline", "strike"],
  //       ["blockquote"],
  //       [{ header: 1 }, { header: 2 }], // custom button values
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ["link", "image"],
  //     ],
  //     imageUploader: {
  //       upload: async (file) => {
  //         const fd = new FormData();
  //         fd.append("image", file);
  //         try {
  //           const res = await axiosInstance({
  //             method: "POST",
  //             url: IMG_BB_URL,
  //             data: fd,
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           });
  //           return res.data.data.url;
  //         } catch (error) {
  //           toast.error(error.message);
  //           return;
  //         }
  //       },
  //     },
  //   }),
  //   []
  // );

  /********* Get Course ID from API  ********* */

const handleSubmitForm = async (values) => {
  const { name,duration,description,status} = values;
  try {
    setIsLoading(!isLoading);
    const data = {
      name: name,
      sectionId: sectionId,
      duration: duration,
      description: description,
      status:status
    };
    console.log("name", name);
    console.log("sectionId", sectionId);
    console.log("duration", duration);
    console.log("status", status);
    console.log("description", description);
    const res = await axiosPrivate.post(`/section/${sectionId}/lesson`, data);
    toast.success(`${res.data.message}`);
    navigate("/admin/courses/1/sections/3/lessons");
  } catch (error) {
    showMessageError(error);
  } finally {
    setIsLoading(false); // Đặt isLoading thành false để ẩn trạng thái đang tải
   
  }
};

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create Lesson</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <form
              className="theme-form"
              onSubmit={handleSubmit(handleSubmitForm)}
              id="form-create"
              encType="multipart/form-data"
            >
              {/* <div className="card-header">
                <h5>Form Create Course</h5>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </div> */}
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <LabelCom htmlFor="name" isRequired>
                      Lesson Name
                    </LabelCom> 
                    <InputCom
                      type="text"
                      control={control}
                      name="name"
                      register={register}
                      placeholder="Input Lesson Name"
                      errorMsg={errors.name?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-4">
                    <LabelCom htmlFor="status">Status</LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="status"
                      register={register}
                      placeholder="Input Lesson status"
                      errorMsg={errors.status?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-4">
                    <LabelCom htmlFor="duration">Duration</LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="duration"
                      register={register}
                      placeholder="Input Duration"
                      errorMsg={errors.duration?.message}
                    ></InputCom>
                  </div>
                </div>

                <GapYCom className="mb-3"></GapYCom>

                <div className="row">
                  <div className="col-sm-12">
                    <LabelCom htmlFor="description">Description</LabelCom>

                    <ReactQuill
                      // modules={modules}
                      theme="snow"
                      value={description}
                      onChange={(description) => {
                        setValue("description", description);
                        setDescription(description);
                      }}
                      placeholder="Describe your course ..."
                      className="h-36"
                    ></ReactQuill>
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
                </ButtonCom>
                <ButtonCom backgroundColor="danger" type="reset">
                  Cancel
                </ButtonCom>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateLessonPage;
