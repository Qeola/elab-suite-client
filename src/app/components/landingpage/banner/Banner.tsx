import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import BannerContent from "./BannerContent";
import bannerbgImg1 from "/public/images/landingpage/bannerimg1.svg";
import bannerbgImg2 from "/public/images/landingpage/bannerimg2.svg";
import eLabLogo from "/public/images/logos/elab-logo-black.png";
import Image from "next/image";

const Banner = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const SliderBox = styled(Box)(() => ({
    "@keyframes slideup": {
      "0%": {
        transform: "translate3d(0, 0, 0)",
      },
      "100% ": {
        transform: "translate3d(0px, -100%, 0px)",
      },
    },

    animation: "slideup 10s linear infinite",
  }));

  const SliderBox2 = styled(Box)(() => ({
    "@keyframes slideDown": {
      "0%": {
        transform: "translate3d(0, -100%, 0)",
      },
      "100% ": {
        transform: "translate3d(0px, 0, 0px)",
      },
    },

    animation: "slideDown 10s linear infinite",
  }));

  return (
    <Box mb={10} sx={{ overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6} sm={8}>
            <BannerContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
