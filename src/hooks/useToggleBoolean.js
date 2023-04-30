import { useState } from "react";

export default function useToggleBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const handleToggleBoolean = () => setValue(!value);
  return {
    value,
    handleToggleBoolean,
  };
}
