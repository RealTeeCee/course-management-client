import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { convertSecondToTime } from "../../utils/helper";
import { IconClockCom } from "../icon";
import { DialogConfirm } from ".";

// const exam = [
//   {
//     limitTime: 10,
//     question: {
//       id: 1,
//       description: "Which of the following is related to Spring Framework?",
//       point: 2.5,
//       partId: 1,
//     },
//     answers: [
//       {
//         id: 2,
//         description: "Beans",
//         questionId: 1,
//         correct: false,
//       },
//       {
//         id: 3,
//         description: "IoC",
//         questionId: 1,
//         correct: false,
//       },
//       {
//         id: 4,
//         description: "All of these",
//         questionId: 1,
//         correct: true,
//       },
//       {
//         id: 1,
//         description: "Container",
//         questionId: 1,
//         correct: false,
//       },
//     ],
//   },
//   {
//     limitTime: 10,
//     question: {
//       id: 2,
//       description: "Which of the following is not the Spring supported DI?",
//       point: 2.5,
//       partId: 1,
//     },
//     answers: [
//       {
//         id: 6,
//         description: "Setter-based",
//         questionId: 2,
//         correct: false,
//       },
//       {
//         id: 8,
//         description: "All of these",
//         questionId: 2,
//         correct: false,
//       },
//       {
//         id: 5,
//         description: "Constructor-based",
//         questionId: 2,
//         correct: false,
//       },
//       {
//         id: 7,
//         description: "Destructor-based",
//         questionId: 2,
//         correct: true,
//       },
//     ],
//   },
// ];

function Quiz({ exam = [] }) {
  const maxSteps = exam.length;
  const answerOptions = ["A", "B", "C", "D"];

  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [chooseAnswer, setChooseAnswer] = useState([]);
  const [examTime, setExamTime] = useState(exam[0].limitTime);
  const [timerId, setTimerId] = useState(exam[0].limitTime);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const examTimeId = setInterval(() => {
      setExamTime((prev) => prev - 1);
    }, 1000);

    setTimerId(examTimeId);
    return () => clearInterval(examTimeId);
  }, []);

  useEffect(() => {
    if (examTime === 0) {
      clearInterval(timerId);
    }
  }, [examTime, timerId]);

  useEffect(() => {
    console.log(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      chooseAnswer
    );
  }, [chooseAnswer]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleChooseAnswer = (event) => {
    const userAnswer = {
      ...exam[activeStep].question,
      userAnswerId: event.target.value,
    };

    console.log(userAnswer);

    const findAnswer = chooseAnswer.find((ex) => ex.id === userAnswer.id);

    //Tạo array câu hỏi user nếu có rồi thì update lại câu trả lời nếu chưa có thể add mới câu trả lời vào array
    if (findAnswer) {
      setChooseAnswer([
        ...chooseAnswer.map((question) =>
          question.id === userAnswer.id
            ? {
                ...question,
                userAnswerId: event.target.value,
              }
            : question
        ),
      ]);
    } else {
      setChooseAnswer((prevAnswer) => [...prevAnswer, userAnswer]);
    }

    /*
    const userAnswer = {
      question: ...exam[activeStep].question,
      answerId: event.target.value,
    };

    console.log(activeStep);
    console.log(chooseAnswer);
    const pickedAnswer = chooseAnswer.find(
      (obj) => (obj.question.id = userAnswer.question.id)
    );
    console.log(pickedAnswer);
    if (pickedAnswer) {
      setChooseAnswer([
        ...chooseAnswer.map((obj) =>
          obj.question.id === userAnswer.question.id
            ? {
                ...obj,
                answerId: event.target.value,
              }
            : obj
        ),
      ]);
    } else {
      setChooseAnswer((prevAnswer) => [...prevAnswer, userAnswer]);
    }
    */
  };

  const handleSubmit = () => {
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowDialog(false);
  };

  return (
    <Grid container sx={{ marginTop: "30px" }}>
      <DialogConfirm
        open={showDialog}
        onClose={() => setShowDialog(!showDialog)}
        closeContent={"CANCEL"}
        onConfirm={handleConfirm}
        confirmContent={"APPLY"}
        title={"Confirm Exam"}
        content={"Do you want to submit your exam?"}
      ></DialogConfirm>
      <Paper
        square
        elevation={0}
        sx={{
          padding: "20px",
          width: "1000px",
        }}
      >
        <Grid item sm={12} md={12} lg={12}>
          <Typography className="flex items-center gap-x-2 justify-end">
            <IconClockCom className="text-tw-primary"></IconClockCom>
            Time limit:{" "}
            <span
              className="font-medium"
              style={
                examTime === 0
                  ? { color: "red", fontWeight: "bold" }
                  : { fontWeight: "bold" }
              }
            >
              {convertSecondToTime(examTime)}
            </span>
          </Typography>
        </Grid>
        <Grid item sm={12} md={12} lg={12} mt="20px" mb="20px">
          <Typography>
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: `<strong>${activeStep + 1}.</strong> ${
                    exam[activeStep].question.description
                  }`,
                }}
              ></span>
            }
          </Typography>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {exam[activeStep].answers.map((answer, i) => (
                <React.Fragment key={answer.id}>
                  <FormControlLabel
                    value={answer.id}
                    control={
                      <Radio
                        onChange={handleChooseAnswer}
                        name="chooseAnswer"
                      />
                    }
                    label={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `<strong>${answerOptions[i]}.</strong> ${answer.description}`,
                        }}
                      />
                    }
                  />
                </React.Fragment>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            variant="text"
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            fullWidth
            disabled={chooseAnswer.length === 0}
            onClick={handleSubmit}
            variant="contained"
          >
            SUBMIT
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Quiz;
