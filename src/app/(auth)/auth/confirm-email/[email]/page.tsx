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
import { postRequest } from "@/utils/api/apiRequests";

export default function ConfirmEmail({ params }: any) {
  const email = decodeURIComponent(params.email);
  const [countdown, setCountdown] = useState(180);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleResendClick = async () => {
    setIsLoading(true);
    setCountdown(180);
    const response = await postRequest("/auth/resend-verification-email", {
      email,
    });
    if (response?.data?.status === "success") {
      setResendEnabled(false);
      setIsLoading(false);
    }
    console.log({ response });
    setMessage(response[0].message || response.data.message);
    setIsLoading(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <PageContainer title="Confirm-Email Page" description="">
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
          lg={7}
          xl={7}
          sx={{
            alignSelf: "stretch",
            backgroundColor: "whitesmoke",
            "@media (max-width: 1120px)": {
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
            maxWidth={"550px"}
            paddingLeft={4}
          >
            <Logo />
          </Box>
          <Box
            p={4}
            width={"550px"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "@media (max-width: 550px)": {
                width: "100%",
              },
            }}
          >
            <Typography variant="h3" fontWeight={600} mb={2}>
              Confirm Mail
            </Typography>
            <Typography fontWeight={500} mb={2} maxWidth={"58ch"}>
              Mail confirmation link has been sent to{" "}
              <span style={{ fontWeight: "500" }}>({email}). </span>
            </Typography>
            {resendEnabled ? (
              <Typography>Didn&apos;t get email ?</Typography>
            ) : (
              <Box>
                <Typography>
                  If you don&apos;t see an email from us within 3 minutes, one
                  of these could have happened.
                </Typography>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "55ch",
                  }}
                >
                  <li>
                    The email might be in your spam folder. (if you use Gmail,
                    please check your Promotions folder as well.)
                  </li>
                  <li>The email address you entered has a typo.</li>
                  <li>
                    You accidentally entered another email address. (Usually
                    happens with auto-complete.)
                  </li>
                  <li>
                    We can&apos;t deliver the email to the address. (Usually
                    because of corporate firewalls or filtering.)
                  </li>
                </ul>
              </Box>
            )}
            <Button
              onClick={resendEnabled ? handleResendClick : () => {}}
              variant="contained"
              size="large"
              sx={{
                color: "black",
                backgroundColor: "#FFCC03",
                fontWeight: 600,
                width: "250px",
                marginTop: "1rem",
                pointerEvents: resendEnabled ? "auto" : "none",
                "&:hover": {
                  opacity: 0.8,
                  transition: "opacity 200ms ease-in",
                  backgroundColor: "#FFCC03",
                  boxShadow: "none",
                },
              }}
            >
              <Typography
                fontWeight={600}
                sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}
              >
                {resendEnabled ? (
                  <span>
                    {isLoading ? (
                      <CircularProgress
                        size={14}
                        sx={{ color: "#060016" }}
                        thickness={5}
                      />
                    ) : (
                      "Click to resend"
                    )}
                  </span>
                ) : (
                  formatTime(countdown)
                )}
              </Typography>
            </Button>
            {message && <span className="success">{message}</span>}
            <Box marginTop={"1rem"}>
              <Typography
                component={Link}
                href="/auth/signup"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "#0965D3",
                }}
              >
                Back to Sign Up
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </div> */}
    </PageContainer>
  );
}
