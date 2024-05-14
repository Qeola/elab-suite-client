"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageContainer from "@/app/components/container/PageContainer";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CountrySelectAutocomplete from "@/app/components/forms/form-elements/autoComplete/CountrySelectAutocomplete";
import countries from "./countryStates";

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
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    const names = Object.values(countries).map((country) => country.name);
    setCountryNames(names);
  }, []);

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

  const filteredStates = getStates(selectedCountry);

  const initialValues = {
    name: "",
    email: "",
    country: "",
    state: "",
    regNo: "",
    zipcode: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of organisation is required"),
    email: Yup.string().required("Email address is required"),
    country: Yup.string().required("Please select a country"),
    state: Yup.string().required("Please select a state"),
    address: Yup.string().required("Please enter a valid address"),
  });

  const onSubmit = (values: any, { setErrors }: any) => {
    console.log({ values });
    // setIsLoading(true);
    // const response = await patchRequest("/users/", values);
    // console.log({ response });
    // if (response.status == 200) {
    //   setShowSnackbar(true);
    //   setResponse({ msg: "Profile updated successfully!", status: "success" });
    //   setTimeout(() => setShowSnackbar(false), 6000);
    // }
    // setIsLoading(false);
    // setErrors({ [response[0].field || "password"]: response[0].message });
  };

  return (
    <PageContainer
      title="Add Organisation"
      description="add a new organisation"
    >
      <Breadcrumb title="Add Organisation" items={BCrumb} />
      <Box>
        <Typography fontWeight="600" variant="h3" mt={3} mb={1}>
          Create an organisation
        </Typography>
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
                    <Autocomplete
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
                      renderInput={(params) => <CustomTextField {...params} />}
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
                    <Autocomplete
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
                      renderInput={(params) => <CustomTextField {...params} />}
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
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "start" }}
                  mt={3}
                >
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{ fontWeight: 600 }}
                    color="primary"
                  >
                    Add Organisation
                  </Button>
                  <Button size="large" variant="contained" color="error">
                    Cancel
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AddOrganisation;
