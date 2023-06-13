import React, { useState } from 'react'
import ButtonBackCom from '../../components/button/ButtonBackCom';
import * as yup from "yup";
import { MESSAGE_FIELD_REQUIRED } from '../../constants/config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { API_COURSE_URL } from '../../constants/endpoint';
import { toast } from 'react-toastify';
import { showMessageError } from '../../utils/helper';
import { HeadingH1Com } from '../../components/heading';
import GapYCom from '../../components/common/GapYCom';
import { LabelCom } from '../../components/label';
import { InputCom } from '../../components/input';
import { ButtonCom } from '../../components/button';

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
    name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  });
const BlogCreatePage = () => {
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
        // console.log(values);
        const { name, ordered } = values;
        try {
          setIsLoading(!isLoading);
    
          const res = await axiosPrivate.post(
            `${API_COURSE_URL}/${courseId}/section`,
            {
              name,
              ordered: parseInt(ordered),
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
                      <div className="col-sm-6">
                        <LabelCom htmlFor="name" isRequired>
                          Section Name
                        </LabelCom>
                        <InputCom
                          type="text"
                          control={control}
                          name="name"
                          register={register}
                          placeholder="Input section name"
                          errorMsg={errors.name?.message}
                        ></InputCom>
                      </div>
    
                      <div className="col-sm-6">
                        <LabelCom htmlFor="ordered">Ordered</LabelCom>
                        <InputCom
                          type="number"
                          control={control}
                          name="ordered"
                          register={register}
                          placeholder="Input section ordered"
                          errorMsg={errors.ordered?.message}
                          defaultValue={0}
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
}

export default BlogCreatePage