import React, { useEffect, useState } from "react";
import BlankCard from "../../shared/BlankCard";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { getRequest } from "@/utils/api/apiRequests";
import { useRouter } from "next/navigation";

const OrganisationTab = () => {
  const router = useRouter();
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [records, setRecords] = useState<number | null>(null);

  const handleOrg = (slug: string) => {
    router.push(`organisation/${slug}`);
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
        <Stack direction={"row"} spacing={1}>
          <Typography color="textSecondary" mb={3}>
            Organisation Records :
          </Typography>
          <Typography color="textPrimary">{records}</Typography>
        </Stack>
        <Box
          display={"flex"}
          marginTop={"1rem"}
          flexDirection={"column"}
          gap={"1rem"}
        >
          {organisations.map((organisation, idx) => (
            <Button
              key={idx}
              fullWidth
              onClick={() => handleOrg(organisation.slug)}
              sx={{ display: "flex", justifyContent: "space-between" }}
              color="primary"
            >
              <Stack direction={"column"} gap={"1rem"}>
                <Typography fontWeight={600}>{organisation.name}</Typography>
                <Typography>{organisation.email}</Typography>
              </Stack>
              <Typography>Created on : {organisation.createdAt}</Typography>
            </Button>
          ))}
        </Box>
      </CardContent>
    </BlankCard>
  );
};

export default OrganisationTab;
