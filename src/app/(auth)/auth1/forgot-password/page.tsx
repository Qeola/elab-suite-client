"use client"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/components/container/PageContainer';
import AuthForgotPassword from '../../authForms/AuthForgotPassword';
import Image from 'next/image';

export default function ForgotPassword() {
  return(
  <PageContainer title="Forgot Password Page" description="this is Sample page">
     <div style={{display:'flex',flexWrap:'nowrap',alignItems:'center',minHeight:'100vh'}} >
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems='center'
      sx={{ overflowX: "hidden" }}
    >
      <Grid
        item
        xs={0}
        sm={6}
        lg={4}
        xl={4}
        sx={{ borderRight:'1px solid #060016',alignSelf:'stretch'}}
        // sx={{
        //   position: "relative",
        //   "&:before": {
        //     content: '""',
        //     // background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
        //     // backgroundSize: "400% 400%",
        //     borderRight:'2px solid #060016',
        //     animation: "gradient 15s ease infinite",
        //     position: "absolute",
        //     height: "100%",
        //     width: "100%",
        //     opacity: "0.3",
        //   },
        // }}
      >
        <Box style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
          <Box px={3}>
            <Image src='/images/logos/forgot-password.png' width={120} height={120} alt='forgot-password-icon' priority />
          </Box>
          <Box
           
          > 
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={5}
        xl={4}
        display="flex"
        alignItems="center"
      >
        <Box p={4} width={'100%'} >
        <AuthForgotPassword/>
        </Box>
      </Grid>
    </Grid>
    </div>
  </PageContainer>
)};
