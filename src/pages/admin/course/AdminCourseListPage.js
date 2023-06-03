import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import {
  IconBookCom,
  IconEditCom,
  IconEyeCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { TableCom } from "../../../components/table";
import {
  API_COURSE_URL,
  API_TAG_URL,
  IMG_BB_URL,
} from "../../../constants/endpoint";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as yup from "yup";
import {
  categoryItems,
  levelItems,
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_INVALID,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_GENERAL_FAILED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_NET_PRICE_HIGHER_PRICE,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
  statusItems,
} from "../../../constants/config";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import {
  ImageCropUploadAntCom,
  SelectDefaultAntCom,
  SelectSearchAntCom,
  SelectTagAntCom,
} from "../../../components/ant";
import ReactQuill from "react-quill";
import { TextAreaCom } from "../../../components/textarea";
import Swal from "sweetalert2";
import {
  convertIntToStrMoney,
  convertStrMoneyToInt,
  showMessageError,
} from "../../../utils/helper";
import useOnChange from "../../../hooks/useOnChange";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

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
  net_price: yup
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

const AdminCourseListPage = () => {
  // More Action Menu
  const dropdownItems = [
    {
      key: "1",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-success transition-all duration-300"
          onClick={() => toast.info("Developing...")}
        >
          Export
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-danger transition-all duration-300"
          onClick={() => handleDeleteMultipleRecords()}
        >
          Remove All
        </div>
      ),
    },
  ];
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const resetValues = () => {
    reset();
  };

  /********* API State ********* */
  const [tagItems, setTagItems] = useState([]);
  const [image, setImage] = useState([]);

  const [categorySelected, setCategorySelected] = useState(null);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [achievementSelected, setAchievementSelected] = useState([]);
  /********* END API State ********* */

  // Local State
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [search, setSearch] = useState("");

  const [description, setDescription] = useState("");

  // Edit State
  const [price, handleChangePrice, setPrice] = useOnChange(0);
  const [net_price, handleChangeNetPrice, setNetPrice] = useOnChange(0);

  /********* Fetch API Area ********* */
  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image}`} alt={row.name} />
      ),
    },
    {
      name: "Price",
      cell: (row) =>
        row.net_price > 0 ? (
          <span className="text-tw-danger">
            ${convertIntToStrMoney(row.net_price)}
          </span>
        ) : (
          `$${convertIntToStrMoney(row.price)}`
        ),
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
    },
    {
      name: "Section",
      cell: (row) => (
        <>
          <Link to={`/admin/courses/${row.id}/sections`}>
            <ButtonCom
              className="px-3 rounded-lg mr-2"
              backgroundColor="gray"
              onClick={() => {
                // alert(`Update Course id: ${row.id}`);
              }}
            >
              <IconBookCom className="w-5 text-black"></IconBookCom>
            </ButtonCom>
          </Link>
        </>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              // alert(`Update Course id: ${row.id}`);
              setIsOpen(true);
              getCourseById(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            onClick={() => {
              window.open(`/courses/${row.slug}`, "_blank");
            }}
          >
            <IconEyeCom className="w-5"></IconEyeCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteCourse(row);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  const getCourses = async () => {
    try {
      const res = await axiosPrivate.get(API_COURSE_URL);
      console.log(res.data);
      setCourses(res.data);
      setFilterCourse(res.data);
    } catch (error) {
      console.log(error);
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

  // /********* Fetch API Area ********* */
  useEffect(() => {
    getCourses();
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCourseById = async (courseId) => {
    try {
      const res = await axiosPrivate.get(`${API_COURSE_URL}/${courseId}`);
      reset(res.data);
      setValue("price", convertIntToStrMoney(res.data.price));
      setValue("net_price", convertIntToStrMoney(res.data.net_price));

      setPrice(convertIntToStrMoney(res.data.price));
      setNetPrice(convertIntToStrMoney(res.data.net_price));
      setCategorySelected(res.data.category_id);
      setTagsSelected(res.data.tags.split(","));
      setAchievementSelected(res.data.achievements.split(","));

      const resImage = res.data.image;
      const imgObj = [
        {
          uid: v4(),
          name: resImage.substring(resImage.lastIndexOf("/") + 1),
          status: "done",
          url: resImage,
        },
      ];

      setImage(imgObj);
    } catch (error) {
      console.log(error);
    }
  };

  // Search in Table
  useEffect(() => {
    const result = courses.filter((course) => {
      const keys = Object.keys(course);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = course[key];
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        if (
          typeof value === "number" &&
          String(value).toLowerCase() === search.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });
    setFilterCourse(result);
  }, [courses, search]);

  /********* Action Area ********* */
  const handleSubmitForm = async (values) => {
    const {
      id,
      name,
      status,
      level,
      category_id,
      price,
      net_price,
      image,
      tags,
      duration,
      achievements,
      description,
    } = values;

    // if (image === "" || image[0] === undefined) {
    //   const imageSelector = document.querySelector('input[name="image"]');
    //   if (imageSelector) imageSelector.focus();
    //   toast.error(MESSAGE_GENERAL_FAILED);
    //   setError("image", { message: MESSAGE_UPLOAD_REQUIRED });
    //   setValue("image", null);
    // } else if
    if (convertStrMoneyToInt(net_price) > convertStrMoneyToInt(price)) {
      const netPriceSelector = document.querySelector(
        'input[name="net_price"]'
      );
      if (netPriceSelector) netPriceSelector.focus();
      toast.error(MESSAGE_GENERAL_FAILED);
      setError("net_price", { message: MESSAGE_NET_PRICE_HIGHER_PRICE });
    } else {
      try {
        setIsLoading(!isLoading);
        let fd = new FormData();
        fd.append(
          "courseJson",
          JSON.stringify({
            id,
            name,
            status,
            level,
            image,
            category_id,
            price: convertStrMoneyToInt(price),
            net_price: convertStrMoneyToInt(net_price),
            tags,
            duration,
            achievements,
            description,
          })
        );

        const res = await axiosPrivate.put(`/course`, fd);
        getCourses();
        toast.success(`${res.data.message}`);
        setIsOpen(false);
        // resetValues();
        // navigate("/admin/courses");
      } catch (error) {
        showMessageError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // Delete one
  const handleDeleteCourse = ({ id, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete course: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPrivate.delete(
            `${API_COURSE_URL}?courseId=${id}`
          );
          getCourses();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  ///********* Update Area *********
  const handleChangeStatus = (value) => {
    setValue("status", value);
    setError("status", { message: "" });
  };

  const handleChangeLevel = (value) => {
    setValue("level", value);
    setError("level", { message: "" });
  };

  /********* Library Function Area ********* */
  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };

  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };
  // Muti Delete
  const handleDeleteMultipleRecords = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete <span class="text-tw-danger">${
        selectedRows.length
      } selected ${selectedRows.length > 1 ? "courses" : "course"}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = selectedRows.map((row) =>
            axiosPrivate.delete(`${API_COURSE_URL}?courseId=${row.id}`)
          );
          await Promise.all(deletePromises);
          toast.success(`Delete ${selectedRows.length} courses success`);
        } catch (error) {
          showMessageError(error);
        } finally {
          getCourses();
          clearSelectedRows();
        }
      }
    });

    // Optionally, you can update the data source or refetch the data to reflect the changes
    // Example: refetchData();
  };

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
      item.replace(/\s+/g, " ").replace(/-+/g, "-")
    );
    const itemsString = strReplace.join(",").toLowerCase();

    setValue("tags", itemsString);
    setError("tags", { message: "" });
    setTagsSelected(itemsArrs);
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeAchievements = (itemsArrs) => {
    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) => item.replace(/\s+/g, " "));
    const itemsString = strReplace.join(",");

    setValue("achievements", itemsString);
    setError("achievements", { message: "" });
    setAchievementSelected(itemsArrs);
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
        <HeadingH1Com>Admin Courses</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              {/* <HeadingH2Com className="text-tw-light-pink">
                List Courses
              </HeadingH2Com> */}
              <span>
                <TableCom
                  tableKey={tableKey}
                  urlCreate="/admin/courses/create"
                  title="List Courses"
                  columns={columns}
                  items={filterCourse}
                  search={search}
                  setSearch={setSearch}
                  dropdownItems={dropdownItems}
                  onSelectedRowsChange={handleRowSelection} // selected Mutilple
                ></TableCom>
              </span>
            </div>
            <div className="card-body flex gap-x-4 h-[100vh]"></div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="modal-overplay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={`modal-content scroll-hidden  max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg outline-none transition-all duration-300 ${
          isOpen ? "w-50" : "w-0"
        }`}
      >
        <div className="card-header bg-tw-primary flex justify-between text-white">
          <HeadingFormH5Com className="text-2xl">Edit Course</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom
              className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"
              onClick={() => setIsOpen(false)}
            ></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitForm)}
            id="form-create"
          >
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Course hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
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
                      status={errors.status && errors.status.message && "error"}
                      errorMsg={errors.status?.message}
                      placeholder="Choose Status"
                      defaultValue={getValues("status")}
                    ></SelectDefaultAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="status"
                      register={register}
                      defaultValue={getValues("status")}
                    ></InputCom>
                  </div>
                </div>
                <div className="col-sm-3">
                  <LabelCom htmlFor="level">Level</LabelCom>
                  <div>
                    <SelectDefaultAntCom
                      listItems={levelItems}
                      onChange={handleChangeLevel}
                      defaultValue={getValues("level")}
                    ></SelectDefaultAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="level"
                      register={register}
                      defaultValue={getValues("level")}
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
                      editImage={image}
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
                    type="text"
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
                  <LabelCom htmlFor="net_price" subText="($)">
                    Net Price
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="net_price"
                    register={register}
                    placeholder="Input Net Price"
                    errorMsg={errors.net_price?.message}
                    onChange={handleChangeNetPrice}
                    defaultValue={net_price}
                    value={net_price}
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
                    htmlFor="achievements"
                    subText="'enter' every achievement"
                    className="mb-1"
                  >
                    Achievement
                  </LabelCom>
                  <SelectTagAntCom
                    listItems={[]}
                    selectedValue={achievementSelected}
                    onChange={handleChangeAchievements}
                    placeholder="Input the achievement..."
                    status={
                      errors.achievements &&
                      errors.achievements.message &&
                      "error"
                    }
                    errorMsg={errors.achievements?.message}
                  ></SelectTagAntCom>
                  <InputCom
                    type="hidden"
                    control={control}
                    name="achievements"
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
                  <TextAreaCom
                    name="description"
                    control={control}
                    register={register}
                    placeholder="Describe your course ..."
                  ></TextAreaCom>
                  {/* <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={description}
                      onChange={(description) => {
                        setValue("description", description);
                        setDescription(description);
                      }}
                      placeholder="Describe your course ..."
                      className="h-36"
                    ></ReactQuill> */}
                </div>
              </div>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Update
              </ButtonCom>
              <ButtonCom backgroundColor="danger" onClick={resetValues}>
                Reset
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default AdminCourseListPage;
