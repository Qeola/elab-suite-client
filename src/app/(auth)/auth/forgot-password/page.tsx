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
    <PageContainer
      title="Forgot Password Page"
      description="this is Sample page"
    >
      <Box height={"100px"} alignItems={"center"} padding={"1rem"}>
        <Logo />
      </Box>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          sx={{ overflowX: "hidden" }}
        >
          <Grid
            item
            xs={0}
            sm={6}
            lg={4}
            xl={4}
            sx={{
              borderRight: "0.5px solid #060016",
              alignSelf: "stretch",
              "@media (max-width: 600px)": {
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
              }}
            >
              <Box px={3}>
                <Image
                  src="/images/logos/forgot-password.png"
                  width={120}
                  height={120}
                  alt="forgot-password-icon"
                  priority
                />
              </Box>
              <Box></Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={5}
            xl={4}
            display="flex"
            alignItems="center"
          >
            <Box p={4} width={"100%"}>
              <AuthForgotPassword />
            </Box>
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
}
