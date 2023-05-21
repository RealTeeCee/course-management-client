import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import { HeadingH1Com, HeadingH2Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";

const columns = [
  {
    name: "Customer Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Số Điện Thoại",
    selector: (row) => row.phone,
  },
  {
    name: "Birth Day",
    selector: (row) => row.birthDate,
  },
  {
    name: "Image",
    selector: (row) => (
      <img width={50} height={50} src={row.image} alt="Thumb" />
    ),
  },
  {
    name: "Tools",
    cell: (row) => (
      <ButtonCom
        className="px-3 rounded-none"
        onClick={() => {
          alert(`customer_id: ${row.id}`);
        }}
      >
        Update
      </ButtonCom>
    ),
  },
];

const AdminCourseListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [search, setSearch] = useState("");

  const getCustomers = async () => {
    try {
      const res = await axiosInstance.get("https://dummyjson.com/users");
      setCustomers(res.data.users);
      setFilterCustomer(res.data.users);
      console.log(customers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    const result = customers.filter((customer) => {
      return customer.firstName.toLowerCase().match(search.toLowerCase());
    });
    setFilterCustomer(result);
  }, [customers, search]);
  return (
    <>
      <HeadingH1Com>Admin Courses</HeadingH1Com>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              {/* <HeadingH2Com className="text-tw-light-pink">
                List Courses
              </HeadingH2Com> */}
              <span>
                <TableCom
                  title="List Courses"
                  columns={columns}
                  items={filterCustomer}
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

export default AdminCourseListPage;
