"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";
import Image from "next/image";
import AuthInviteLogin from "../../authForms/AuthInviteLogin";

export default function InviteLogin() {
  const name = "Felix";
  return (
    <PageContainer title="SignIn Page | Sign into your account" description="">
      {/* <Box height={"100px"} alignItems={"center"} padding={"1rem"}>
        <Logo />
      </Box> */}
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
          xs={0}
          sm={6}
          lg={6}
          xl={6}
          sx={{
            alignSelf: "stretch",
            backgroundColor: "whitesmoke",
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
              gap: "1rem",
            }}
          >
            <Box px={3}>
              <Image
                src="/images/logos/elab-logo-black.png"
                width={150}
                height={150}
                alt="ennovatelab-logo"
                priority
              />
            </Box>
            <Box>
              <Typography
                variant={"h5"}
                fontWeight={500}
                style={{ textAlign: "center", maxWidth: "27ch" }}
              >
                Welcome to eLab suite!
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={6}
          xl={6}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
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
              "@media (max-width: 470px)": {
                width: "100%",
              },
            }}
          >
            <AuthInviteLogin
              title={`Complete your account, ${name}!`}
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
            />
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
    </PageContainer>
  );
}
