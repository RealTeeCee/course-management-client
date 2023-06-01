import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../../components/heading";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../../components/button";
import {
  ImageCropUploadAntCom,
  SelectDefaultAntCom,
  SelectSearchAntCom,
  SelectTagAntCom,
} from "../../../components/ant";
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
  statusItems,
  levelItems,
  MESSAGE_SALE_PRICE_HIGHER_PRICE,
} from "../../../constants/config";
import ImageUploadCom from "../../../components/image/ImageUploadCom";
import axiosInstance from "../../../api/axiosInstance";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import { API_TAG_URL, IMG_BB_URL } from "../../../constants/endpoint";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import useOnChange from "../../../hooks/useOnChange";
import { convertStrMoneyToInt, showMessageError } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
Quill.register("modules/imageUploader", ImageUploader);

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  status: yup.number().default(1),
  level: yup.number().default(0),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
  category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
  tags: yup.string().required(MESSAGE_FIELD_REQUIRED),
  price: yup
    .string()
    .nullable()
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  sale_price: yup
    .string()
    .nullable()
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  duration: yup
    .string(MESSAGE_NUMBER_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(1, MESSAGE_NUMBER_POSITIVE),
});

// Label is category name , value is category_id

// const tagItems = [
//   {
//     value: "programming",
//     label: "Programming",
//   },
//   {
//     value: "php",
//     label: "PHP",
//   },
// ];

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
  /********* API State ********* */
  const [tagItems, setTagItems] = useState([]);
  /********* END API State ********* */
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [archivementSelected, setArchivementSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [price, handleChangePrice, setPrice] = useOnChange(0);
  const [sale_price, handleChangeSalePrice, setSalePrice] = useOnChange(0);

  const resetValues = () => {
    setCategorySelected(null);
    setTagsSelected([]);
    setArchivementSelected([]);
    setDescription("");
    setPrice(0);
    setSalePrice(0);
    reset();
    getTags();
  };

  const handleSubmitForm = async (values) => {
    const {
      name,
      status,
      level,
      category_id,
      price,
      sale_price,
      image,
      tags,
      duration,
      archivements,
      description,
    } = values;

    // if (image === "" || image[0] === undefined) {
    //   const imageSelector = document.querySelector('input[name="image"]');
    //   if (imageSelector) imageSelector.focus();
    //   toast.error(MESSAGE_GENERAL_FAILED);
    //   setError("image", { message: MESSAGE_UPLOAD_REQUIRED });
    //   setValue("image", null);
    // } else if
    if (convertStrMoneyToInt(sale_price) > convertStrMoneyToInt(price)) {
      const salePriceSelector = document.querySelector(
        'input[name="sale_price"]'
      );
      if (salePriceSelector) salePriceSelector.focus();
      toast.error(MESSAGE_GENERAL_FAILED);
      setError("sale_price", { message: MESSAGE_SALE_PRICE_HIGHER_PRICE });
    } else {
      try {
        setIsLoading(!isLoading);
        let fd = new FormData();
        fd.append(
          "courseJson",
          JSON.stringify({
            name,
            status,
            level,
            image,
            category_id,
            price: convertStrMoneyToInt(price),
            sale_price: convertStrMoneyToInt(sale_price),
            tags,
            duration,
            archivements,
            description,
          })
        );
        // fd.append("file", image[0]);
        // const res = await axiosPrivate.post(`/course`, fd, {
        //   headers: {
        //     "Content-type": "multipart/form-data",
        //   },
        // });
        const res = await axiosPrivate.post(`/course`, fd);
        toast.success(`${res.data.message}`);
        resetValues();
        navigate("/admin/courses");
      } catch (error) {
        showMessageError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTags = async () => {
    try {
      const res = await axiosPrivate.get(`${API_TAG_URL}`);
      const newRes = res.data.map((item) => {
        const tagNames = item.name.split(" ");
        // ['Spring', 'Boot']
        const capitalLabelArr = tagNames.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        ); // slice 1 ký tự đầu);
        return {
          value: item.name.toLowerCase(),
          label: capitalLabelArr.join(" "),
        };
      });
      setTagItems(newRes);
    } catch (error) {
      showMessageError(error);
    }
  };

  /********* Fetch API Area ********* */
  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleChangeStatus = (value) => {
    setValue("status", value);
    setError("status", { message: "" });
  };

  const handleChangeLevel = (value) => {
    setValue("level", value);
    setError("level", { message: "" });
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
                  <div className="col-sm-4">
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
                  <div className="col-sm-3">
                    <LabelCom htmlFor="status">Status</LabelCom>
                    <div>
                      <SelectDefaultAntCom
                        listItems={statusItems}
                        onChange={handleChangeStatus}
                        status={
                          errors.status && errors.status.message && "error"
                        }
                        errorMsg={errors.status?.message}
                        placeholder="Choose Status"
                      ></SelectDefaultAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="status"
                        register={register}
                        defaultValue={1}
                      ></InputCom>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <LabelCom htmlFor="level">Level</LabelCom>
                    <div>
                      <SelectDefaultAntCom
                        listItems={levelItems}
                        onChange={handleChangeLevel}
                        defaultValue={0}
                      ></SelectDefaultAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="level"
                        register={register}
                        defaultValue={0}
                      ></InputCom>
                    </div>
                  </div>
                  <div className="col-sm-2 relative">
                    <LabelCom htmlFor="image" isRequired>
                      Image
                    </LabelCom>
                    {/* <InputCom
                      type="file"
                      control={control}
                      name="image"
                      register={register}
                      placeholder="Upload image"
                      errorMsg={errors.image?.message}
                    ></InputCom> */}
                    <div className="absolute w-full">
                      <ImageCropUploadAntCom
                        name="image"
                        onSetValue={setValue}
                        errorMsg={errors.image?.message}
                        editImage={[]}
                      ></ImageCropUploadAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="image"
                        register={register}
                      ></InputCom>
                    </div>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
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
                  <div className="col-sm-3">
                    <LabelCom htmlFor="price" subText="($)">
                      Price
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="price"
                      register={register}
                      placeholder="Input Price"
                      errorMsg={errors.price?.message}
                      onChange={handleChangePrice}
                      defaultValue={price}
                      value={price}
                    ></InputCom>
                  </div>
                  <div className="col-sm-3">
                    <LabelCom htmlFor="sale_price" subText="($)">
                      Sale Price
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="sale_price"
                      register={register}
                      placeholder="Input Sale Price"
                      errorMsg={errors.sale_price?.message}
                      onChange={handleChangeSalePrice}
                      defaultValue={sale_price}
                      value={sale_price}
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
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
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
