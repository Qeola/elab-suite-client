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
import { InputAdornment, OutlinedInput } from '@mui/material';
import { LockOutlined, MailLockOutlined } from '@mui/icons-material';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => (
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
        //  type={showPassword ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined fontSize='small' />
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
          href="/auth/forgot-password"
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
);

export default AuthLogin;
