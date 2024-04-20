import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one lowercase letter",
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least one uppercase letter",
      )
      .matches(RegExp("(.*\\d.*)"), "Password must contain a number")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain a special character",
      )
      .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
      .required('Confirm your password')
  });

  return (
  <>
    {title ? (
      <Typography fontWeight="600" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

     <Formik
     initialValues={{ password: '', confirmPassword: '' }}
     validationSchema={validationSchema}
     onSubmit={(values) => {
       console.log({values});
       router.push('/dashboard')
     }}
     >
      {({ values, handleChange, errors, touched, setFieldTouched }) => (
        <Form>
    <Stack>
      <Box>
      <CustomFormLabel htmlFor="password">Create Password</CustomFormLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={() => setFieldTouched('password')}
          error={!!errors.password && touched.password}
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
            fullWidth
          />
          <ErrorMessage name="password" component="span" className="error" /> 
      </Box>

      <Box>
      <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
        <OutlinedInput
         type={showPassword2 ? 'text' : 'password'}
         id="confirmPassword"
         name="confirmPassword"
         value={values.confirmPassword}
         onChange={handleChange}
         onBlur={() => setFieldTouched('confirmPassword')}
         error={!!errors.confirmPassword && touched.confirmPassword}
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
            fullWidth
          />
           <ErrorMessage name="confirmPassword" component="span" className="error" /> 
      </Box>
    </Stack>
    <Box>
    <Button
        type='submit'
        variant="contained"
        size="large"
        sx={{
          color:'black',
          backgroundColor:"#FFCC03",
          fontWeight:600,
          marginTop:'1.5rem',
          '&:hover':{
            opacity:0.8,
            transition: 'opacity 200ms ease-in',
            backgroundColor:"#FFCC03",
            boxShadow:'none'
          }
        }}
        fullWidth
      >
        Complete registration
      </Button>
      </Box>
        </Form>
      )}
     </Formik>
    {subtitle}
  </>
  )
};

export default AuthInviteLogin;
