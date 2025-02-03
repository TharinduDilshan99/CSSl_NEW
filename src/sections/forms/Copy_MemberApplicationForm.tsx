//  //  Paranama eka meka

// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     TextField,
//     MenuItem,
//     Button,
//     Box,
//     IconButton,
//     // InputAdornment,
// } from '@mui/material';
// // import { Search, Clear } from '@mui/icons-material';
// import { CloudUpload, Download, Delete } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { useState, ChangeEvent } from 'react';

// import EmployementDetailsList from 'pages/forms/updateForm/EmployementDetails/list';
// import AcademicQualificationList from 'pages/forms/updateForm/AcademicQualification/list';
// import ProffesionalMembershipList from 'pages/forms/updateForm/ProffesionalMembership/list';


// // Styled component for the upload input
// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

// const MemberApplicationForm = () => {

//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     // File handling functions
//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
//                 setSelectedFile(file);
//             } else {
//                 alert('Please upload a PDF file less than 5MB');
//                 event.target.value = '';
//             }
//         }
//     };

//     const handleFileDelete = () => {
//         setSelectedFile(null);
//     };

//     const handleFileDownload = () => {
//         if (selectedFile) {
//             const url = URL.createObjectURL(selectedFile);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = selectedFile?.name || 'cv.pdf';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         }
//     };


//     const memberTypes = [
//         { value: 'Professional', label: 'Professional' },
//         { value: 'Associate', label: 'Associate' },
//         { value: 'Student', label: 'Student' },
//         { value: 'Fellow', label: 'Fellow' },
//         { value: 'Affiliate', label: 'Affiliate' }
//     ];

//     const titles = [
//         { value: 'Mr', label: 'Mr' },
//         { value: 'Mrs', label: 'Mrs' },
//         { value: 'Miss', label: 'Miss' },
//         { value: 'Ms', label: 'Ms' },
//         { value: 'Dr', label: 'Dr' },
//         { value: 'Prof', label: 'Prof' },
//         { value: 'AProf', label: 'AProf' },
//         { value: 'Rev', label: 'Rev' }
//     ];


//     return (
//         <>
//             {/* Personal Details Form */}
//             <Card sx={{ width: '100%', mb: 3 }}>
//                 <CardContent>
//                     <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
//                         Application Details
//                     </Typography>
//                     <form>
//                         <Grid container spacing={3}>
//                             {/* First Row */}
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     select
//                                     fullWidth
//                                     label="Member Type"
//                                     required
//                                     defaultValue=""
//                                 >
//                                     {memberTypes.map((option) => (
//                                         <MenuItem key={option.value} value={option.value}>
//                                             {option.label}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     select
//                                     fullWidth
//                                     label="Title"
//                                     required
//                                     defaultValue=""
//                                 >
//                                     {titles.map((option) => (
//                                         <MenuItem key={option.value} value={option.value}>
//                                             {option.label}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     fullWidth
//                                     label="Initials"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     fullWidth
//                                     label="Last Name"
//                                     required
//                                 />
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     label="Full Name"
//                                     required
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     fullWidth
//                                     label="NIC or Passport No"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     fullWidth
//                                     label="Contact Number"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     type="date"
//                                     fullWidth
//                                     label="Date of Birth"
//                                     required
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={8}>
//                                 <TextField
//                                     fullWidth
//                                     label="Email"
//                                     type="email"
//                                     required
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     fullWidth
//                                     label="Address Line 1"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     fullWidth
//                                     label="Address Line 2"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <TextField
//                                     fullWidth
//                                     label="Address Line 3"
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={4}>
//                                 {/* <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
//                                     Upload / Download CV (PDF only. Maximum file size is 5MB)
//                                 </Typography> */}
//                                 <Box sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 2
//                                 }}>
//                                     <Button
//                                         component="label"
//                                         variant="contained"
//                                         startIcon={<CloudUpload />}
//                                         sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
//                                     >
//                                         Upload CV
//                                         <VisuallyHiddenInput
//                                             type="file"
//                                             accept=".pdf"
//                                             onChange={handleFileChange}
//                                         />
//                                     </Button>
//                                     {selectedFile && (
//                                         <>
//                                             <Typography variant="body2">
//                                                 {selectedFile?.name || 'Uploaded File'}
//                                             </Typography>
//                                             <IconButton
//                                                 onClick={handleFileDownload}
//                                                 color="primary"
//                                             >
//                                                 <Download />
//                                             </IconButton>
//                                             <IconButton
//                                                 onClick={handleFileDelete}
//                                                 color="error"
//                                             >
//                                                 <Delete />
//                                             </IconButton>
//                                         </>
//                                     )}
//                                 </Box>
//                             </Grid>

//                             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                 <Button
//                                     variant="contained"
//                                     sx={{ backgroundColor: '#6B7280', '&:hover': { backgroundColor: '#4B5563' } }}
//                                 >
//                                     Save
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//                 <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
//                 >
//                     Add Employment Details
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
//                 >
//                     Add Academic Qualifications
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
//                 >
//                     Add Professional Bodies
//                 </Button>
//             </Box>

//             {/* Employment Details Section */}
//             <Card sx={{ width: '100%', mb: 3 }}>
//                 <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                         <Typography variant="h6" sx={{ color: 'primary.main' }}>
//                             Employment Details
//                         </Typography>

//                     </Box>
//                     <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
//                         <Grid container spacing={3}>
//                             <Grid item xs={12}>
//                                 {/* Application Form Section */}
//                                 <EmployementDetailsList />

//                             </Grid>
//                         </Grid>
//                     </Box>

//                     {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
//                         There are no records to display
//                     </Typography> */}
//                 </CardContent>
//             </Card>

//             {/* Academic Qualification Details Section */}
//             <Card sx={{ width: '100%', mb: 3 }}>
//                 <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                         <Typography variant="h6" sx={{ color: 'primary.main' }}>
//                             Academic Qualification Details
//                         </Typography>
//                     </Box>
//                     <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
//                         <Grid container spacing={3}>
//                             <Grid item xs={12}>
//                                 {/* Application Form Section */}
//                                 <AcademicQualificationList />

//                             </Grid>
//                         </Grid>
//                     </Box>
//                     {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
//                         There are no records to display
//                     </Typography> */}
//                 </CardContent>
//             </Card>

//             {/* Professional Membership Details Section */}
//             <Card sx={{ width: '100%', mb: 3 }}>
//                 <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                         <Typography variant="h6" sx={{ color: 'primary.main' }}>
//                             Professional Membership Details
//                         </Typography>
//                     </Box>
//                     <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
//                         <Grid container spacing={3}>
//                             <Grid item xs={12}>
//                                 {/* Application Form Section */}
//                                 <ProffesionalMembershipList />

//                             </Grid>
//                         </Grid>
//                     </Box>
//                     {/* <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
//                         There are no records to display
//                     </Typography> */}
//                 </CardContent>
//             </Card>

//             {/* Final Action Buttons */}
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                 <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#6B7280', '&:hover': { backgroundColor: '#4B5563' } }}
//                 >
//                     Save and Exit
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#00A3FF', '&:hover': { backgroundColor: '#0091EA' } }}
//                 >
//                     Submit
//                 </Button>
//             </Box>
//         </>
//     );
// };

// export default MemberApplicationForm;

















// Dewaniyata hadapu eka meka


import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
    InputLabel,
    Stack,
    TextField,
    Select,
    MenuItem,
    IconButton,
    Tooltip
} from '@mui/material';

import EmployementDetailsList from 'pages/forms/updateForm/EmployementDetails/list';
import AcademicQualificationList from 'pages/forms/updateForm/AcademicQualification/list';
import ProffesionalMembershipList from 'pages/forms/updateForm/ProffesionalMembership/list';

import { CloudUpload, Delete, Download } from '@mui/icons-material';


// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
    memberType: yup.string().required('Member Type is required'),
    title: yup.string().required('Title is required'),
    nameWithInitials: yup.string().required('Name with Initials is required'),
    lastName: yup.string().required('Last Name is required'),
    fullName: yup.string().required('Full Name is required'),
    nicPassport: yup.string()
        .required('NIC/Passport Number is required')
        .test('nic-format', 'Invalid NIC format', function (value) {
            if (!value) return false;
            // Check for both old (9 digits + V/X) and new (12 digits) NIC formats
            return /^([0-9]{9}[VvXx]|[0-9]{12})$/.test(value);
        })
        .test('nic-dob-match', 'NIC number does not match with Date of Birth', function (value) {
            const dob = this.parent.dateOfBirth;
            if (!value || !dob) return true; // Skip validation if either field is empty

            // Extract year from DOB
            const dobYear = new Date(dob).getFullYear();

            // Extract year from NIC
            let nicYear: number;
            if (value.length === 10) { // Old NIC format
                // Get first two digits and add 1900
                nicYear = 1900 + parseInt(value.substring(0, 2));
            } else { // New NIC format
                // Get first four digits
                nicYear = parseInt(value.substring(0, 4));
            }

            // For old NIC format, handle years 2000+
            if (value.length === 10 && dobYear >= 2000) {
                nicYear = 2000 + parseInt(value.substring(0, 2));
            }

            // Compare years
            return nicYear === dobYear;
        }),
    contactNumber: yup.string()
        .required('Contact Number is required')
        .matches(/^[0-9+\-\s()]+$/, 'Invalid contact number format')
        .min(10, 'Contact number must be at least 10 digits'),
    dateOfBirth: yup.date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth cannot be in the future')
        .test('age', 'Must be at least 16 years old', function (value) {
            if (!value) return false;
            const cutoff = new Date();
            cutoff.setFullYear(cutoff.getFullYear() - 16);
            return value <= cutoff;
        }),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    address1: yup.string().required('Address Line 1 is required'),
    address2: yup.string().required('Address Line 2 is required'),
    address3: yup.string().required('Address Line 3 is required'),
    // cv: yup.mixed<File>()
    //   .required('CV is required')
    //   .test('fileSize', 'File size is too large (max 5MB)', (value: File | null | undefined) => {
    //     if (!value) return true;
    //     const maxSize = 5 * 1024 * 1024; // 5MB in bytes (5 * 1024KB * 1024B)
    //     return value.size <= maxSize;
    //   })
    //   .test('fileType', 'Only PDF files are allowed', (value: File | null | undefined) => {
    //     if (!value) return true;
    //     return value.type === 'application/pdf';
    //   })
});

export type ShippingData = {
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

interface ApplicationDetailsFormProps {
    shippingData: ShippingData;
    setShippingData: (d: ShippingData) => void;
    handleNext: () => void;
    setErrorIndex: (i: number | null) => void;
}





const MemberApplicationForm = ({ shippingData, setShippingData, handleNext, setErrorIndex }: ApplicationDetailsFormProps) => {


    const formik = useFormik({
        initialValues: {
            memberType: shippingData.memberType || '',
            title: shippingData.title || '',
            nameWithInitials: shippingData.nameWithInitials || '',
            lastName: shippingData.lastName || '',
            fullName: shippingData.fullName || '',
            nicPassport: shippingData.nicPassport || '',
            contactNumber: shippingData.contactNumber || '',
            dateOfBirth: shippingData.dateOfBirth ? new Date(shippingData.dateOfBirth) : null,
            email: shippingData.email || '',
            address1: shippingData.address1 || '',
            address2: shippingData.address2 || '',
            address3: shippingData.address3 || '',
            cv: shippingData.cv || null
        },
        validationSchema,
        onSubmit: (values) => {
            setShippingData({
                memberType: values.memberType,
                title: values.title,
                nameWithInitials: values.nameWithInitials,
                lastName: values.lastName,
                fullName: values.fullName,
                nicPassport: values.nicPassport,
                contactNumber: values.contactNumber,
                dateOfBirth: values.dateOfBirth,
                email: values.email,
                address1: values.address1,
                address2: values.address2,
                address3: values.address3,
                cv: values.cv
            });
            handleNext();
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // Create a URL for the uploaded file
            const fileURL = URL.createObjectURL(file);
            formik.setFieldValue('cv', {
                file,
                url: fileURL,
                name: file.name
            });
        }
    };

    const handleFileRemove = () => {
        if (formik.values.cv?.url) {
            URL.revokeObjectURL(formik.values.cv.url);
        }
        formik.setFieldValue('cv', null);
    };

    const handleFileDownload = () => {
        if (formik.values.cv?.file && formik.values.cv?.url) {
            const link = document.createElement('a');
            link.href = formik.values.cv.url;
            link.download = formik.values.cv.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };



    return (
        <>

            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>




                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        Application Details
                    </Typography>
                    <form onSubmit={formik.handleSubmit} id="validation-forms">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Member Type</InputLabel>
                                    <Select
                                        id="memberType"
                                        name="memberType"
                                        value={formik.values.memberType}
                                        onChange={formik.handleChange}
                                        error={formik.touched.memberType && Boolean(formik.errors.memberType)}
                                        fullWidth
                                    >
                                        <MenuItem value="Professional">Professional</MenuItem>
                                        <MenuItem value="Associate">Associate</MenuItem>
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Fellow">Fellow</MenuItem>
                                        <MenuItem value="Affiliate">Affiliate</MenuItem>
                                    </Select>
                                    {formik.touched.memberType && formik.errors.memberType && (
                                        <Typography color="error" variant="caption">{formik.errors.memberType}</Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Title</InputLabel>
                                    <Select
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        fullWidth
                                    >
                                        <MenuItem value="Mr">Mr</MenuItem>
                                        <MenuItem value="Mrs">Mrs</MenuItem>
                                        <MenuItem value="Miss">Miss</MenuItem>
                                        <MenuItem value="Ms">Ms</MenuItem>
                                        <MenuItem value="Dr">Dr</MenuItem>
                                        <MenuItem value="Prof">Prof</MenuItem>
                                        <MenuItem value="AProf">AProf</MenuItem>
                                        <MenuItem value="Rev">Rev</MenuItem>
                                    </Select>
                                    {formik.touched.title && formik.errors.title && (
                                        <Typography color="error" variant="caption">{formik.errors.title}</Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Name with Initials</InputLabel>
                                    <TextField
                                        id="nameWithInitials"
                                        name="nameWithInitials"
                                        placeholder="Name with Initials *"
                                        value={formik.values.nameWithInitials}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nameWithInitials && Boolean(formik.errors.nameWithInitials)}
                                        helperText={formik.touched.nameWithInitials && formik.errors.nameWithInitials}
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Last Name</InputLabel>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name *"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Full Name</InputLabel>
                                    <TextField
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Full Name *"
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>NIC/Passport Number</InputLabel>
                                    <TextField
                                        id="nicPassport"
                                        name="nicPassport"
                                        placeholder="NIC/Passport Number *"
                                        value={formik.values.nicPassport}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nicPassport && Boolean(formik.errors.nicPassport)}
                                        helperText={formik.touched.nicPassport && formik.errors.nicPassport}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Contact Number</InputLabel>
                                    <TextField
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="Contact Number *"
                                        value={formik.values.contactNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Date of Birth</InputLabel>
                                    <TextField
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        type="date"
                                        value={formik.values.dateOfBirth ? new Date(formik.values.dateOfBirth).toISOString().split('T')[0] : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Email</InputLabel>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email Address *"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        fullWidth
                                        autoComplete="email"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Address Line 1</InputLabel>
                                    <TextField
                                        id="address1"
                                        name="address1"
                                        placeholder="Address line 1 *"
                                        value={formik.values.address1}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address1 && Boolean(formik.errors.address1)}
                                        helperText={formik.touched.address1 && formik.errors.address1}
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Address Line 2</InputLabel>
                                    <TextField
                                        id="address2"
                                        name="address2"
                                        placeholder="Address line 2 *"
                                        value={formik.values.address2}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address2 && Boolean(formik.errors.address2)}
                                        helperText={formik.touched.address2 && formik.errors.address2}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Address Line 3</InputLabel>
                                    <TextField
                                        id="address3"
                                        name="address3"
                                        placeholder="Address line 3 *"
                                        value={formik.values.address3}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address3 && Boolean(formik.errors.address3)}
                                        helperText={formik.touched.address3 && formik.errors.address3}
                                        fullWidth
                                        autoComplete="shipping address-line3"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Upload / Download CV (PDF only. Maximum file size is 5MB)</InputLabel>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            startIcon={<CloudUpload />}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            {formik.values.cv ? 'Change File' : 'Upload CV'}
                                            <input
                                                type="file"
                                                hidden
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                        {formik.values.cv && (
                                            <>
                                                <Tooltip title="Download CV">
                                                    <IconButton
                                                        onClick={handleFileDownload}
                                                        color="primary"
                                                        size="small"
                                                    >
                                                        <Download />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Remove CV">
                                                    <IconButton
                                                        onClick={handleFileRemove}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </Box>
                                    {formik.values.cv && (
                                        <Typography variant="caption" color="textSecondary">
                                            Selected: {formik.values.cv.name}
                                        </Typography>
                                    )}
                                    {formik.touched.cv && formik.errors.cv && (
                                        <Typography variant="caption" color="error">
                                            {formik.errors.cv as string}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="flex-end">
                                    <AnimateButton>
                                        <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                            Next
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>


                </CardContent>
            </Card>


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

            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Employment Details
                        </Typography>

                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <EmployementDetailsList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Academic Qualification Details
                        </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <AcademicQualificationList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Professional Membership Details
                        </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '40vh' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <ProffesionalMembershipList />

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

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