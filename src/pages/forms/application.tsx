// import React from 'react';
// import {
//     Box,
//     Grid
// } from '@mui/material';
// import MemberApplicationForm from 'sections/forms/MemberApplicationForm';

// const MemberDashboard = () => {

//     return (
//         <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '100vh' }}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     {/* Application Form Section */}
//                     <MemberApplicationForm />

//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default MemberDashboard;








import { Box, Grid } from '@mui/material';
import MemberApplicationForm from 'sections/forms/MemberApplicationForm';
import { useState } from 'react';

// Define the shipping data type
type ShippingData = {
    memberType?: string;
    title?: string;
    nameWithInitials?: string;
    lastName?: string;
    fullName?: string;
    nicPassport?: string;
    contactNumber?: string;
    dateOfBirth?: string | Date | null;
    email?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    cv?: {
        file: File;
        url: string;
        name: string;
    } | null;
};

const MemberDashboard = () => {
    // Initialize state for shipping data
    const [shippingData, setShippingData] = useState<ShippingData>({});

    // Handle next step
    const handleNext = () => {
        // Add your navigation logic here
        console.log('Moving to next step');
    };

    // Handle validation errors
    const handleValidationError = (index: number | null) => {
        // Add your error handling logic here
        console.log('Validation error at index:', index);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5db' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MemberApplicationForm
                        shippingData={shippingData}
                        setShippingData={setShippingData}
                        handleNext={handleNext}
                        setErrorIndex={handleValidationError}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MemberDashboard;