"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";

import AuthRegister from "../../authForms/AuthRegister";
import Image from "next/image";

export default function Register() {
  return (
    <PageContainer
      title="Register | Streamline your workflows, boost your efficiency! "
      description=""
    >
      {/* <div style={{display:'flex',flexWrap:'nowrap',alignItems:'center',minHeight:'calc(100vh - 100px)'}} > */}
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
            backgroundColor: "#FFCC03",
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
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
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
                variant={"h4"}
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
            width={"65%"}
            sx={{
              "@media (max-width: 800px)": {
                width: "100%",
              },
            }}
          >
            <AuthRegister
              title="Sign Up with eLab suite"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    fontSize=".9rem"
                  >
                    Already have an Account?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/auth/signin"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "#0965D3",
                    }}
                    fontSize=".9rem"
                  >
                    Sign In
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
