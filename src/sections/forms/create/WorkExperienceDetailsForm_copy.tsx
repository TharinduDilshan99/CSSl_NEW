import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import { CloudUpload, Delete, Download } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
    companyName: yup.string().required('Member Type is required'),
    otherComName: yup.string().when('companyName', {
        is: 'Other',
        then: () => yup.string().required('Company Name is required'),
        otherwise: () => yup.string()
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
    })
});

export type EmployeeData = {
    companyName?: string;
    otherComName?: string;
    designation?: string;
    companyAddress?: string;
    contactNumber?: string;
    startDate?: string | Date | null;
    currentlyWorking?: boolean;
    endDate?: string | Date | null;
    cv?: {
        file: File;
        url: string;
        name: string;
    } | null;
};

interface WorkingExperienceDetailsFormProps {
    EmployeeData: EmployeeData;
    setEmployeeData: (d: EmployeeData) => void;
    handleNext: () => void;
    handleBack: () => void;
    setErrorIndex: (i: number | null) => void;
}

const WorkingExperienceDetailsForm = ({ EmployeeData, setEmployeeData, handleNext, handleBack, setErrorIndex }: WorkingExperienceDetailsFormProps) => {
    const formik = useFormik({
        initialValues: {
            companyName: EmployeeData.companyName || '',
            otherComName: EmployeeData.otherComName || '',
            designation: EmployeeData.designation || '',
            companyAddress: EmployeeData.companyAddress || '',
            contactNumber: EmployeeData.contactNumber || '',
            currentlyWorking: EmployeeData.currentlyWorking || false,
            startDate: EmployeeData.startDate ? new Date(EmployeeData.startDate) : null,
            endDate: EmployeeData.endDate ? new Date(EmployeeData.endDate) : null,
            cv: EmployeeData.cv || null
        },
        validationSchema,
        onSubmit: (values) => {
            const submissionData = {
                ...values,
                otherComName: values.companyName === 'Other' ? values.otherComName : undefined,
                endDate: values.currentlyWorking ? null : values.endDate
            };
            setEmployeeData(submissionData);
            handleNext();
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
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

    const handleCurrentlyWorkingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        formik.setFieldValue('currentlyWorking', isChecked);
        if (isChecked) {
            formik.setFieldValue('endDate', null);
        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Work Experience
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Company Name (If not found, please select Other)</InputLabel>
                            <Select
                                id="companyName"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                fullWidth
                            >
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="Olak Technologies (Pvt) Ltd">Olak Technologies (Pvt) Ltd</MenuItem>
                                <MenuItem value="virtusa">virtusa</MenuItem>
                                <MenuItem value="IFS">IFS</MenuItem>
                                <MenuItem value="99x">99x</MenuItem>
                                <MenuItem value="Computer Society of Sri Lanka">Computer Society of Sri Lanka</MenuItem>
                                <MenuItem value="One Billion tec">One Billion tec</MenuItem>
                                <MenuItem value="4 Axis Solution (Pvt) Ltd">4 Axis Solution (Pvt) Ltd</MenuItem>
                                <MenuItem value="Technical collage">Technical collage</MenuItem>
                                <MenuItem value="E-Traders (Pvt) Ltd">E-Traders (Pvt) Ltd</MenuItem>
                                <MenuItem value="SLIATE">SLIATE</MenuItem>
                                <MenuItem value="Mobitel">Mobitel</MenuItem>
                                <MenuItem value="John Keells">John Keells</MenuItem>
                                <MenuItem value="DFCC">DFCC</MenuItem>
                                <MenuItem value="ICT Option">ICT Option</MenuItem>
                            </Select>
                            {formik.touched.companyName && formik.errors.companyName && (
                                <Typography color="error" variant="caption">{formik.errors.companyName}</Typography>
                            )}
                        </Stack>
                    </Grid>

                    {formik.values.companyName === 'Other' && (
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>Other Company Name</InputLabel>
                                <TextField
                                    id="otherComName"
                                    name="otherComName"
                                    placeholder="Enter Company Name *"
                                    value={formik.values.otherComName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otherComName && Boolean(formik.errors.otherComName)}
                                    helperText={formik.touched.otherComName && formik.errors.otherComName}
                                    fullWidth
                                    autoComplete="off"
                                />
                            </Stack>
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Designation</InputLabel>
                            <TextField
                                id="designation"
                                name="designation"
                                placeholder="Designation *"
                                value={formik.values.designation}
                                onChange={formik.handleChange}
                                error={formik.touched.designation && Boolean(formik.errors.designation)}
                                helperText={formik.touched.designation && formik.errors.designation}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Company Address</InputLabel>
                            <TextField
                                id="companyAddress"
                                name="companyAddress"
                                placeholder="Company Address *"
                                value={formik.values.companyAddress}
                                onChange={formik.handleChange}
                                error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
                                helperText={formik.touched.companyAddress && formik.errors.companyAddress}
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.currentlyWorking}
                                    onChange={handleCurrentlyWorkingChange}
                                    name="currentlyWorking"
                                    color="primary"
                                />
                            }
                            label="I am currently working in this role"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Start Date</InputLabel>
                            <TextField
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formik.values.startDate ? new Date(formik.values.startDate).toISOString().split('T')[0] : ''}
                                onChange={formik.handleChange}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                    </Grid>
                    {!formik.values.currentlyWorking && (
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>End Date</InputLabel>
                                <TextField
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formik.values.endDate ? new Date(formik.values.endDate).toISOString().split('T')[0] : ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Stack>
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Upload Service Letter (PDF only. Maximum file size is 5MB)</InputLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUpload />}
                                    sx={{ flexGrow: 1 }}
                                >
                                    {formik.values.cv ? 'Change File' : 'Upload Service Letter'}
                                    <input
                                        type="file"
                                        hidden
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {formik.values.cv && (
                                    <>
                                        <Tooltip title="Download Service Letter">
                                            <IconButton
                                                onClick={handleFileDownload}
                                                color="primary"
                                                size="small"
                                            >
                                                <Download />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remove Service Letter">
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
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default WorkingExperienceDetailsForm;