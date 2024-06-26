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

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a photo");
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
    }
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
    setIsInfoLoading(true);
    const response = await patchRequest(`/users/${userData.username}`, values);
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

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={4} sx={{ paddingLeft: "0 !important" }}>
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
                    alt={"user-avatar"}
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
                    variant="contained"
                    sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
                    onClick={handleUpload}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      Upload Photo
                    </Typography>
                    {isAvatarLoading && (
                      <CircularProgress
                        size={15}
                        thickness={5}
                        sx={{ color: "white" }}
                      />
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
      {/* Edit Details */}
      <Grid item xs={12} lg={8}>
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
                    To change your personal detail,edit and save from here
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
                        htmlFor="address"
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
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    spacing={2}
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
                        Save Changes
                      </Typography>
                      {isInfoLoading && (
                        <CircularProgress
                          size={15}
                          thickness={5}
                          sx={{ color: "white" }}
                        />
                      )}
                    </Button>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Form>
          )}
        </Formik>
      </Grid>
      {showSnackbar && <CustomSnackbar response={response} />}
    </Grid>
  );
};

export default AccountTab;
