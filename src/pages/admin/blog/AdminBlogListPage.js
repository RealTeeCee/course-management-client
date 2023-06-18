import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SwitchAntCom } from "../../../components/ant";
import { axiosBearer } from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { MESSAGE_UPDATE_STATUS_SUCCESS } from "../../../constants/config";
import { showMessageError } from "../../../utils/helper";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingH1Com } from "../../../components/heading";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { TableCom } from "../../../components/table";
import { blog } from "../../../assets/blog_data/data";
import ButtonCom from "../../../components/button/ButtonCom";

const schemaValidation = yup.object().shape({
  status: yup.number().default(1),
});

const AdminBlogListPage = () => {
  /********* API State ********* */
  const [blogs, setBlogs] = useState([]);
  const [image, setImage] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBlog, setFilterBlog] = useState([]);

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
    // {
    //   name: "Category",
    //   selector: (row) => row.category_name,
    //   sortable: true,
    // },
    // {
    //   name: "Image",
    //   selector: (row) => (
    //     <img width={50} height={50} src={`${row.image}`} alt={row.name} />
    //   ),
    // },
    // {
    //   name: "Status",
    //   selector: (row) => {
    //     if(row.status === 2) {
    //         return <ButtonCom backgroundColor="info" onClick={() => handleChangeStatus(row.id, row.status)}>Proccessing</ButtonCom>
    //     }else if()
    //   }
    // },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    //   width: "550px",
    // },
  ];

  const getBlogs = async () => {
    try {
      const res = await axiosBearer.get(`/blog`);
      console.log(res.data);
      setBlogs(res.data);
      setFilterBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // /********* Fetch API Area ********* */
  useEffect(() => {
    getBlogs();
  }, []);

  // Search in Table
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

  const handleChangeCategory = (value) => {
    setValue("category_id", value);
    setError("category_id", { message: "" });
    setCategorySelected(value);
  };

  const handleChangeStatus = (blogId, status) => {
    console.log(blogId);
    console.log(status);
  };

  const handleChangeSwitch = async (blogId, isChecked) => {
    console.log(
      `Switch status changed. Blog ID: ${blogId}, isChecked: ${isChecked}`
    );
    try {
      const newBlogs = blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              status: isChecked ? "ACTIVE" : "PROCCESSING",
            }
          : blog
      );

      const dataBody = newBlogs.find((blogs) => blogs.id === blogId);


    //   {
    //     "id": 1,
    //     "name": "Mon",
    //     "slug": "mon",
    //     "status": "ACTIVE",
    //     "description": "string",
    //     "view_count": 10,
    //     "user_id": 1,
    //     "created_at": "2023-06-14T10:52:00.249Z",
    //     "updated_at": "2023-06-14T10:52:00.249Z"
    //   }
      const {
        id,
        name,
        user_id,
        // image,
        // category_id,
        description,
        slug,
        view_count,
        status,
      } = dataBody;

      const fd = new FormData();
      fd.append(
        "blogJson",
        JSON.stringify({
          id,
          name,
          user_id,
        //   image,
        //   category_id,
          description,
          slug,
          view_count,
          status,
        })
      );

      await axiosBearer.put(`/blog`, fd);
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getBlogs();
    } catch (error) {
      showMessageError(error);
    }
  };

  return (
    <>
      {isFetching && <LoadingCom />}
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
                  title="Admin Management Blog"
                  columns={columns}
                  items={filterBlog}
                  search={search}
                  setSearch={setSearch}

                  // selected Mutilple
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
