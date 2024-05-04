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
import { loginType } from "@/app/(Dashboard)/types/auth/auth";
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
import { loginSuccess } from "@/store/authentication/AuthenticationSlice";
import { useDispatch } from "react-redux";
import { useAuthentication } from "../useAuthentication";
import CustomSnackbar from "@/app/components/Snackbar";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { isLoading, response, showSnackbar, handleAuthentication } =
    useAuthentication();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const router = useRouter();
  const initialValues = { email: "", password: "" };
  const onSubmit = async (values: LoginValues, { setErrors }: any) => {
    // setIsLoading(true);
    // console.log({ values });
    // const result = await postRequest("/login", values);
    // console.log({ result });

    // );
    // router.push("/dashboard");
    // setIsLoading(false);
    const response = await handleAuthentication("/login", values, `/dashboard`);
    setErrors({ email: response[0].message });
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
                <CustomTextField
                  type="email"
                  id="email"
                  name="email"
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
              <Box>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("password")}
                  error={!!errors.password && touched.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
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
                    ),
                  }}
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
                <Typography
                  component={Link}
                  href="/auth/forgot-password"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "#0965D3",
                  }}
                >
                  Forgot Password?
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
                  pointerEvents: isLoading ? "none" : "auto",
                  marginTop: "1.2rem",
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
                  {!isLoading ? (
                    <span>Sign In</span>
                  ) : (
                    <CircularProgress
                      size={18}
                      sx={{ color: "#060016", marginBlock: ".1rem" }}
                      thickness={5}
                    />
                  )}
                </Typography>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {subtitle}
      {showSnackbar && <CustomSnackbar response={response} />}
    </>
  );
};

export default AuthLogin;
