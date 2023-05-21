import React from "react";
import Table from "react-data-table-component";
import { ButtonCom } from "../button";

const TableCom = ({ title = "", columns, items = [], ...rest }) => {
  const { search, setSearch } = rest;
  return (
    <div>
      <Table
        title={title}
        columns={columns}
        data={items}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={
          <ButtonCom
            className="btn-sm px-3 text-white text-center"
            backgroundColor="success"
          >
            Export
          </ButtonCom>
        }
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control md:w-72"
          />
        }
      ></Table>
    </div>
  );
};

export default TableCom;
