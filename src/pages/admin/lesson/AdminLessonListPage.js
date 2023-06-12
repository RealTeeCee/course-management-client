import React, { useEffect, useMemo, useState } from "react";
import axiosInstance, { axiosPrivate } from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";
import {
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as yup from "yup";
import {
  CAPTION_EXT_REGEX,
  CAPTION_EXT_VALID,
  MESSAGE_CAPTION_FILE_INVALID,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_GENERAL_FAILED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MESSAGE_VIDEO_FILE_INVALID,
  statusItems,
  VIDEO_EXT_VALID,
} from "../../../constants/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import {
  convertSecondToDiffForHumans,
  getDurationFromVideo,
  showMessageError,
} from "../../../utils/helper";
import { useNavigate } from "react-router-dom/dist";
import {
  API_COURSE_URL,
  API_LESSON_URL,
  API_SECTION_URL,
  IMG_BB_URL,
} from "../../../constants/endpoint";
import { SelectDefaultAntCom, SwitchAntCom } from "../../../components/ant";
import ReactPlayer from "react-player";
import { TextAreaCom } from "../../../components/textarea";
import { TextEditorQuillCom } from "../../../components/texteditor";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  duration: yup
    .number(MESSAGE_FIELD_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
  // description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  status: yup.number().default(1),
  videoFile: yup
    .mixed()
    .test("fileFormat", MESSAGE_VIDEO_FILE_INVALID, function (value) {
      if (!value) return true;
      const extValidArr = VIDEO_EXT_VALID.split(", ");
      const videoFileExt = value[0]?.name.split(".").pop().toLowerCase();
      return extValidArr.includes(videoFileExt);
    }),
  captionFiles: yup
    .mixed()
    .test("fileRequired", MESSAGE_UPLOAD_REQUIRED, function (value) {
      // Check if existed upload videoFile
      if (
        this.parent.videoFile !== "" &&
        typeof this.parent.videoFile === "object"
      ) {
        if (!value) return false;
      }
      return true;
    })
    .test("fileFormat", MESSAGE_CAPTION_FILE_INVALID, function (value) {
      if (!value) return true;
      for (let i = 0; i < value.length; i++) {
        const captionFile = value[i]?.name.toLowerCase();
        if (!CAPTION_EXT_REGEX.test(captionFile)) return false;
      }
      return true;
    }),
});

const AdminLessonListPage = () => {
  /********* API State ********* */
  const [lessons, setLessons] = useState([]);
  const [section, setSection] = useState({});
  const [course, setCourse] = useState({});
  const [video, setVideo] = useState({});
  /********* END API State ********* */

  /********* Variable State ********* */
  const axiosPrivate = useAxiosPrivate();
  const [filterLesson, setFilterLesson] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  // const [selectedRows, setSelectedRows] = useState([]);
  const [lessonId, setLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetState = () => {
    setShowUpload(false);
    setShowVideo(true);
    setValue("videoFile", "");
    setValue("captionFiles", "");
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
      selector: (row) => convertSecondToDiffForHumans(row.duration),
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
              resetState();
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
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

  /********* Delete One ********* */
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
    try {
      const res = await axiosPrivate.get(`${API_LESSON_URL}/${lessonId}/video`);
      setVideo(res.data);
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
    const { id, name, status, duration, description, videoFile, captionFiles } =
      values;
    // Case Click choose Caption then click again and choose cancel then submit
    if (captionFiles !== "" && captionFiles.length === 0) {
      const captionSelector = document.querySelector(
        'input[name="captionFiles"]'
      );
      if (captionSelector) captionSelector.focus();
      toast.error(MESSAGE_GENERAL_FAILED);
      setError("captionFiles", { message: MESSAGE_UPLOAD_REQUIRED });
      setValue("captionFiles", "");
    }
    try {
      setIsLoading(!isLoading);
      const res = await axiosPrivate.put(`/section/${sectionId}/lesson`, {
        name,
        sectionId,
        id,
        status,
        duration,
      });
      // Update lessons State
      setLessons((prev) => {
        const newData = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name,
              status,
              duration,
              description,
            };
          }
          return item;
        });
        return newData;
      });
      if (videoFile && videoFile.length > 0) {
        const fd = new FormData();
        fd.append("videoFile", videoFile[0]);
        for (let i = 0; i < captionFiles.length; i++) {
          fd.append("captionFiles", captionFiles[i]);
        }
        await axiosPrivate.post(`${API_LESSON_URL}/${id}/video`, fd);
      }
      toast.success(`${res.data.message}`);
      // getLessonsBySectionId();
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleChangeSwitch = async (lessonId, isChecked) => {
    try {
      const newLessons = lessons.map((lession) =>
        lession.id === lessonId
          ? {
              ...lession,
              status: isChecked ? 1 : 0,
            }
          : lession
      );
      const dataBody = newLessons.find((lesson) => lesson.id === lessonId);
      console.log("dataBody: ", dataBody);
      await axiosPrivate.put(
        `${API_SECTION_URL}/${sectionId}/lesson`,
        JSON.stringify(dataBody)
      );
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getLessonsBySectionId();
    } catch (error) {
      showMessageError(error);
    }
  };

  const handleChangeStatus = (value) => {
    setValue("status", value);
    setError("status", { message: "" });
  };

  const handleToggleChangeVideo = () => {
    setShowUpload(!showUpload);
    setShowVideo(!showVideo);
    // Check if input video already, then Back will reset value
    if (!showVideo) {
      setValue("videoFile", "");
      setValue("captionFiles", "");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Lesson</HeadingH1Com>
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
          <HeadingFormH5Com className="text-2xl">Edit Lesson</HeadingFormH5Com>
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
              placeholder="Lesson hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-sm-6 offset-3">
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
                {/* <div className="col-sm-3">
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
                </div> */}
                {/* <div className="col-sm-6">
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
                </div> */}
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row justify-center">
                <div className="col-sm-3 text-center">
                  <ButtonCom
                    backgroundColor={`${showVideo ? "info" : "danger"}`}
                    onClick={handleToggleChangeVideo}
                  >
                    {showVideo ? "Change Video" : "Back"}
                  </ButtonCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className={`row upload-new ${showUpload ? "" : "hidden"}`}>
                <div className="col-sm-6">
                  <LabelCom
                    htmlFor="videoFile"
                    subText={`File: ${VIDEO_EXT_VALID}`}
                  >
                    Video
                  </LabelCom>
                  <InputCom
                    type="file"
                    control={control}
                    name="videoFile"
                    register={register}
                    placeholder="Upload video"
                    errorMsg={errors.videoFile?.message}
                    onChange={(e) => getDurationFromVideo(e, setValue)}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom
                    htmlFor="captionFiles"
                    subText={`File: ${CAPTION_EXT_VALID}`}
                  >
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
                  ></InputCom>
                </div>
              </div>
              <div className={`row current-video ${showVideo ? "" : "hidden"}`}>
                <div className="col-sm-12 text-center flex justify-center items-center">
                  <ReactPlayer
                    url={video?.url}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1, controls: 1 },
                      },
                      file: {
                        tracks:
                          video?.captionData &&
                          Object.entries(video?.captionData)?.map(
                            ([lang, src]) => ({
                              kind: "subtitles",
                              src: src,
                              srcLang: lang,
                              default: lang === "en",
                            })
                          ),
                        attributes: {
                          controlsList: "nodownload",
                          crossOrigin: "noorigin",
                        },
                      },
                    }}
                    playing={true}
                    controls
                    muted
                    autoPlay
                  />
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-12">
                  <LabelCom htmlFor="description">Description</LabelCom>
                  <TextEditorQuillCom
                    value={watch("description")}
                    onChange={(description) => {
                      setValue("description", description);
                    }}
                    placeholder="Describe your lesson ..."
                  ></TextEditorQuillCom>
                </div>
              </div>
              <GapYCom className="mb-5"></GapYCom>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Update
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default AdminLessonListPage;