import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import { ButtonCom } from "../../../components/button";
import GapYCom from "../../../components/common/GapYCom";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import {
  IconAnswerCom,
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import { TableCom } from "../../../components/table";
import { NOT_FOUND_URL } from "../../../constants/config";
import { onGetQuestionsByPartId } from "../../../store/admin/question/questionSlice";
import { fakeName, sliceText } from "../../../utils/helper";

const schemaValidation = yup.object().shape({
  // maxPoint: yup
  //   .number(MESSAGE_FIELD_REQUIRED)
  //   .typeError(MESSAGE_NUMBER_REQUIRED)
  //   .min(100, "This field must be greater than 100"),
  // limitTime: yup
  //   .number(MESSAGE_FIELD_REQUIRED)
  //   .typeError(MESSAGE_NUMBER_REQUIRED)
  //   .min(600, "This field must be greater than 600"),
});

const AdminQuestionListPage = () => {
  /********* State ********* */
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterPart, setFilterPart] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, partId } = useParams();
  const { data } = useSelector((state) => state.course);
  const { parts } = useSelector((state) => state.part);
  const courseById = data?.find((item) => item.id === parseInt(courseId));
  const partById = parts?.find((item) => item.id === parseInt(partId));
  if (!courseById || !partById) navigate(NOT_FOUND_URL);

  const { questions, isLoading, isBulkDeleteSuccess, isPostQuestionSuccess } =
    useSelector((state) => state.question);
  // Fetch Data
  useEffect(() => {
    dispatch(onGetQuestionsByPartId({ partId }));
    if (isPostQuestionSuccess && isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostQuestionSuccess]);

  // Search in Table if using Redux
  useEffect(() => {
    if (search) {
      if (!questions) return;

      const result = questions.filter((item) => {
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
      if (questions) setFilterPart(questions);
    }
  }, [questions, search]);

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

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Question Name",
      selector: (row) => fakeName("Question", row.id),
      sortable: true,
    },
    {
      name: "Point",
      selector: (row) => row.point,
      sortable: true,
    },
    {
      name: "Answer",
      cell: (row) => (
        <>
          <Link to={`/admin/courses/${row.id}/...`}>
            <ButtonCom className="px-3 rounded-lg mr-2" backgroundColor="gray">
              <IconAnswerCom className="text-tw-success" />
            </ButtonCom>
          </Link>
        </>
      ),
    },
    {
      name: "Description",
      selector: (row) => sliceText(row.description),
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
              //   handleEdit(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              //   handleDelete({ partId: row.id, name: `Part ${row.id}` });
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
          // onClick={handleExport}
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
          //   onClick={() => handleBulkDelete()}
        >
          Bulk Delete
        </div>
      ),
    },
  ];

  //Edit
  const handleSubmitForm = (values) => {
    console.log(values);
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
        <HeadingH1Com>Admin Question</HeadingH1Com>
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
              slug: `/admin/courses/${courseId}/parts`,
            },
            {
              title: "Question",
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
                  urlCreate={`/admin/courses/${courseId}/parts/${partId}/questions/create`}
                  title={`Course: ${courseById?.name}, ${fakeName(
                    "Part",
                    partId
                  )}`}
                  columns={columns}
                  items={filterPart}
                  search={search}
                  setSearch={setSearch}
                  dropdownItems={dropdownItems}
                  onSelectedRowsChange={handleRowSelection} // selected Multiple
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
                <div className="col-sm-6 offset-3 text-center">
                  <LabelCom htmlFor="maxPoint">Part Name</LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input max point"
                    defaultValue={`Part ${watch("id")}`} // Fake Name
                    readOnly
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="maxPoint" isRequired>
                    Max Point
                  </LabelCom>
                  <InputCom
                    type="number"
                    control={control}
                    name="maxPoint"
                    register={register}
                    placeholder="Input max point"
                    errorMsg={errors.maxPoint?.message}
                    value={watch("maxPoint")}
                    readOnly
                  ></InputCom>
                </div>
                <div className="col-sm-6">
                  <LabelCom htmlFor="limitTime" subText="(second)" isRequired>
                    Limit Time
                  </LabelCom>
                  <InputCom
                    type="number"
                    control={control}
                    name="limitTime"
                    register={register}
                    placeholder="Input limit time"
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

export default AdminQuestionListPage;
