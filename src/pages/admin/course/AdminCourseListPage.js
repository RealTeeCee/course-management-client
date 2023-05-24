import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../../components/heading";
import { TableCom } from "../../../components/table";
import { API_COURSE_URL } from "../../../constants/endpoint";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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

const AdminCourseListPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [search, setSearch] = useState("");
  
  const getCourses = async () => {
    try {
      const res = await axiosPrivate.get(API_COURSE_URL);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await axiosInstance.get("https://dummyjson.com/users");
      setCourses(res.data.users);
      setFilterCourse(res.data.users);
      console.log(courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
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
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Courses</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              {/* <HeadingH2Com className="text-tw-light-pink">
                List Courses
              </HeadingH2Com> */}
              <span>
                <TableCom
                  urlCreate="/admin/courses/create"
                  title="List Courses"
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

export default AdminCourseListPage;
