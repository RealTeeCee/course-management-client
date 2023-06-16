import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sortItems } from "../../constants/config";
import {
  convertSecondToDiffForHumans,
  convertSecondToTime,
} from "../../utils/helper";
import { SelectDefaultAntCom } from "../ant";
import { ButtonCom } from "../button";
import GapYCom from "../common/GapYCom";
import { TextEditorQuillCom } from "../texteditor";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconEditCom, IconTrashCom } from "../icon";

const lessonItems = [
  {
    value: "all",
    label: "All Lessons",
  },
  {
    value: 1,
    label: "Lesson 01",
  },
  {
    value: 2,
    label: "Lesson 02",
  },
];

const schemaValidation = yup.object().shape({
  note: yup.string(),
  // .required(MESSAGE_FIELD_REQUIRED)
});

const NoteCom = ({ noteUrl = "/note", placeholder = "Write your note..." }) => {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowNote, setIsShowNote] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

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

  const handleSubmitForm = (values) => {
    console.log(values);
    // call tới api noteUrl từ ngoài truyền vào, ko set cứng để bên khác xài lại

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
    //     const fd = new FormData();
    //     fd.append(
    //       "courseJson",
    //       JSON.stringify({
    //         ...values,
    //         status: 0,
    //         price: convertStrMoneyToInt(price),
    //         net_price: convertStrMoneyToInt(net_price),
    //       })
    //     );
    //     const res = await axiosPrivate.post(`/course`, fd);
    //     toast.success(`${res.data.message}`);
    //     resetValues();
    //     navigate("/admin/courses");
    //   } catch (error) {
    //     showMessageError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };

  const handleChangeFilterLesson = (value) => {
    // Call API Gửi value là id của lesson qua BE, BE check nếu = "all" thì trả All records
  };

  const handleChangeSortLesson = (value) => {
    // Call API Gửi value là các KEY của sort Query qua BE
    // *** BE check nếu = "DESC" thì trả note theo created_at DESC
    // *** BE check nếu = "ASC" thì trả note theo created_at ASC
  };

  // Edit & Delete Area
  const handleEditNote = (noteId) => {
    alert("Edit Note id: " + noteId);
  };

  const handleDeleteNote = (noteId) => {
    alert("Delete Note id: " + noteId);
  };
  return (
    <div>
      <button
        className={`flex justify-between w-full border-2 solid ${
          isShowNote ? "border-tw-light-pink" : "border-tw-primary"
        } cursor-pointer items-center px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-300`}
        onClick={() => {
          setIsShowNote(!isShowNote);
          setIsFocus(!isFocus);
        }}
      >
        <p>
          Create a new note at{" "}
          <span className="text-tw-light-pink">
            {convertSecondToDiffForHumans(56)}
          </span>
        </p>
        <div
          className={`rounded-full ${
            isShowNote ? "bg-tw-light-pink" : "bg-tw-primary"
          } text-white flex justify-center items-center`}
        >
          <span
            className={`w-6 h-6 ${
              isShowNote ? "rotate-45" : ""
            } transition-transform duration-300`}
          >
            +
          </span>
        </div>
      </button>
      <div className="flex gap-x-2 mt-2">
        <div>
          <SelectDefaultAntCom
            listItems={lessonItems}
            defaultValue={"all"}
            onChange={handleChangeFilterLesson}
            className="border-tw-primary border-2 solid rounded-lg bg-none"
          ></SelectDefaultAntCom>
        </div>
        <div>
          <SelectDefaultAntCom
            listItems={sortItems}
            defaultValue={"DESC"}
            onChange={handleChangeSortLesson}
            className="border-tw-primary border-2 solid rounded-lg bg-none"
          ></SelectDefaultAntCom>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-x-2">
          <span className="bg-tw-primary text-white px-2 py-1 rounded-full flex-auto h-8">
            {convertSecondToTime(96)}
          </span>
          <div>
            <h5 className="font-bold text-lg">2. Course: PHP Advance</h5>
            <div className="flex gap-x-2">
              <span>1. Section 01</span>
              <span>9. Lesson 09</span>
            </div>
            <div>
              Text noted!!! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Cupiditate, nesciunt quia. Sit quis magnam tempora, ipsam
              deserunt ratione odit inventore at ab consectetur! Deleniti animi
              corrupti odit cumque, voluptatibus corporis?
            </div>
          </div>
        </div>
        <div className="flex-none">
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              // Truyền noteId
              handleEditNote(1);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              // Truyền noteId
              handleDeleteNote(1);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </div>
      </div>
      {isShowNote && (
        <>
          <GapYCom></GapYCom>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <TextEditorQuillCom
              value={note}
              onChange={(note) => {
                setValue("note", note);
                setNote(note);
              }}
              placeholder={placeholder}
              focus={isFocus}
            ></TextEditorQuillCom>
            <GapYCom className="mb-5"></GapYCom>
            <div>
              <ButtonCom type="submit" isLoading={isLoading}>
                Save
              </ButtonCom>
              <ButtonCom
                className="!text-black ml-2"
                backgroundColor="gray"
                onClick={() => {
                  setIsShowNote(false);
                  setIsFocus(false);
                }}
              >
                Close
              </ButtonCom>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default NoteCom;
