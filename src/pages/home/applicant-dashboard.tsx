// // import React from 'react';
// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     CardActionArea
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const ApplicantDashboard = () => {
//     const navigate = useNavigate();

//     // Simulated user data - in a real app, this would come from state/context
//     const userData = {
//         name: 'T.D.A Danapala',
//         registrationDate: new Date().toLocaleDateString(),
//         applicationStatus: 'Pending Review',
//         nextAction: 'Complete Profile'
//     };

//     const handleApplicationStatusClick = () => {
//         navigate('/application-status');
//     };

//     const handleNextActionClick = () => {
//         navigate('/next-action');
//     };

//     return (
//         <Grid container spacing={3} sx={{ padding: 3 }}>
//             {/* Personal Information Card */}
//             <Grid item xs={12} md={6} lg={3}>
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                             Personal Information
//                         </Typography>
//                         <Typography variant="body1">
//                             Name: {userData.name}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Initial Registration Card */}
//             <Grid item xs={12} md={6} lg={3}>
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                             Initial Registration
//                         </Typography>
//                         <Typography variant="body1">
//                             Initial Registration Date: {userData.registrationDate}
//                         </Typography>
//                         <Typography variant="body2" sx={{ marginTop: 2 }}>
//                             Here are some ways to get started:
//                             {/* Add potential starter steps or links */}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Application Status Card */}
//             <Grid item xs={12} md={6} lg={3}>
//                 <Card>
//                     <CardActionArea onClick={handleApplicationStatusClick}>
//                         <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                                 Application Status
//                             </Typography>
//                             <Typography variant="body1">
//                                 {userData.applicationStatus}
//                             </Typography>
//                         </CardContent>
//                     </CardActionArea>
//                 </Card>
//             </Grid>

//             {/* Next Action Card */}
//             <Grid item xs={12} md={6} lg={3}>
//                 <Card>
//                     <CardActionArea onClick={handleNextActionClick}>
//                         <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                                 Next Action
//                             </Typography>
//                             <Typography variant="body1">
//                                 {userData.nextAction}
//                             </Typography>
//                         </CardContent>
//                     </CardActionArea>
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };

// export default ApplicantDashboard;



















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
