"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/components/container/PageContainer";
import Image from "next/image";
import Link from "next/link";

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
            Welcome aboard!. Your account has now been verified successfully.
            You would be automatically redirected shortly. If not redirected,
            click the button below.
          </Typography>
        </Box>
        <Typography
          component={Link}
          href="/dashboard"
          sx={{
            color: "black",
            backgroundColor: "#FFCC03",
            fontWeight: 600,
            paddingBlock: ".7rem",
            paddingInline: "3rem",
            borderRadius: "3px",
            marginTop: "1rem",
          }}
        >
          Continue to Dashboard
        </Typography>
      </div>
    </PageContainer>
  );
}
