import { debounce } from "lodash";
import { useState } from "react";

// After time will OnChange value
export default function useOnChange(time = 0) {
  const [value, setValue] = useState(null);
  const handleOnChange = debounce((e) => {
    setValue(e.target.value);
  }, time);

  return [value, handleOnChange];
}
