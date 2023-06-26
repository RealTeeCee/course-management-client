import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosBearer } from "../../../../api/axiosInstance";
import { BreadcrumbCom } from "../../../../components/breadcrumb";
import { ButtonCom } from "../../../../components/button";
import GapYCom from "../../../../components/common/GapYCom";
import { HeadingH1Com } from "../../../../components/heading";
import { IconEditCom, IconTrashCom } from "../../../../components/icon";
import { TableCom } from "../../../../components/table";
import { API_AUTHOR_URL } from "../../../../constants/endpoint";

const AdminAuthorListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [search, setSearch] = useState("");

  // More Action Menu
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
          // onClick={() => handleDeleteMultipleRecords()}
        >
          Remove All
        </div>
      ),
    },
  ];
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Author Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image}`} alt={row.name} />
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
              // setIsFetching(true);
              // handleEdit(row.id);
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
              // handleDeleteSection({ sectionId: row.id, name: row.name });
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  /********* Library Function Area ********* */
  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };
  // Clear Selected after Mutiple Delete
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  /********* Fetch API Area ********* */
  const getAuthors = async () => {
    try {
      const res = await axiosBearer.get(API_AUTHOR_URL);
      console.log(res.data);
      setAuthors(res.data);
      setFilterAuthor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search in Table
  useEffect(() => {
    const result = authors.filter((course) => {
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
    setFilterAuthor(result);
  }, [authors, search]);
  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Author</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "Course",
              slug: "/admin/authors",
            },
            {
              title: "Author",
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
                  urlCreate={`/admin/courses/authors/create`}
                  title="List Author"
                  columns={columns}
                  items={filterAuthor}
                  search={search}
                  dropdownItems={dropdownItems}
                  setSearch={setSearch}
                ></TableCom>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAuthorListPage;
