import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const RatingMuiCom = ({ defaultValue = 2.5, ...rest }) => {
  // attr = readOnly will cannot edit Rating
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={defaultValue}
        precision={0.5}
        {...rest}
      />
    </Stack>
  );
};

export default RatingMuiCom;
