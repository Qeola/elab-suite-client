
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Business, BusinessOutlined, Lock, LockOutlined, Mail, MailLockOutlined, MailOutline, PasswordOutlined } from '@mui/icons-material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';


const AuthRegister = ({ title, subtitle, subtext }: registerType) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h4" mb={1}>
        {title}
      </Typography>
    ) : null}
    {/* <AuthSocialButtons title="Sign up with" /> */}

    {/* <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign up with
        </Typography>
      </Divider>
    </Box> */}

    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">Name of Organisation</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <BusinessOutlined fontSize='small' />
              </InputAdornment>
            }
            id="name"
            fullWidth
          />
        <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <MailLockOutlined fontSize='small' />
              </InputAdornment>
            }
            id="mail"
            fullWidth
          />
        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
        <OutlinedInput
         type={showPassword ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined fontSize='small' />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            fullWidth
          />
      </Stack>
      <Button
        variant="contained"
        size="large"
        sx={{
          color:'black',
          backgroundColor:"#FFCC03",
          fontWeight:700,
          '&:hover':{
            opacity:0.8,
            transition: 'opacity 200ms ease-in',
            backgroundColor:"#FFCC03",
            boxShadow:'none'
          }
        }}
        fullWidth
        component={Link}
        href="/auth1/login"
      >
        Sign Up
      </Button>
    </Box>
    {subtitle}
  </>
  )
  };

export default AuthRegister;
