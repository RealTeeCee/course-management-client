import { Container } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DialogConfirmMuiCom, QuizMuiCom } from "../../components/mui";
import { selectAllCourseState } from "../../store/course/courseSelector";
import { convertSecondToDiffForHumans } from "../../utils/helper";
import { Navigate } from "react-router-dom";

const ExamPage = () => {
  const { examination } = useSelector(selectAllCourseState);

  const [showDialog, setShowDialog] = useState(true);

  const handleConfirm = () => {
    setShowDialog(false);
  };

  return !examination || examination.length === 0 ? (
    <Navigate to="/forbidden" />
  ) : (
    <Container maxWidth="sm">
      <DialogConfirmMuiCom
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
      ></DialogConfirmMuiCom>

      {!showDialog && <QuizMuiCom exam={examination} />}
    </Container>
  );
};

export default ExamPage;
