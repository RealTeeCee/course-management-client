import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import LayoutHome from "../../layouts/LayoutHome";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../components/button";
import { SelectSearchAntCom } from "../../components/ant";

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
  // category_id: yup
  //   .string()
  //   .required(
  //     process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
  //   ),
});

// Label is category name , value is category_id
const categoryItems = [
  {
    value: 1,
    label: "Programming",
  },
  {
    value: 2,
    label: "Marketing",
  },
  {
    value: 3,
    label: "Contructor",
  },
];

const CreateCoursePage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const handleSubmitForm = (values) => {
    const { name, category_id } = values;
    console.log(values);
    setIsLoading(!isLoading);

    // After done, remove loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  /********* Library Function Area ********* */
  const handleCategoryChange = (value) => {
    setCategoryId(value);
    const form = document.querySelector("#form-create");
    form.querySelector('input[name="category_id"]').value = value;
  };

  return (
    <LayoutHome>
      <HeadingH1Com>Create Courses</HeadingH1Com>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <form
              className="theme-form"
              onSubmit={handleSubmit(handleSubmitForm)}
              id="form-create"
            >
              {/* <div className="card-header">
                <h5>Form Create Course</h5>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </div> */}
              <div className="card-body">
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
                      <LabelCom htmlFor="category_id">Category</LabelCom>
                      {/* <InputCom
                        type="text"
                        control={control}
                        name="category"
                        register={register}
                        placeholder="Input Category"
                        errorMsg={errors.category?.message}
                      ></InputCom> */}
                      <div>
                        <SelectSearchAntCom
                          listItems={categoryItems}
                          onChange={handleCategoryChange}
                          className="w-full py-1"
                          status={
                            errors.category_id &&
                            errors.category_id.message &&
                            "error"
                          }
                          errorMsg={errors.category_id?.message}
                          placeholder="Input category to search"
                        ></SelectSearchAntCom>
                        <InputCom
                          type="hidden"
                          control={control}
                          name="category_id"
                          register={register}
                        ></InputCom>
                      </div>
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
                      <textarea
                        name="description"
                        className="form-control"
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                    </div>
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
    </LayoutHome>
  );
};

export default CreateCoursePage;
