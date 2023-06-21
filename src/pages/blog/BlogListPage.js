import React, { useEffect, useState } from "react";
import ButtonBackCom from "../../components/button/ButtonBackCom";
import * as yup from "yup";
import {
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
  statusItems,
} from "../../constants/config";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams } from "react-router-dom";
import { SelectDefaultAntCom, SwitchAntCom } from "../../components/ant";
import { ButtonCom } from "../../components/button";
import {
  IconDocumentCom,
  IconEditCom,
  IconEyeCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../components/icon";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { API_COURSE_URL } from "../../constants/endpoint";
import { showMessageError } from "../../utils/helper";
import { HeadingFormH5Com, HeadingH1Com } from "../../components/heading";
import GapYCom from "../../components/common/GapYCom";
import { TableCom } from "../../components/table";
import ReactModal from "react-modal";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import { useSelector } from "react-redux";
import { axiosBearer } from "../../api/axiosInstance";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  status: yup.number().default(2),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
  category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
});
const BlogListPage = () => {
  /********* State ********* */
  const [blogs, setBlogs] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [filterSection, setFilterSection] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;
  const resetValues = () => {
    reset();
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      sortable: true,
      width: "70px",
    },
    {
      name: "Blog Name",
      selector: (row) => row.name,
      sortable: true,
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
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              setIsOpen(true);
              getBlogById(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
        </>
      ),
    },
  ];
   /********* Get SectionId from row ********* */
   const getBlogById = async (userId) => {
    console.log("userId",user.id);
    try {
      const res = await axiosBearer.get(
        `/blog/my-blog/${userId}`
      );
      reset(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /********* API List Blog ********* */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (user && user.id) {
          const response = await axiosBearer.get(`/blog/my-blog/${userId}`);
          const filteredBlogs = response.data.filter(blog => blog.user_id === user.id);
          setBlogs(filteredBlogs);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
  
    fetchBlogs();
  }, [user]);
  
  

  /********** END Fetch data Area ************ */

  /********* API Search Section ********* */
  useEffect(() => {
    const result = blogs.filter((blog) => {
      const keys = Object.keys(blog);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = blog[key];
        if (
          typeof value === "string" &&
          value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
        if (
          typeof value === "number" &&
          String(value).toLocaleLowerCase() === search.toLocaleLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });

    setFilterSection(result);
  }, [blogs, search]);

  /********* Edit ********* */

  ///********* Update Area *********

  const handleSubmitForm = async (values) => {
    console.log(values);
    const status = values.status || 2;
    const user_id = user.id;
    try {
      setIsLoading(!isLoading);
      // const data = {
      //   id,
      //   name,
      //   courseId,
      //   status,
      // };

      const res = await axiosPrivate.put(`/blog`, values);
      toast.success(`${res.data.message}`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Blog Management</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <span>
                <TableCom
                  tableKey={tableKey}
                  urlCreate="/blogs/blogCreate"
                  title={`Blog: ${user.name}`}
                  columns={columns}
                  items={blogs}
                  search={search}
                  setSearch={setSearch}
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
          <HeadingFormH5Com className="text-2xl">Edit Blog</HeadingFormH5Com>
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
              placeholder="Section hidden id"
              // errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom
                    htmlFor="name"
                    className="text-center block"
                    isRequired
                  >
                    Blog Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input session name"
                    errorMsg={errors.name?.message}
                    defaultValue={watch("name")}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                {!isHidden && (
                  <div className="col-sm-6">
                    <LabelCom htmlFor="status">Status</LabelCom>
                    <div>
                      <SelectDefaultAntCom
                        listItems={statusItems}
                        status={
                          errors.status && errors.status.message && "error"
                        }
                        errorMsg={errors.status?.message}
                        placeholder="Choose status"
                        defaultValue={watch("status")}
                      ></SelectDefaultAntCom>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="status"
                        register={register}
                        defaultValue={2}
                      ></InputCom>
                    </div>
                  </div>
                )}
                {!isHidden && (
                  <div className="col-sm-6">
                    <LabelCom htmlFor="user_id">User ID</LabelCom>
                    <div>
                      <InputCom
                        type="hidden"
                        control={control}
                        name="user_id"
                        register={register}
                        defaultValue={user.id}
                      ></InputCom>
                    </div>
                  </div>
                )}
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

export default BlogListPage;
