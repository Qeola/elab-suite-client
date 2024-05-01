"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";
import PageContainer from "@/app/components/container/PageContainer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";

export default function SuccessEmail() {
  return (
    <PageContainer title="Success email" description="this is Sample page">
      <Box height={"100px"} alignItems={"center"} padding={"1rem"}>
        <Logo />
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Box>
          <Image
            src="/images/logos/success-email.png"
            width={150}
            height={150}
            alt="success-email"
            priority
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Email verified successfully!
          </Typography>
          <Typography sx={{ maxWidth: "60ch" }} component={"p"}>
            Your account has now been verified successfully. You would be
            automatically redirected shortly. If not redirected, click the
            button below.
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/dashboard"
          variant="contained"
          size="large"
          sx={{
            color: "black",
            backgroundColor: "#FFCC03",
            fontWeight: 600,
            "&:hover": {
              opacity: 0.8,
              transition: "opacity 200ms ease-in",
              backgroundColor: "#FFCC03",
              boxShadow: "none",
            },
          }}
        >
          Continue to Dashboard
        </Button>
      </div>
    </PageContainer>
  );
}
