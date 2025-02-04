import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  OutlinedInput,
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

// ============================|| JWT - REGISTER ||============================ //

const AuthOldMember = ({ memberType }: { memberType: boolean }) => {
  const { oldMmberRegister } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          memberNo: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          memberNo: Yup.string().max(255).required('First Name is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await oldMmberRegister(values.memberNo);
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
              <Grid container spacing={2} alignItems="center" mt={2}>
                <Grid item xs={8}>
                  <OutlinedInput
                    id="memberNo-login"
                    type="text"
                    value={values.memberNo}
                    name="memberNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Member Number"
                    disabled={!memberType}
                    fullWidth
                    error={Boolean(touched.memberNo && errors.memberNo)}
                  />
                  {touched.memberNo && errors.memberNo && (
                    <FormHelperText error id="helper-text-memberNo-signup">
                      {errors.memberNo}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting || !memberType} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Confirm
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid xs={12} mt={3}>
                <Typography variant="h6">
                  You'll receive a password to your email
                </Typography>
              </Grid>
              <Grid xs={12} mt={1}>
                <Typography variant="h6">
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

export default AuthOldMember;