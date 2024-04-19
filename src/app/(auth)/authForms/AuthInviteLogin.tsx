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
import { LockOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

const AuthInviteLogin = ({ title, subtitle, subtext }: loginType) => {
 //   password
  //
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //   confirm password
  //
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (

  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {/* <AuthSocialButtons title="Sign in with" /> */}
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
          or sign in with
        </Typography>
      </Divider>
    </Box> */}

    <Stack>
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
      <Box>
      <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
        <OutlinedInput
         type={showPassword2 ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined fontSize='small' />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                  edge="end"
                >
                  {showPassword2 ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                </IconButton>
              </InputAdornment>
            }
            id="confirmPassword"
            fullWidth
          />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
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
        Complete registration
      </Button>
    </Box>
    {subtitle}
  </>
  )
};

export default AuthInviteLogin;
