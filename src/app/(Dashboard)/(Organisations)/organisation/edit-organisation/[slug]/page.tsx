"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  getRequest,
  patchRequest,
  patchRequestAvatar,
  postRequest,
} from "@/utils/api/apiRequests";
import { PhotoCamera } from "@mui/icons-material";
import countries from "../countryStates";
import { Sectors } from "../sectors";
import CustomSnackbar from "@/app/components/Snackbar";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

const BCrumb = [
  {
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    title: "Edit Organisation",
  },
];
const EditOrganisation = ({ params }: any) => {
  const organisationSlug = params.slug;

  const [orgDetails, setOrgDetails] = useState<any | null>(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>();
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const names = Object.values(countries).map((country) => country.name);
    setCountryNames(names);
  }, []);

  useEffect(() => {
    async function getOrganisation() {
      try {
        const response = await getRequest(`/organisations/${organisationSlug}`);
        console.log({ response });
        setOrgDetails(response.data.data || []);
      } catch (err) {
        console.log(err);
      }
    }

    getOrganisation();
  }, [organisationSlug]);

  const getStates = (selectedCountry: string | null): string[] => {
    const foundCountry = countries.find(
      (country) => selectedCountry === country.name,
    );

    if (!foundCountry) {
      return [];
    }

    const stateNames = foundCountry.states?.map((state) => state.name) || [];
    return stateNames;
  };

  // useEffect(()=>{},[])
  const filteredStates = getStates(selectedCountry);
  console.log({ orgDetails });

  const initialValues = {
    name: orgDetails?.name,
    email: orgDetails?.email,
    country: orgDetails?.country,
    state: orgDetails?.state,
    regNo: orgDetails?.regNo,
    zipcode: orgDetails?.zipcode,
    sector: orgDetails?.sector,
    address: orgDetails?.address,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of organisation is required"),
    email: Yup.string().required("Email address is required"),
    country: Yup.string().required("Please select a country"),
    state: Yup.string().required("Please select a state"),
    sector: Yup.array()
      .of(Yup.string().required("Sector is required"))
      .min(1, "Please select at least one sector"),
    address: Yup.string().required("Please enter a valid address"),
  });

  const onSubmit = async (values: any, { setErrors }: any) => {
    console.log({ values });

    setIsLoading(true);
    const response = await patchRequest(
      `/organisations/${organisationSlug}`,
      values,
    );
    console.log({ response });
    if (response.status == 200) {
      setShowSnackbar(true);
      setResponse({
        msg: "Organisation edited successfully!",
        status: "success",
      });
      setTimeout(() => setShowSnackbar(false), 6000);
    }
    setIsLoading(false);
    setErrors({ [response[0].field || "name"]: response[0].message });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError("Please upload a logo");
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
        `/organisations/${organisationSlug}/update-logo`,
        formData,
      );
      if (response.data.status === "success") {
        setIsAvatarLoading(false);
        //   dispatch(updateUserAvatar(response.data.data.avatar));
        setShowSnackbar(true);
        setResponse({
          msg: "Logo uploaded successfully!",
          status: "success",
        });
        setTimeout(() => setShowSnackbar(false), 6000);
      }
      setIsAvatarLoading(false);
      console.log({ response });
    }
  };

  return (
    <PageContainer title="Edit organisation">
      <Breadcrumb title="Edit Organisation" items={BCrumb} />
      <Grid item xs={12} lg={4} sx={{ paddingLeft: "0 !important" }}>
        <Typography variant="h5" mb={1}>
          Upload Logo
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box>
            <Box sx={{ position: "relative" }}>
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
          </Box>
          <Stack paddingTop={1} direction={"column"} gap={1}>
            <Typography color="textSecondary">
              Upload a clear logo of your organisation
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Allowed JPG, GIF or PNG. Max size of 800K
              <Typography className="error">{error}</Typography>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                onClick={handleUpload}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
                variant="contained"
                color="primary"
              >
                <Typography sx={{ fontWeight: 600 }}>Upload Logo</Typography>
                {isAvatarLoading && (
                  <CircularProgress
                    size={15}
                    thickness={5}
                    sx={{ color: "white" }}
                  />
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Grid>
      <Divider sx={{ my: 4 }} />
      {/* <Box sx={{mb:2}}>
              </Box> */}
      {orgDetails !== null && orgDetails && (
        <BlankCard sx={{ marginTop: "4px" }}>
          <CardContent>
            <Box>
              <Typography>Edit your organisation details below.</Typography>
              <Grid item sx={{ width: "100%", maxWidth: "800px" }}>
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
                    setFieldValue,
                  }) => (
                    <Form>
                      <Grid container mt={2} spacing={3}>
                        <Grid item xs={12} sm={6} lg={6}>
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="text-name"
                          >
                            Name of Organisation
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
                          <ErrorMessage
                            name="name"
                            component="span"
                            className="error"
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
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched("email")}
                            error={!!errors.email && touched.email}
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage
                            name="email"
                            component="span"
                            className="error"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* 5 */}
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="country"
                          >
                            Select Country
                          </CustomFormLabel>
                          <Field name="country">
                            {({ field }: any) => (
                              <Autocomplete
                                {...field}
                                disablePortal
                                id="country"
                                options={countryNames}
                                fullWidth
                                getOptionLabel={(option) => option}
                                value={values.country}
                                onChange={(
                                  event: React.SyntheticEvent<Element, Event>,
                                  newCountry: string | null,
                                ) => {
                                  setFieldValue("country", newCountry);
                                  setSelectedCountry(newCountry);
                                }}
                                renderInput={(params) => (
                                  <CustomTextField {...params} />
                                )}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="country"
                            component="span"
                            className="error"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* 6 */}
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="state"
                          >
                            Select State
                          </CustomFormLabel>
                          <Field name="state">
                            {({ field }: any) => (
                              <Autocomplete
                                {...field}
                                disablePortal
                                id="state"
                                options={filteredStates}
                                fullWidth
                                getOptionLabel={(option) => option}
                                value={values.state}
                                onChange={(
                                  event: React.SyntheticEvent<Element, Event>,
                                  newState: string | null,
                                ) => {
                                  setFieldValue("state", newState);
                                  setSelectedState(newState);
                                }}
                                renderInput={(params) => (
                                  <CustomTextField {...params} />
                                )}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="state"
                            component="span"
                            className="error"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* 5 */}
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="reg.No"
                          >
                            Registration Number(optional)
                          </CustomFormLabel>
                          <CustomTextField
                            id="reg.No"
                            name="regNo"
                            value={values.regNo}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched("regNo")}
                            error={!!errors.regNo && touched.regNo}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* 6 */}
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="zipcode"
                          >
                            Zip Code(optional)
                          </CustomFormLabel>
                          <CustomTextField
                            id="zipcode"
                            name="zipcode"
                            value={values.zipcode}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched("zipcode")}
                            error={!!errors.zipcode && touched.zipcode}
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
                            htmlFor="sector"
                          >
                            Select Sector
                          </CustomFormLabel>
                          <Field name="sector">
                            {({ field }: any) => (
                              <Autocomplete
                                {...field}
                                multiple
                                fullWidth
                                id="sector"
                                options={Sectors}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                value={values.sector}
                                onChange={(
                                  event: React.SyntheticEvent<Element, Event>,
                                  newSectors: string[],
                                ) => setFieldValue("sector", newSectors)}
                                renderInput={(params) => (
                                  <CustomTextField {...params} />
                                )}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="sector"
                            component="span"
                            className="error"
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
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched("address")}
                            error={!!errors.address && touched.address}
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage
                            name="address"
                            component="span"
                            className="error"
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
                          {isLoading && (
                            <CircularProgress
                              size={15}
                              thickness={5}
                              sx={{ color: "white" }}
                            />
                          )}
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Grid>
              {showSnackbar && <CustomSnackbar response={response} />}
            </Box>
          </CardContent>
        </BlankCard>
      )}
    </PageContainer>
  );
};

export default EditOrganisation;
