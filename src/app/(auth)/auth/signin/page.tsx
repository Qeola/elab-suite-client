"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";
import AuthLogin from "../../authForms/AuthLogin";
import Image from "next/image";

export default function Login() {
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
                Streamline your workflows, boost your efficiency!
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
          <Box alignItems={"center"} padding={"1rem"}>
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
            <AuthLogin
              title="Sign in to your account"
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    fontSize=".9rem"
                  >
                    Don&apos;t have an account?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/auth/signup"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "#0965D3",
                    }}
                    fontSize=".9rem"
                  >
                    Sign Up
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
    </PageContainer>
  );
}
