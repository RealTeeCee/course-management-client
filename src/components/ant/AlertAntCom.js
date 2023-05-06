import { message } from "antd";
import { useEffect } from "react";
const AlertAntCom = ({ type = "success", msg = "Successfully" }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (type === "success") {
      messageApi.success(`${msg}`);
    } else if (type === "error") {
      messageApi.error(`${msg}`);
    } else if (type === "warning") {
      messageApi.warning(`${msg}`);
    }
  }, [type, msg, messageApi]);

  return <>{contextHolder}</>;
};
export default AlertAntCom;
