"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import AuthLogin from "../../../authForms/AuthLogin";
import Image from "next/image";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";

export default function VerifyEmail({ params }: any) {
  const email = decodeURIComponent(params.email);
  const [countdown, setCountdown] = useState(300);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendClick = () => {
    setResendEnabled(false);
    setCountdown(300);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <PageContainer title="Recover Password Page" description="">
      {/* <Box height={"100px"} alignItems={"center"} padding={"1rem"}>
        <Logo />
      </Box> */}
      {/* <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          minHeight: "calc(100vh - 100px",
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
                src="/images/email.png"
                width={100}
                height={100}
                alt="email-logo"
                priority
              />
            </Box>
            <Typography
              variant={"h5"}
              fontWeight={500}
              style={{ textAlign: "center", maxWidth: "27ch" }}
            >
              We have sent you an email!
            </Typography>
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
          // border='1px solid red'
          justifyContent="center"
          height={"80%"}
        >
          <Box alignItems={"center"} padding={"1rem"}>
            <Logo />
          </Box>
          <Box
            p={4}
            height={"100%"}
            width={"85%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "@media (max-width: 800px)": {
                width: "100%",
              },
            }}
          >
            <Typography variant="h3" fontWeight={600} mb={2}>
              Recovery email sent
            </Typography>
            <Typography variant="body1" mb={2} maxWidth={"58ch"}>
              An email with instructions on how to reset your password has been
              sent to <span style={{ fontWeight: "500" }}>{email}. </span> Mail
              may take up to 5 minutes to arrive. Don&apos;t forget to also
              check your spam folder!
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#FFCC03",
                fontWeight: 500,
                fontSize: "1rem",
                width: "100px",
                padding: ".3rem",
                marginBlock: ".8rem",
              }}
            >
              {formatTime(countdown)}
            </Box>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Typography>Didn&apos;t get email ?</Typography>
              <Typography
                component="div"
                onClick={handleResendClick}
                style={{
                  cursor: resendEnabled ? "pointer" : "not-allowed",
                  color: "#0965D3",
                  pointerEvents: resendEnabled ? "auto" : "none",
                }}
              >
                Resend email
              </Typography>
            </Stack>
            <Box
              sx={{ color: "black", textDecoration: "underline" }}
              marginTop={"1rem"}
            >
              <Link href="/auth/signin" style={{ color: "#060016" }}>
                Back to sign in
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
    </PageContainer>
  );
}
