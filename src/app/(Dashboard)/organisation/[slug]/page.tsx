"use client";

import PageContainer from "@/app/components/container/PageContainer";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import { getRequest } from "@/utils/api/apiRequests";
import BlankCard from "@/app/components/shared/BlankCard";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const BCrumb = [
  {
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    title: "Organisation",
  },
];

const OrganisationDetails = ({ params }: any) => {
  const organisationSlug = params.slug;

  const [orgDetails, setOrgDetails] = useState<any | null>(null);

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

  const handleDateFormat = (rawDate: string | undefined) => {
    if (!rawDate) {
      return "Loading...";
    }
    const parsedDate = parseISO(rawDate);
    const formattedDate = format(parsedDate, "dd, MMMM, yyyy");
    return formattedDate;
  };

  console.log({ orgDetails });
  return (
    <PageContainer title="Organisation" description="organisation">
      <Breadcrumb title="Organisation Details" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ pb: 2 }}
          >
            <Stack direction={"row"} gap={2} alignItems="center">
              <Avatar
                alt=""
                src={
                  "https://parsadi.com/wp-content/uploads/2022/05/Company.jpg"
                }
                sx={{ height: 70, width: 70 }}
              />

              <Box>
                <Typography color={"textSecondary"} variant="h5">
                  {orgDetails && orgDetails.name}
                </Typography>
                <Typography color={"textSecondary"} variant="caption">
                  Information & Technology
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" gap={1} alignSelf={"end"}>
              <Typography>Created on :</Typography>
              <Typography>{handleDateFormat(orgDetails?.createdAt)}</Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ pt: 6 }}>
            <Grid container spacing={4} sx={{ pb: 6 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">
                    Organisation Name:
                  </Typography>
                  <Typography>{orgDetails?.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Email Address:</Typography>
                  <Typography>{orgDetails?.email}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">
                    Registration Number:
                  </Typography>
                  <Typography>{orgDetails?.regNo}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Employees:</Typography>
                  <Typography>0</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Department(s):</Typography>
                  <Typography>0</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Country:</Typography>
                  <Typography>{orgDetails?.country}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">State:</Typography>
                  <Typography>{orgDetails?.state}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Zipcode:</Typography>
                  <Typography>{orgDetails?.zipcode}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Address:</Typography>
                  <Typography>{orgDetails?.address}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Sector(s):</Typography>
                  <Typography>
                    {orgDetails?.sector?.length
                      ? orgDetails.sector.map(
                          (sector: string, index: number) =>
                            index === orgDetails.sector.length - 1
                              ? sector
                              : `${sector}, `,
                        )
                      : "No sectors selected"}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontWeight: 600 }}
            component={Link}
            href={`/edit-organisation/${orgDetails?.slug}`}
          >
            Edit Organisation
          </Button>
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default OrganisationDetails;
