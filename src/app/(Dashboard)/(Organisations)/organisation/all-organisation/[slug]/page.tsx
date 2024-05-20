"use client";

import PageContainer from "@/app/components/container/PageContainer";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/shared/breadcrumb/Breadcrumb";
import { getRequest } from "@/utils/api/apiRequests";
import BlankCard from "@/app/components/shared/BlankCard";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Skeleton,
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getOrganisation() {
      try {
        setIsLoading(false);
        const response = await getRequest(`/organisations/${organisationSlug}`);
        setOrgDetails(response.data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getOrganisation();
  }, [organisationSlug]);

  const handleDateFormat = (rawDate: string | undefined) => {
    if (!rawDate) {
      return (
        <Skeleton
          variant="rectangular"
          className="skeleton-radius"
          width={50}
          height={15}
          animation="wave"
        />
      );
    }
    const parsedDate = parseISO(rawDate);
    const formattedDate = format(parsedDate, "dd, MMMM, yyyy");
    return formattedDate;
  };

  const loadedData = (data: any) => {
    if (!data) {
      return (
        <Skeleton
          className="skeleton-radius"
          variant="rectangular"
          width={100}
          height={15}
          animation="wave"
        />
      );
    }
    return <Typography variant="inherit">{data}</Typography>;
  };

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
                  {loadedData(orgDetails?.name)}
                </Typography>
                <Typography color={"textSecondary"} variant="caption">
                  {loadedData(orgDetails?.tagline)}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              gap={1}
              alignItems={"center"}
              alignSelf={"end"}
            >
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
                  {loadedData(orgDetails?.name)}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Email Address:</Typography>
                  {loadedData(orgDetails?.email)}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">
                    Registration Number:
                  </Typography>
                  {loadedData(orgDetails?.regNo)}
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
                  {loadedData(orgDetails?.country)}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Website:</Typography>
                  {loadedData(orgDetails?.website)}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Zipcode:</Typography>
                  {loadedData(orgDetails?.zipcode)}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack direction={"column"}>
                  <Typography color="textSecondary">Address:</Typography>
                  {loadedData(orgDetails?.address)}
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
          <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
            <Button
              component={Link}
              href={`/organisation/edit-organisation/${organisationSlug}`}
              type="submit"
              variant="contained"
              sx={{ fontWeight: 600 }}
              color="primary"
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "black" }} size={18} />
              ) : (
                " Edit Organisation"
              )}
            </Button>
          </Stack>
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default OrganisationDetails;
