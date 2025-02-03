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
import AlertAcademicQualificationDelete from './DeleteAcademicQualification';

// assets
import { DeleteFilled, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

// types
import { dispatch } from 'store';
import { AcademicQualification } from 'types/academic-qualification';
import { addAcademicQualification, updateAcademicQualification } from 'store/reducers/academic-qualification';

// constant
const getInitialValues = (AcademicQualifications: FormikValues | null) => {
    const newAcademicQualification = {
        actlAcademicQualificationId: undefined,
        instituteName: '',
        otherInstituteName: '',
        qualificationName: '',
        otherqualificationName: '',
        employmentType: '',
        instituteAddress: '',
        fromDate: null,
        toDate: null,
        receivedDate: null,
        cv: null
    };

    if (AcademicQualifications) {
        return _.merge({}, newAcademicQualification, AcademicQualifications);
    }

    return newAcademicQualification;
};

// Member Type options
const instituteName = [
    { value: 'University of Colombo', label: 'University of Colombo' },
    { value: 'University of Peradeniya', label: 'University of Peradeniya' },
    { value: 'University of Ruhuna', label: 'University of Ruhuna' },
    { value: 'University of Kelaniya', label: 'University of Kelaniya' },
    { value: 'University of Moratuwa', label: 'University of Moratuwa' },
    { value: 'University of Sri Jayewardenepura', label: 'University of Sri Jayewardenepura' },
    { value: 'University of Jaffna', label: 'University of Jaffna' },
    { value: 'Rajarata University', label: 'Rajarata University' },
    { value: 'Wayamba University of Sri Lanka', label: 'Wayamba University of Sri Lanka' },
    { value: 'Sabaragamuwa University', label: 'Sabaragamuwa University' },
    { value: 'Open University of Sri Lanka', label: 'Open University of Sri Lanka' },
    { value: 'Eastern University of Sri Lanka', label: 'Eastern University of Sri Lanka' },
    { value: 'Sri Lanka Institute of Information Technology', label: 'Sri Lanka Institute of Information Technology' },
    { value: 'General Sir John Kotelawala Defence University', label: 'General Sir John Kotelawala Defence University' }
];

// Qualification options
const qualificationNames = [
    { value: 'Other', label: 'Other' },
    { value: 'Certificate (GCE O/L or Equ', label: 'Certificate (GCE O/L or Equ' },
    { value: 'Advanced Certificate (GCE A/L or Equivalent)', label: 'Advanced Certificate (GCE A/L or Equivalent)' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Higher Diploma', label: 'Higher Diploma' },
    { value: 'Bachelors', label: 'Bachelors' },
    { value: 'Bachelors Honours', label: 'Bachelors Honours' },
    { value: 'Postgraduate Certificate', label: 'Postgraduate Certificate' }
];

const employmentTypes = [
    { value: 'Full time', label: 'Full time' },
    { value: 'Part time', label: 'Part time' }
];

export interface Props {
    AcademicQualifications?: AcademicQualification;
    onCancel: () => void;
}

const AddEditAcademicQualification = ({ AcademicQualifications, onCancel }: Props) => {
    const isCreating = !AcademicQualifications;
    const [openAlert, setOpenAlert] = useState(false);
    const [cvFileName, setCvFileName] = useState('');

    const AcademicQualificationSchema = yup.object().shape({
        instituteName: yup.string().required('Institute Name is required'),
        otherInstituteName: yup.string().when('instituteName', {
            is: 'Other',
            then: () => yup.string().required('Institute Name is required'),
            otherwise: () => yup.string()
        }),
        qualificationName: yup.string().required('Institute Name is required'),
        otherqualificationName: yup.string().when('qualificationName', {
            is: 'Other',
            then: () => yup.string().required('Institute Name is required'),
            otherwise: () => yup.string()
        }),
        employmentType: yup.string().required('Employment Type is required'),
        instituteAddress: yup.string().required('instituteAddress is required'),
        fromDate: yup.date()
            .required('From Date is required')
            .max(new Date(), 'From Date cannot be in the future'),
        toDate: yup.date()
            .required('To Date is required')
            .max(new Date(), 'To Date cannot be in the future')
            .min(yup.ref('fromDate'), 'To Date must be after From Date'),
        receivedDate: yup.date()
            .required('Received Date is required')
            .max(new Date(), 'Received Date cannot be in the future'),
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
        initialValues: getInitialValues(AcademicQualifications!),
        validationSchema: AcademicQualificationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (AcademicQualifications) {
                    dispatch(
                        updateAcademicQualification({
                            ...values
                        })
                    );
                } else {
                    dispatch(
                        addAcademicQualification({
                            actlAcademicQualificationId: values.actlAcademicQualificationId,
                            instituteName: values.instituteName,
                            employmentType: values.employmentType,
                            qualificationName: values.qualificationName,
                            instituteAddress: values.otherqualificationName,
                            fromDate: values.fromDate,
                            toDate: values.toDate,
                            receivedDate: values.receivedDate,
                            cv: values.cv,
                            otherInstituteName: values.instituteName === 'Other' ? values.otherInstituteName : undefined,
                            otherqualificationName: values.qualificationName === 'Other' ? values.otherqualificationName : undefined
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
                        <DialogTitle>{AcademicQualifications ? 'Edit Academic Qualification' : 'Add Academic Qualification'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="instituteName">Institute Name (If not found, Please select Other)<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="instituteName"
                                            {...getFieldProps('instituteName')}
                                            error={Boolean(touched.instituteName && errors.instituteName)}
                                        >
                                            {instituteName.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.instituteName && errors.instituteName && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.instituteName}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="otherInstituteName">Other Institute Name<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="otherInstituteName"
                                            placeholder="Enter Other Institute Name"
                                            {...getFieldProps('otherInstituteName')}
                                            error={Boolean(touched.otherInstituteName && errors.otherInstituteName)}
                                            helperText={touched.otherInstituteName && errors.otherInstituteName}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="qualificationName">Qualification Name<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="qualificationName"
                                            {...getFieldProps('qualificationName')}
                                            error={Boolean(touched.qualificationName && errors.qualificationName)}
                                        >
                                            {qualificationNames.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.qualificationName && errors.qualificationName && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.qualificationName}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="otherqualificationName">Other Qualification Name <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="otherqualificationName"
                                            placeholder="Enter Company Address"
                                            {...getFieldProps('otherqualificationName')}
                                            error={Boolean(touched.otherqualificationName && errors.otherqualificationName)}
                                            helperText={touched.otherqualificationName && errors.otherqualificationName}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="employmentType">Part time or Full time<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="employmentType"
                                            {...getFieldProps('employmentType')}
                                            error={Boolean(touched.employmentType && errors.employmentType)}
                                        >
                                            {employmentTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.employmentType && errors.employmentType && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.employmentType}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="instituteAddress">Institute Address <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="instituteAddress"
                                            placeholder="Enter Institute Address"
                                            {...getFieldProps('instituteAddress')}
                                            error={Boolean(touched.instituteAddress && errors.instituteAddress)}
                                            helperText={touched.instituteAddress && errors.instituteAddress}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="fromDate">From Date<span style={{ color: 'red' }}>*</span></InputLabel>
                                                <DatePicker
                                                    value={values.fromDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('fromDate', newValue);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: Boolean(touched.fromDate && errors.fromDate),
                                                            helperText: touched.fromDate && errors.fromDate
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="toDate">To Date<span style={{ color: 'red' }}>*</span></InputLabel>
                                                <DatePicker
                                                    value={values.toDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('toDate', newValue);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: Boolean(touched.toDate && errors.toDate),
                                                            helperText: touched.toDate && errors.toDate
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="receivedDate">Received Date<span style={{ color: 'red' }}>*</span></InputLabel>
                                                <DatePicker
                                                    value={values.receivedDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('receivedDate', newValue);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: Boolean(touched.receivedDate && errors.receivedDate),
                                                            helperText: touched.receivedDate && errors.receivedDate
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel>
                                            Upload Certificate (PDF only. Maximum file size is 5MB)
                                        </InputLabel>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<UploadOutlined />}
                                            >
                                                Upload Certificate
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
                                                    Download Certificate
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
                                        <Tooltip title="Delete AcademicQualification" placement="top">
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
                                            {AcademicQualifications ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertAcademicQualificationDelete title={''} open={openAlert} handleClose={handleAlertClose} id={AcademicQualifications.academicQualificationId!} />}
        </>
    );
};

export default AddEditAcademicQualification;
