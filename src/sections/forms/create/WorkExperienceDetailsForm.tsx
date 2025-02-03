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

// Define an interface for company data structure
interface CompanyInfo {
    address: string;
    contactNumber: string;
}

// Define type for company data object
type CompanyDataType = {
    [key: string]: CompanyInfo;
};

// Company data for auto-filling
const companyData: CompanyDataType = {
    "Olak Technologies (Pvt) Ltd": {
        address: "No 25, Park Street, Colombo 02",
        contactNumber: "011 234 5678"
    },
    "virtusa": {
        address: "752, Dr Danister De Silva Mawatha, Colombo 09",
        contactNumber: "011 249 4949"
    },
    "IFS": {
        address: "IFS Head Office, 1, Level 18, Orion Tower, 736 Dr Danister De Silva Mawatha, Colombo",
        contactNumber: "0112 364 400"
    },
    "99x": {
        address: "116 Rosmead Pl, Colombo",
        contactNumber: "011 470 0700"
    },
    "Computer Society of Sri Lanka": {
        address: "275/75, Prof. Stanley Wijesundera Mawatha, Colombo 07",
        contactNumber: "011 234 4801"
    },
    "One Billion tec": {
        address: "35 Balapokuna Rd, Colombo 06",
        contactNumber: "011 255 6677"
    },
    "4 Axis Solution (Pvt) Ltd": {
        address: "No. 16, De Fonseka Place, Colombo 05",
        contactNumber: "011 702 1234"
    },
    "Technical collage": {
        address: "Main Street, Colombo 01",
        contactNumber: "011 123 4567"
    },
    "E-Traders (Pvt) Ltd": {
        address: "42 Galle Road, Colombo 03",
        contactNumber: "011 765 4321"
    },
    "SLIATE": {
        address: "320 T. B. Jayah Mawatha, Colombo 10",
        contactNumber: "011 242 1481"
    },
    "Mobitel": {
        address: "108 W A D Ramanayake Mawatha, Colombo 02",
        contactNumber: "011 471 1000"
    },
    "John Keells": {
        address: "117 Sir Chittampalam A. Gardiner Mawatha, Colombo 02",
        contactNumber: "011 230 6000"
    },
    "DFCC": {
        address: "73/5, Galle Road, Colombo 03",
        contactNumber: "011 244 2442"
    },
    "ICT Option": {
        address: "55 Duplication Road, Colombo 03",
        contactNumber: "011 567 8900"
    }
};

const validationSchema = yup.object({
    companyName: yup.string().required('Company Name is required'),
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
                companyName: values.companyName,
                designation: values.designation,
                companyAddress: values.companyAddress,
                contactNumber: values.contactNumber,
                currentlyWorking: values.currentlyWorking,
                startDate: values.startDate,
                otherComName: values.companyName === 'Other' ? values.otherComName : undefined,
                endDate: values.currentlyWorking ? null : values.endDate,
                cv: values.cv
            };
            setEmployeeData(submissionData);
            handleNext();
        }
    });

    const handleCompanyChange = (event: any) => {
        const selectedCompany = event.target.value;
        formik.setFieldValue('companyName', selectedCompany);

        // Auto-fill address and contact number if company is selected and not "Other"
        if (selectedCompany !== 'Other' && companyData[selectedCompany]) {
            formik.setFieldValue('companyAddress', companyData[selectedCompany].address);
            formik.setFieldValue('contactNumber', companyData[selectedCompany].contactNumber);
        } else {
            // Clear the fields if "Other" is selected
            formik.setFieldValue('companyAddress', '');
            formik.setFieldValue('contactNumber', '');
        }
    };

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
                                onChange={handleCompanyChange}
                                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                fullWidth
                            >
                                <MenuItem value="Other">Other</MenuItem>
                                {Object.keys(companyData).map((company) => (
                                    <MenuItem key={company} value={company}>{company}</MenuItem>
                                ))}
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