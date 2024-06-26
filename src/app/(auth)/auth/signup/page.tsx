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
      title="Sign-Up Page | Streamline your workflows, boost your efficiency! "
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
          lg={7}
          xl={7}
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
          lg={5}
          xl={5}
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
            <AuthRegister
              title="Create an account"
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    fontSize=".9rem"
                  >
                    Already have an account?
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
