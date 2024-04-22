"use client"
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import Image from 'next/image';
import AuthInviteLogin from '../../authForms/AuthInviteLogin';

export default function inviteLogin () {

  const name = 'Felix';
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
        sx={{ borderRight:'1px solid #060016',alignSelf:'stretch','@media (max-width: 600px)': {
          display: 'none',
        }}}
      >
        <Box style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
          <Box px={3}>
            <Image src='/images/logos/eLab-black.png' width={130} height={130} alt='ennovatelab-logo' priority />
          </Box>
          <Box
           
          > 
            <h2 style={{textAlign:'center',maxWidth:'40ch'}} >Welcome to eLab suite!</h2>
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
          <AuthInviteLogin
            title={`Complete your Account, ${name}!`}
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Admin Dashboard
              </Typography>
            }
          />
        </Box>
      </Grid>
    </Grid>
    </div>
  </PageContainer>
)};