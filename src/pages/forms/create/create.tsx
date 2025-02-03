// material-ui
import { Grid } from '@mui/material';

// project imports
// import BasicWizard from 'sections/forms/wizard/basic-wizard';
import AllApplicationDetails from 'sections/forms/create';

// ==============================|| FORMS WIZARD ||============================== //

const FormsCreate = () => (
    <Grid container spacing={2.5} justifyContent="center">
        <Grid item xs={12} >
            <AllApplicationDetails />
        </Grid>
    </Grid>
);

export default FormsCreate;