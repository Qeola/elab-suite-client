"use client";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";

export default function UsersPage() {
  return (
    <PageContainer title="Users">
      <DashboardCard title="Users">
        <Typography>This is all users</Typography>
      </DashboardCard>
    </PageContainer>
  );
}
