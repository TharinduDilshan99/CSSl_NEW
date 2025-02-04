import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useState } from 'react';

// ============================|| JWT - REGISTER ||============================ //

const AuthSignUp = ({ memberType }: { memberType: boolean }) => {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          contactNumber: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('Initials is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          contactNumber: Yup.string()
            .required('Contact Number is required')
            .matches(/^[0-9+\-\s()]+$/, 'Invalid contact number format')
            .min(10, 'Contact number must be at least 10 digits')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(values.email, values.firstname, values.lastname, values.contactNumber);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Your registration has been successfully completed.',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );

              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Initials *"
                    fullWidth
                    disabled={memberType}
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    disabled={memberType}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    disabled={memberType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Email *"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.contactNumber && errors.contactNumber)}
                    id="contactNumber-signup"
                    value={values.contactNumber}
                    name="contactNumber"
                    disabled={memberType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Contact Number *"
                    inputProps={{}}
                  />
                  {touched.contactNumber && errors.contactNumber && (
                    <FormHelperText error id="helper-text-contactNumber-signup">
                      {errors.contactNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                        disabled={memberType}
                      />
                    }
                    label={<Typography variant="h6">Agree to the Terms and Conditions</Typography>}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting || memberType} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid xs={12} mt={2} >
                <Typography variant="h6" align='center'>
                  Already have an account ?
                  <Link variant="subtitle2" component={RouterLink} to="/">
                    &nbsp; Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthSignUp;