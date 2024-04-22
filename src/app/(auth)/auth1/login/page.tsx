"use client"
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import AuthLogin from '../../authForms/AuthLogin';
import Image from 'next/image';

export default function Login () {
  return(
<PageContainer title="Login Page" description="this is Sample page">
  <Box height={'100px'} alignItems={'center'} padding={'1rem'}>
    <Logo/>
     </Box>
    <div style={{display:'flex',flexWrap:'nowrap',alignItems:'center',minHeight:'calc(100vh - 100px)'}} >
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
      >
        <Box style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
          <Box px={3}>
            <Image src='/images/logos/eLab-black.png' width={150} height={150} alt='ennovatelab-logo' priority />
          </Box>
          <Box
          > 
            <h4 style={{textAlign:'center',maxWidth:'40ch'}} >Lorem ipsum dolor!</h4>
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
          <AuthLogin
            title="Login your credentials"
            
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Don&apos;t have an account?
                </Typography>
                <Typography
                  component={Link}
                  href="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Sign Up
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
