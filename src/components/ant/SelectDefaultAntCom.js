import { Select } from "antd";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const $listItems = [
//   {
//     value: 1,
//     label: "Active",
//   },
//   {
//     value: 0,
//     label: "InActive",
//   },
// ];

// Basic Usage
const SelectDefaultAntCom = ({
  listItems = [],
  onChange = () => {},
  defaultValue = 1,
  status = "",
  errorMsg = "",
  className = "",
  selectedValue = null,
  ...rest
}) => {
  return (
    <>
      <Select
        size="large"
        defaultValue={defaultValue}
        onChange={onChange}
        options={listItems}
        className={`${className} w-full`}
        {...rest}
      />

      {errorMsg && errorMsg.length > 0 && (
        <span className="text-tw-danger text-sm">{errorMsg}</span>
      )}
    </>
  );
};

SelectDefaultAntCom.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.number,
  status: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  errorMsg: PropTypes.string,
};
export default withErrorBoundary(SelectDefaultAntCom, {
  FallbackComponent: ErrorCom,
});
