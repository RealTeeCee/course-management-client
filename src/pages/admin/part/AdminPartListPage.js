import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from "yup";
import { SwitchAntCom } from "../../../components/ant";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import { ButtonCom } from "../../../components/button";
import GapYCom from "../../../components/common/GapYCom";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import {
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { TableCom } from "../../../components/table";
import {
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_NUMBER_REQUIRED,
} from "../../../constants/config";
import {
  onBulkDeletePart,
  onPostPart,
  onDeletePart,
  onGetPartsByCourseId,
} from "../../../store/admin/part/partSlice";
import {
  convertSecondToDiffForHumans,
  showMessageError,
} from "../../../utils/helper";

const schemaValidation = yup.object().shape({
  maxPoint: yup
    .number(MESSAGE_FIELD_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(10, "This field must be greater than 10"),
  limitTime: yup
    .number(MESSAGE_FIELD_REQUIRED)
    .typeError(MESSAGE_NUMBER_REQUIRED)
    .min(600, "This field must be greater than 600"),
});

const AdminPartListPage = () => {
  /********* State ********* */
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterPart, setFilterPart] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { parts, isLoading, isBulkDeleteSuccess, isPostPartSuccess } =
    useSelector((state) => state.part);
  // Fetch Data
  useEffect(() => {
    dispatch(onGetPartsByCourseId({ courseId }));
    if (isPostPartSuccess && isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostPartSuccess]);

  // useEffect(() => {
  //   if (parts) setFilterPart(parts);
  // }, [parts]);

  // Search in Table if using Redux
  useEffect(() => {
    if (search) {
      if (!parts) return;

      const result = parts.filter((item) => {
        const keys = Object.keys(item);
        // Return all items if search is empty
        if (!search) return true;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = item[key];

          if (
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }

          if (
            typeof value === "number" &&
            String(value).toLowerCase() === search.toLowerCase()
          ) {
            return true;
          }
        }

        return false;
      });

      setFilterPart(result);
    } else {
      // Default, setPart for search
      if (parts) setFilterPart(parts);
    }
  }, [parts, search]);

  useEffect(() => {
    if (isBulkDeleteSuccess) clearSelectedRows();
  }, [isBulkDeleteSuccess]);

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

  /********* Export Excel ********* */
  //   const { handleExcelData } = useExportExcel("part");
  //   const handleExport = () => {
  //     const headers = ["No", "Section Name", "Status", "Order"];
  //     const data = sections.map((section, index) => [
  //       index + 1,
  //       section.name,
  //       section.status === 1 ? "Active" : "Inactive",
  //       section.ordered,
  //     ]);
  //     handleExcelData(headers, data);
  //   };

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Part Name",
      selector: (row) => `Part ${row.id}`,
      sortable: true,
    },
    {
      name: "Max Point",
      selector: (row) => row.maxPoint,
      sortable: true,
    },
    {
      name: "Limit Time",
      selector: (row) => convertSecondToDiffForHumans(row.limitTime),
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.status === 1 ? (
            <ButtonCom
              onClick={() => handleChangeStatus(row)}
              backgroundColor="success"
            >
              Active
            </ButtonCom>
          ) : (
            <ButtonCom
              onClick={() => handleChangeStatus(row)}
              backgroundColor="danger"
            >
              InActive
            </ButtonCom>
          )}
        </>
      ),
      sortable: true,
    },
    // {
    //   name: "Lessons",
    //   cell: (row) => (
    //     <>
    //       <Link to={`/admin/courses/${courseId}/sections/${row.id}/lessons`}>
    //         <ButtonCom
    //           className="px-3 rounded-lg mr-2"
    //           backgroundColor="gray"
    //           onClick={() => {
    //             // alert(`Update Course id: ${row.id}`);
    //           }}
    //         >
    //           <IconDocumentCom className="w-5 text-black"></IconDocumentCom>
    //         </ButtonCom>
    //       </Link>
    //     </>
    //   ),
    // },
    // {
    //   name: "Order",
    //   selector: (row) => row.ordered,
    //   sortable: true,
    // },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
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
              handleDelete({ partId: row.id, name: `Part ${row.id}` });
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
          //   onClick={handleExport}
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
          onClick={() => handleBulkDelete()}
        >
          Bulk Delete
        </div>
      ),
    },
  ];

  /********* Delete One ********* */
  const handleDelete = ({ partId, name }) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete part: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          onDeletePart({
            courseId: parseInt(courseId),
            partId,
          })
        );
        // try {
        //   const res = await axiosBearer.delete(
        //     `${API_COURSE_URL}/${courseId}/section?sectionId=${sectionId}`
        //   );
        //   getSectionsByCourseId();
        //   reset(res.data);
        //   toast.success(res.data.message);
        // } catch (error) {
        //   showMessageError(error);
        // }
      }
    });
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete <span className="text-tw-danger">${
        selectedRows.length
      } selected ${selectedRows.length > 1 ? "parts" : "part"}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("selectedRows: ", selectedRows);
        dispatch(onBulkDeletePart(selectedRows));
        // try {
        //   const deletePromises = selectedRows.map((row) =>
        //     axiosBearer.delete(`${API_COURSE_URL}?courseId=${row.id}`)
        //   );
        //   await Promise.all(deletePromises);
        //   toast.success(
        //     `Delete [${selectedRows.length}] ${
        //       selectedRows.length > 1 ? "parts" : "part"
        //     } success`
        //   );
        // } catch (error) {
        //   showMessageError(error);
        // } finally {
        //   getCourses();
        //   clearSelectedRows();
        // }
      }
    });
  };

  ///********* Update Area *********
  const getPartById = (partId) => {
    setIsFetching(true);
    const part = parts.find((item) => item.id === partId);
    if (part) {
      reset(part);
    } else {
      showMessageError("No data");
    }
    setIsFetching(false);
  };

  const handleEdit = (partId) => {
    setIsOpen(true);
    getPartById(partId);
  };

  const handleSubmitForm = (values) => {
    dispatch(
      onPostPart({
        ...values,
        courseId: parseInt(courseId),
      })
    );
    // const { price, net_price } = values;
    // try {
    //   setIsLoading(!isLoading);
    //   let fd = new FormData();
    //   fd.append(
    //     "courseJson",
    //     JSON.stringify({
    //       ...values,
    //       price: convertStrMoneyToInt(price),
    //       net_price: convertStrMoneyToInt(net_price),
    //     })
    //   );
    //   const res = await axiosBearer.put(`/course`, fd);
    //   getCourses();
    //   toast.success(`${res.data.message}`);
    //   setIsOpen(false);
    // } catch (error) {
    //   showMessageError(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleChangeStatus = (part) => {
    dispatch(
      onPostPart({
        ...part,
        status: part.status === 1 ? 0 : 1,
        courseId: parseInt(courseId),
      })
    );
  };

  /********* Library Function Area ********* */
  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };
  // Clear Selected after Bulk Delete
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };
  return (
    <>
      {(isLoading || isFetching) && <LoadingCom />}
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Part</HeadingH1Com>
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
              title: "Part",
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
                  urlCreate={`/admin/courses/${courseId}/parts/create`}
                  title="List Parts"
                  columns={columns}
                  items={filterPart}
                  search={search}
                  setSearch={setSearch}
                  dropdownItems={dropdownItems}
                  onSelectedRowsChange={handleRowSelection} // selected Mutilple
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
          <HeadingFormH5Com className="text-2xl">Edit Part</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom
              className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"
              onClick={() => setIsOpen(false)}
            ></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Part hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="maxPoint" isRequired>
                    Max Point
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="maxPoint"
                    register={register}
                    placeholder="Input Price"
                    errorMsg={errors.maxPoint?.message}
                    value={watch("maxPoint")}
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="limitTime" subText="(second)" isRequired>
                    Limit Time
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="limitTime"
                    register={register}
                    placeholder="Input Net Price"
                    errorMsg={errors.limitTime?.message}
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

export default AdminPartListPage;
