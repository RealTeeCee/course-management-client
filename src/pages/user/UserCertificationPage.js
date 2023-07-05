import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllCourseState } from "../../store/course/courseSelector";
import { StyledBadgeMuiCom } from "../../components/mui";
import { selectUser } from "../../store/auth/authSelector";
import { HeadingH1Com } from "../../components/heading";

const UserCertificationPage = () => {
  const { data, accomplishments } = useSelector(selectAllCourseState);
  const user = useSelector(selectUser);

  const [course, setCourse] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickUserProfile = (userName) => {
    return navigate(`/profile/${userName}`);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <HeadingH1Com>Course 1</HeadingH1Com>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Card
            elevation={12}
            sx={{
              background: "linear-gradient(to right, #8e2de2, #4a00e0);",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              alignItems="center"
              paddingY={3}
            >
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant="p"
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledBadgeMuiCom
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Button
                      sx={{
                        borderRadius: "50%",
                        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                        "&:hover": {
                          background:
                            "linear-gradient(0deg, rgba(101,121,220,1) 20%, rgba(100,235,191,1) 60%, rgba(231,138,254,1) 90%)",
                          opacity: 1.1,
                        },
                      }}
                      onClick={() => handleClickUserProfile(user.name)}
                    >
                      <Avatar
                        alt=""
                        src="https://i.ibb.co/PZ1mLcR/1ccad4bd825948071148.jpg"
                        sx={{ width: 120, height: 120 }}
                      />
                    </Button>
                  </StyledBadgeMuiCom>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Completed by Nguyen Ngoc Nguyen
                  </Typography>
                  <Typography
                    variant="h8"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    08 - 08 - 2023
                  </Typography>
                  <Typography
                    variant="h8"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    10 hours (approximately)
                  </Typography>
                  <Typography
                    variant="h8"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Grade Achieved: GOOD
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Nguyễn Ngọc Nguyên's account is verified. Coursera certifies
                    their successful completion of Managing an Agile Team
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Card
            elevation={12}
            sx={{
              background: "linear-gradient(to right, #8e2de2, #4a00e0);",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              marginTop: "8px",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              alignItems="center"
              paddingY={3}
            >
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant="p"
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledBadgeMuiCom
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Button
                      sx={{
                        borderRadius: "50%",
                        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                        "&:hover": {
                          background:
                            "linear-gradient(0deg, rgba(101,121,220,1) 20%, rgba(100,235,191,1) 60%, rgba(231,138,254,1) 90%)",
                          opacity: 1.1,
                        },
                      }}
                      onClick={() => handleClickUserProfile(user.name)}
                    >
                      <Avatar
                        alt=""
                        src="https://i.ibb.co/PZ1mLcR/1ccad4bd825948071148.jpg"
                        sx={{ width: 120, height: 120 }}
                      />
                    </Button>
                  </StyledBadgeMuiCom>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Completed by Nguyen Ngoc Nguyen
                  </Typography>

                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Nguyễn Ngọc Nguyên's account is verified. Coursera certifies
                    their successful completion of Managing an Agile Team
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Nguyễn Ngọc Nguyên's account is verified. Coursera certifies
                    their successful completion of Managing an Agile Team
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: "whitesmoke",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Nguyễn Ngọc Nguyên's account is verified. Coursera certifies
                    their successful completion of Managing an Agile Team
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default UserCertificationPage;
