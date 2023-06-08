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
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
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
import {
  API_COURSE_URL,
  API_LESSON_URL,
  IMG_BB_URL,
} from "../../../constants/endpoint";
import { SwitchAntCom } from "../../../components/ant";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  duration: yup
    .number(MESSAGE_FIELD_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  status: yup.number().default(1),
});

const AdminLessonListPage = () => {
  /********* API State ********* */
  const [lessons, setLessons] = useState([]);
  const [section, setSection] = useState({});
  const [course, setCourse] = useState({});
  /********* END API State ********* */

  /********* Variable State ********* */
  const axiosPrivate = useAxiosPrivate();
  const [filterLesson, setFilterLesson] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  // const [selectedRows, setSelectedRows] = useState([]);
  const [lessonId, setLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
  const { courseId, sectionId } = useParams();

  /********* Fetch data Area ********* */
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      sortable: true,
      width: "70px",
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
      selector: (row) => (
        <SwitchAntCom
          defaultChecked={row.status === 1 ? true : false}
          className={`${
            row.status === 1 ? "" : "bg-tw-danger hover:!bg-tw-orange"
          }`}
          onChange={(isChecked) => handleChangeSwitch(row.id, isChecked)}
        />
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
              getLessonById(row.id);
              getVideoByLessonId(row.id);
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
              handleDeleteLesson({ lessonId: row.id, name: row.name });
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
  const handleDeleteLesson = ({ lessonId, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete lesson: <span class="text-tw-danger">${name}</span>`,
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

          getLessonsBySectionId();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  /********** Fetch data Area ************ */
  /********* API List Section ********* */
  const getLessonsBySectionId = async () => {
    try {
      const res = await axiosPrivate.get(`/section/${sectionId}/lesson`);
      console.log(res.data);

      setLessons(res.data);
      setFilterLesson(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getCourseById = async () => {
    try {
      const res = await axiosPrivate.get(`${API_COURSE_URL}/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSectionById = async () => {
    try {
      const res = await axiosPrivate.get(
        `${API_COURSE_URL}/${courseId}/section/${sectionId}`
      );
      setSection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /********* Get getLessonById from row ********* */
  const getLessonById = async (lessonId) => {
    try {
      const res = await axiosPrivate.get(
        `/section/${sectionId}/lesson/${lessonId}`
      );
      reset(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoByLessonId = async (lessonId) => {
    console.log(lessonId);
    try {
      const res = await axiosPrivate.get(`${API_LESSON_URL}/${lessonId}/video`);
      console.log(res.data);
      // reset(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessonsBySectionId();
    getCourseById();
    getSectionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /********** END Fetch data Area ************ */

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

  /********* Update ********* */
  const handleSubmitForm = async (values) => {
    const { id, name } = values;
    try {
      setIsLoading(!isLoading);
      const res = await axiosPrivate.put(`/section/${sectionId}/lesson`, {
        name,
        sectionId,
        id,
      });
      toast.success(`${res.data.message}`);
      reset();
      getLessonsBySectionId();
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleChangeSwitch = async (sectionId, courseId, isChecked) => {
    // try {
    //   const newSections = sections.map((section) =>
    //     section.id === sectionId
    //       ? {
    //           ...section,
    //           status: isChecked ? 1 : 0,
    //         }
    //       : section
    //   );
    //   const dataBody = newSections.find((section) => section.id === sectionId);
    //   await axiosPrivate.put(
    //     `${API_COURSE_URL}/${courseId}/section`,
    //     JSON.stringify(dataBody)
    //   );
    //   toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
    //   getSectionsByCourseId();
    // } catch (error) {
    //   showMessageError(error);
    // }
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
                  urlCreate={`/admin/courses/${courseId}/sections/${sectionId}/lessons/create`}
                  title={`Course: ${course.name}, Section: ${section.name}`}
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
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Lesson hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              {/* <div className="row">
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
              </div> */}

              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="name" isRequired>
                    Lesson Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input Lesson Name"
                    errorMsg={errors.name?.message}
                    defaultValue={watch("name")}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="duration">Duration</LabelCom>
                  <InputCom
                    type="number"
                    control={control}
                    name="duration"
                    register={register}
                    placeholder="Input Duration"
                    errorMsg={errors.duration?.message}
                    defaultValue={watch("duration")}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="duration" isRequired>
                    Video
                  </LabelCom>
                  <InputCom
                    type="file"
                    control={control}
                    name="videoFile"
                    register={register}
                    placeholder="Upload video"
                    errorMsg={errors.videoFile?.message}
                    // defaultValue={watch("videoFile")}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="duration" isRequired>
                    Caption Files
                  </LabelCom>
                  <InputCom
                    type="file"
                    control={control}
                    name="captionFiles"
                    register={register}
                    placeholder="Upload caption files"
                    multiple
                    errorMsg={errors.captionFiles?.message}
                    // defaultValue={watch("captionFiles")}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom htmlFor="description">Description</LabelCom>

                  {/* <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={description}
                    onChange={(description) => {
                      setValue("description", description);
                      setDescription(description);
                    }}
                    placeholder="Describe your lesson ..."
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

export default AdminLessonListPage;
