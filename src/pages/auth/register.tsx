
// material-ui
import { Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';

// project import
import { useState } from 'react';
import AuthWrapperRegister from 'sections/auth/AuthWrapperRegister';
import FirebaseRegister from 'sections/auth/auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

const Register = () => {

  const [memberType, setMemberType] = useState<boolean | undefined>(undefined);

  return (
    <AuthWrapperRegister>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card
            variant="outlined"
            sx={{
              p: 2,
              border: '1px solid #0d6efd',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '30px'
            }}
          >
            <Typography variant="h3" align="center" gutterBottom>
              Are You An Existing Member?
            </Typography>
            <FormControl component="fieldset" sx={{ fontSize: '30px' }}>
              <RadioGroup
                row
                value={memberType}
                onChange={(e) => setMemberType(e.target.value === 'true')}
                sx={{
                  justifyContent: 'center',
                  fontSize: '30px',
                  '& .MuiFormControlLabel-root': {
                    mx: 2,
                    fontSize: '30px'
                  }
                }}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" sx={{ fontSize: '30px' }} />
                <FormControlLabel value={false} control={<Radio />} label="No" sx={{ fontSize: '30px' }} />
              </RadioGroup>
            </FormControl>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <FirebaseRegister memberType={memberType!} />
        </Grid>
      </Grid>
    </AuthWrapperRegister>
  );
};

export default Register;
