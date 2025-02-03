import {
    Card,
    CardContent,
    Grid,
    Button,
    Box,
    DialogTitle,
} from '@mui/material';

import AddEditApplicationDetails from 'sections/forms/updateForm/ApplicationDetails/AddEditApplicationDetails';
import EmployementDetailsList from 'pages/forms/updateForm/EmployementDetails/list';
import AcademicQualificationList from 'pages/forms/updateForm/AcademicQualification/list';
import ProffesionalMembershipList from 'pages/forms/updateForm/ProffesionalMembership/list';


const ReviewMemberApplicationForm = () => {

    const handleCancel = () => {
        // Add your cancel logic here
        console.log('Cancelled');
    };

    return (
        <>
            {/* Personal Details Form */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>

                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          Application Details
                      </Typography>

                  </Box> */}
                    <Box sx={{ p: 3, bgcolor: 'white' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/* Application Form Section */}
                                <AddEditApplicationDetails onCancel={handleCancel} />

                            </Grid>
                        </Grid>
                    </Box>


                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
                >
                    Add Employment Details
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
                >
                    Add Academic Qualifications
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
                >
                    Add Professional Bodies
                </Button>
            </Box>

            {/* Employment Details Section */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        {/* <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          Employment Details
                      </Typography> */}
                        <DialogTitle>Employement Details</DialogTitle>

                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <EmployementDetailsList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Academic Qualification Details Section */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <DialogTitle>Academic Qualification Details</DialogTitle>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <AcademicQualificationList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Professional Membership Details Section */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <DialogTitle>Professional Membership Details</DialogTitle>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <ProffesionalMembershipList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Final Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#6B7280', '&:hover': { backgroundColor: '#4B5563' } }}
                >
                    Save and Exit
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default ReviewMemberApplicationForm;












