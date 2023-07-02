import { ButtonBase, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import accomplishmentImage from "../../assets/images/accomplishment.jpg";
import { HeadingFormH1Com, HeadingH3Com } from "../../components/heading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAccomplishmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {};

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <img
            src={accomplishmentImage}
            alt="Lỗi"
            className="w-full h-60 object-cover"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <HeadingFormH1Com>Accomplishment Journal</HeadingFormH1Com>
          <Typography align="center" gutterBottom>
            Discipline is the bridge between goals and accomplishment
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={10}>
          <HeadingH3Com>Course Accomplished</HeadingH3Com>
          <Paper
            square
            elevation={5}
            sx={{
              padding: "20px",
              width: "100%",
              mt: "20px",
            }}
          >
            <Grid container xs={12} sm={12} md={12} sx={{ margin: "10px" }}>
              <Grid
                container
                item
                justifyItems="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={12} md={2}>
                  <ButtonBase>
                    <img
                      src="https://i.ibb.co/XphQ2PC/284601068-113074531414219-1330789727702240346-n.jpg"
                      alt="Lỗi"
                      style={{
                        width: "180px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <HeadingH3Com>Course 1</HeadingH3Com>
                  <HeadingH3Com>ClicknLearn</HeadingH3Com>
                  <HeadingH3Com>Grade Achieve: EXCELLENT</HeadingH3Com>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            square
            elevation={5}
            sx={{
              padding: "20px",
              width: "100%",
              mt: "20px",
            }}
          >
            <Grid container xs={12} sm={12} md={12} sx={{ margin: "10px" }}>
              <Grid
                container
                item
                justifyItems="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={12} md={2}>
                  <ButtonBase>
                    <img
                      src="https://i.ibb.co/XphQ2PC/284601068-113074531414219-1330789727702240346-n.jpg"
                      alt="Lỗi"
                      style={{
                        width: "180px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <HeadingH3Com>Course 1</HeadingH3Com>
                  <HeadingH3Com>ClicknLearn</HeadingH3Com>
                  <HeadingH3Com>Grade Achieve: EXCELLENT</HeadingH3Com>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            square
            elevation={5}
            sx={{
              padding: "20px",
              width: "100%",
              mt: "20px",
            }}
          >
            <Grid container xs={12} sm={12} md={12} sx={{ margin: "10px" }}>
              <Grid
                container
                item
                justifyItems="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={12} md={2}>
                  <ButtonBase onClick={handleClick}>
                    <img
                      src="https://i.ibb.co/XphQ2PC/284601068-113074531414219-1330789727702240346-n.jpg"
                      alt="Lỗi"
                      style={{
                        width: "180px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <HeadingH3Com>Course 1</HeadingH3Com>
                  <HeadingH3Com>ClicknLearn</HeadingH3Com>
                  <HeadingH3Com>Grade Achieve: EXCELLENT</HeadingH3Com>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserAccomplishmentPage;
