import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import { HeadingH1Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";

const columns = [
  {
    name: "Course Name",
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
    name: "Phone",
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

const AdminSessionListPage = () => {
  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [search, setSearch] = useState("");

  const getCourses = async () => {
    try {
      const res = await axiosInstance.get("https://dummyjson.com/users");
      setCourses(res.data.users);
      setFilterCourse(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    const result = courses.filter((course) => {
      return course.firstName.toLowerCase().match(search.toLowerCase());
    });
    setFilterCourse(result);
  }, [courses, search]);
  return (
    <>
      <HeadingH1Com>Admin Sessions</HeadingH1Com>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <span>
                <TableCom
                  urlCreate="/admin/sessions/create"
                  title="List Sessions"
                  columns={columns}
                  items={filterCourse}
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

export default AdminSessionListPage;
