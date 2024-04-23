import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import {
  Box,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { MailLockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { postRequest } from "@/utils/api/apiRequests";

export default function AuthForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = async () => {
    setIsLoading(true);
    const result = await postRequest("/forgot-password", email);
    console.log({ result });
    setIsLoading(false);
  };

  console.log({ email });
  return (
    <>
      <Box>
        <Typography variant="h3">Forgot your Password ?</Typography>
        <p>
          No worries.Please enter the email address associated with your account
          and we will email you a link to reset your password.
        </p>
      </Box>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">Email Address</CustomFormLabel>
        <OutlinedInput
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <MailLockOutlined fontSize="small" />
            </InputAdornment>
          }
          id="mail"
          fullWidth
        />

        <Button
          onClick={handleForgotPassword}
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
          fullWidth
        >
          <Typography
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}
          >
            {" "}
            <span>Forgot Password</span>{" "}
            {isLoading && (
              <CircularProgress
                size={12}
                sx={{ color: "black" }}
                thickness={8}
              />
            )}
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            color: "black",
            backgroundColor: "#fff",
            fontWeight: 500,
            "&:hover": {
              opacity: 0.8,
              transition: "opacity 200ms ease-in",
              backgroundColor: "#fff",
              boxShadow: "none",
              textDecoration: "underline",
            },
          }}
          fullWidth
          component={Link}
          href="/auth/login"
        >
          Back to Login
        </Button>
      </Stack>
    </>
  );
}
