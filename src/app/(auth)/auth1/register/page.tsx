"use client";
import Link from "next/link";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

import AuthRegister from "../../authForms/AuthRegister";
import Image from "next/image";

export default function Register() {
  return (
  <PageContainer title="Register Page" description="this is Sample page">
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
            <Image src='/images/logos/eLab-black.png' width={200} height={200} alt='ennovatelab-logo' priority />
          </Box>
          <Box
            // alignItems="center"
            // justifyContent="center"
            // height={"calc(100vh - 75px)"}
            // sx={{
            //   display: {
            //     xs: "none",
            //     lg: "flex",
            //   },
            // }}
          >
            {/* <Image
              src={"/images/backgrounds/login-bg.svg"}
              alt="bg" width={500} height={500}
              style={{
                width: "100%",
                maxWidth: "500px",  maxHeight: '500px',
              }}
            /> */}
            <h2 style={{textAlign:'center',lineHeight:'38px',maxWidth:'25ch'}} >Streamline your workflows,boost your efficiency!</h2>
            <h4 style={{textAlign:'center',maxWidth:'40ch'}} >Run your business smarter, not harder.One platform,complete control!</h4>
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
          <AuthRegister
            title="Signup with ennovateLab"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Admin Dashboard
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  href="/auth1/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
    </div>
  </PageContainer>
)};

