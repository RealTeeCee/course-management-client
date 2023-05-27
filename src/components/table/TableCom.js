import React from "react";
import Table from "react-data-table-component";
import { Link } from "react-router-dom";
import { ButtonCom } from "../button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";
import { toast } from "react-toastify";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { DropdownAntCom } from "../ant";

const TableCom = ({
  title = "",
  columns,
  items = [],
  urlCreate = "/",
  dropdownItems = [],
  tableKey = 0,
  onSelectedRowsChange = () => {},
  ...rest
}) => {
  const { search, setSearch } = rest;
  return (
    <div>
      <Table
        key={tableKey}
        title={title}
        columns={columns}
        data={items}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={onSelectedRowsChange}
        highlightOnHover
        actions={
          <div key="table-actions" className="flex items-center gap-x-2 z-10">
            <DropdownAntCom items={dropdownItems}></DropdownAntCom>
            <Link to={urlCreate} key={urlCreate}>
              <ButtonCom
                className="text-white text-center px-3 text-sm"
                backgroundColor="info"
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
  tableKey: PropTypes.number,
  columns: PropTypes.array,
  dropdownItems: PropTypes.array,
  items: PropTypes.array.isRequired,
  //   children: PropTypes.node,
};
export default withErrorBoundary(TableCom, {
  FallbackComponent: ErrorCom,
});
