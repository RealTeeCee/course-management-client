import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ImageCropUploadAntCom,
  SelectDefaultAntCom,
  SelectSearchAntCom,
  SwitchAntCom,
} from "../../../components/ant";
import { axiosBearer } from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import {
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
  categoryItems,
} from "../../../constants/config";
import { showMessageError } from "../../../utils/helper";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { TableCom } from "../../../components/table";
import { blog } from "../../../assets/blog_data/data";
import ButtonCom from "../../../components/button/ButtonCom";
import {
  IconEditCom,
  IconEyeCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { Link } from "@mui/material";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { TextEditorQuillCom } from "../../../components/texteditor";
import { BreadcrumbCom } from "../../../components/breadcrumb";

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  status: yup.number().default(2),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
  category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
});

const statusItems = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "InActive",
  },
  {
    value: 2,
    label: "Proccessing",
  },
];
const AdminBlogListPage = () => {
  /********* State ********* */
  //API State
  const [image, setImage] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);

  // Local State
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filterBlog, setFilterBlog] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);
  const user_id = user.id;

  /********* END API State ********* */

  /********* More Action Menu ********* */
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

  //manage status and event in form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const resetValues = () => {
    reset();
  };

  /********* Fetch API Area ********* */
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Blog Name",
      selector: (row) => row.name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image}`} alt={row.name} />
      ),
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status === 2) {
          return (
            <ButtonCom
              color="danger"
              onClick={() => handleChangeStatus(row.id, row.status)}
            >
              Proccessing
            </ButtonCom>
          );
        } else if (row.status === 1) {
          return (
            <ButtonCom
              backgroundColor="info"
              onClick={() => handleChangeStatus(row.id, row.status)}
            >
              Active
            </ButtonCom>
          );
        } else {
          return (
            <ButtonCom
              color="pink"
              onClick={() => handleChangeStatus(row.id, row.status)}
            >
              In-Active
            </ButtonCom>
          );
        }
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              handleEdit(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            onClick={() => {
              window.open(`/blogs/${row.id}`);
            }}
          >
            <IconEyeCom className="w-5"></IconEyeCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteBlog(row);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  /********* Call API ********* */
  //Get All Blog
  const getBlogs = async () => {
    try {
      const res = await axiosBearer.get(`/blog/blogs`);
      console.log(res.data);
      setBlogs(res.data);
      setFilterBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleChangeCategory = (value) => {
    setValue("category_id", value);
    setError("category_id", { message: "" });
    setCategorySelected(value);
  };

  const handleChangeStatus = async (value) => {
    setValue("status", value);
    setError("status", { message: "" });
    setCategorySelected(value);
  };

  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };

  /********* Search ********* */
  useEffect(() => {
    const result = blogs.filter((blog) => {
      const keys = Object.keys(blog);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = blog[key];
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
    setFilterBlog(result);
  }, [blogs, search]);

  /********* Delete one API ********* */
  const handleDeleteBlog = ({ id, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete blog: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBearer.delete(`/blog/${id}`);
          getBlogs();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  /********* Multi Delete API ********* */
  const handleDeleteMultipleRecords = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete <span class="text-tw-danger">${
        selectedRows.length
      } selected ${selectedRows.length > 1 ? "blogs" : "blog"}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = selectedRows.map((row) =>
            axiosBearer.delete(`/blog/${row.id}`)
          );
          await Promise.all(deletePromises);
          toast.success(`Delete ${selectedRows.length} blogs success`);
        } catch (error) {
          showMessageError(error);
        } finally {
          getBlogs();
          clearSelectedRows();
        }
      }
    });
  };
  /********* Update API ********* */
  const handleEdit = async (blogId) => {
    try {
      setIsFetching(true);
      await getBlogById(blogId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const getBlogById = async (blogId) => {
    try {
      const res = await axiosBearer.get(`blog/${blogId}`);
      reset(res.data);
      setCategorySelected(res.data.category_id);
      setStatusSelected(res.data.status);
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

  const handleSubmitForm = async (values) => {
    console.log(values);
    try {
      setIsLoading(!isLoading);
      const res = await axiosBearer.put(`/blog`, {
        ...values,
        user_id,
        view_count: 0,
      });
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getBlogs();
      Navigate(`/admin/blogs`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isFetching && <LoadingCom />}
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Blogs</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "Blog",
              isActive: true,
            },
          ]}
        />
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
                  urlCreate="/blogs/blogCreate"
                  title="List Blogs"
                  columns={columns}
                  items={filterBlog}
                  search={search}
                  setSearch={setSearch}
                  dropdownItems={dropdownItems}
                  onSelectedRowsChange={handleRowSelection} // selected Mutilple
                ></TableCom>
              </span>
            </div>
            <div className="card-body flex gap-x-4 h-[50vh]"></div>
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
          >
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Blog hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>

            <div className="card-body">
              <div className="row">
                <div className="col-sm-8">
                  <LabelCom htmlFor="name" isRequired>
                    Blog Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input Course Name"
                    errorMsg={errors.name?.message}
                    defaultValue={watch("name")}
                  ></InputCom>
                </div>
                <div className="col-sm-2 relative">
                  <LabelCom htmlFor="image" isRequired>
                    Image
                  </LabelCom>
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
              <GapYCom className="mb-20"></GapYCom>
              <div className="row">
                <div className="col-sm-4">
                  <LabelCom htmlFor="status">Status</LabelCom>
                  <div>
                    <SelectDefaultAntCom
                      listItems={statusItems}
                      onChange={handleChangeStatus}
                      status={errors.status && errors.status.message && "error"}
                      errorMsg={errors.status?.message}
                      placeholder="Choose Status"
                      defaultValue={watch("status")}
                    ></SelectDefaultAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="status"
                      register={register}
                      defaultValue={watch("status")}
                    ></InputCom>
                  </div>
                </div>
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
              </div>
              <GapYCom className="mb-35 bt-10"></GapYCom>
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom htmlFor="description">Description</LabelCom>
                  <TextEditorQuillCom
                    value={watch("description")}
                    onChange={(description) => {
                      setValue("description", description);
                    }}
                    placeholder="Write your blog..."
                  ></TextEditorQuillCom>
                </div>
              </div>
              <GapYCom></GapYCom>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Update
              </ButtonCom>
              {/* <ButtonCom backgroundColor="danger" onClick={resetValues}>
                Reset
              </ButtonCom> */}
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};
export default AdminBlogListPage;
