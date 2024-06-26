"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageContainer from "@/app/components/container/PageContainer";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../layout/shared/breadcrumb/Breadcrumb";
import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CountrySelectAutocomplete from "@/app/components/forms/form-elements/autoComplete/CountrySelectAutocomplete";
import countries from "./countryStates";
import { postRequest } from "@/utils/api/apiRequests";
import CustomSnackbar from "@/app/components/Snackbar";
import { Sectors } from "./sectors";
import BlankCard from "@/app/components/shared/BlankCard";

const BCrumb = [
  {
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    title: "Add Organisation",
  },
];

const AddOrganisation = () => {
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const names = Object.values(countries).map((country) => country.name);
    setCountryNames(names);
  }, []);

  const initialValues = {
    name: "",
    email: "",
    country: "",
    regNo: "",
    zipcode: "",
    website: "",
    sector: [],
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of organisation is required"),
    email: Yup.string().required("Email address is required"),
    country: Yup.string().required("Please select a country"),
    sector: Yup.array()
      .of(Yup.string().required("Sector is required"))
      .min(1, "Please select at least one sector"),
    website: Yup.string().url("Please enter a valid URL").optional(),
    address: Yup.string().required("Please enter a valid address"),
  });

  const onSubmit = async (values: any, { setErrors }: any) => {
    setIsLoading(true);
    const response = await postRequest("/organisations", values);
    if (response.status == 201) {
      setShowSnackbar(true);
      setResponse({
        msg: "Organisation added successfully!",
        status: "success",
      });
      setTimeout(() => setShowSnackbar(false), 6000);
    }
    setIsLoading(false);
    setErrors({ [response[0].field || "name"]: response[0].message });
  };

  return (
    <PageContainer
      title="Add Organisation"
      description="add a new organisation"
    >
      <Breadcrumb title="Add Organisation" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Box>
            <Typography>
              Fill in the organisation details below to create a new account.
            </Typography>
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
                              sx={{
                                "& .MuiInputBase-root": {
                                  height: "49px",
                                },
                                "& .MuiAutocomplete-input": {
                                  paddingBottom: "3px",
                                },
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
                      <Grid item xs={12} sm={6}>
                        {/* 6 */}
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="website"
                        >
                          Website(optional)
                        </CustomFormLabel>
                        <CustomTextField
                          id="website"
                          name="website"
                          placeholder="https://"
                          value={values.website}
                          onChange={handleChange}
                          onBlur={() => setFieldTouched("website")}
                          error={!!errors.website && touched.website}
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name="website"
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
                          Add Organisation
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
    </PageContainer>
  );
};

export default AddOrganisation;
