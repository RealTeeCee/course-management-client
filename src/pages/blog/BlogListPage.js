import React, { useEffect, useState } from 'react'
import ButtonBackCom from '../../components/button/ButtonBackCom';
import * as yup from "yup";
import { MESSAGE_FIELD_REQUIRED, MESSAGE_NUMBER_POSITIVE, MESSAGE_NUMBER_REQUIRED, MESSAGE_UPDATE_STATUS_SUCCESS, statusItems } from '../../constants/config';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useParams } from 'react-router-dom';
import { SelectDefaultAntCom, SwitchAntCom } from '../../components/ant';
import { ButtonCom } from '../../components/button';
import { IconDocumentCom, IconEditCom, IconEyeCom, IconRemoveCom, IconTrashCom } from '../../components/icon';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { API_COURSE_URL } from '../../constants/endpoint';
import { showMessageError } from '../../utils/helper';
import { HeadingFormH5Com, HeadingH1Com } from '../../components/heading';
import GapYCom from '../../components/common/GapYCom';
import { TableCom } from '../../components/table';
import ReactModal from 'react-modal';
import { InputCom } from '../../components/input';
import { LabelCom } from '../../components/label';

/********* Validation for Section function ********* */
const schemaValidation = yup.object().shape({
    name: yup.string().required(MESSAGE_FIELD_REQUIRED),
    ordered: yup
      .number(MESSAGE_FIELD_REQUIRED)
      
      .min(0, MESSAGE_NUMBER_POSITIVE),
  }); 
const BlogListPage = () => {
  /********* API State ********* */
  const [sections, setSections] = useState([]);
  const [course, setCourse] = useState({});
  /********* END API State ********* */

  /********* State ********* */
  const axiosPrivate = useAxiosPrivate();
  const [filterSection, setFilterSection] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

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

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      sortable: true,
      width: "70px",
    },
    {
      name: "Section Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <SwitchAntCom
          defaultChecked={row.status === 1 ? true : false}
          className={`${
            row.status === 1 ? "" : "bg-tw-danger hover:!bg-tw-orange"
          }`}
          onChange={(isChecked) => handleChangeSwitch(row.id, isChecked)}
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
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              setIsOpen(true);
              getSectionById(row.id);
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


  /********* Multiple One ********* */
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
          const res = await axiosPrivate.delete(
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
      const res = await axiosPrivate.get(
        `${API_COURSE_URL}/${courseId}/section`
      );
      setSections(res.data);
      setFilterSection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /********* Get SectionId from row ********* */
  const getSectionById = async (sectionId) => {
    try {
      const res = await axiosPrivate.get(
        `${API_COURSE_URL}/${courseId}/section/${sectionId}`
      );
      reset(res.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getSectionsByCourseId();
    getCourseById();
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

  ///********* Update Area *********
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
      await axiosPrivate.put(
        `${API_COURSE_URL}/${courseId}/section`,
        JSON.stringify(dataBody)
      );
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getSectionsByCourseId();
    } catch (error) {
      showMessageError(error);
    }
  };

  const handleSubmitForm = async (values) => {
    console.log(values);
    // const { id, name, status } = values;
    try {
      setIsLoading(!isLoading);
      // const data = {
      //   id,
      //   name,
      //   courseId,
      //   status,
      // };

      const res = await axiosPrivate.put(
        `${API_COURSE_URL}/${courseId}/section`,
        values
      );
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
                  urlCreate={`/admin/courses/${courseId}/sections/create`}
                  title={`Course: ${course.name}`}
                  columns={columns}
                  items={filterSection}
                  search={search}
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
                <div className="col-sm-12">
                  <LabelCom
                    htmlFor="name"
                    className="text-center block"
                    isRequired
                  >
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
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-6">
                  <LabelCom htmlFor="status">Status</LabelCom>
                  <div>
                    <SelectDefaultAntCom
                      listItems={statusItems}
                      onChange={handleChangeStatus}
                      status={errors.status && errors.status.message && "error"}
                      errorMsg={errors.status?.message}
                      placeholder="Choose status"
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
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Update
              </ButtonCom>
              <ButtonCom backgroundColor="danger" onClick={resetValues}>
                Reset
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
}

export default BlogListPage
