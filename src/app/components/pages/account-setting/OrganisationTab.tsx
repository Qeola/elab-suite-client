import React, { useEffect, useState } from "react";
import BlankCard from "../../shared/BlankCard";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { getRequest } from "@/utils/api/apiRequests";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { String } from "lodash";

const OrganisationTab = () => {
  const router = useRouter();
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [records, setRecords] = useState<number | null>(null);

  const handleOrg = (slug: string) => {
    router.push(`organisation/${slug}`);
  };

  const handleDateFormat = (rawDate: string) => {
    const parsedDate = parseISO(rawDate);
    const formattedDate = format(parsedDate, "dd, MMMM, yyyy");
    return formattedDate;
  };

  useEffect(() => {
    async function getOrganisations() {
      try {
        const response = await getRequest("/organisations");
        console.log({ response });
        setOrganisations(response.data.data || []);
        setRecords(response.data.records || null);
      } catch (err) {
        console.log(err);
      }
    }

    getOrganisations();
  }, []);
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
          <Typography color="textPrimary" fontWeight={600}>
            {records}
          </Typography>
        </Stack>
        <Box
          display={"flex"}
          marginTop={"2rem"}
          flexDirection={"column"}
          gap={"1.5rem"}
        >
          {organisations.map((organisation, idx) => (
            <Button
              key={idx}
              fullWidth
              onClick={() => handleOrg(organisation.slug)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
              color="primary"
            >
              <Stack direction={"column"} gap={"1rem"} textAlign={"left"}>
                <Typography fontWeight={600}>{organisation.name}</Typography>
                <Typography>{organisation.email}</Typography>
              </Stack>
              <Stack sx={{ alignSelf: "end" }}>
                <Typography>
                  Created:{handleDateFormat(organisation.createdAt)}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Box>
      </CardContent>
    </BlankCard>
  );
};

export default OrganisationTab;
