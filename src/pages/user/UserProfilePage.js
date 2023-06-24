import React, { useEffect, useState } from "react";
import Carousel_6 from "../../assets/blog_image/Carousel_6.jpg";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcLike, FcComments } from "react-icons/fc";
import {
  IconClockCom,
  IconEmailCom,
  IconPhoneCom,
  IconRemoveCom,
  IconUserCom,
} from "../../components/icon";
import { useDispatch, useSelector } from "react-redux";
import { onMyCourseLoading } from "../../store/course/courseSlice";
import { convertDateTime, sliceText } from "../../utils/helper";
import { AVATAR_DEFAULT, MESSAGE_FIELD_REQUIRED } from "../../constants/config";
import { ImageCom } from "../../components/image";
import GapYCom from "../../components/common/GapYCom";
import { ButtonCom } from "../../components/button";
import { LabelCom } from "../../components/label";
import { InputCom } from "../../components/input";
import { HeadingFormH5Com } from "../../components/heading";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  // name: yup
  //   .string()
  //   .required(MESSAGE_FIELD_REQUIRED)
  //   .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
  //   .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
});

const UserProfilePage = () => {
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

  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(onMyCourseLoading(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  console.log(data);
  console.log(user);
  const [coverImage, setCoverImage] = useState(Carousel_6);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = (values) => {
    // const {
    //   id,
    //   name,
    //   status,
    //   level,
    //   category_id,
    //   price,
    //   net_price,
    //   image,
    //   tags,
    //   duration,
    //   achievements,
    //   description,
    // } = values;
    // if (convertStrMoneyToInt(net_price) > convertStrMoneyToInt(price)) {
    //   const netPriceSelector = document.querySelector(
    //     'input[name="net_price"]'
    //   );
    //   if (netPriceSelector) netPriceSelector.focus();
    //   toast.error(MESSAGE_GENERAL_FAILED);
    //   setError("net_price", { message: MESSAGE_NET_PRICE_HIGHER_PRICE });
    // } else {
    //   try {
    //     setIsLoading(!isLoading);
    //     let fd = new FormData();
    //     fd.append(
    //       "courseJson",
    //       JSON.stringify({
    //         id,
    //         name,
    //         status,
    //         level,
    //         image,
    //         category_id,
    //         price: convertStrMoneyToInt(price),
    //         net_price: convertStrMoneyToInt(net_price),
    //         tags,
    //         duration,
    //         achievements,
    //         description,
    //       })
    //     );
    //     const res = await axiosBearer.put(`/course`, fd);
    //     getCourses();
    //     toast.success(`${res.data.message}`);
    //     setIsOpen(false);
    //   } catch (error) {
    //     showMessageError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };

  // ************** Edit Profile **************************
  const handleEditProfile = (id) => {
    console.log("User ID:", id);
    setIsOpen(true);
  };

  return (
    <div className="mx-auto py-6 px-4">
      <div className="relative h-96 rounded-b flex justify-center rounded-lg">
        <img
          src={coverImage}
          className="image_cover object-cover w-full h-full rounded-b rounded-lg"
          alt="cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
          <label
            htmlFor="upload-cover-image"
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white"
            title="Edit Cover Image"
          >
            <FaEdit />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
            id="upload-cover-image"
          />
        </div>
        <div className="absolute -bottom-10">
          <img
            srcSet={user.imageUrl ? user.imageUrl : AVATAR_DEFAULT}
            className="image_avatar object-cover border-4 border-white w-40 h-40 rounded-full object-center"
            alt={user.name ?? "avatar-user"}
          />
          <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
            <label
              htmlFor="upload-cover-image"
              className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white"
              title="Edit Cover Image"
            >
              <FaEdit />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
              id="upload-cover-image"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-12 text-3xl font-bold text-fBlack">
        {user?.name}
      </div>
      <div className="border border-fGrey mt-6 mb-6 border-opacity-10" />

      {/* End Timeline Header */}
      <div className=" grid grid-cols-12 pt-8">
        <div className="col-span-12 md:col-span-5 row-start-2 md:row-start-1 space-y-4">
          {/* Start User profile */}
          <div className="shadow-fb  w-full bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-fBlack">My Profile</div>
              <button
                className="transition-all duration-300 text-tw-primary hover:opacity-60"
                onClick={() => handleEditProfile(user?.id)}
              >
                Edit
              </button>
            </div>
            <div className="mt-4 flex items-center">
              <IconUserCom></IconUserCom>
              <span className="ml-2">{user && user.name}</span>
            </div>
            <div className="mt-4 flex items-center">
              <IconEmailCom></IconEmailCom>
              <span className="ml-2">{user && user.email}</span>
            </div>
            {/* <div className="mt-4 flex items-center">
              <IconPhoneCom></IconPhoneCom>
              <span className="ml-2">091900909</span>
            </div> */}
            <div className="mt-4 flex items-center">
              <IconClockCom></IconClockCom>
              <span className="ml-2">
                Registered at: {convertDateTime(user?.created_at)}
              </span>
            </div>
          </div>
          {/* Start User profile */}

          {/* Start Activity */}
          <div className="w-full shadow-fb bg-white rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-fBlack">Activity</div>
            </div>
            <div className="shadow-fb rounded w-full bg-white p-4">
              <div className="mt-4 flex items-center">
                <img
                  src="https://petdep.net/wp-content/uploads/2022/11/gia-meo-anh-long-dai-.jpg"
                  alt="img"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-2">FPT Aptech </span>
                <FcLike />
                <span className="ml-2">Hung Nguyen's post</span>
              </div>

              <div className="border border-fGrey mt-6 mb-6 border-opacity-10" />
              <div className="mt-4 flex items-center">
                <img
                  src="https://petdep.net/wp-content/uploads/2022/11/gia-meo-anh-long-dai-.jpg"
                  alt="img"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-2">FPT Aptech </span>
                <FcComments />
                <span className="ml-2">Duy Truong's post</span>
              </div>
            </div>
          </div>
        </div>
        {/* End Activity */}

        {/* Start Courses attended*/}
        <div className="flex-row row-start-1 col-span-12 md:col-span-7 md:col-start-7 space-y-4 rounded-lg">
          <div>
            <div className="w-full shadow-fb rounded bg-white p-4">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-fBlack">
                  Courses Enrolled
                </div>
                <Link
                  to="/my-courses"
                  className="transition-all duration-300 text-tw-primary hover:opacity-60"
                >
                  See all
                </Link>
              </div>
              {data &&
                data.length > 0 &&
                data.slice(0, 4).map((item, index) => (
                  <Link key={item.slug} to={`/learn/${item.slug}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 mt-4 transition-all duration-300 hover:shadow-[0_2px_4px_rgb(0_0_0_/_8%)] hover:cursor-pointer hover:translate-y-[-5px]">
                      <div className="h-28">
                        <ImageCom srcSet={item?.image} alt={item.slug} />
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-bold">{item.name}</p>
                        <p
                          className="mt-1"
                          dangerouslySetInnerHTML={{
                            __html: sliceText(item?.description, 200),
                          }}
                        ></p>
                      </div>
                    </div>
                  </Link>
                ))}
              {/* End Courses attended */}
            </div>
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
          <HeadingFormH5Com className="text-2xl">Edit Profile</HeadingFormH5Com>
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
              placeholder="Course hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            {/* <div className="card-header">
                <h5>Form Create Course</h5>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </div> */}
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="first_name" isRequired>
                    First Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="first_name"
                    register={register}
                    placeholder="Input First Name"
                    errorMsg={errors.first_name?.message}
                  ></InputCom>
                </div>
                {/* <div className="col-sm-2 relative">
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
                </div> */}
              </div>
              <GapYCom className="mb-3"></GapYCom>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Save
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default UserProfilePage;
