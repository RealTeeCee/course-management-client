import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import GapYCom from "../components/common/GapYCom";
import { useLocation, useNavigate } from "react-router";

export default function Error() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isVerify = searchParams.get("verify") === "fail";
  const message =
    isVerify && "The verified infomation is expired. Please sign up again.";
  const statusCode = isVerify && 419;

  const primary = "#7366ff";
  const navigate = useNavigate();

  const handleClick = () => {
    isVerify ? navigate("/register") : navigate("/");
  };

  return isVerify ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" color={primary}>
        {statusCode}
      </Typography>
      <Typography variant="h6">{message}</Typography>
      <GapYCom></GapYCom>
      <Button
        variant="contained"
        sx={{ backgroundColor: primary }}
        onClick={handleClick}
      >
        Register
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1" color={primary}>
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <GapYCom></GapYCom>
            <Button
              variant="contained"
              sx={{ backgroundColor: primary }}
              onClick={handleClick}
            >
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
