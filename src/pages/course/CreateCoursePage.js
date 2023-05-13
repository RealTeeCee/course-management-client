import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../components/button";
import {
  AlertAntCom,
  SelectSearchAntCom,
  SelectTagAntCom,
} from "../../components/ant";
import { TextAreaCom } from "../../components/textarea";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import GapYCom from "../../components/common/GapYCom";
Quill.register("modules/imageUploader", ImageUploader);

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
  category_id: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
  tags: yup
    .string()
    .required(
      process.env.REACT_APP_MESSAGE_REQUIRED ?? "This fields is required"
    ),
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

const tagItems = [
  {
    value: "Programming",
    label: "Programming",
  },
  {
    value: "PHP",
    label: "PHP",
  },
];

const CreateCoursePage = () => {
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
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("Successfully");
  const [description, setDescription] = useState("");

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
  const handleChangeCategory = (value) => {
    setValue("category_id", value);
    setError("category_id", { message: "" });
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeTags = (itemsArrs) => {
    if (isError) {
      setIsError(false);
      setMsg("Successfully");
    }
    const regex = /[,!@#$%^&*()+=\[\]\\';./{}|":<>?~_]/;
    const hasSpecialChar = itemsArrs.some((item) => regex.test(item));
    // const hasComma = itemsArrs.some((item) => item.includes(","));
    if (hasSpecialChar) {
      setIsError(true);
      setMsg(
        "Dont accept special character!But you can using - for split string"
      );
      setValue("tags", "");
      setError("tags", { message: "Invalid tags fields" });
      return;
    }

    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) =>
      item.replace(/\s+/g, " ").replace(/-+/g, "-")
    );
    const itemsString = strReplace.join(",");
    setIsError(false);
    setValue("tags", itemsString);
    setError("tags", { message: "" });
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeArchivements = (itemsArrs) => {
    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) => item.replace(/\s+/g, " "));
    const itemsString = strReplace.join(",");
    setIsError(false);
    setValue("archivements", itemsString);
    setError("archivements", { message: "" });
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {},
      },
    }),
    []
  );

  return (
    <>
      {isError && <AlertAntCom type="error" msg={msg}></AlertAntCom>}
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
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-4">
                    <LabelCom htmlFor="category_id" isRequired>
                      Choose Category
                    </LabelCom>
                    <div>
                      <SelectSearchAntCom
                        listItems={categoryItems}
                        onChange={handleChangeCategory}
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
                  <div className="col-sm-4">
                    <LabelCom
                      htmlFor="tags"
                      isRequired
                      subText="Press 'enter' every tags"
                      className="mb-1"
                    >
                      Tags
                    </LabelCom>
                    <SelectTagAntCom
                      listItems={tagItems}
                      onChange={handleChangeTags}
                      placeholder="Search or Input new Tags..."
                      status={errors.tags && errors.tags.message && "error"}
                      errorMsg={errors.tags?.message}
                    ></SelectTagAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="tags"
                      register={register}
                    ></InputCom>
                  </div>
                  <div className="col-sm-4">
                    <LabelCom
                      htmlFor="archivements"
                      subText="Press 'enter' every archivement"
                      className="mb-1"
                    >
                      Archivement
                    </LabelCom>
                    <SelectTagAntCom
                      listItems={[]}
                      onChange={handleChangeArchivements}
                      placeholder="Input the archivement..."
                      status={
                        errors.archivements &&
                        errors.archivements.message &&
                        "error"
                      }
                      errorMsg={errors.archivements?.message}
                    ></SelectTagAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="archivements"
                      register={register}
                    ></InputCom>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
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
                <GapYCom className="mb-3"></GapYCom>
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
                    <LabelCom htmlFor="description">Description</LabelCom>
                    {/* <TextAreaCom
                        name="description"
                        control={control}
                        register={register}
                        placeholder="Describe your course ..."
                      ></TextAreaCom> */}
                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={description}
                      onChange={setDescription}
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

export default CreateCoursePage;
