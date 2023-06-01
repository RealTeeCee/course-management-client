import React, { useEffect, useState } from "react";
import axiosInstance, { axiosPrivate } from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingH1Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";
import {
  IconEditCom,
  IconEyeCom,
  IconTrashCom,
} from "../../../components/icon";
import {API_LESSON_URL, API_SECTION_URL } from "../../../constants/endpoint";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as yup from "yup";
import {
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_GENERAL_FAILED,
  MESSAGE_NO_ITEM_SELECTED,
} from "../../../constants/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { result } from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  // created_at: yup.date().required(MESSAGE_FIELD_REQUIRED),
});

/********* Variable State ********* */
const AdminSectionListPage = () => {
  const [lessons, setlessons] = useState([]);
  const [filterLesson, setfilterLesson] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [tableKey, setTableKey] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [lessionId, setlessionId] = useState(null);

  const { control, register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  // const { id } = useParams(); // Lấy id từ route
  // const sectionUrl = API_SECTION_URL.replace("{id}", id);

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
              // alert(`Update Course id: ${row.id}`);
              setIsOpen(true);
              setlessionId(row.id);
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
              handleDeleteSection(row);
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
    {
      key: "2",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-danger transition-all duration-300"
          onClick={() => handleDeleteMultipleRecords()}
        >
          Remove all
        </div>
      ),
    },
  ];

  /********* Multiple Delete ********* */
  //handleRowSelection: user selects one or more rows in table
  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };
  //the selected rows in the table will be deleted and the table will be refreshed to show the new content again.
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  const handleDeleteMultipleRecords = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete <span class="text-tw-danger">${
        selectedRows.length
      } selected ${selectedRows.length > 1 ? "lessons" : "section"}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = selectedRows.map((row) =>
            axiosPrivate.delete(`${API_LESSON_URL}?lessionId=${row.id}`)
          );
          await Promise.all(deletePromises);
          toast.success(`Delete ${selectedRows.length} lessons success`);
        } catch (error) {
          toast.error(MESSAGE_GENERAL_FAILED);
        } finally {
          getlessons();
          clearSelectedRows();
        }
      }
    });
  };

  /********* Multiple One ********* */
  const handleDeleteSection = ({ id, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete section: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPrivate.delete(
            `${API_LESSON_URL}?lessionId=${id}`
          );
          toast.success(res.data.message);
          getlessons(); // Lấy danh sách section mới
          // getlessons();
          // reset(res.data);
          // toast.success(res.data.message);
        } catch (error) {
          console.log(error);
          Swal.fire(MESSAGE_GENERAL_FAILED, "error");
        }
      }
    });
  };

  /********* API List Section ********* */
  const getlessons = async () => {
    try {
      const res = await axiosPrivate.get(API_LESSON_URL);
      console.log(res.data);
      setlessons(res.data);
      setfilterLesson(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getlessons();
  // }, []);
  useEffect(() => {
    const getlessons = async () => {
      try {
        const res = await axiosPrivate.get(API_LESSON_URL);
        setlessons(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(lessons);
    getlessons();
  }, []);

  /********* API Search Section ********* */
  useEffect(() => {
    const result = lessons.filter((section) => {
      const keys = Object.keys(section);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = section[key];
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

    setfilterLesson(result);
  }, [lessons, search]);

  /********* Reset data ********* */
  useEffect(() => {
    const getSectionById = async () => {
      try {
        const res = await axiosPrivate.get(`${API_SECTION_URL}/${lessionId}`);
        console.log(res.data);
        reset(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSectionById();
  }, [axiosPrivate, lessionId, reset]);

  /********* Edit ********* */
  //update late

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
                  urlCreate="/admin/lessons/create"
                  title="List lessons"
                  columns={columns}
                  items={filterLesson}
                  search={search}
                  setSearch={setSearch}
                ></TableCom>
              </span>
            </div>
            <div className="card-body flex gap-x-4 h-[100vh]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSectionListPage;
