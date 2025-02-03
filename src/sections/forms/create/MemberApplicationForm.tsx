import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Box,
    // InputAdornment,
} from '@mui/material';
// import { Search, Clear } from '@mui/icons-material';

import EmployementDetailsList from 'pages/forms/updateForm/EmployementDetails/list';
import AcademicQualificationList from 'pages/forms/updateForm/AcademicQualification/list';
import ProffesionalMembershipList from 'pages/forms/updateForm/ProffesionalMembership/list';

const MemberApplicationForm = () => {
    const memberTypes = [
        { value: 'Professional', label: 'Professional' },
        { value: 'Associate', label: 'Associate' },
        { value: 'Student', label: 'Student' },
        { value: 'Fellow', label: 'Fellow' },
        { value: 'Affiliate', label: 'Affiliate' }
    ];

    const titles = [
        { value: 'Mr', label: 'Mr' },
        { value: 'Mrs', label: 'Mrs' },
        { value: 'Miss', label: 'Miss' },
        { value: 'Ms', label: 'Ms' },
        { value: 'Dr', label: 'Dr' },
        { value: 'Prof', label: 'Prof' },
        { value: 'AProf', label: 'AProf' },
        { value: 'Rev', label: 'Rev' }
    ];

    return (
        <>
            {/* Personal Details Form */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                        Application Details
                    </Typography>
                    <form>
                        <Grid container spacing={3}>
                            {/* First Row */}
                            <Grid item xs={12} md={3}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Member Type"
                                    required
                                    defaultValue=""
                                >
                                    {memberTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Title"
                                    required
                                    defaultValue=""
                                >
                                    {titles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Initials"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="NIC or Passport No"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="date"
                                    fullWidth
                                    label="Date of Birth"
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Address Line 1"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Address Line 2"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Address Line 3"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Upload / Download CV (PDF only. Maximum file size is 5MB)
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
                                    >
                                        Download CV
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#6B7280', '&:hover': { backgroundColor: '#4B5563' } }}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
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
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Employment Details
                        </Typography>

                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/* Application Form Section */}
                                <EmployementDetailsList />

                            </Grid>
                        </Grid>
                    </Box>

                    {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                        There are no records to display
                    </Typography> */}
                </CardContent>
            </Card>

            {/* Academic Qualification Details Section */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Academic Qualification Details
                        </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/* Application Form Section */}
                                <AcademicQualificationList />

                            </Grid>
                        </Grid>
                    </Box>
                    {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                        There are no records to display
                    </Typography> */}
                </CardContent>
            </Card>

            {/* Professional Membership Details Section */}
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Professional Membership Details
                        </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/* Application Form Section */}
                                <ProffesionalMembershipList />

                            </Grid>
                        </Grid>
                    </Box>
                    {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                        There are no records to display
                    </Typography> */}
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

export default MemberApplicationForm;