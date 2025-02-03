import {
    Button,
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
    membershipType: yup.string().required('Membership Type is required'),
    gradeMembership: yup.string().required('Grade / Membership is required'),
    methodOfEntry: yup.string().required('Method Of Entry is required'),
    address: yup.string().required('Address is required'),
    startDate: yup.date()
        .required('Start Date is required')
        .max(new Date(), 'Start Date cannot be in the future'),
    endDate: yup.date()
        .required('End Date is required')
        .max(new Date(), 'End Date cannot be in the future')
        .min(yup.ref('fromDate'), 'End Date must be after Start Date'),
});

export type ProffesionalData = {
    membershipType?: string;
    gradeMembership?: string;
    methodOfEntry?: string;
    address?: string;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    cv?: {
        file: File;
        url: string;
        name: string;
    } | null;
};

interface ProffesionalMembershipFormProps {
    ProffesionalData: ProffesionalData;
    setProffesionalData: (d: ProffesionalData) => void;
    handleNext: () => void;
    handleBack: () => void;
    setErrorIndex: (i: number | null) => void;
}

const ProffesionalMembershipForm = ({ ProffesionalData, setProffesionalData, handleNext, handleBack, setErrorIndex }: ProffesionalMembershipFormProps) => {
    const formik = useFormik({
        initialValues: {
            membershipType: ProffesionalData.membershipType || '',
            gradeMembership: ProffesionalData.gradeMembership || '',
            methodOfEntry: ProffesionalData.methodOfEntry || '',
            address: ProffesionalData.address || '',
            startDate: ProffesionalData.startDate ? new Date(ProffesionalData.startDate) : null,
            endDate: ProffesionalData.endDate ? new Date(ProffesionalData.endDate) : null,
            cv: ProffesionalData.cv || null
        },
        validationSchema,
        onSubmit: (values) => {
            const submissionData = {
                ...values,
                // otherComName: values.companyName === 'Other' ? values.otherComName : undefined,
                // endDate: values.currentlyWorking ? null : values.endDate
            };
            setProffesionalData(submissionData);
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

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Proffesional Membership
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Membership Type</InputLabel>
                            <TextField
                                id="membershipType"
                                name="membershipType"
                                placeholder="Membership Type *"
                                value={formik.values.membershipType}
                                onChange={formik.handleChange}
                                error={formik.touched.membershipType && Boolean(formik.errors.membershipType)}
                                helperText={formik.touched.membershipType && formik.errors.membershipType}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Grade / Membership Level</InputLabel>
                            <TextField
                                id="gradeMembership"
                                name="gradeMembership"
                                placeholder="Company Address *"
                                value={formik.values.gradeMembership}
                                onChange={formik.handleChange}
                                error={formik.touched.gradeMembership && Boolean(formik.errors.gradeMembership)}
                                helperText={formik.touched.gradeMembership && formik.errors.gradeMembership}
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Method Of Entry</InputLabel>
                            <Select
                                id="methodOfEntry"
                                name="methodOfEntry"
                                value={formik.values.methodOfEntry}
                                onChange={formik.handleChange}
                                error={formik.touched.methodOfEntry && Boolean(formik.errors.methodOfEntry)}
                                fullWidth
                            >
                                <MenuItem value="Examination">Examination</MenuItem>
                                <MenuItem value="Exemption">Exemption</MenuItem>
                            </Select>
                            {formik.touched.methodOfEntry && formik.errors.methodOfEntry && (
                                <Typography color="error" variant="caption">{formik.errors.methodOfEntry}</Typography>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Address (Optional)</InputLabel>
                            <TextField
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Stack>
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

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Upload Certificate (PDF only. Maximum file size is 5MB)</InputLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUpload />}
                                    sx={{ flexGrow: 1 }}
                                >
                                    {formik.values.cv ? 'Change File' : 'Upload Certificate'}
                                    <input
                                        type="file"
                                        hidden
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {formik.values.cv && (
                                    <>
                                        <Tooltip title="Download Certificate">
                                            <IconButton
                                                onClick={handleFileDownload}
                                                color="primary"
                                                size="small"
                                            >
                                                <Download />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remove Certificate">
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

export default ProffesionalMembershipForm;