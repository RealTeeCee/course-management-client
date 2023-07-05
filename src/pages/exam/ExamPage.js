import { Container } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DialogConfirmMuiCom, QuizMuiCom } from "../../components/mui";
import { selectAllCourseState } from "../../store/course/courseSelector";
import { convertSecondToDiffForHumans } from "../../utils/helper";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useExitPrompt from "../../hooks/useExitPrompt";
import useNavigationBlocker from "../../hooks/useNavigationBlocker";

const ExamPage = () => {
  const { examination } = useSelector(selectAllCourseState);
  const [showDialog, setShowDialog] = useState(true);
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(true);

  const handleConfirm = () => {
    setShowDialog(false);
  };

  useNavigationBlocker("Are you sure you want to leave?", true);

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
        title2={`Exam Rules`}
        content0={`Hardware is an important example not to be overlooked. Students need to have working microphones and cameras If need be.`}
        content={`Students must also have a reliable internet connection. This is important to ensure smooth testing.
         Technical difficulties can be made into an opportunistic situation for students involving re-testing.`}
      ></DialogConfirmMuiCom>

      {!showDialog && <QuizMuiCom exam={examination} />}
    </Container>
  );
};

export default ExamPage;
