"use client"
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import AuthLogin from '../../authForms/AuthLogin';
import Image from 'next/image';
import { Button, CircularProgress } from '@mui/material';
import EmailTimer from '@/app/components/EmailTimer';
import { useEffect, useState } from 'react';

export default function VerifyEmail () {
    const email = 'someone@gmail.com';
    const [countdown, setCountdown] = useState(300);
    const [resendEnabled, setResendEnabled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1;
                } else {
                    clearInterval(interval);
                    setResendEnabled(true); 
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const handleResendClick = () => {
        setResendEnabled(false);
        setCountdown(300);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

  return(
    <PageContainer title="verify Email Page" description="this is Sample page">
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
            <Image src='/images/logos/email.png' width={120} height={120} alt='email-logo' priority />
          </Box>
          <Box > 
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
         <h1>Verify your email address</h1>
         <h3>We have sent you an email</h3>
         <p>Click on the email verification link sent to you on <span style={{textDecoration:'underline'}}>{email}</span></p>
         <Stack direction='row' spacing={1} alignItems={'center'} >
        <h3>Didn&apos;t receive any link ?</h3>
         <Button variant='text'
           onClick={handleResendClick}
           disabled={!resendEnabled} style={{textDecoration:'underline'}} >Resend Email</Button> 
         </Stack>
            <p>It may take up to 5 minutes to receive mail.Please be patient and also do well to check your spam folder.</p>
            <Box sx={{ display:'flex',justifyContent:'center',backgroundColor:'#FFCC03',fontWeight:700,fontSize:'1rem',width:'100px',padding:'.3rem'}}>
                {formatTime(countdown)}
            </Box>
            <Box sx={{ color:'black',textDecoration:'underline'}} marginTop={'1rem'} >
            <Link href='/auth1/register' style={{color:'black'}} >Back to Signup</Link>
            </Box>
        </Box>
      </Grid>
    </Grid>
    </div>
  </PageContainer>
)};
