import React from "react";
import Quiz from "../../components/mui/Quiz";
import { Container } from "@mui/material";
import { DialogConfirm } from "../../components/mui";
import { useSelector } from "react-redux";
import { selectAllCourseState } from "../../store/course/courseSelector";
import { useState } from "react";
import { convertSecondToDiffForHumans } from "../../utils/helper";

const ExamPage = () => {
  const { examination } = useSelector(selectAllCourseState);

  const [showDialog, setShowDialog] = useState(true);

  const handleConfirm = () => {
    setShowDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <DialogConfirm
        open={showDialog}
        onConfirm={handleConfirm}
        confirmContent={"START"}
        title={`Exam times: ${
          examination.length > 0
            ? convertSecondToDiffForHumans(examination[0].limitTime)
            : 0
        }`}
        content={`Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
      dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
      consectetur ac, vestibulum at eros.`}
      ></DialogConfirm>

      {!showDialog && <Quiz exam={examination} />}
    </Container>
  );
};

export default ExamPage;
