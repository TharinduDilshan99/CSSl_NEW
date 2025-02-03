import {
    Box,
    Grid
} from '@mui/material';
import SecondMemberApplicationForm from 'sections/forms/SecondMemberApplicationForm';

const MemberDashboard = () => {

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {/* Application Form Section */}
                    <SecondMemberApplicationForm />

                </Grid>
            </Grid>
        </Box>
    );
};

export default MemberDashboard;