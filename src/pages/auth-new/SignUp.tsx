// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Container,
//     Divider,
//     FormControl,
//     FormControlLabel,
//     FormHelperText,
//     Grid,
//     Radio,
//     RadioGroup,
//     Stack,
//     TextField,
//     Typography,
//     CircularProgress
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

// // Define interfaces for the component props and form values
// interface SignUpProps {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     loader: boolean;
//     loader1: boolean;
//     handleShowpwd: () => void;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     singupHandler: (values: FormValues) => void;
//     onChangeHandler: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// interface FormValues {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
// }

// const validationSchema = yup.object({
//     firstName: yup.string()
//         .required('Initials Required'),
//     lastName: yup.string()
//         .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field')
//         .required('Last Name is Required'),
//     email: yup.string()
//         .required('E-mail is Required')
//         .email('Please enter valid e-mail')
//         .trim(),
//     phone: yup.string()
//         .required('Contact Number is Required')
//         .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please enter valid contact number')
//         .min(10, 'Invalid contact number')
//         .max(12, 'Please enter valid contact number'),
// });

// const SignUpView: React.FC<SignUpProps> = ({
//     firstName,
//     lastName,
//     phone,
//     email,
//     loader,
//     loader1,
//     handleShowpwd,
//     handleChange,
//     singupHandler,
//     onChangeHandler,
// }) => {
//     const [memberType, setMemberType] = useState<'existing' | 'new' | ''>('');
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [memberNumber, setMemberNumber] = useState('');

//     const formik = useFormik({
//         initialValues: {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             phone: phone,
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values) => {
//             singupHandler(values);
//         },
//     });

//     return (
//         <Container maxWidth="lg" sx={{ my: 4, mt: 15 }}>
//             <Card elevation={3}>
//                 <CardContent>
//                     <Box sx={{ p: 3 }}>
//                         <Grid container spacing={4}>
//                             {/* Membership Type Selection */}
//                             <Grid item xs={12}>
//                                 <Card
//                                     variant="outlined"
//                                     sx={{
//                                         p: 2,
//                                         border: '1px solid #0d6efd',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center'
//                                     }}
//                                 >
//                                     <Typography variant="h5" align="center" gutterBottom>
//                                         Are You An Existing Member?
//                                     </Typography>
//                                     <FormControl component="fieldset">
//                                         <RadioGroup
//                                             row
//                                             value={memberType}
//                                             onChange={(e) => setMemberType(e.target.value as 'existing' | 'new')}
//                                             sx={{
//                                                 justifyContent: 'center',
//                                                 '& .MuiFormControlLabel-root': {
//                                                     mx: 4
//                                                 }
//                                             }}
//                                         >
//                                             <FormControlLabel value="existing" control={<Radio />} label="Yes" />
//                                             <FormControlLabel value="new" control={<Radio />} label="No" />
//                                         </RadioGroup>
//                                     </FormControl>
//                                 </Card>
//                             </Grid>

//                             {/* Left Column - Existing Member */}
//                             <Grid item xs={12} md={6}>
//                                 <Typography variant="h6" gutterBottom>
//                                     Sign Up Using Member Number
//                                 </Typography>
//                                 <Stack spacing={2} direction="row" alignItems="flex-start">
//                                     <TextField
//                                         fullWidth
//                                         placeholder="Member Number *"
//                                         disabled={memberType !== 'existing'}
//                                         value={memberNumber}
//                                         onChange={(e) => setMemberNumber(e.target.value)}
//                                     />
//                                     <Button
//                                         variant="contained"
//                                         disabled={!memberNumber || memberType !== 'existing' || loader1}
//                                         onClick={handleShowpwd}
//                                     >
//                                         {loader1 ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}
//                                     </Button>
//                                 </Stack>
//                                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//                                     You'll receive a password to your email
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ mt: 2 }}>
//                                     Already have an account? <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
//                                 </Typography>

//                                 {/* Contact Information Section */}
//                                 <Box sx={{ mt: 26, textAlign: 'left' }}>
//                                     <img
//                                         src="/src/assets/images/logo_1.png"
//                                         alt="Company Logo"
//                                         style={{ maxWidth: '100%', height: 'auto' }}
//                                     />
//                                     <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                                         <strong>No. 275/75,</strong> Colombo 7, Sri Lanka.<br />
//                                         <strong>Prof. Stanley Wijesundara Mawatha.</strong>
//                                     </Typography>
//                                     <Typography variant="subtitle1" sx={{ mt: 1 }}>
//                                         <strong>(+94) 114 713 290</strong>
//                                     </Typography>
//                                 </Box>
//                             </Grid>

//                             <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

//                             {/* Right Column - New Member */}
//                             <Grid item xs={12} md={5}>
//                                 <Typography variant="h6" gutterBottom>
//                                     Sign Up Using Email Address
//                                 </Typography>
//                                 <form onSubmit={formik.handleSubmit}>
//                                     <Stack spacing={3}>
//                                         <TextField
//                                             fullWidth
//                                             id="firstName"
//                                             name="firstName"
//                                             label="Initials *"
//                                             disabled={memberType !== 'new'}
//                                             value={formik.values.firstName}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//                                             helperText={formik.touched.firstName && formik.errors.firstName}
//                                         />
//                                         <TextField
//                                             fullWidth
//                                             id="lastName"
//                                             name="lastName"
//                                             label="Last Name *"
//                                             disabled={memberType !== 'new'}
//                                             value={formik.values.lastName}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//                                             helperText={formik.touched.lastName && formik.errors.lastName}
//                                         />
//                                         <TextField
//                                             fullWidth
//                                             id="email"
//                                             name="email"
//                                             label="Email *"
//                                             disabled={memberType !== 'new'}
//                                             value={formik.values.email}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.email && Boolean(formik.errors.email)}
//                                             helperText={formik.touched.email && formik.errors.email}
//                                         />
//                                         <TextField
//                                             fullWidth
//                                             id="phone"
//                                             name="phone"
//                                             label="Contact Number *"
//                                             disabled={memberType !== 'new'}
//                                             value={formik.values.phone}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.phone && Boolean(formik.errors.phone)}
//                                             helperText={formik.touched.phone && formik.errors.phone}
//                                         />
//                                         <FormControl error={!termsAccepted && memberType === 'new'}>
//                                             <FormControlLabel
//                                                 control={
//                                                     <Radio
//                                                         checked={termsAccepted}
//                                                         onChange={(e) => setTermsAccepted(e.target.checked)}
//                                                         disabled={memberType !== 'new'}
//                                                     />
//                                                 }
//                                                 label="Agree to the Terms and Conditions"
//                                             />
//                                             {!termsAccepted && memberType === 'new' && (
//                                                 <FormHelperText>Please accept the terms and conditions</FormHelperText>
//                                             )}
//                                         </FormControl>
//                                         <Button
//                                             type="submit"
//                                             variant="contained"
//                                             disabled={!termsAccepted || memberType !== 'new' || loader}
//                                         >
//                                             {loader ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//                                         </Button>
//                                         <Typography variant="body2">
//                                             Already have an account? <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
//                                         </Typography>
//                                     </Stack>
//                                 </form>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Container>
//     );
// };

// export default SignUpView;














import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Define interfaces for the component props and form values
interface SignUpProps {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    loader: boolean;
    loader1: boolean;
    handleShowpwd: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    singupHandler: (values: FormValues) => void;
    onChangeHandler: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const validationSchema = yup.object({
    firstName: yup.string()
        .required('Initials Required'),
    lastName: yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field')
        .required('Last Name is Required'),
    email: yup.string()
        .required('E-mail is Required')
        .email('Please enter valid e-mail')
        .trim(),
    phone: yup.string()
        .required('Contact Number is Required')
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please enter valid contact number')
        .min(10, 'Invalid contact number')
        .max(12, 'Please enter valid contact number'),
});

const SignUpView: React.FC<SignUpProps> = ({
    firstName,
    lastName,
    phone,
    email,
    loader,
    loader1,
    handleShowpwd,
    handleChange,
    singupHandler,
    onChangeHandler,
}) => {
    const [memberType, setMemberType] = useState<'existing' | 'new' | ''>('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [memberNumber, setMemberNumber] = useState('');

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            singupHandler(values);
        },
    });

    return (
        <Container maxWidth="lg" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
            p: 2
        }}>
            <Card elevation={3}>
                <CardContent>
                    <Box sx={{ p: 3 }}
                    >
                        <Grid container spacing={6}>  {/* Increased spacing from 4 to 6 */}
                            {/* Membership Type Selection */}
                            <Grid item xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        border: '1px solid #0d6efd',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Are You An Existing Member?
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            value={memberType}
                                            onChange={(e) => setMemberType(e.target.value as 'existing' | 'new')}
                                            sx={{
                                                justifyContent: 'center',
                                                '& .MuiFormControlLabel-root': {
                                                    mx: 4
                                                }
                                            }}
                                        >
                                            <FormControlLabel value="existing" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="new" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Card>
                            </Grid>

                            {/* Left Column - Existing Member */}
                            <Grid item xs={12} md={6} sx={{ pr: { md: 4 } }}>  {/* Added right padding */}
                                <Typography variant="h6" gutterBottom>
                                    Sign Up Using Member Number
                                </Typography>
                                <Stack spacing={2} direction="row" alignItems="flex-start">
                                    <TextField
                                        fullWidth
                                        placeholder="Member Number *"
                                        disabled={memberType !== 'existing'}
                                        value={memberNumber}
                                        onChange={(e) => setMemberNumber(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        disabled={!memberNumber || memberType !== 'existing' || loader1}
                                        onClick={handleShowpwd}
                                        sx={{ mr: { md: 2 } }}  /* Added right margin on medium and up screens */
                                    >
                                        {loader1 ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}
                                    </Button>
                                </Stack>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    You'll receive a password to your email
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Already have an account? <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
                                </Typography>

                                {/* Contact Information Section */}
                                <Box sx={{ mt: 26, textAlign: 'left' }}>
                                    <img
                                        src='/src/assets/images/New-CSSL-Logo.png'
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

                            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

                            {/* Right Column - New Member */}
                            <Grid item xs={12} md={5}>
                                <Typography variant="h6" gutterBottom>
                                    Sign Up Using Email Address
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            id="firstName"
                                            name="firstName"
                                            label="Initials *"
                                            disabled={memberType !== 'new'}
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                        <TextField
                                            fullWidth
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name *"
                                            disabled={memberType !== 'new'}
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email *"
                                            disabled={memberType !== 'new'}
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            name="phone"
                                            label="Contact Number *"
                                            disabled={memberType !== 'new'}
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                        <FormControl error={!termsAccepted && memberType === 'new'}>
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={termsAccepted}
                                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                                        disabled={memberType !== 'new'}
                                                    />
                                                }
                                                label="Agree to the Terms and Conditions"
                                            />
                                            {!termsAccepted && memberType === 'new' && (
                                                <FormHelperText>Please accept the terms and conditions</FormHelperText>
                                            )}
                                        </FormControl>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={!termsAccepted || memberType !== 'new' || loader}
                                        >
                                            {loader ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                                        </Button>
                                        <Typography variant="body2">
                                            Already have an account? <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
                                        </Typography>
                                    </Stack>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default SignUpView;