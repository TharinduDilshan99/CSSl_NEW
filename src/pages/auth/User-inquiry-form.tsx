import React, { useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    Container,
    CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface Title {
    value: string;
    label: string;
}

interface MemberType {
    value: string;
    label: string;
}

interface InquiryFormProps {
    titles: Title[];
    memberTypes: MemberType[];
    onSubmit?: (values: FormValues) => void;
    initialData?: Partial<FormValues>;
}

interface FormValues {
    memberId: string;
    title: string;
    firstName: string;
    lastName: string;
    nic: string;
    designation: string;
    contactNo: string;
    memberTypeName: string;
    email: string;
    dob: Date | null;
    address: string;
    issue: string;
}

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('This field is Required')
        .max(40, 'Invalid name'),
    lastName: yup
        .string()
        .required('This field is Required')
        .max(40, 'Invalid name'),
    address: yup
        .string()
        .required('This field is Required'),
    nic: yup
        .string()
        .required('This field is Required')
        .min(10, 'NIC number must be 10-12 characters long')
        .max(12, 'NIC number must be 10-12 characters long'),
    email: yup
        .string()
        .required('E-mail is Required')
        .email('Please enter valid e-mail')
        .trim(),
    designation: yup
        .string()
        .required('This field is Required')
        .max(100, 'Invalid Field'),
    contactNo: yup
        .string()
        .required('This field is required')
        .matches(/^[0-9]+$/, 'Invalid number')
        .min(9, 'Must be more than 9 characters')
        .max(10, 'Please enter valid number'),
    dob: yup
        .date()
        .required('This Field is Required')
        .nullable(),
    issue: yup
        .string()
        .required('This field is Required')
});

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key for development

const DEFAULT_TITLES: Title[] = [
    { value: 'mr', label: 'Mr.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' }
];

const DEFAULT_MEMBER_TYPES: MemberType[] = [
    { value: 'student', label: 'Student' },
    { value: 'professional', label: 'Professional' },
    { value: 'associate', label: 'Associate' }
];

const CSSLInquiryForm: React.FC<InquiryFormProps> = ({
    titles = DEFAULT_TITLES,
    memberTypes = DEFAULT_MEMBER_TYPES,
    onSubmit = () => { },
    initialData = {}
}) => {
    const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCaptchaChange = (value: string | null) => {
        setIsCaptchaCompleted(!!value);
    };

    const handleCaptchaExpired = () => {
        setIsCaptchaCompleted(false);
    };

    const formik = useFormik({
        initialValues: {
            memberId: initialData?.memberId || '',
            title: initialData?.title || '',
            firstName: initialData?.firstName || '',
            lastName: initialData?.lastName || '',
            nic: initialData?.nic || '',
            designation: initialData?.designation || '',
            contactNo: initialData?.contactNo || '',
            memberTypeName: initialData?.memberTypeName || '',
            email: initialData?.email || '',
            dob: initialData?.dob || null,
            address: initialData?.address || '',
            issue: initialData?.issue || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!isCaptchaCompleted) {
                alert('Please complete the ReCAPTCHA');
                return;
            }

            try {
                setIsSubmitting(true);
                await onSubmit(values);
            } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred while submitting the form. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="md" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                p: 2
            }}>
                <Card>
                    <CardHeader
                        title={
                            <Box display="flex" alignItems="center">
                                <img
                                    src="/assets/images/client/New-CSSL-Logo.png"
                                    alt="CSSL Logo"
                                    style={{ width: 200, marginRight: 16 }}
                                />
                                <Typography variant="h5">CSSL Web Portal Inquiry Form</Typography>
                            </Box>
                        }
                        action={
                            <Typography color="error" variant="caption">
                                * Indicates required fields
                            </Typography>
                        }
                    />
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="memberId"
                                        name="memberId"
                                        label="Member Number"
                                        value={formik.values.memberId}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="title"
                                        name="title"
                                        select
                                        label="Title *"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    >
                                        {titles.map((title) => (
                                            <MenuItem key={title.value} value={title.value}>
                                                {title.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="firstName"
                                        name="firstName"
                                        label="First Name *"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name *"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="nic"
                                        name="nic"
                                        label="NIC or Passport No *"
                                        value={formik.values.nic}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nic && Boolean(formik.errors.nic)}
                                        helperText={formik.touched.nic && formik.errors.nic}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="designation"
                                        name="designation"
                                        label="Designation *"
                                        value={formik.values.designation}
                                        onChange={formik.handleChange}
                                        error={formik.touched.designation && Boolean(formik.errors.designation)}
                                        helperText={formik.touched.designation && formik.errors.designation}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="contactNo"
                                        name="contactNo"
                                        label="Contact Number *"
                                        value={formik.values.contactNo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                                        helperText={formik.touched.contactNo && formik.errors.contactNo}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="memberTypeName"
                                        name="memberTypeName"
                                        select
                                        label="Member Type"
                                        value={formik.values.memberTypeName}
                                        onChange={formik.handleChange}
                                    >
                                        {memberTypes.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email *"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <DatePicker
                                        label="Date of Birth *"
                                        value={formik.values.dob}
                                        onChange={(value) => formik.setFieldValue('dob', value)}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: formik.touched.dob && Boolean(formik.errors.dob),
                                                helperText: formik.touched.dob && formik.errors.dob as string
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address *"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="issue"
                                        name="issue"
                                        label="Briefly Explain about the issue *"
                                        multiline
                                        rows={4}
                                        value={formik.values.issue}
                                        onChange={formik.handleChange}
                                        error={formik.touched.issue && Boolean(formik.errors.issue)}
                                        helperText={formik.touched.issue && formik.errors.issue}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReCAPTCHA
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={handleCaptchaChange}
                                        onExpired={handleCaptchaExpired}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={!isCaptchaCompleted || isSubmitting}
                                        startIcon={isSubmitting && <CircularProgress size={20} />}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => window.location.href = '/'}
                                        disabled={isSubmitting}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </LocalizationProvider>
    );
};

export default CSSLInquiryForm;