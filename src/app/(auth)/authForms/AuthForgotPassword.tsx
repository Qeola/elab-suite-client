import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from "next/link";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { MailLockOutlined } from '@mui/icons-material';

export default function AuthForgotPassword(){
 return (
  <>
    <Box>
      <h1>Forgot your Password ?</h1>
      <p>No worries.Please enter the email address associated with your account and we will email you a link to reset your password.</p>
    </Box>
    <Stack mt={4} spacing={2}>
      <CustomFormLabel htmlFor="reset-email">Email Address</CustomFormLabel>
      <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <MailLockOutlined fontSize='small' />
              </InputAdornment>
            }
            id="mail"
            fullWidth
          />

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
        Forgot password
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{
          color:'black',
          backgroundColor:"#fff",
          fontWeight:700,
          '&:hover':{
            opacity:0.8,
            transition: 'opacity 200ms ease-in',
            backgroundColor:"#fff",
            boxShadow:'none',
            textDecoration:'underline'
          }
        }}
        fullWidth
        component={Link}
        href="/auth1/login"
      >
        Back to Login
      </Button>
    </Stack>
  </>
)};
