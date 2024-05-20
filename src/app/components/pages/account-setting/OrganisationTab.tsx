import React, { useEffect, useState } from "react";
import BlankCard from "../../shared/BlankCard";
import {
  Box,
  Button,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getRequest } from "@/utils/api/apiRequests";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { String } from "lodash";
import Link from "next/link";
import DataSkeleton from "../../skeletons/DataSkeleton";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";

const OrganisationTab = () => {
  const authenticationState = useSelector(
    (state: AppState) => state.authentication,
  );
  const [userData, setUserData] = useState(authenticationState.userData.user);
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [records, setRecords] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleDateFormat = (rawDate: string | undefined ) => {
  //   if (!rawDate) {
  //     return (
  //       <Skeleton
  //         variant="rectangular"
  //         className="skeleton-radius"
  //         width={50}
  //         height={15}
  //         animation="wave"
  //       />
  //     );
  //   }
  //   const parsedDate = parseISO(rawDate);
  //   const formattedDate = format(parsedDate, "dd, MMMM, yyyy");
  //   return formattedDate;
  // };

  useEffect(() => {
    async function getOrganisations() {
      try {
        setIsLoading(true);
        const response = await getRequest(
          `/users/${userData.username}/user-organisations`,
        );
        setOrganisations(response.data.data || []);
        setRecords(response.data.data.length);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getOrganisations();
  }, [userData]);
  return (
    <BlankCard>
      <CardContent>
        <Typography variant="h5" mb={1}>
          Your Organisations
        </Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography color="textSecondary" mb={3}>
            Organisation records :
          </Typography>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              className="skeleton-radius"
              width={16}
              height={16}
              animation="wave"
            />
          ) : (
            <Typography color="textPrimary" fontWeight={600}>
              {records}
            </Typography>
          )}
        </Stack>
        {isLoading ? (
          <Box marginTop={"2rem"}>
            <DataSkeleton />
          </Box>
        ) : (
          <Box
            display={"flex"}
            marginTop={"2rem"}
            flexDirection={"column"}
            gap={"1.5rem"}
          >
            {organisations.map((organisation, idx) => (
              <Box
                key={idx}
                component={Link}
                href={`/organisation/all-organisation/${organisation.organisation.slug}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  backgroundColor: `${"primary.light"}`,
                }}
              >
                <Stack direction={"column"} gap={"1rem"} textAlign={"left"}>
                  <Typography color="textPrimary" fontWeight={600}>
                    {organisation.organisation.name}
                  </Typography>
                  <Typography color="textPrimary">
                    {organisation.organisation.slug}
                  </Typography>
                </Stack>
                <Stack sx={{ alignSelf: "end" }}>
                  <Typography color="textPrimary">
                    {/* Created: {handleDateFormat(organisation.createdAt)} */}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </BlankCard>
  );
};

export default OrganisationTab;
