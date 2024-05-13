import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { useRouter } from "next/navigation";
import { ForgotPasswordValue } from "../authInterfaces";
import { useAuthentication } from "../useAuthentication";

export default function AuthForgotPassword() {
  const router = useRouter();
  const { isLoading, response, showSnackbar, handleAuthentication } =
    useAuthentication();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required"),
  });

  const onSubmit = async (values: ForgotPasswordValue, { setErrors }: any) => {
    const response = await handleAuthentication(
      "/auth/forgot-password",
      values,
      `/auth/recover-password/${values.email}`,
    );
    setErrors({ email: response[0].message });
  };
  return (
    <>
      <Box>
        <Typography variant="h3" fontWeight={600} mb={1}>
          Forgot your password ?
        </Typography>
        <Typography>
          Enter your email address below, and we&apos;ll send you a link to
          reset it.
        </Typography>
      </Box>
      <Stack mt={1} spacing={2}>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched, setFieldTouched }) => (
            <Form>
              <Box>
                <CustomFormLabel htmlFor="reset-email">
                  Email Address
                </CustomFormLabel>
                <CustomTextField
                  id="reset-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("email")}
                  error={!!errors.email && touched.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailLockOutlined fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <ErrorMessage name="email" component="span" className="error" />
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  color: "black",
                  pointerEvents: isLoading ? "none" : "auto",
                  backgroundColor: "#FFCC03",
                  fontWeight: 600,
                  marginTop: "1rem",
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
                  {!isLoading ? (
                    <span>Next</span>
                  ) : (
                    <CircularProgress
                      size={18}
                      sx={{ color: "#060016", marginBlock: ".1rem" }}
                      thickness={5}
                    />
                  )}
                </Typography>
              </Button>
            </Form>
          )}
        </Formik>
        <Stack direction="row" spacing={1} mt={3}>
          <Typography
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            fontSize=".9rem"
          >
            Remember your password?
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
      </Stack>
    </>
  );
}
