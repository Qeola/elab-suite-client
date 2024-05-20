import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// components
import BlankCard from "../../shared/BlankCard";
import { Stack } from "@mui/system";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDotsVertical,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { CircularProgress, InputAdornment } from "@mui/material";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import { postRequest } from "@/utils/api/apiRequests";
import { ChangePasswordValues } from "@/app/(auth)/authInterfaces";
import CustomSnackbar from "../../Snackbar";

const SecurityTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState<string | null>(null);

  // password1
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // password2
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // password3
  const [showPassword3, setShowPassword3] = useState(false);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);

  const handleMouseDownPassword3 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // formik
  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(" Current Password is required"),
    password: Yup.string()
      .required("New Password is required")
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
    confirmPassword: Yup.string().required(" Confirm Password is required"),
  });

  const onSubmit = async (values: ChangePasswordValues, { setErrors }: any) => {
    setIsLoading(true);
    const response = await postRequest("/auth/change-password", values);
    if (response.status == 200) {
      setShowSnackbar(true);
      setResponse({ msg: "Password changed successfully!", status: "success" });
      setTimeout(() => setShowSnackbar(false), 6000);
    }
    setIsLoading(false);
    setErrors({ [response[0].field || "password"]: response[0].message });
  };
  return (
    <>
      {" "}
      <Box sx={{ maxWidth: "420px", width: "100%" }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your password please confirm here
            </Typography>
            <Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  setFieldTouched,
                }) => (
                  <Form>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-cpwd"
                    >
                      Current Password
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-cpwd"
                      name="currentPassword"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={() => setFieldTouched("currentPassword")}
                      error={
                        !!errors.currentPassword && touched.currentPassword
                      }
                      type={showPassword1 ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword1}
                              edge="end"
                            >
                              {showPassword1 ? (
                                <IconEyeOff size="20" />
                              ) : (
                                <IconEye size="20" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component="span"
                      className="error"
                    />
                    {/* 2 */}
                    <CustomFormLabel htmlFor="text-npwd">
                      New Password
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-npwd"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={() => setFieldTouched("password")}
                      error={!!errors.password && touched.password}
                      type={showPassword2 ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <IconEyeOff size="20" />
                              ) : (
                                <IconEye size="20" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                    {/* 3 */}
                    <CustomFormLabel htmlFor="text-conpwd">
                      Confirm Password
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-conpwd"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => setFieldTouched("confirmPassword")}
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                      type={showPassword3 ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword3}
                              onMouseDown={handleMouseDownPassword3}
                              edge="end"
                            >
                              {showPassword3 ? (
                                <IconEyeOff size="20" />
                              ) : (
                                <IconEye size="20" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="error"
                    />
                    <Box>
                      <Stack
                        direction={"row"}
                        sx={{ justifyContent: "end" }}
                        mt={3}
                      >
                        <Button
                          type="submit"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          <Typography sx={{ fontWeight: 600 }}>
                            Change Password
                          </Typography>
                          {isLoading && (
                            <CircularProgress
                              size={15}
                              thickness={5}
                              sx={{ color: "white" }}
                            />
                          )}
                        </Button>
                      </Stack>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </BlankCard>
      </Box>
      {showSnackbar && <CustomSnackbar response={response} />}
    </>
  );
};

export default SecurityTab;
