// material-ui
import {
    Grid
} from '@mui/material';
import CardViews from 'pages/home/CardViewDash';

// assets

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

    return (
        <Grid container rowSpacing={4.5} columnSpacing={3} >
            <Grid item xs={12} sm={12}>
                <CardViews scheduleSummaryDashboardData={{ jointPartnersDifference: 134, maximumNumberOfJointPartners: 11, numberOfJointPartners: 24, numberOfLoans: 4, totalNumberOfCIF: 45 }} />
            </Grid>
        </Grid>
    );
};

export default DashboardAnalytics;
