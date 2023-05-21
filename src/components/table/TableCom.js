import React from "react";
import Table from "react-data-table-component";
import { Link } from "react-router-dom";
import { ButtonCom } from "../button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";
import { toast } from "react-toastify";

const TableCom = ({
  title = "",
  columns,
  items = [],
  urlCreate = "/",
  ...rest
}) => {
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
          <div key="table-actions" className="flex gap-x-2">
            <ButtonCom
              className="px-3 text-white text-center text-lg"
              backgroundColor="success"
              onClick={() => {
                toast.info("Developing...");
              }}
            >
              Export
            </ButtonCom>
            <Link to={urlCreate} key={urlCreate}>
              <ButtonCom
                className="px-3 text-white text-center text-lg"
                backgroundColor="pink"
              >
                Create New
              </ButtonCom>
            </Link>
          </div>
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

TableCom.propTypes = {
  title: PropTypes.string,
  urlCreate: PropTypes.string.isRequired,
  columns: PropTypes.array,
  items: PropTypes.array.isRequired,
  //   children: PropTypes.node,
};
export default withErrorBoundary(TableCom, {
  FallbackComponent: ErrorCom,
});
