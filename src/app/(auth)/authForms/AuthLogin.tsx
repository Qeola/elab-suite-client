import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { LockOutlined, MailLockOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { IconEyeOff } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (

  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    <Stack>
      <Box>
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
      </Box>
      <Box>
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
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<CustomCheckbox defaultChecked />}
            label="Remember this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/auth1/forgot-password"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
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
        href="/dashboard"
      >
        Sign In
      </Button>
    </Box>
    {subtitle}
  </>
  )
};

export default AuthLogin;
