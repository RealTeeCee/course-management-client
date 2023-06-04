import React, { useEffect, useMemo, useState } from "react";
import axiosInstance, { axiosPrivate } from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";
import {
  IconEditCom,
  IconEyeCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as yup from "yup";
import {
  MESSAGE_FIELD_REQUIRED, MESSAGE_NUMBER_POSITIVE, MESSAGE_NUMBER_REQUIRED,
} from "../../../constants/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import { showMessageError } from "../../../utils/helper";
import { useNavigate } from "react-router-dom/dist";
import { IMG_BB_URL } from "../../../constants/endpoint";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  duration: yup
    .string(MESSAGE_NUMBER_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(1, MESSAGE_NUMBER_POSITIVE),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  status: yup.number().default(1),
  // created_at: yup.date().required(MESSAGE_FIELD_REQUIRED),
});

/********* Variable State ********* */
const AdminLessonListPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [lessons, setLessons] = useState([]);
  const [filterLesson, setFilterLesson] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [lessonId, setLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const { id,sectionId } = useParams();

  /********* Fetch data Area ********* */
  const columns = [
    {
      name: "Lesson Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Lesson Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    // {
    //   name: "Date Created",
    //   selector: (row) => new Date(row.created_at).toLocaleDateString(),

    // },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              setIsOpen(true);
              getSectionById(row.id);
              setSelectedRowId(row.id); // save row.id to state selectedRowId
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            onClick={() => {
              alert(`View Section id: ${row.id}`);
            }}
          >
            <IconEyeCom className="w-5"></IconEyeCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteSection({ lessonId: row.id, name: row.name });
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];
  /********* More Actions ********* */
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
    // {
    //   key: "2",
    //   label: (
    //     <div
    //       rel="noopener noreferrer"
    //       className="hover:text-tw-danger transition-all duration-300"
    //       onClick={() => handleDeleteMultipleRecords()}
    //     >
    //       Remove all
    //     </div>
    //   ),
    // },
  ];

//Description
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


  /********* Multiple One ********* */
  const handleDeleteSection = ({ lessonId, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete section: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPrivate.delete(
            `/section/${sectionId}/lesson?lessonId=${lessonId}`
          );

          getlessons();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
    console.log("id", id);
    console.log("lessonId", lessonId);
    console.log("name", name);
  };

  /********* API List Section ********* */
  const getlessons = async () => {
    try {
      const res = await axiosPrivate.get(`/section/${sectionId}/lesson`);

      console.log(res.data);
      setLessons(res.data);
      setFilterLesson(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // useEffect(() => {
  //   getlessons();
  // }, []);
  useEffect(() => {
    getlessons();
  }, [sectionId]);

  /********* API Search Section ********* */
  useEffect(() => {
    const result = lessons.filter((lesson) => {
      const keys = Object.keys(lesson);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = lesson[key];
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

    setFilterLesson(result);
  }, [lessons, search]);

  /********* Edit ********* */
  const handleSubmitForm = async (values) => {
    const { name} = values;
    try {
      setIsLoading(!isLoading);
    //     const data = {
    //   name: name,
    //   courseId: id,
    // };
    // console.log("name", name);
    // console.log("couseId", id);
    // const res = await axiosPrivate.post(`/course/${id}/section`, data);
      
    //  Đặt isLoading thành true để hiển thị trạng thái đang tải
      const data = {
        name: name,
        sectionId: sectionId,
        id: selectedRowId,
      };
      console.log("name", name);
      console.log("courseId", id);
      console.log("lessonId",selectedRowId);
      const res = await axiosPrivate.put(`/section/${data.sectionId}/lesson`, data);
      toast.success(`${res.data.message}`);
      reset();
      getlessons(); 
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false); // Đặt isLoading thành false để ẩn trạng thái đang tải
      setIsOpen(false); // Đóng modal
    }
  };
  
  /********* Get lessonId from row ********* */
  const getSectionById = async (lessonId) => {
    try {
      const res = await axiosPrivate.get(`/section/${sectionId}/lesson/${lessonId}`);
      reset(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log("sectionId", sectionId);
    console.log("lessonId", lessonId);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Section</HeadingH1Com>
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
                  urlCreate={`/admin/courses/${id}/sections/${sectionId}/lessons/create`}
                  title="List lessons"
                  columns={columns}
                  items={filterLesson}
                  search={search}
                  dropdownItems={dropdownItems}
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
          <HeadingFormH5Com className="text-2xl">Edit Section</HeadingFormH5Com>
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
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <LabelCom htmlFor="name" isRequired>
                    Section Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input Session Name"
                    errorMsg={errors.name?.message}
                    defaultValue={watch("name")}
                  ></InputCom>
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

export default AdminLessonListPage;
