import React from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import LayoutHome from "../../layouts/LayoutHome";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
  //   password: yup
  //     .string()
  //     .required(
  //       process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
  //     ),
});

const CreateCoursePage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const handleSubmitForm = (values) => {
    const { name } = values;
    console.log(values);
  };

  return (
    <LayoutHome>
      <HeadingH1Com>Create Courses</HeadingH1Com>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Default Form Layout</h5>
              <span>Lorem ipsum dolor sit amet consectetur</span>
            </div>
            <div className="card-body">
              <form
                className="theme-form"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <LabelCom htmlFor="name">Course Name</LabelCom>
                      <InputCom
                        type="text"
                        control={control}
                        name="name"
                        register={register}
                        placeholder="Input Course Name"
                        errorMsg={errors.name?.message}
                      ></InputCom>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <LabelCom htmlFor="category">Category</LabelCom>
                      <InputCom
                        type="text"
                        control={control}
                        name="category"
                        register={register}
                        placeholder="Input Category"
                        errorMsg={errors.category?.message}
                      ></InputCom>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <LabelCom htmlFor="tags">Tags</LabelCom>
                      <InputCom
                        type="text"
                        control={control}
                        name="tags"
                        register={register}
                        placeholder="Input Tags"
                        errorMsg={errors.tags?.message}
                      ></InputCom>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <LabelCom htmlFor="price">Price</LabelCom>
                      <InputCom
                        type="text"
                        control={control}
                        name="price"
                        register={register}
                        placeholder="Input Price"
                        errorMsg={errors.price?.message}
                      ></InputCom>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <LabelCom htmlFor="sale_price">Sale Price</LabelCom>
                      <InputCom
                        type="text"
                        control={control}
                        name="sale_price"
                        register={register}
                        placeholder="Input Sale Price"
                        errorMsg={errors.sale_price?.message}
                      ></InputCom>
                    </div>
                  </div>
                </div>
                {/* <div className="checkbox p-0">
                  <input
                    id="dafault-checkbox"
                    type="checkbox"
                    data-bs-original-title=""
                    title=""
                  />
                  <label className="mb-0" htmlFor="dafault-checkbox">
                    Remember my preference
                  </label>
                </div> */}
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb-3">
                      <LabelCom htmlFor="description">Description</LabelCom>
                      {/* <InputCom
                        type="text"
                        control={control}
                        name="description"
                        register={register}
                        placeholder="Input Description"
                        errorMsg={errors.description?.message}
                      ></InputCom> */}
                      <textarea name="description" className="form-control" id="" cols="30" rows="10"></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-primary mr-2"
                data-bs-original-title=""
                title=""
              >
                Create
              </button>
              <button
                className="btn btn-secondary"
                data-bs-original-title=""
                title=""
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default CreateCoursePage;
