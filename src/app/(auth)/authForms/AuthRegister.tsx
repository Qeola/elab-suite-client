import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(Dashboard)/types/auth/auth";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import {
  Business,
  BusinessOutlined,
  Lock,
  LockOutlined,
  Mail,
  MailLockOutlined,
  MailOutline,
  PasswordOutlined,
} from "@mui/icons-material";
import { IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import PasswordStrengthBar from "./PasswordStrengthBar";
import { SignupValues } from "../authInterfaces";
import { postRequest } from "@/utils/api/apiRequests";
import CustomSnackbar from "@/app/components/Snackbar";
import { useAuthentication } from "../useAuthentication";
import AuthButton from "@/app/components/auth/AuthButton";

const AuthRegister = ({ title, subtitle }: registerType) => {
  const { isLoading, response, showSnackbar, handleAuthentication } =
    useAuthentication();
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  // const [ isLoading, setIsLoading] = useState(false);
  // const [ response,setResponse ] = useState();
  // const [showSnackbar,setShowSnackbar] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one lowercase letter",
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least one uppercase letter",
      )
      .matches(RegExp("(.*\\d.*)"), "Password must contain a number")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain a special character",
      )
      .min(8, "Password must be at least 8 characters"),
  });

  const initialValues = { name: "", email: "", password: "" };

  const onSubmit = async (values: SignupValues, { setErrors }: any) => {
    const response = await handleAuthentication(
      "/auth/register",
      values,
      `/auth/confirm-email/${values.email}`,
    );
    setErrors({ email: response[0].message });
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="600" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}
      <Typography>Empower your business with a centralized platform</Typography>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched, setFieldTouched }) => (
            <Form>
              <Stack mb={1}>
                <CustomFormLabel htmlFor="name">Full Name</CustomFormLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("name")}
                  error={!!errors.name && touched.name}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconUser fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="name" component="span" className="error" />
                <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("email")}
                  error={!!errors.email && touched.email}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailLockOutlined fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="email" component="span" className="error" />
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={(event: any) => {
                    handleChange(event);
                    setPassword(event.target.value);
                  }}
                  onBlur={() => setFieldTouched("password")}
                  onFocus={() => setIsPasswordFocus(true)}
                  error={!!errors.password && touched.password}
                  fullWidth
                  type={showPassword ? "text" : "password"}
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
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </Stack>
              {isPasswordFocus && <PasswordStrengthBar password={password} />}
              <AuthButton isLoading={isLoading}>Sign Up</AuthButton>
            </Form>
          )}
        </Formik>
      </Box>
      {subtitle}
      {showSnackbar && <CustomSnackbar response={response} />}
    </>
  );
};

export default AuthRegister;
