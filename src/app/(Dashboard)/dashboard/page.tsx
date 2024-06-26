/* eslint-disable @next/next/no-async-client-component */
"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PageContainer from "@/app/components/container/PageContainer";
// components
import SalesOverview from "@/app/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/components/dashboard/ProductPerformance";
import MonthlyEarnings from "@/app/components/dashboard/MonthlyEarnings";
import flagsmith from "@/utils/flagsmith";
import { Typography } from "@mui/material";

export default function Dashboard() {
  // const flags = await flagsmith.getEnvironmentFlags();

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid
          container
          spacing={3}
          sx={{
            minHeight: "80vh",
            placeItems: "center",
            justifyContent: "center",
          }}
        >
          {/* { flags.isFeatureEnabled('profile') && */}
          {/* <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid> */}
          {/* } */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          {/* <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}
          <Typography variant="h5">
            Dashboard is under construction!. Exercise Patience!
          </Typography>
        </Grid>
      </Box>
    </PageContainer>
  );
}
