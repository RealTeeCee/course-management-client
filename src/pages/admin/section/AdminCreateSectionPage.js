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
} from "../../../constants/config";
import axiosInstance from "../../../api/axiosInstance";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { API_COURSE_URL } from "../../../constants/endpoint";
import { useNavigate } from "react-router-dom/dist";
import { showMessageError } from "../../../utils/helper";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  // course_id: yup.number().required(MESSAGE_FIELD_REQUIRED),
});

/********* Fetch data ********* */
// const courseItems = [
//   {
//     value: 1,
//     label: "Java SpringBoot 2023",
//   },
//   {
//     value: 2,
//     label: "Beginner To Advanced C#",
//   },
//   {
//     value: 3,
//     label: "React Advanced",
//   },
//   {
//     value: 4,
//     label: "Flutter & Dart ",
//   },
// ];

const AdminCreateSectionPage = () => {
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

  /********* API Area ********* */
  // const [tagItems, setTagItems] = useState([]);
  /********* END API Area ********* */

  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [courseSelected, setcourseSelected] = useState("");
  const [courseItems, setCourseItems] = useState([]); // Danh sách khóa học
  const { id } = useParams();
  const navigate = useNavigate();

  const resetValues = () => {
    // setcourseSelected(null);
    reset();
  };

  /********* Get Course ID from API  ********* */
  // Lắng nghe sự thay đổi của courseItems
  // Lấy danh sách khóa học từ API
  // const getCourses = async () => {
  //   try {
  //     console.log('ok');
  //     const response = await axiosPrivate.get(API_COURSE_URL);
  //     console.log(response);
  //     setCourseItems(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch courses");
  //   }
  // };

  // useEffect(() => {
  //   getCourses();
  // }, []); // Chỉ lắng nghe sự thay đổi của courseItems



//   const handleSubmitForm = async (data) => {
// //new
//     // const data = {
//     //   name: name,
//     //   courseId: id,
//     //   id: selectedRowId,
//     // };
//     // console.log("name", name);
//     // console.log("couseId", id);
//     // console.log("id", selectedRowId);
//     // const res = await axiosPrivate.post(`/course/${id}/section`, data);
//     // toast.success("Section created successfully");
//     //   reset();
//     //   navigate("/admin/courses/1/sections");
    
//     //old
//     try {
//       const response = await axiosPrivate.post(`/course/${data.course_id}/section`, {
//         name: data.name,
//         courseId: parseInt(data.course_id),
//       });
//       toast.success("Section created successfully");
//       reset();
//       // Cập nhật lại courseItems bằng cách gán một giá trị mới cho nó
//       setCourseItems([...courseItems]);
//       navigate("/admin/courses/1/sections");
//     } catch (error) {
//       toast.error("Failed to create section");
//     }
//   };

const handleSubmitForm = async (values) => {
  const { name} = values;
  try {
    setIsLoading(!isLoading);
  //     const data = {
  //   name: name,
  //   courseId: id,
  // };
  // console.log("name", name);
  // console.log("couseId", id);
  // const res = await axiosPrivate.post(`/course/${id}/section`, data);
    
  //  Đặt isLoading thành true để hiển thị trạng thái đang tải
    const data = {
      name: name,
      courseId: id,
      
    };
    console.log("name", name);
    console.log("courseId", id);
   
    const res = await axiosPrivate.post(`/course/${data.courseId}/section`, data);
    toast.success(`${res.data.message}`);
    navigate("/admin/courses/1/sections");
  } catch (error) {
    showMessageError(error);
  } finally {
    setIsLoading(false); // Đặt isLoading thành false để ẩn trạng thái đang tải
   
  }
};

  /********* Library Function Area ********* */
  const handleChangeCourse = (value) => {
    setValue("course_id", value);
    setError("course_id", { message: "" });
    setcourseSelected(value);
  };

 

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create Section</HeadingH1Com>
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
                  <div className="col-sm-6">
                    <LabelCom htmlFor="name" isRequired>
                      Section Name
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}  
                      name="name"
                      register={register}
                      placeholder="Input Section Name"
                      errorMsg={errors.name?.message}
                    ></InputCom>
                  </div>
                  {/* <div className="col-sm-6">
                    <LabelCom htmlFor="course_id" isRequired>
                      Choose Course
                    </LabelCom>
                    <div>
                      <select
                        {...register("course_id")}
                        value={courseSelected || ""}
                        onChange={(e) => handleChangeCourse(e.target.value)}
                      >
                        <option value="">Select a course</option>
                        {courseItems.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.id}
                          </option>
                        ))}
                      </select>
                      {errors.course_id && <p>{errors.course_id.message}</p>}
                   
                    </div>
                  </div> */}
                </div>
                <GapYCom className="mb-3"></GapYCom>
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

export default AdminCreateSectionPage;
