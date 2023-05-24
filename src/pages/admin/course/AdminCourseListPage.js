import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ButtonCom } from "../../../components/button";
import ButtonBackCom from "../../../components/button/ButtonBackCom";
import GapYCom from "../../../components/common/GapYCom";
import { HeadingH1Com } from "../../../components/heading";
import { IconEditCom, IconTrashCom } from "../../../components/icon";
import { TableCom } from "../../../components/table";
import { API_COURSE_URL } from "../../../constants/endpoint";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const columns = [
  {
    name: "Course Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category_id,
  },
  {
    name: "Image",
    selector: (row) => (
      <img width={50} height={50} src={`${row.image}`} alt={row.name} />
    ),
  },
  {
    name: "Price",
    selector: (row) => (row.sale_price > 0 ? row.sale_price : row.price),
  },
  {
    name: "Duration",
    selector: (row) => row.duration,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <ButtonCom
          className="px-3 rounded-none mr-2"
          backgroundColor="info"
          onClick={() => {
            alert(`Update Course id: ${row.id}`);
          }}
        >
          <IconEditCom></IconEditCom>
        </ButtonCom>
        <ButtonCom
          className="px-3 rounded-none"
          backgroundColor="danger"
          onClick={() => {
            alert(`Delete Course id: ${row.id}`);
          }}
        >
          <IconTrashCom></IconTrashCom>
        </ButtonCom>
      </>
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
      setCourses(res.data);
      setFilterCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    const result = courses.filter((course) => {
      const keys = Object.keys(course);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = course[key];
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
