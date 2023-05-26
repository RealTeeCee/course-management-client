import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import Overlay from "../../../components/common/Overlay";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import {
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { TableCom } from "../../../components/table";
import { API_COURSE_URL, IMG_BB_URL } from "../../../constants/endpoint";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as yup from "yup";
import {
  MESSAGE_FIELD_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_GENERAL_FAILED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_UPLOAD_REQUIRED,
} from "../../../constants/config";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import { SelectSearchAntCom, SelectTagAntCom } from "../../../components/ant";
import ReactQuill from "react-quill";
import { TextAreaCom } from "../../../components/textarea";
import Swal from "sweetalert2";
import { SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
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
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  // Variable State
  const [courseId, setCourseId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [search, setSearch] = useState("");

  const [categorySelected, setCategorySelected] = useState(1);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [archivementSelected, setArchivementSelected] = useState([]);
  const [description, setDescription] = useState("");

  /********* Fetch data Area ********* */
  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_id,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image}`} alt={row.name} />
      ),
    },
    {
      name: "Price",
      selector: (row) => (row.sale_price > 0 ? row.sale_price : row.price),
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-none mr-2"
            backgroundColor="info"
            onClick={() => {
              // alert(`Update Course id: ${row.id}`);
              setIsOpen(true);
              setCourseId(row.id);
            }}
          >
            <IconEditCom></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-none"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteCourse(row);
            }}
          >
            <IconTrashCom></IconTrashCom>
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

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const res = await axiosPrivate.get(`${API_COURSE_URL}/${courseId}`);
        console.log(res.data);
        reset(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseById();
  }, [axiosPrivate, courseId, reset]);

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
        // resetValues();
        // reset();
      } catch (error) {
        toast.error(`${MESSAGE_GENERAL_FAILED} ${error.data.message}`);
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
          console.log(error);
          Swal.fire(MESSAGE_GENERAL_FAILED, "error");
        }
      }
    });
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
          toast.error(MESSAGE_GENERAL_FAILED);
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
    const itemsString = strReplace.join(",");

    setValue("tags", itemsString);
    setError("tags", { message: "" });
    // setTagsSelected(itemsArrs);
  };

  // itemsArrs = ["PHP", "PROGRAMMING"]
  const handleChangeArchivements = (itemsArrs) => {
    // Cut the space and - if more than one
    const strReplace = itemsArrs.map((item) => item.replace(/\s+/g, " "));
    const itemsString = strReplace.join(",");

    setValue("archivements", itemsString);
    setError("archivements", { message: "" });
    // setArchivementSelected(itemsArrs);
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
      {/* <Overlay onClick={() => console.log("clicked")}></Overlay> */}
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
              <ButtonCom backgroundColor="danger" type="reset">
                Cancel
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default AdminCourseListPage;
