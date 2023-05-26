import React from "react";
// import { DownOutlined, SmileOutlined } from "@ant-design/icons";
// import { Dropdown, Space } from "antd";
import { Button, Dropdown, Space } from "antd";
import { ButtonCom } from "../button";
import { IconArrowDownCom } from "../icon";

const DropdownAntCom = ({ items = [], title = "More Actions" }) => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <ButtonCom backgroundColor="success" className="text-sm">
            <div className="flex gap-x-2 items-center">
              <div className="flex-1">{title}</div>
              <IconArrowDownCom></IconArrowDownCom>
            </div>
          </ButtonCom>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default DropdownAntCom;
