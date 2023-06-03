import React, { useState } from "react";
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
import { MESSAGE_FIELD_REQUIRED } from "../../../constants/config";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { API_COURSE_URL } from "../../../constants/endpoint";
import { useNavigate } from "react-router-dom/dist";
import { showMessageError } from "../../../utils/helper";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
});

const AdminCreateSectionPage = () => {
  const {
    control,
    register,
    handleSubmit,
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
  const { courseId } = useParams();
  const navigate = useNavigate();

  const resetValues = () => {
    reset();
  };

  /********* Get Course ID from API  ********* */
  const handleSubmitForm = async (values) => {
    const { name } = values;
    try {
      setIsLoading(!isLoading);

      const res = await axiosPrivate.post(
        `${API_COURSE_URL}/${courseId}/section`,
        {
          name,
          courseId,
        }
      );
      toast.success(`${res.data.message}`);
      navigate(`/admin/courses/${courseId}/sections`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /********* Library Function Area ********* */

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
            >
              {/* <div className="card-header">
                <h5>Form Create Course</h5>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </div> */}
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 offset-sm-2">
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
                </div>
                <GapYCom className="mb-3"></GapYCom>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
                </ButtonCom>
                <ButtonCom backgroundColor="danger" onClick={resetValues}>
                  Reset
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
