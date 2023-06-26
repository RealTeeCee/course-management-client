import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_UPDATE_STATUS_SUCCESS,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
} from "../../../constants/config";
import { SelectDefaultAntCom, SwitchAntCom } from "../../../components/ant";
import { ButtonCom } from "../../../components/button";
import { IconTrashCom } from "../../../components/icon";
import { axiosBearer } from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { showMessageError } from "../../../utils/helper";
import LoadingCom from "../../../components/common/LoadingCom";
import { HeadingH1Com } from "../../../components/heading";
import { BreadcrumbCom } from "../../../components/breadcrumb";
import GapYCom from "../../../components/common/GapYCom";
import { TableCom } from "../../../components/table";
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
const userItems = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "In-Active",
  },
];
const AdminUserListPage = () => {
  /********* State ********* */
  //API State
  const [image, setImage] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);

  // Local State
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [users, setusers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);
  const user_status = user.status;

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
          onClick={() => handleDeleteMultipleRecords()}
        >
          Remove All
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
      name: "Frist Name",
      selector: (row) => row.first_name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Avatar",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image_url}`} alt={row.name} />
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <SwitchAntCom
          defaultChecked={row.user_status === 1 ? true : false}
          className={`${
            row.user_status === 1 ? "" : "bg-tw-success hover:!bg-tw-dark"
          }`}
          onChange={(isChecked) => handleChangeVerfified(row.id, isChecked)}
        />
      ),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
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
  const getUsers = async () => {
    try {
      const res = await axiosBearer.get(`/auth/user/all`);
      console.log("data user", res.data);
      setusers(res.data);
      setFilterUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          const res = await axiosBearer.delete(`/auth/user`, { id });
          getUsers();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  /********* Multi Delete API ********* */
  const handleDeleteMultipleRecords = () => {
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
            axiosBearer.delete(`/auth/user/${row.id}`)
          );
          await Promise.all(deletePromises);
          toast.success(`Delete ${selectedRows.length} users success`);
        } catch (error) {
          showMessageError(error);
        } finally {
          getUsers();
          clearSelectedRows();
        }
      }
    });
  };
  /********* Update Status API ********* */
  const handleChangeVerfified = async (userId, isChecked) => {
    try {
      //update new status of user
      const newUsers = users.map((userNew) =>
      userNew.id === userId
          ? { ...userNew, user_status: isChecked ? 1 : 0,}
          : userNew
      );

      const dataBody = newUsers.find((userNew) => userNew.id === userId);

      const {
        id,
        email,
        first_name,
        last_name,
        image_url,
        name,
        password,
        is_verified,
        provider,
        provider_id,
        role,
        user_status,
      } = dataBody;
      const formData = {
        id,
        email,
        first_name,
        last_name,
        image_url,
        is_verified: is_verified||"True",
        name,
        password,
        provider,
        provider_id,
        role,
        user_status: user_status||user.id,
      };
      
      await axiosBearer.put(`/auth/user`, formData);
      console.log("formData", formData);
      toast.success(MESSAGE_UPDATE_STATUS_SUCCESS);
      getUsers();
    } catch (error) {
      showMessageError(error);
    }
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
            <div className="card-body flex gap-x-4 h-[50vh]"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminUserListPage;
