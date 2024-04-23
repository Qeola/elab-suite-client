import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { LockOutlined, MailLockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { IconEyeOff } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { LoginValues } from "../authInterfaces";
import { postRequest } from "@/utils/api/apiRequests";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const router = useRouter();
  const initialValues = { email: "", password: "" };
  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    console.log({ values });
    const result = await postRequest("/login", values);
    console.log({ result });
    localStorage.setItem("token", result.data.token);
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="600" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, errors, touched, setFieldTouched }) => (
          <Form>
            <Stack>
              <Box>
                <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                <OutlinedInput
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("email")}
                  error={!!errors.email && touched.email}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailLockOutlined fontSize="small" />
                    </InputAdornment>
                  }
                  fullWidth
                />
                <ErrorMessage name="email" component="span" className="error" />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("password")}
                  error={!!errors.password && touched.password}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <IconEyeOff size="20" />
                        ) : (
                          <IconEye size="20" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </Box>
              <Stack
                justifyContent="space-between"
                direction="row"
                alignItems="center"
                my={2}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<CustomCheckbox defaultChecked />}
                    label="Remember this Device"
                  />
                </FormGroup>
                <Typography
                  component={Link}
                  href="/auth/forgot-password"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                type="submit"
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
                  <span>Sign In</span>{" "}
                  {isLoading && (
                    <CircularProgress
                      size={12}
                      sx={{ color: "black" }}
                      thickness={8}
                    />
                  )}
                </Typography>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {subtitle}
    </>
  );
};

export default AuthLogin;
