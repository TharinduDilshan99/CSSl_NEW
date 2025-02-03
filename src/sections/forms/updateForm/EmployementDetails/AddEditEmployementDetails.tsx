import { useState } from 'react';
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
    Typography,
    FormControlLabel,
    Checkbox
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
import AlertEmploymentDetailsDelete from './DeleteEmployementDetails';

// assets
import { DeleteFilled, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

// types
import { dispatch } from 'store';
import { EmploymentDetails } from 'types/employment-details';
import { addEmploymentDetails, updateEmploymentDetails } from 'store/reducers/employment-details';

// Company information mapping
const companyInformation = {
    'Olak Technologies (Pvt) Ltd': {
        address: '123 Tech Park, Colombo 03',
        contactNumber: '011 234 5678'
    },
    'virtusa': {
        address: 'Virtusa Pvt Ltd, 752, Dr Danister De Silva Mawatha, Colombo 09',
        contactNumber: '011 248 4700'
    },
    'IFS': {
        address: 'IFS Head Office, 1, Level 18, Orion Tower, 736 Dr Danister De Silva Mawatha, Colombo',
        contactNumber: '0112 364 400'
    },
    '99x': {
        address: '99X, No 45/1, Everton Road, Colombo 05',
        contactNumber: '011 283 9800'
    },
    'Computer Society of Sri Lanka': {
        address: 'CSSL, 275/75, Prof. Stanley Wijesundera Mawatha, Colombo 07',
        contactNumber: '011 234 5678'
    },
    'One Billion tec': {
        address: '789 Innovation Hub, Colombo 04',
        contactNumber: '011 345 6789'
    },
    '4 Axis Solution (Pvt) Ltd': {
        address: '4 Axis Building, 123 Business Avenue, Colombo 02',
        contactNumber: '011 456 7890'
    },
    'Technical collage': {
        address: 'Technical College Campus, Colombo 10',
        contactNumber: '011 567 8901'
    },
    'E-Traders (Pvt) Ltd': {
        address: 'E-Traders Tower, 456 Commercial Road, Colombo 11',
        contactNumber: '011 678 9012'
    },
    'SLIATE': {
        address: 'SLIATE Head Office, Colombo 07',
        contactNumber: '011 789 0123'
    },
    'Mobitel': {
        address: 'Mobitel Head Office, 108 W A D Ramanayake Mawatha, Colombo 02',
        contactNumber: '011 890 1234'
    },
    'John Keells': {
        address: '117 Sir Chittampalam A. Gardiner Mawatha, Colombo 02',
        contactNumber: '011 230 6000'
    },
    'DFCC': {
        address: '73/5, Galle Road, Colombo 03',
        contactNumber: '011 244 2442'
    },
    'ICT Option': {
        address: 'ICT Option Center, 321 Tech Street, Colombo 06',
        contactNumber: '011 012 3456'
    }
};

const companyNames = [
    { value: 'Other', label: 'Other' },
    { value: 'Olak Technologies (Pvt) Ltd', label: 'Olak Technologies (Pvt) Ltd' },
    { value: 'virtusa', label: 'virtusa' },
    { value: 'IFS', label: 'IFS' },
    { value: '99x', label: '99x' },
    { value: 'Computer Society of Sri Lanka', label: 'Computer Society of Sri Lanka' },
    { value: 'One Billion tec', label: 'One Billion tec' },
    { value: '4 Axis Solution (Pvt) Ltd', label: '4 Axis Solution (Pvt) Ltd' },
    { value: 'Technical collage', label: 'Technical collage' },
    { value: 'E-Traders (Pvt) Ltd', label: 'E-Traders (Pvt) Ltd' },
    { value: 'SLIATE', label: 'SLIATE' },
    { value: 'Mobitel', label: 'Mobitel' },
    { value: 'John Keells', label: 'John Keells' },
    { value: 'DFCC', label: 'DFCC' },
    { value: 'ICT Option', label: 'ICT Option' }
];

const getInitialValues = (EmploymentDetailss: FormikValues | null) => {
    const newEmploymentDetails = {
        actlEmploymentDetailsId: undefined,
        companyName: '',
        otherComName: '',
        designation: '',
        companyAddress: '',
        contactNumber: '',
        startDate: null,
        currentlyWorking: false,
        endDate: null,
        cv: null
    };

    if (EmploymentDetailss) {
        return _.merge({}, newEmploymentDetails, EmploymentDetailss);
    }

    return newEmploymentDetails;
};

export interface Props {
    EmploymentDetailss?: EmploymentDetails;
    onCancel: () => void;
}

const AddEditEmploymentDetails = ({ EmploymentDetailss, onCancel }: Props) => {
    const isCreating = !EmploymentDetailss;
    const [openAlert, setOpenAlert] = useState(false);
    const [cvFileName, setCvFileName] = useState('');

    const EmploymentDetailsSchema = yup.object().shape({
        companyName: yup.string().required('Company Name is required'),
        otherComName: yup.string().when('companyName', {
            is: 'Other',
            then: () => yup.string().required('Company Name is required'),
            otherwise: () => yup.string().nullable()
        }),
        designation: yup.string().required('Designation is required'),
        companyAddress: yup.string().required('Company Address is required'),
        contactNumber: yup.string()
            .required('Contact Number is required')
            .matches(/^[0-9+\-\s()]+$/, 'Invalid contact number format')
            .min(10, 'Contact number must be at least 10 digits'),
        startDate: yup.date()
            .required('Start Date is required')
            .max(new Date(), 'Start Date cannot be in the future'),
        currentlyWorking: yup.boolean(),
        endDate: yup.date().when('currentlyWorking', {
            is: false,
            then: () => yup.date()
                .required('End Date is required')
                .max(new Date(), 'End Date cannot be in the future')
                .min(yup.ref('startDate'), 'End Date must be after Start Date'),
            otherwise: () => yup.date().nullable()
        }),
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

    const handleCompanyChange = (event: any) => {
        const selectedCompany = event.target.value;
        formik.setFieldValue('companyName', selectedCompany);

        // Clear otherComName when switching companies
        if (selectedCompany !== 'Other') {
            formik.setFieldValue('otherComName', '');
            // Auto-fill address and contact number
            const companyData = companyInformation[selectedCompany as keyof typeof companyInformation];
            if (companyData) {
                formik.setFieldValue('companyAddress', companyData.address);
                formik.setFieldValue('contactNumber', companyData.contactNumber);
            }
        } else {
            // Clear the fields if "Other" is selected
            formik.setFieldValue('companyAddress', '');
            formik.setFieldValue('contactNumber', '');
        }
    };

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
        initialValues: getInitialValues(EmploymentDetailss!),
        validationSchema: EmploymentDetailsSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (EmploymentDetailss) {
                    dispatch(
                        updateEmploymentDetails({
                            ...values
                        })
                    );
                } else {
                    dispatch(
                        addEmploymentDetails({
                            actlEmploymentDetailsId: values.actlEmploymentDetailsId,
                            companyName: values.companyName,
                            designation: values.designation,
                            companyAddress: values.companyAddress,
                            contactNumber: values.contactNumber,
                            currentlyWorking: values.currentlyWorking,
                            startDate: values.startDate,
                            otherComName: values.companyName === 'Other' ? values.otherComName : undefined,
                            endDate: values.currentlyWorking ? null : values.endDate,
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

    const handleCurrentlyWorkingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isCurrentlyWorking = event.target.checked;
        setFieldValue('currentlyWorking', isCurrentlyWorking);
        if (isCurrentlyWorking) {
            setFieldValue('endDate', null);
        }
    };

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{EmploymentDetailss ? 'Edit Employment Details' : 'Add Employment Details'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="companyName">Company Name<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="companyName"
                                            value={values.companyName}
                                            onChange={handleCompanyChange}
                                            error={Boolean(touched.companyName && errors.companyName)}
                                        >
                                            {companyNames.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.companyName && errors.companyName && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.companyName}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>

                                {values.companyName === 'Other' && (
                                    <Grid item xs={12} sm={6}>
                                        <Stack spacing={1.25}>
                                            <InputLabel htmlFor="otherComName">Other Company Name<span style={{ color: 'red' }}>*</span></InputLabel>
                                            <TextField
                                                fullWidth
                                                id="otherComName"
                                                placeholder="Enter Other Company Name"
                                                {...getFieldProps('otherComName')}
                                                error={Boolean(touched.otherComName && errors.otherComName)}
                                                helperText={touched.otherComName && errors.otherComName}
                                            />
                                        </Stack>
                                    </Grid>
                                )}
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="designation">Designation <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="designation"
                                            placeholder="Enter Designation"
                                            {...getFieldProps('designation')}
                                            error={Boolean(touched.designation && errors.designation)}
                                            helperText={touched.designation && errors.designation}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="companyAddress">Company Address <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="companyAddress"
                                            placeholder="Enter Company Address"
                                            {...getFieldProps('companyAddress')}
                                            error={Boolean(touched.companyAddress && errors.companyAddress)}
                                            helperText={touched.companyAddress && errors.companyAddress}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="startDate">Start Date<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <DatePicker
                                            value={values.startDate}
                                            onChange={(newValue) => {
                                                setFieldValue('startDate', newValue);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: Boolean(touched.startDate && errors.startDate),
                                                    helperText: touched.startDate && errors.startDate
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.currentlyWorking}
                                                onChange={handleCurrentlyWorkingChange}
                                                name="currentlyWorking"
                                            />
                                        }
                                        label="I am currently working in this role"
                                    />
                                </Grid>
                                {!values.currentlyWorking && (
                                    <Grid item xs={12} sm={6}>
                                        <Stack spacing={1.25}>
                                            <InputLabel htmlFor="endDate">End Date<span style={{ color: 'red' }}>*</span></InputLabel>
                                            <DatePicker
                                                value={values.endDate}
                                                onChange={(newValue) => {
                                                    setFieldValue('endDate', newValue);
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: Boolean(touched.endDate && errors.endDate),
                                                        helperText: touched.endDate && errors.endDate
                                                    }
                                                }}
                                            />
                                        </Stack>
                                    </Grid>
                                )}
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel>
                                            Upload Service Letter (PDF only. Maximum file size is 5MB)
                                        </InputLabel>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<UploadOutlined />}
                                            >
                                                Upload Service Letter
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
                                                    Download Service Letter
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
                                        <Tooltip title="Delete EmploymentDetails" placement="top">
                                            <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                                                <DeleteFilled />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button color="error" onClick={onCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                                            {EmploymentDetailss ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertEmploymentDetailsDelete title={''} open={openAlert} handleClose={handleAlertClose} id={EmploymentDetailss.employmentDetailsId!} />}
        </>
    );
};

export default AddEditEmploymentDetails;
