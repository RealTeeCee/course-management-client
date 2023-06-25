import React, { useEffect, useState } from "react";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";
import {
  IconDocumentCom,
  IconEditCom,
  IconEyeCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
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
import { Link, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { LabelCom } from "../../../components/label";
import { InputCom } from "../../../components/input";
import { showMessageError } from "../../../utils/helper";
import { API_COURSE_URL } from "../../../constants/endpoint";
import { SwitchAntCom } from "../../../components/ant";
import LoadingCom from "../../../components/common/LoadingCom";
import * as XLSX from "xlsx";
import useExcelExport from "../../../hooks/useExportExcel";
import { axiosBearer } from "../../../api/axiosInstance";
import BreadcrumbCom from "../../../components/breadcrumb/BreadcrumbCom";

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
  name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  ordered: yup
    .number(MESSAGE_FIELD_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(0, MESSAGE_NUMBER_POSITIVE),
});

const AdminSectionListPage = () => {
  /********* API State ********* */
  const [sections, setSections] = useState([]);
  const [course, setCourse] = useState({});
  /********* END API State ********* */

  /********* State ********* */
  const [filterSection, setFilterSection] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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
  const { courseId } = useParams();

  /********* Export Excel ********* */
  const { handleExcelData } = useExcelExport("section");
  const handleExport = () => {
    const headers = ["No", "Section Name", "Status", "Order"];
    const data = sections.map((section, index) => [
      index + 1,
      section.name,
      section.status === 1 ? "Active" : "Inactive",
      section.ordered,
    ]);
    handleExcelData(headers, data);
  };

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Section Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <>
    //       {row.status === 1 ? (
    //         <ButtonCom onClick={() => {}} backgroundColor="success">
    //           Active
    //         </ButtonCom>
    //       ) : (
    //         <ButtonCom onClick={() => {}} backgroundColor="danger">
    //           InActive
    //         </ButtonCom>
    //       )}
    //     </>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Status",
      cell: (row) => (
        <SwitchAntCom
          defaultChecked={row.status === 1 ? true : false}
          className={`${
            row.status === 1 ? "" : "bg-tw-danger hover:!bg-tw-orange"
          }`}
          onChange={(isChecked) =>
            handleChangeSwitch(row.id, courseId, isChecked)
          }
        />
      ),
      sortable: true,
    },
    {
      name: "Lessons",
      cell: (row) => (
        <>
          <Link to={`/admin/courses/${courseId}/sections/${row.id}/lessons`}>
            <ButtonCom
              className="px-3 rounded-lg mr-2"
              backgroundColor="gray"
              onClick={() => {
                // alert(`Update Course id: ${row.id}`);
              }}
            >
              <IconDocumentCom className="w-5 text-black"></IconDocumentCom>
            </ButtonCom>
          </Link>
        </>
      ),
    },
    {
      name: "Order",
      selector: (row) => row.ordered,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              // setIsFetching(true);
              handleEdit(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          {/* <ButtonCom
            className="px-3 rounded-lg mr-2"
            onClick={() => {
              alert(`View Section id: ${row.id}`);
            }}
          >
            <IconEyeCom className="w-5"></IconEyeCom>
          </ButtonCom> */}
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteSection({ sectionId: row.id, name: row.name });
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
          onClick={handleExport}
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

  /********* Delete One ********* */
  const handleDeleteSection = ({ sectionId, name }) => {
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
          const res = await axiosBearer.delete(
            `${API_COURSE_URL}/${courseId}/section?sectionId=${sectionId}`
          );

          getSectionsByCourseId();
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
  const getSectionsByCourseId = async () => {
    try {
      const res = await axiosBearer.get(
        `${API_COURSE_URL}/${courseId}/section`
      );
      console.log(res.data);
      setSections(res.data);
      setFilterSection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /********* Get SectionId from row ********* */
  const getSectionById = async (sectionId) => {
    try {
      const res = await axiosBearer.get(
        `${API_COURSE_URL}/${courseId}/section/${sectionId}`
      );
      reset(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseById = async () => {
    try {
      const res = await axiosBearer.get(`${API_COURSE_URL}/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingData = async () => {
    try {
      setIsFetching(true);
      await getSectionsByCourseId();
      await getCourseById();
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /********** END Fetch data Area ************ */

  /********* API Search Section ********* */
  useEffect(() => {
    const result = sections.filter((section) => {
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

    setFilterSection(result);
  }, [sections, search]);

  /********* Edit ********* */
  const handleEdit = async (sectionId) => {
    try {
      setIsFetching(true);
      await getSectionById(sectionId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  //********* Update Area *********
  const handleChangeStatus = (value) => {
    setValue("status", value);
    setError("status", { message: "" });
  };

  const handleChangeSwitch = async (sectionId, courseId, isChecked) => {
    try {
      const newSections = sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              status: isChecked ? 1 : 0,
            }
          : section
      );

      const dataBody = newSections.find((section) => section.id === sectionId);
      await axiosBearer.put(`${API_COURSE_URL}/${courseId}/section`, dataBody);
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getSectionsByCourseId();
    } catch (error) {
      showMessageError(error);
    }
  };

  const handleSubmitForm = async (values) => {
    try {
      setIsLoading(!isLoading);
      const res = await axiosBearer.put(
        `${API_COURSE_URL}/${courseId}/section`,
        values
      );
      // Update sections State
      setSections((prev) => {
        const newData = prev.map((item) => {
          if (item.id === values.id) {
            return {
              ...item,
              ...values,
            };
          }
          return item;
        });
        return newData;
      });
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
      {isFetching && <LoadingCom />}
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Section</HeadingH1Com>
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
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <span>
                <TableCom
                  tableKey={tableKey}
                  urlCreate={`/admin/courses/${courseId}/sections/create`}
                  title={`Course: ${course.name}`}
                  columns={columns}
                  items={filterSection}
                  search={search}
                  dropdownItems={dropdownItems}
                  setSearch={setSearch}
                ></TableCom>
              </span>
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
                <div className="col-sm-6">
                  <LabelCom htmlFor="name" isRequired>
                    Section Name
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
                <div className="col-sm-6">
                  <LabelCom htmlFor="ordered" isRequired>
                    Ordered
                  </LabelCom>
                  <InputCom
                    type="number"
                    control={control}
                    name="ordered"
                    register={register}
                    placeholder="Input section ordered"
                    errorMsg={errors.ordered?.message}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
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

export default AdminSectionListPage;
