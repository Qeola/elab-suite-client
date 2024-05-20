"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";
import PageContainer from "@/app/components/container/PageContainer";
import AuthForgotPassword from "../../authForms/AuthForgotPassword";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <PageContainer title="Forgot Password Page" description="">
      {/* <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          minHeight: "calc(100vh - 100px)",
        }}
      > */}
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ overflowX: "hidden", height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={7}
          xl={7}
          sx={{
            backgroundColor: "whitesmoke",
            alignSelf: "stretch",
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <Box
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Box px={3}>
              <Image
                src="/images/forgot-password.png"
                width={100}
                height={100}
                alt="forgot-password-icon"
                priority
              />
            </Box>
            <Box>
              <Typography
                variant={"h5"}
                fontWeight={500}
                style={{ textAlign: "center", maxWidth: "27ch" }}
              >
                Password Recovery
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={5}
          xl={5}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Box
            alignItems={"center"}
            width={"100%"}
            maxWidth={"470px"}
            paddingLeft={4}
          >
            <Logo />
          </Box>
          <Box
            p={4}
            width={"470px"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "@media (max-width: 470px)": {
                width: "100%",
              },
            }}
          >
            <AuthForgotPassword />
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
    </PageContainer>
  );
}
