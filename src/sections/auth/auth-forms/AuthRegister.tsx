import {
  Box,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import AuthOldMember from './AuthOldMember';
import AuthSignUp from './AuthSignUp';

// Define interfaces for the component props and form values
const SignUpView = ({ memberType }: { memberType: boolean }) => {

  return (

    <Box  >
      <Grid container spacing={2} p={2}>  {/* Increased spacing from 4 to 6 */}
        {/* Left Column - Existing Member */}
        <Grid item xs={12} md={5.8} sx={{ pr: { md: 4 } }}>  {/* Added right padding */}
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Sign Up Using Member Number
          </Typography>


          <AuthOldMember memberType={memberType} />


          {/* Contact Information Section */}
          <Box sx={{ mt: 15, textAlign: 'center' }}>
            <img
              src='https://202.75.55.83/static/media/New-CSSL-Logo.2dcbfacf.png'
              alt="Company Logo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              <strong>No. 275/75,</strong> Colombo 7, Sri Lanka.<br />
              <strong>Prof. Stanley Wijesundara Mawatha.</strong>
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>(+94) 114 713 290</strong>
            </Typography>
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, mt: 5 }} />

        {/* Right Column - New Member */}
        <Grid item xs={12} md={5.8} sx={{ pl: { md: 4 } }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Sign Up Using Email Address
          </Typography>

          <AuthSignUp memberType={memberType} />

        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpView;