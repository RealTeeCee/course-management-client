import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeadingH1Com } from "../../../components/heading";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../../../components/button";
import "react-quill/dist/quill.snow.css";
import GapYCom from "../../../components/common/GapYCom";
import { toast } from "react-toastify";
import {
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NUMBER_REQUIRED,
  MESSAGE_NUMBER_POSITIVE,
  MESSAGE_UPLOAD_REQUIRED,
  MESSAGE_VIDEO_FILE_INVALID,
  MESSAGE_CAPTION_FILE_INVALID,
  VIDEO_EXT_VALID,
  CAPTION_EXT_REGEX,
  statusItems,
} from "../../../constants/config";
import axiosInstance from "../../../api/axiosInstance";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import {
  API_LESSON_URL,
  API_SECTION_URL,
  IMG_BB_URL,
} from "../../../constants/endpoint";
import { useNavigate } from "react-router-dom/dist";
import { getDurationFromVideo, showMessageError } from "../../../utils/helper";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import { SelectDefaultAntCom } from "../../../components/ant";
Quill.register("modules/imageUploader", ImageUploader);

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  // name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  // description: yup.string().required(MESSAGE_FIELD_REQUIRED),
  // status: yup.number().default(1),
  // duration: yup
  //   .number(MESSAGE_FIELD_REQUIRED)
  //   .typeError(MESSAGE_NUMBER_REQUIRED)
  //   .min(0, MESSAGE_NUMBER_POSITIVE),
  videoFile: yup
    .mixed()
    .test("fileRequired", MESSAGE_UPLOAD_REQUIRED, function (value) {
      if (value) return true;
    })
    .test("fileFormat", MESSAGE_VIDEO_FILE_INVALID, function (value) {
      if (!value) return true;
      const extValidArr = VIDEO_EXT_VALID.split(", ");
      const videoFileExt = value[0].name.split(".").pop().toLowerCase();
      return extValidArr.includes(videoFileExt);
    }),
  // captionFiles: yup
  //   .mixed()
  //   .test("fileRequired", MESSAGE_UPLOAD_REQUIRED, function (value) {
  //     if (value) return true;
  //   })
  //   .test("fileFormat", MESSAGE_CAPTION_FILE_INVALID, function (value) {
  //     if (!value) return true;
  //     for (let i = 0; i < value.length; i++) {
  //       const captionFile = value[i].name.toLowerCase();
  //       if (!CAPTION_EXT_REGEX.test(captionFile)) return false;
  //     }
  //     return true;
  //   }),
});

const AdminCreateLessonPage = () => {
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

  const { courseId, sectionId } = useParams();

  /********* API State ********* */
  const [lessons, setLessons] = useState([]);
  // const [section, setSection] = useState({});
  // const [course, setCourse] = useState({});
  /********* END API State ********* */

  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const resetValues = () => {
    // setcourseSelected(null);
    reset();
  };

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

  const handleSubmitForm = async (values) => {
    const { name, duration, videoFile, captionFiles } = values;
    let lessonId;
    try {
      setIsLoading(true);

      const res = await axiosPrivate.post(
        `${API_SECTION_URL}/${sectionId}/lesson`,
        {
          name,
          duration,
          sectionId,
        }
      );
      lessonId = await getLatestLessonId();
      if (!lessonId) throw new Error("Lesson ID not found");

      const fd = new FormData();
      fd.append("videoFile", videoFile[0]);
      for (let i = 0; i < captionFiles.length; i++) {
        fd.append("captionFiles", captionFiles[i]);
      }
      await axiosPrivate.post(`${API_LESSON_URL}/${lessonId}/video`, fd);

      toast.success(`${res.data.message}`);
      navigate(`/admin/courses/${courseId}/sections/${sectionId}/lessons`);
    } catch (error) {
      // Rollback
      await axiosPrivate.delete(
        `/section/${sectionId}/lesson?lessonId=${lessonId}`
      );
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestLessonId = async () => {
    try {
      const res = await axiosPrivate.get(`/section/${sectionId}/lesson`);
      return res.data[0].id;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // const handleChangeVideo = (e) => {
  //   const video = document.createElement("video");

  //   video.preload = "metadata";
  //   video.onloadedmetadata = function () {
  //     setValue("duration", Math.round(video.duration));
  //   };

  //   video.src = URL.createObjectURL(e.target.files[0]);
  // };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create Lesson</HeadingH1Com>
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
              encType="multipart/form-data"
            >
              {/* <div className="card-header">
                <h5>Form Create Course</h5>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </div> */}
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
                    ></InputCom>
                  </div>
                  {/* <div className="col-sm-6">
                    <LabelCom htmlFor="duration">Duration</LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="duration"
                      register={register}
                      placeholder="Input Duration"
                      errorMsg={errors.duration?.message}
                    ></InputCom>
                  </div> */}
                  {/* <InputCom
                    type="hidden"
                    control={control}
                    name="duration"
                    register={register}
                    placeholder="Input hidden duration"
                    errorMsg={errors.duration?.message}
                  ></InputCom> */}
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
                      onChange={(e) => getDurationFromVideo(e, setValue)}
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
                    ></InputCom>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-12">
                    <LabelCom htmlFor="description">Description</LabelCom>

                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={description}
                      onChange={(description) => {
                        setValue("description", description);
                        setDescription(description);
                      }}
                      placeholder="Describe your lesson ..."
                      className="h-36"
                    ></ReactQuill>
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
                </ButtonCom>
                {/* <ButtonCom backgroundColor="danger" type="reset">
                  Reset
                </ButtonCom> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateLessonPage;
