import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCourseState } from "../../store/course/courseSelector";
import {
  onGenerateCourseExam,
  onRetakeExam,
} from "../../store/course/courseSlice";
import { selectUser } from "../../store/auth/authSelector";
import moment from "moment/moment";
import { convertSecondToDiffForHumans } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { DialogNextVideoMuiCom } from ".";
import { toast } from "react-toastify";

const colorMap = {
  FAIL: "#FF4136", // red
  AVERAGE: "#FF851B", // orange
  GOOD: "#2ECC40", // green
  EXCELLENT: "#0074D9", // blue
};

const ExamResultMuiCom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { retakeExam, courseId, finishExam, generateExamSuccess, examination } =
    useSelector(selectAllCourseState);
  const user = useSelector(selectUser);

  const colorGrade =
    retakeExam && retakeExam.grade ? colorMap[retakeExam.grade] : null;

  const countDown =
    retakeExam && retakeExam?.created_at === null
      ? 0
      : Math.floor(new Date(retakeExam?.created_at).getTime() / 1000) +
        60 -
        Math.floor(Date.now() / 1000);

  const [canExam, setCanExam] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [countDownTime, setCountDownTime] = useState(
    countDown === 0 ? 1 : countDown
  );
  const [timerId, setTimerId] = useState(countDown);

  console.log(countDown);
  console.log(countDownTime);
  // : isNaN(countDown) ? countDown :
  useEffect(() => {
    if (retakeExam && retakeExam.grade && retakeExam.grade !== "FAIL") {
      setCanExam(false);
    }
  }, [retakeExam]);

  useEffect(() => {
    if (countDown > 0) {
      const countDownTimeId = setInterval(() => {
        setCountDownTime((prev) => {
          if (isNaN(prev)) prev = countDown;
          const updatedCount = prev - 1;
          if (updatedCount === 0) {
            clearInterval(countDownTimeId);
          }
          return updatedCount;
        });
      }, 1000);

      setTimerId(countDownTimeId);
      return () => clearInterval(countDownTimeId);
    }
  }, [countDown]);

  useEffect(() => {
    if (countDownTime === 0) {
      clearInterval(timerId);
    }
  }, [countDownTime, timerId]);

  useEffect(() => {
    dispatch(onRetakeExam({ userId: user.id, courseId }));
  }, [courseId, dispatch, finishExam, user]);

  useEffect(() => {
    if (canExam && !retakeExam.passed) {
      setShowDialog(true);
    }
  }, [canExam, retakeExam]);

  useEffect(() => {
    if (generateExamSuccess && examination.length > 0) {
      navigate("/exam");
    } else if (generateExamSuccess && examination.length === 0) {
      // dispatch(onSetGenerateExamSuccess)
      toast.warning(
        "Sorry for unconvenience. The examination is not available for this course."
      );
    }
    setShowDialog(false);
  }, [examination, generateExamSuccess, navigate]);

  const handleCanExam = () => {
    if (retakeExam && retakeExam.passed) {
      return navigate("/profile/accomplishments");
    }
    console.log(countDownTime);
    if (countDownTime <= 1 || isNaN(countDownTime)) {
      setCanExam(true);
      setShowDialog(true);
    }
  };

  const handleWaitCountDown = () => {
    if (countDownTime <= 1 || isNaN(countDownTime)) {
      setCanExam(true);
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setCanExam(true);
    setShowDialog(false);
  };

  const handleInitialExam = () => {
    dispatch(onGenerateCourseExam({ courseId, userId: user.id }));
  };

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        square
        sx={{
          padding: "20px",
          width: "1000px",
        }}
      >
        <DialogNextVideoMuiCom
          open={showDialog}
          onNext={handleInitialExam}
          onClose={handleCloseDialog}
          isFinal={true}
        ></DialogNextVideoMuiCom>
        <Typography sx={{ fontSize: "20px" }}>
          <strong>Last result</strong>
        </Typography>

        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Exam session:{" "}
          {retakeExam && retakeExam.examSession
            ? retakeExam.examSession
            : "None"}
        </Typography>
        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Correct Answer:{" "}
          {retakeExam && retakeExam.correctAnswer
            ? retakeExam.correctAnswer
            : "None"}
        </Typography>
        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Total Time:{" "}
          {retakeExam && retakeExam.totalExamTime
            ? convertSecondToDiffForHumans(retakeExam.totalExamTime)
            : "None"}
        </Typography>
        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Total Point:{" "}
          {retakeExam && retakeExam.totalPoint ? retakeExam.totalPoint : "None"}
        </Typography>
        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Grade:{" "}
          <strong style={{ color: colorGrade == null ? "#333" : colorGrade }}>
            {retakeExam && retakeExam.grade ? retakeExam.grade : "None"}
          </strong>
        </Typography>
        <br />
        <Typography sx={{ marginLeft: "15px" }}>
          Finished at:{" "}
          {retakeExam && retakeExam.created_at
            ? moment(retakeExam?.created_at).format("YYYY/MM/DD HH:mm:ss")
            : "None"}
        </Typography>
      </Paper>
      <div style={{ marginTop: "20px" }}>
        {canExam || countDownTime === 1 || (retakeExam && retakeExam.passed) ? (
          <Button
            onClick={handleCanExam}
            variant="contained"
            color="secondary"
            size="large"
          >
            {retakeExam && retakeExam.passed ? "View Certificate" : "EXAM NOW"}
          </Button>
        ) : (
          <Button
            onClick={handleWaitCountDown}
            variant="contained"
            color={"secondary"}
            disabled={
              retakeExam &&
              retakeExam.grade &&
              retakeExam.grade === "FAIL" &&
              countDownTime > 1
            }
            size="large"
          >
            {retakeExam &&
            retakeExam.grade &&
            retakeExam.grade === "FAIL" &&
            countDownTime > 1
              ? `PLEASE RETURN AFTER ${convertSecondToDiffForHumans(countDown)}`
              : "EXAM NOW"}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExamResultMuiCom;
