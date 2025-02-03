import { useState } from 'react';

// material-ui
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Tooltip,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as yup from 'yup';

// project imports
import IconButton from 'components/@extended/IconButton';
import AlertApplicationDetailsDelete from './DeleteApplicationDetails';

// assets
import { DeleteFilled, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

// types
import { dispatch } from 'store';
import { ApplicationDetails } from 'types/application-details';
import { addApplicationDetails, updateApplicationDetails } from 'store/reducers/application-details';

// constant
const getInitialValues = (ApplicationDetailss: FormikValues | null) => {
    const newApplicationDetails = {
        actlApplicationDetailsId: undefined,
        memberType: '',
        title: '',
        nameWithInitials: '',
        lastName: '',
        fullName: '',
        nicPassport: '',
        contactNumber: '',
        dateOfBirth: null,
        email: '',
        address1: '',
        address2: '',
        address3: '',
        cv: null
    };

    if (ApplicationDetailss) {
        return _.merge({}, newApplicationDetails, ApplicationDetailss);
    }

    return newApplicationDetails;
};

// Member Type options
const memberTypes = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Student', label: 'Student' },
    { value: 'Fellow', label: 'Fellow' },
    { value: 'Affiliate', label: 'Affiliate' }
];

// Title options
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

export interface Props {
    ApplicationDetailss?: ApplicationDetails;
    onCancel: () => void;
}

const AddEditApplicationDetails = ({ ApplicationDetailss, onCancel }: Props) => {
    const isCreating = !ApplicationDetailss;
    const [openAlert, setOpenAlert] = useState(false);
    const [cvFileName, setCvFileName] = useState('');

    const ApplicationDetailsSchema = yup.object().shape({
        memberType: yup.string().required('Member Type is required'),
        title: yup.string().required('Title is required'),
        nameWithInitials: yup.string().required('Name with Initials is required'),
        lastName: yup.string().required('Last Name is required'),
        fullName: yup.string().required('Full Name is required'),
        nicPassport: yup.string()
            .required('NIC/Passport Number is required')
            .test('nic-format', 'Invalid NIC format', function (value) {
                if (!value) return false;
                return /^([0-9]{9}[VvXx]|[0-9]{12})$/.test(value);
            }),
        contactNumber: yup.string()
            .required('Contact Number is required')
            .matches(/^[0-9+\-\s()]+$/, 'Invalid contact number format')
            .min(10, 'Contact number must be at least 10 digits'),
        dateOfBirth: yup.date()
            .required('Date of Birth is required')
            .max(new Date(), 'Date of Birth cannot be in the future')
            .nullable(),
        email: yup.string()
            .required('Email is required')
            .email('Invalid email format'),
        address1: yup.string().required('Address Line 1 is required'),
        address2: yup.string().required('Address Line 2 is required'),
        address3: yup.string().required('Address Line 3 is required'),
        cv: yup.mixed()
            .test('fileSize', 'File size is too large (max 5MB)', function (value: any) {
                if (!value) return true;
                const file = value as File;
                return file.size <= 5 * 1024 * 1024;
            })
            .test('fileType', 'Only PDF files are allowed', function (value: any) {
                if (!value) return true;
                const file = value as File;
                return file.type === 'application/pdf';
            })
    });

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
        onCancel();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                formik.setFieldError('cv', 'Only PDF files are allowed');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                formik.setFieldError('cv', 'File size must not exceed 5MB');
                return;
            }
            formik.setFieldValue('cv', file);
            setCvFileName(file.name);
        }
    };

    const handleDownloadCV = () => {
        if (values.cv) {
            const url = URL.createObjectURL(values.cv);
            const link = document.createElement('a');
            link.href = url;
            link.download = cvFileName || 'cv.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const formik = useFormik({
        initialValues: getInitialValues(ApplicationDetailss!),
        validationSchema: ApplicationDetailsSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (ApplicationDetailss) {
                    dispatch(
                        updateApplicationDetails({
                            ...values
                        })
                    );
                } else {
                    dispatch(
                        addApplicationDetails({
                            actlApplicationDetailsId: values.actlApplicationDetailsId,
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
                        })
                    );
                }
                resetForm();
                setSubmitting(false);
                onCancel();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{ApplicationDetailss ? 'Edit Application Details' : 'Add Application Details'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="memberType">Member Type<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="memberType"
                                            {...getFieldProps('memberType')}
                                            error={Boolean(touched.memberType && errors.memberType)}
                                        >
                                            {memberTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.memberType && errors.memberType && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.memberType}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="title">Title<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="title"
                                            {...getFieldProps('title')}
                                            error={Boolean(touched.title && errors.title)}
                                        >
                                            {titles.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.title && errors.title && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.title}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="nameWithInitials">Name with Initials<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="nameWithInitials"
                                            placeholder="Enter Name with Initials"
                                            {...getFieldProps('nameWithInitials')}
                                            error={Boolean(touched.nameWithInitials && errors.nameWithInitials)}
                                            helperText={touched.nameWithInitials && errors.nameWithInitials}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="lastName">Last Name <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="lastName"
                                            placeholder="Enter Last Name"
                                            {...getFieldProps('lastName')}
                                            error={Boolean(touched.lastName && errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="fullName">Full Name<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="fullName"
                                            placeholder="Enter Full Name"
                                            {...getFieldProps('fullName')}
                                            error={Boolean(touched.fullName && errors.fullName)}
                                            helperText={touched.fullName && errors.fullName}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="nicPassport">NIC/Passport Number <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="nicPassport"
                                            placeholder="Enter NIC/Passport Number"
                                            {...getFieldProps('nicPassport')}
                                            error={Boolean(touched.nicPassport && errors.nicPassport)}
                                            helperText={touched.nicPassport && errors.nicPassport}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="contactNumber">Contact Number<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="contactNumber"
                                            placeholder="Enter Contact Number"
                                            {...getFieldProps('contactNumber')}
                                            error={Boolean(touched.contactNumber && errors.contactNumber)}
                                            helperText={touched.contactNumber && errors.contactNumber}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="dateOfBirth">Date of Birth<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <DatePicker
                                            value={values.dateOfBirth}
                                            onChange={(newValue) => {
                                                setFieldValue('dateOfBirth', newValue);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: Boolean(touched.dateOfBirth && errors.dateOfBirth),
                                                    helperText: touched.dateOfBirth && errors.dateOfBirth
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="email">Email<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            placeholder="Enter Email"
                                            {...getFieldProps('email')}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                            autoComplete="email"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="address1">Address Line 1<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="address1"
                                            placeholder="Enter Address Line 1"
                                            {...getFieldProps('address1')}
                                            error={Boolean(touched.address1 && errors.address1)}
                                            helperText={touched.address1 && errors.address1}
                                            autoComplete="shipping address-line1"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="address2">Address Line 2<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="address2"
                                            placeholder="Enter Address Line 2"
                                            {...getFieldProps('address2')}
                                            error={Boolean(touched.address2 && errors.address2)}
                                            helperText={touched.address2 && errors.address2}
                                            autoComplete="shipping address-line2"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="address3">Address Line 3<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="address3"
                                            placeholder="Enter Address Line 3"
                                            {...getFieldProps('address3')}
                                            error={Boolean(touched.address3 && errors.address3)}
                                            helperText={touched.address3 && errors.address3}
                                            autoComplete="shipping address-line3"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack spacing={1.25}>
                                        <InputLabel>
                                            Upload / Download CV (PDF only. Maximum file size is 5MB)
                                        </InputLabel>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<UploadOutlined />}
                                            >
                                                Upload CV
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept=".pdf"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                            {values.cv && (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<DownloadOutlined />}
                                                    onClick={handleDownloadCV}
                                                >
                                                    Download CV
                                                </Button>
                                            )}
                                        </Stack>
                                        {cvFileName && (
                                            <Typography variant="caption" color="textSecondary">
                                                Selected file: {cvFileName}
                                            </Typography>
                                        )}
                                        {touched.cv && errors.cv && (
                                            <Typography variant="caption" color="error">
                                                {errors.cv}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2.5 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    {!isCreating && (
                                        <Tooltip title="Delete ApplicationDetails" placement="top">
                                            <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                                                <DeleteFilled />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {/* <Button color="error" onClick={onCancel}>
                                            Cancel
                                        </Button> */}
                                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                                            {ApplicationDetailss ? 'Edit' : 'Save & Exit'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertApplicationDetailsDelete title={''} open={openAlert} handleClose={handleAlertClose} id={ApplicationDetailss.applicationDetailsId!} />}
        </>
    );
};

export default AddEditApplicationDetails;