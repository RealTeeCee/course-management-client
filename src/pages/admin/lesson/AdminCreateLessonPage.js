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
  MESSAGE_UPLOAD_REQUIRED,
  MESSAGE_VIDEO_FILE_INVALID,
  MESSAGE_CAPTION_FILE_INVALID,
  VIDEO_EXT_VALID,
  CAPTION_EXT_REGEX,
  CAPTION_EXT_VALID,
  MESSAGE_NUMBER_REQUIRED,
} from "../../../constants/config";
import axiosInstance, { axiosBearer } from "../../../api/axiosInstance";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
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
import { TextEditorQuillCom } from "../../../components/texteditor";
import { BreadcrumbCom } from "../../../components/breadcrumb";
Quill.register("modules/imageUploader", ImageUploader);

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  ordered: yup.number(MESSAGE_NUMBER_REQUIRED),
  videoFile: yup
    .mixed()
    .test("fileRequired", MESSAGE_UPLOAD_REQUIRED, function (value) {
      if (value) return true;
    })
    .test("fileFormat", MESSAGE_VIDEO_FILE_INVALID, function (value) {
      if (!value) return true;
      const extValidArr = VIDEO_EXT_VALID.split(", ");
      const videoFileExt = value[0]?.name.split(".").pop().toLowerCase();
      return extValidArr.includes(videoFileExt);
    }),
  captionFiles: yup
    .mixed()
    .test("fileRequired", MESSAGE_UPLOAD_REQUIRED, function (value) {
      if (value) return true;
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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const resetValues = () => {
    // setcourseSelected(null);
    reset();
  };

  const handleSubmitForm = async (values) => {
    const { name, duration, description, ordered, videoFile, captionFiles } =
      values;
    let lessonId;
    try {
      setIsLoading(true);

      const res = await axiosBearer.post(
        `${API_SECTION_URL}/${sectionId}/lesson`,
        {
          name,
          duration,
          description,
          sectionId,
          ordered,
        }
      );
      lessonId = await getLatestLessonId();
      if (!lessonId) throw new Error("Lesson ID not found");

      const fd = new FormData();
      fd.append("videoFile", videoFile[0]);
      for (let i = 0; i < captionFiles.length; i++) {
        fd.append("captionFiles", captionFiles[i]);
      }
      await axiosBearer.post(`${API_LESSON_URL}/${lessonId}/video`, fd);

      toast.success(`${res.data.message}`);
      navigate(`/admin/courses/${courseId}/sections/${sectionId}/lessons`);
    } catch (error) {
      // Rollback
      await axiosBearer.delete(
        `/section/${sectionId}/lesson?lessonId=${lessonId}`
      );
      showMessageError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestLessonId = async () => {
    try {
      const res = await axiosBearer.get(`/section/${sectionId}/lesson`);
      return res.data[0].id;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Create Lesson</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "Course",
              slug: "/admin/courses",
            },
            {
              title: "Section",
              slug: `/admin/courses/${courseId}/sections`,
            },
            {
              title: "Lesson",
              slug: `/admin/courses/${courseId}/sections/${sectionId}/lessons`,
            },
            {
              title: "Create",
              isActive: true,
            },
          ]}
        />
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
              <div className="card-body">
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
                      placeholder="Input lesson Name"
                      errorMsg={errors.name?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-6">
                    <LabelCom htmlFor="ordered">Ordered</LabelCom>
                    <InputCom
                      type="number"
                      control={control}
                      name="ordered"
                      register={register}
                      placeholder="Input lesson ordered"
                      errorMsg={errors.ordered?.message}
                      defaultValue={0}
                    ></InputCom>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom
                      htmlFor="videoFile"
                      subText={`File: ${VIDEO_EXT_VALID}`}
                      isRequired
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
                      isRequired
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
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-12">
                    <LabelCom htmlFor="description">Description</LabelCom>
                    <TextEditorQuillCom
                      value={description}
                      onChange={(description) => {
                        setValue("description", description);
                        setDescription(description);
                      }}
                      placeholder="Describe your lesson ..."
                    ></TextEditorQuillCom>
                  </div>
                </div>
              </div>
              <div className="card-footer flex justify-end gap-x-5">
                <ButtonCom type="submit" isLoading={isLoading}>
                  Create
                </ButtonCom>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateLessonPage;
