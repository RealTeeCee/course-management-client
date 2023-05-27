import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../../components/heading";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../../components/button";
import { SelectSearchAntCom, SelectTagAntCom } from "../../../components/ant";
import GapYCom from "../../../components/common/GapYCom";
import { toast } from "react-toastify";
import {
  BASE_API_URL,
  MESSAGE_GENERAL_FAILED,
  MESSAGE_FIELD_INVALID,
  MESSAGE_UPLOAD_REQUIRED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_FIELD_REQUIRED,
  categoryItems,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MAX_LENGTH_NAME,
  MIN_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
} from "../../../constants/config";
import ImageUploadCom from "../../../components/image/ImageUploadCom";
import axiosInstance from "../../../api/axiosInstance";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import { IMG_BB_URL } from "../../../constants/endpoint";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
  tags: yup.string().required(MESSAGE_FIELD_REQUIRED),
  price: yup
    .number()
    .nullable()
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  sale_price: yup
    .number()
    .nullable()
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  duration: yup
    .number(MESSAGE_NUMBER_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(1, MESSAGE_NUMBER_POSITIVE),
});

// Label is category name , value is category_id

const tagItems = [
  {
    value: "programming",
    label: "Programming",
  },
  {
    value: "php",
    label: "PHP",
  },
];

const AdminCreateCoursePage = () => {
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
  const [categorySelected, setCategorySelected] = useState(null);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [archivementSelected, setArchivementSelected] = useState([]);
  const [description, setDescription] = useState("");

  const resetValues = () => {
    setCategorySelected(null);
    setTagsSelected([]);
    setArchivementSelected([]);
    setDescription("");
    reset();
  };

  const handleSubmitForm = async (values) => {
    const {
      name,
      category_id,
      price,
      sale_price,
      image,
      tags,
      duration,
      archivements,
      description,
    } = values;

    if (image === "" || image[0] === undefined) {
      const imageSelector = document.querySelector('input[name="image"]');
      if (imageSelector) imageSelector.focus();
      toast.error(MESSAGE_GENERAL_FAILED);
      setError("image", { message: MESSAGE_UPLOAD_REQUIRED });
      setValue("image", null);
    } else if (sale_price > price) {
      const salePriceSelector = document.querySelector(
        'input[name="sale_price"]'
      );
      if (salePriceSelector) salePriceSelector.focus();
      toast.error(MESSAGE_GENERAL_FAILED);
      setError("sale_price", { message: "Sale Price cannot > Price" });
    } else {
      try {
        setIsLoading(!isLoading);
        let fd = new FormData();
        fd.append(
          "courseJson",
          JSON.stringify({
            name,
            category_id,
            price,
            sale_price,
            tags,
            duration,
            archivements,
            description,
          })
        );
        fd.append("file", image[0]);
        const res = await axiosPrivate.post(`/course`, fd, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        toast.success(`${res.data.message}`);
        setIsLoading(false);
        resetValues();
        reset();
      } catch (error) {
        toast.error(`${MESSAGE_GENERAL_FAILED} ${error.data.message}`);
        setIsLoading(false);
      }
    }
  };

  /********* Fetch API Area ********* */
  useEffect(() => {
    // const getTags = async () => {
    //   try {
    //     const res = await axios.get(``);
    //     setTagItems(res.data);
    //   } catch (error) {
    //     toast.error(error.message);
    //   }
    // };
    // getTags();
  }, []);
  /********* END Fetch API Area ********* */

  /********* Library Function Area ********* */
  const handleChangeCategory = (value) => {
    setValue("category_id", value);
    setError("category_id", { message: "" });
    setCategorySelected(value);
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeTags = (itemsArrs) => {
    const regex = /[,!@#$%^&*()+=[\]\\';./{}|":<>?~_]/;
    const hasSpecialChar = itemsArrs.some((item) => regex.test(item));
    // const hasComma = itemsArrs.some((item) => item.includes(","));
    if (hasSpecialChar) {
      toast.error("Invalid tag! Only accept: - for special character");
      setValue("tags", "");
      setError("tags", { message: MESSAGE_FIELD_INVALID });
      return;
    }

    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) =>
      item.replace(/\s+/g, " ").replace(/-+/g, "-").toLowerCase()
    );
    const itemsString = strReplace.join(",").toLowerCase();

    setValue("tags", itemsString);
    setError("tags", { message: "" });
    setTagsSelected(itemsArrs);
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeArchivements = (itemsArrs) => {
    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) => item.replace(/\s+/g, " "));
    const itemsString = strReplace.join(",");

    setValue("archivements", itemsString);
    setError("archivements", { message: "" });
    setArchivementSelected(itemsArrs);
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
        upload: async (file) => {
          const fd = new FormData();
          fd.append("image", file);
          try {
            const res = await axiosInstance({
              method: "POST",
              url: IMG_BB_URL,
              data: fd,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return res.data.data.url;
          } catch (error) {
            toast.error(error.message);
            return;
          }
        },
      },
    }),
    []
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create Course</HeadingH1Com>
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
                    <LabelCom htmlFor="image" isRequired>
                      Image
                    </LabelCom>
                    <InputCom
                      type="file"
                      control={control}
                      name="image"
                      register={register}
                      placeholder="Upload image"
                      errorMsg={errors.image?.message}
                    ></InputCom>
                    {/* <ImageUploadCom
                      // control={control}
                      // register={register}
                      name="image"
                      placeholder="Upload Image"
                      errorMsg={errors.image?.message}
                      onSetValue={setValue}
                    ></ImageUploadCom> */}
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-4">
                    <LabelCom htmlFor="price">Price</LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="price"
                      register={register}
                      placeholder="Input Price"
                      errorMsg={errors.price?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-4">
                    <LabelCom htmlFor="sale_price">Sale Price</LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="sale_price"
                      register={register}
                      placeholder="Input Sale Price"
                      errorMsg={errors.sale_price?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-4">
                    <LabelCom htmlFor="duration" subText="(Hour)">
                      Estimate Duration
                    </LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="duration"
                      register={register}
                      placeholder="Estimate Duration"
                      errorMsg={errors.duration?.message}
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
                        selectedValue={categorySelected}
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
                      subText="'enter' every tags"
                      className="mb-1"
                    >
                      Tags
                    </LabelCom>
                    <SelectTagAntCom
                      listItems={tagItems}
                      selectedValue={tagsSelected}
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
                      subText="'enter' every archivement"
                      className="mb-1"
                    >
                      Archivement
                    </LabelCom>
                    <SelectTagAntCom
                      listItems={[]}
                      selectedValue={archivementSelected}
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
                      onChange={(description) => {
                        setValue("description", description);
                        setDescription(description);
                      }}
                      placeholder="Describe your course ..."
                      className="h-36"
                    ></ReactQuill>
                    {/* <TextAreaCom
                      control={control}
                      name="description"
                      register={register}
                      // className="hidden"
                    ></TextAreaCom> */}
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom
                  type="submit"
                  isLoading={isLoading}
                  backgroundColor="info"
                >
                  Save
                </ButtonCom>
                <ButtonCom backgroundColor="danger" type="reset">
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

export default AdminCreateCoursePage;
