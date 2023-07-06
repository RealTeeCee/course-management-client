import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  AVATAR_DEFAULT,
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
} from "../../../constants/config";
import {
  SelectDefaultAntCom,
  SelectSearchAntCom,
  SwitchAntCom,
} from "../../../components/ant";
import { ButtonCom } from "../../../components/button";
import {
  IconCheckCom,
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../components/icon";
import { axiosBearer } from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { showMessageError } from "../../../utils/helper";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../components/heading";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import GapYCom from "../../../components/common/GapYCom";
import { TableCom } from "../../../components/table";
import { onGetAllUsers } from "../../../store/admin/user/userSlice";
import { InputCom } from "../../../components/input";
import { LabelCom } from "../../../components/label";
import ReactModal from "react-modal";
import { ALL_ROLES } from "../../../constants/permissions";
const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  status: yup.number().default(2),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
  category_id: yup.string().required(MESSAGE_FIELD_REQUIRED),
});

const AdminUserListPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  /********* State ********* */
  //API State
  const [image, setImage] = useState([]);

  // Local State
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [isOpenAuthorize, setIsOpenAuthorize] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filterUser, setFilterUser] = useState([]);
  const [search, setSearch] = useState("");

  /********* END API State ********* */

  /********* More Action Menu ********* */
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
          onClick={() => handleBulkDelete()}
        >
          Bulk Delete
        </div>
      ),
    },
  ];

  //manage status and event in form
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
  const resetValues = () => {
    reset();
  };

  /********* Fetch API Area ********* */
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Avatar",
      selector: (row) => (
        <img
          width={50}
          height={50}
          src={`${row.imageUrl || AVATAR_DEFAULT}`}
          alt={row.name}
        />
      ),
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Verify",
      selector: (row) =>
        row.verified ? (
          <IconCheckCom className="text-tw-success" />
        ) : (
          <IconRemoveCom className="text-tw-danger" />
        ),
      width: "100px",
    },
    {
      name: "Authorize",
      selector: (row) => (
        <ButtonCom
          className="px-3 rounded-lg"
          onClick={() => {
            handleAuthorize(row);
          }}
        >
          {row.role}
        </ButtonCom>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <SwitchAntCom
          defaultChecked={row.status === 1 ? true : false}
          className={`${
            row.status === 1 ? "" : "bg-tw-danger hover:!bg-tw-orange"
          }`}
          onChange={(isChecked) => handleChangeStatus(row.id, isChecked)}
        />
      ),
      width: "80px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              // handleEdit(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteUser(row);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  /********* Call API ********* */
  //Get All user
  useEffect(() => {
    dispatch(onGetAllUsers());
  }, []);
  // const getUsers = async () => {
  //   try {
  //     const res = await axiosBearer.get(`/auth/user/all`);
  //     console.log("data user", res.data);
  //     setUsers(res.data);
  //     setFilterUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };

  /********* Search ********* */
  useEffect(() => {
    const result = users.filter((user) => {
      const keys = Object.keys(user);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = user[key];
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
    setFilterUser(result);
  }, [users, search]);

  /********* Delete one API ********* */
  const handleDeleteUser = ({ id, name }) => {
    console.log("userId", id);
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete user: <span class="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBearer.delete(`/auth/user?userId=${id}`);
          // getUsers();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  /********* Bulk Delete API ********* */
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete <span class="text-tw-danger">${
        selectedRows.length
      } selected ${selectedRows.length > 1 ? "users" : "user"}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = selectedRows.map((row) =>
            axiosBearer.delete(`/auth/user?userId=${row.id}`)
          );
          await Promise.all(deletePromises);
          toast.success(`Delete ${selectedRows.length} users success`);
        } catch (error) {
          showMessageError(error);
        } finally {
          // getUsers();
          clearSelectedRows();
        }
      }
    });
  };
  /********* Update Status API ********* */
  const handleChangeStatus = async (userId, isChecked) => {
    try {
      //update new status of user
      const newUsers = users.map((user) =>
        user.id === userId ? { ...user, status: isChecked ? 1 : 0 } : user
      );
      const updatedUser = newUsers.find((user) => user.id === userId);

      const formData = {
        id: updatedUser.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        imageUrl: updatedUser.imageUrl,
        status: updatedUser.status,
      };

      await axiosBearer.put(`/auth/user`, formData);
      console.log("formData", formData);
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      // getUsers();
    } catch (error) {
      showMessageError(error);
    }
  };

  /********* Update Authorize ********* */
  const handleAuthorize = (item) => {
    setIsOpenAuthorize(true);
  };

  const handleSubmitAuthorize = (values) => {
    console.log("values: ", values);
  };

  return (
    <>
      {isFetching && <LoadingCom />}
      <div className="flex justify-between items-center">
        <HeadingH1Com>Management Users</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "User",
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
                  urlCreate="/admin/users/create"
                  tableKey={tableKey}
                  title="List Users"
                  columns={columns}
                  items={filterUser}
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

      {/* Modal Authorize */}
      <ReactModal
        isOpen={isOpenAuthorize}
        onRequestClose={() => setIsOpenAuthorize(false)}
        overlayClassName="modal-overplay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={`modal-content scroll-hidden  max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg outline-none transition-all duration-300 ${
          isOpenAuthorize ? "w-50" : "w-0"
        }`}
      >
        <div className="card-header bg-tw-primary flex justify-between text-white">
          <HeadingFormH5Com className="text-2xl">Authorize</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom
              className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"
              onClick={() => setIsOpenAuthorize(false)}
            ></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitAuthorize)}
          >
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Course hidden id"
              errorMsg={errors.id?.message}
            ></InputCom>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <LabelCom htmlFor="role" isRequired>
                    Role
                  </LabelCom>
                  <div>
                    <SelectSearchAntCom
                      // selectedValue={categorySelected}
                      listItems={ALL_ROLES}
                      // onChange={handleChangeCategory}
                      className="w-full py-1"
                      status={
                        errors.category_id &&
                        errors.category_id.message &&
                        "error"
                      }
                      errorMsg={errors.role?.message}
                      placeholder="Choose a role"
                    ></SelectSearchAntCom>
                    {/* <InputCom
                      type="hidden"
                      control={control}
                      name="role"
                      register={register}
                    ></InputCom> */}
                  </div>
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
export default AdminUserListPage;
