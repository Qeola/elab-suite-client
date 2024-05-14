"use client";

import PageContainer from "@/app/components/container/PageContainer";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import { getRequest } from "@/utils/api/apiRequests";

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

  console.log({ orgDetails });
  return (
    <PageContainer title="Organisation" description="organisation">
      <Breadcrumb title={orgDetails?.name} items={BCrumb} />
    </PageContainer>
  );
};

export default OrganisationDetails;
