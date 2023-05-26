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
import DropdownAntCom from "../ant/DropdownAntCom";

const TableCom = ({
  title = "",
  columns,
  items = [],
  urlCreate = "/",
  onSelectedRowsChange = () => {},
  ...rest
}) => {
  const { search, setSearch } = rest;
  const menuItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

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
        onSelectedRowsChange={onSelectedRowsChange}
        highlightOnHover
        actions={
          <div key="table-actions" className="">
            {/* <ButtonCom
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
            </Link> */}
            <DropdownAntCom items={menuItems}></DropdownAntCom>
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
