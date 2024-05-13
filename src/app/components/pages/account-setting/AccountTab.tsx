import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { ChangeEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
// components
import BlankCard from "../../shared/BlankCard";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../forms/theme-elements/CustomSelect";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";
// import PhotoIcon from '@material-ui/icons/Photo';

// images
import { Stack } from "@mui/system";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { LockOutlined, PhotoCamera } from "@mui/icons-material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { ChangePasswordValues } from "@/app/(auth)/authInterfaces";
import {
  patchRequest,
  patchRequestAvatar,
  postRequest,
} from "@/utils/api/apiRequests";
import ChildCard from "../../shared/ChildCard";
import CustomSnackbar from "../../Snackbar";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import {
  updateUserAvatar,
  updateUserData,
} from "@/store/authentication/AuthenticationSlice";

const AccountTab = () => {
  const dispatch = useDispatch();
  const authenticationState = useSelector(
    (state: AppState) => state.authentication,
  );
  const [userData, setUserData] = useState(authenticationState.userData.user);
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(userData.avatar);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        } else {
          console.error("Error reading file");
        }
      };
    }
  };

  console.log({ file });

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload an image");
      return;
    }

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 800 * 1024;
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and GIF files are allowed.");
    } else if (file.size > maxSize) {
      setError("File size exceeds the limit of 800KB.");
    } else {
      setError(null);
      setIsAvatarLoading(true);
      const formData = new FormData();
      formData.append("image", file, file?.name);
      const response = await patchRequestAvatar(
        "/users/update-avatar",
        formData,
      );
      if (response.data.status === "success") {
        setIsAvatarLoading(false);
        dispatch(updateUserAvatar(response.data.data.avatar));
        setShowSnackbar(true);
        setResponse({
          msg: "Avatar uploaded successfully!",
          status: "success",
        });
        setTimeout(() => setShowSnackbar(false), 6000);
      }
      setIsAvatarLoading(false);
      console.log({ response });
    }
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

  const initialValues1 = {
    name: userData.name,
    email: userData.email,
    dob: userData.dob,
    phone: userData.phone,
    address: userData.address,
  };

  const validationSchema1 = Yup.object().shape({
    name: Yup.string().required("Full Name should not be omitted"),
  });

  const onSubmit1 = async (values: any, { setErrors }: any) => {
    console.log(values);
    setIsInfoLoading(true);
    const response = await patchRequest(`/users/${userData.username}`, values);
    console.log({ response });
    if (response.status == 200) {
      setShowSnackbar(true);
      setResponse({ msg: "Profile updated successfully!", status: "success" });
      setIsInfoLoading(false);
      const userData = { user: { ...response.data.data } };
      dispatch(updateUserData({ userData }));
      setTimeout(() => setShowSnackbar(false), 6000);
    }
    setIsInfoLoading(false);
    // setErrors({ [response[0].field || "password"]: response[0].message });
  };

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

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6} sx={{ paddingLeft: "0 !important" }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Profile
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change your profile picture from here
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Box sx={{ width: "100%", position: "relative" }}>
                  <Avatar
                    src={image ? image : undefined}
                    alt={"user1"}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      position: "relative",
                    }}
                  />
                  <IconButton
                    disableFocusRipple
                    disableRipple
                    component="label"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      zIndex: 1,
                    }}
                  >
                    <PhotoCamera />
                    <input
                      hidden
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleFileChange}
                      type="file"
                    />
                  </IconButton>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  my={3}
                >
                  <Button
                    color="primary"
                    sx={{ fontWeight: 600 }}
                    onClick={handleUpload}
                  >
                    {isAvatarLoading ? (
                      <CircularProgress size={18} sx={{ color: "black" }} />
                    ) : (
                      "Upload Photo"
                    )}
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG, GIF or PNG. Max size of 800K
                  <Typography className="error">{error}</Typography>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
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
                      <Button
                        type="submit"
                        // variant="contained"
                        sx={{ marginTop: "1rem", fontWeight: 600 }}
                        color="primary"
                      >
                        {isLoading ? (
                          <CircularProgress size={18} sx={{ color: "#000" }} />
                        ) : (
                          "Change Password"
                        )}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12} sx={{ paddingLeft: "0 !important" }}>
        <Formik
          initialValues={initialValues1}
          validationSchema={validationSchema1}
          onSubmit={onSubmit1}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => (
            <Form>
              <BlankCard>
                <CardContent>
                  <Typography variant="h5" mb={1}>
                    Personal Details
                  </Typography>
                  <Typography color="textSecondary" mb={3}>
                    To change your personal detail , edit and save from here
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-name"
                      >
                        Full Name
                      </CustomFormLabel>
                      <CustomTextField
                        id="text-name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("name")}
                        error={!!errors.name && touched.name}
                        // value={userData.name}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 2 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="email"
                      >
                        Email Address
                      </CustomFormLabel>
                      <CustomTextField
                        disabled
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("email")}
                        error={!!errors.email && touched.email}
                        // value={userData.email}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 5 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="date-of-birth"
                      >
                        Date of birth
                      </CustomFormLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Field name="dob">
                          {({ field }: any) => (
                            <DatePicker
                              {...field}
                              value={values.dob}
                              onChange={(newValue: Date | null) => {
                                if (newValue && newValue < new Date()) {
                                  const formattedDate = format(
                                    newValue,
                                    "yyyy-MM-dd",
                                  );
                                  setFieldValue("dob", formattedDate);
                                }
                              }}
                              maxDate={new Date()}
                              renderInput={(inputProps) => (
                                <CustomTextField
                                  fullWidth
                                  variant="outlined"
                                  inputProps={{ "aria-label": "date picker" }}
                                  {...inputProps}
                                />
                              )}
                            />
                          )}
                        </Field>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 6 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-phone"
                      >
                        Phone Number
                      </CustomFormLabel>
                      <CustomTextField
                        id="text-phone"
                        // value="+91 12345 65478"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("phone")}
                        error={!!errors.phone && touched.phone}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* 7 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-address"
                      >
                        Address
                      </CustomFormLabel>
                      <CustomTextField
                        id="text-address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("address")}
                        error={!!errors.address && touched.address}
                        // value="814 Howard Street, 120065, India"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </BlankCard>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "start" }}
                mt={3}
              >
                <Button
                  type="submit"
                  size="large"
                  sx={{ fontWeight: 600 }}
                  // variant="contained"
                  color="primary"
                >
                  {isInfoLoading ? (
                    <CircularProgress size={18} sx={{ color: "black" }} />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button size="large" color="error">
                  Discard
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Grid>
      {showSnackbar && <CustomSnackbar response={response} />}
    </Grid>
  );
};

export default AccountTab;
