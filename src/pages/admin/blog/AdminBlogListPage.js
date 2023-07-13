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
  AVATAR_DEFAULT,
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
  categoryItems,
  statusBlogItems,
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
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { TextEditorQuillCom } from "../../../components/texteditor";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import { mainColor } from "../../../constants/mainTheme";
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
        
        <img width={50} height={50} src={`${row.image|| AVATAR_DEFAULT}`} alt={row.name} />
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <SelectDefaultAntCom
          control={control}
          name="status"
          defaultValue={row.status}
          options={statusBlogItems}
          className={`${row.status === 1 ? "blog-dropdown-success" : row.status === 2 ? "blog-dropdown-warning" :"blog-dropdown-dark"} rounded-full`}
          onChange={(selectedStatus) =>
            handleChangeStatus(row.id, selectedStatus)
          }
        />
      ),
    },
    
    {
      name: "Action",
      cell: (row) => (
        <>
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
  /********* Update Status API ********* */
  const handleChangeStatus = async (blogId, selectedStatus) => {
    try {
      //update new status of blog
      const newBlogs = blogs.map((blog) =>
        blog.id === blogId ? { ...blog, status: selectedStatus } : blog
      );

      const dataBody = newBlogs.find((blog) => blog.id === blogId);

      const {
        id,
        name,
        status,
        image,
        category_id,
        view_count = 0,
        user_id = user.id,
        description,
      } = dataBody;
      console.log("value", dataBody);
      const formData = {
        id,
        name,
        status,
        image,
        category_id,
        view_count: view_count || 0,
        user_id: user_id || user.id,
        description,
      };
      console.log("formData", formData);
      await axiosBearer.put(`/blog`, formData);

      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getBlogs();
    } catch (error) {
      showMessageError(error);
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
          name: resImage?.substring(resImage.lastIndexOf("/") + 1),
          status: "done",
          url: resImage,
        },
      ];  } catch (error) {
        console.log(error);
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
              <span>
                <TableCom
                 urlCreate="/blogs/blogCreate"
                  tableKey={tableKey}
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

    </>
  );
};
export default AdminBlogListPage;
