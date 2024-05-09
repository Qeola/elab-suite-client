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
  interface Country {
    name: string;
  }

  interface State {
    name: string;
  }

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newCountry: any,
  ) => {
    setSelectedCountry(newCountry);
  };

  const handleChangeState = (
    event: React.ChangeEvent<HTMLInputElement>,
    newState: any,
  ) => {
    setSelectedState(newState);
  };

  const states = selectedCountry
    ? countries.find((country) => country.name === selectedCountry)?.states ||
      []
    : [];

  // useEffect(() => {
  //   console.log({ states });
  // }, [selectedCountry]);
  // const typedStates: ({ id: number; name: string; state_code: string; latitude: string; longitude: string; })[] = states;

  const initialValues1 = {
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  };

  const validationSchema1 = Yup.object().shape({
    name: Yup.string().required("Full Name should not be omitted"),
  });

  const onSubmit1 = async (values: any, { setErrors }: any) => {
    // console.log(values);
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
                      Select country
                    </CustomFormLabel>
                    <Grid item xs={12} lg sm={6}>
                      <Autocomplete
                        disablePortal
                        id="country"
                        options={countries}
                        fullWidth
                        getOptionLabel={(option) => option.name}
                        value={selectedCountry}
                        onChange={handleChange}
                        renderInput={(params) => (
                          <CustomTextField {...params} />
                        )}
                      />
                      <Autocomplete
                        disablePortal
                        id="state"
                        options={states}
                        fullWidth
                        getOptionLabel={(option) => option.name}
                        value={selectedState}
                        // onChange={handleChangeState}
                        renderInput={(params) => (
                          <CustomTextField {...params} />
                        )}
                        // disabled={!selectedCountry} // Disable state selection when no country is chosen
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* 6 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-phone"
                    >
                      Select state
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
                  <Grid item xs={12} sm={6}>
                    {/* 6 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="zip-code"
                    >
                      Zip Code(optional)
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
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "end" }}
                  mt={3}
                >
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button size="large" variant="text" color="error">
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
