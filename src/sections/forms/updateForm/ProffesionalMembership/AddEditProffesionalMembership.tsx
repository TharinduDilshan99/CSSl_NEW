// import { useState } from 'react';

// // material-ui
// import {
//     Button,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Divider,
//     Grid,
//     InputLabel,
//     Stack,
//     TextField,
//     Tooltip
// } from '@mui/material';
// // import { CloudUpload, Delete, Download } from '@mui/icons-material';
// import { LocalizationProvider } from '@mui/x-date-pickers';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import AnimateButton from 'components/@extended/AnimateButton';

// // third-party
// import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
// import _ from 'lodash';
// import * as Yup from 'yup';

// // project imports
// import IconButton from 'components/@extended/IconButton';
// import AlertApplicationDetailsDelete from './DeleteApplicationDetails';

// // assets
// import { DeleteFilled } from '@ant-design/icons';

// // types
// import { dispatch } from 'store';
// import { ApplicationDetails } from 'types/application-details';
// import { addApplicationDetails, updateApplicationDetails } from 'store/reducers/application-details';


// // constant
// const getInitialValues = (ApplicationDetailss: FormikValues | null) => {
//     const newApplicationDetails = {
//         actlApplicationDetailsId: undefined,
//         ApplicationDetailsId: undefined,
//         applicationDetailsCode: '',
//         description: '',
//         applicationDetailsName: '',

//     };

//     if (ApplicationDetailss) {
//         return _.merge({}, newApplicationDetails, ApplicationDetailss);
//     }

//     return newApplicationDetails;
// };

// // ==============================|| ApplicationDetails ADD / EDIT ||============================== //

// export interface Props {
//     ApplicationDetailss?: ApplicationDetails;
//     onCancel: () => void;
// }

// const AddEditApplicationDetails = ({ ApplicationDetailss, onCancel }: Props) => {
//     const isCreating = !ApplicationDetailss;

//     const ApplicationDetailsSchema = Yup.object().shape({
//         applicationDetailsCode: Yup.string().max(255).required('Fuel Type Code is required.'),
//         description: Yup.string().max(255).required('Description is required'),
//         applicationDetailsName: Yup.string().max(255).required('Fuel Type Name is required'),
//         actlApplicationDetailsId: Yup.number().required('Actual Fuel Type Id is required'),

//     });

//     const [openAlert, setOpenAlert] = useState(false);

//     const handleAlertClose = () => {
//         setOpenAlert(!openAlert);
//         onCancel();
//     };

//     const formik = useFormik({
//         initialValues: getInitialValues(ApplicationDetailss!),
//         validationSchema: ApplicationDetailsSchema,
//         enableReinitialize: true,
//         onSubmit: (values, { setSubmitting, resetForm }) => {
//             try {
//                 if (ApplicationDetailss) {
//                     dispatch(
//                         updateApplicationDetails({
//                             ...values
//                         })
//                     );
//                 } else {
//                     dispatch(
//                         addApplicationDetails({
//                             applicationDetailsCode: values.applicationDetailsCode,
//                             description: values.description,
//                             applicationDetailsName: values.applicationDetailsName,
//                             actlApplicationDetailsId: values.actlApplicationDetailsId
//                         })
//                     );
//                 }
//                 resetForm();
//                 setSubmitting(false);
//                 onCancel();
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     });

//     const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

//     return (
//         <>
//             <FormikProvider value={formik}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//                         <DialogTitle>{ApplicationDetailss ? 'Edit Fuel Type Details' : 'Add Fuel Type Details'}</DialogTitle>
//                         <Divider />
//                         <DialogContent sx={{ p: 2.5 }}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={12}>
//                                     <Stack spacing={1.25}>
//                                         <InputLabel htmlFor="applicationDetailsCode">Fuel Type Code <span style={{ color: 'red' }}>*</span></InputLabel>
//                                         <TextField
//                                             fullWidth
//                                             id="applicationDetailsCode"
//                                             placeholder="Enter Fuel Type Code"
//                                             {...getFieldProps('applicationDetailsCode')}
//                                             error={Boolean(touched.applicationDetailsCode && errors.applicationDetailsCode)}
//                                             helperText={touched.applicationDetailsCode && errors.applicationDetailsCode}
//                                         />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Stack spacing={1.25}>
//                                         <InputLabel htmlFor="applicationDetailsName">Fuel Type Name <span style={{ color: 'red' }}>*</span></InputLabel>
//                                         <TextField
//                                             fullWidth
//                                             id="applicationDetailsName"
//                                             placeholder="Enter Fuel Type Name"
//                                             {...getFieldProps('applicationDetailsName')}
//                                             error={Boolean(touched.applicationDetailsName && errors.applicationDetailsName)}
//                                             helperText={touched.applicationDetailsName && errors.applicationDetailsName}
//                                         />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Stack spacing={1.25}>
//                                         <InputLabel htmlFor="actlApplicationDetailsId">Actual Fuel Type ID <span style={{ color: 'red' }}>*</span></InputLabel>
//                                         <TextField
//                                             fullWidth
//                                             id="actlApplicationDetailsId"
//                                             type="number"
//                                             placeholder="Enter Actual Fuel Type ID"
//                                             {...getFieldProps('actlApplicationDetailsId')}
//                                             error={Boolean(touched.actlApplicationDetailsId && errors.actlApplicationDetailsId)}
//                                             helperText={touched.actlApplicationDetailsId && errors.actlApplicationDetailsId}
//                                         />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Stack spacing={1.25}>
//                                         <InputLabel htmlFor="description">Description <span style={{ color: 'red' }}>*</span></InputLabel>
//                                         <TextField
//                                             fullWidth
//                                             id="description"
//                                             placeholder="Enter Description"
//                                             {...getFieldProps('description')}
//                                             error={Boolean(touched.description && errors.description)}
//                                             helperText={touched.description && errors.description}
//                                         />
//                                     </Stack>
//                                 </Grid>
//                             </Grid>
//                         </DialogContent>
//                         <Divider />
//                         <DialogActions sx={{ p: 2.5 }}>
//                             <Grid container justifyContent="space-between" alignItems="center">
//                                 <Grid item>
//                                     {!isCreating && (
//                                         <Tooltip title="Delete ApplicationDetails" placement="top">
//                                             <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
//                                                 <DeleteFilled />
//                                             </IconButton>
//                                         </Tooltip>
//                                     )}
//                                 </Grid>
//                                 <Grid item>
//                                     <Stack direction="row" spacing={2} alignItems="center">
//                                         <Button color="error" onClick={onCancel}>
//                                             Cancel
//                                         </Button>
//                                         <Button type="submit" variant="contained" disabled={isSubmitting}>
//                                             {ApplicationDetailss ? 'Edit' : 'Add'}
//                                         </Button>
//                                     </Stack>
//                                 </Grid>
//                             </Grid>
//                         </DialogActions>
//                     </Form>
//                 </LocalizationProvider>
//             </FormikProvider>
//             {!isCreating && <AlertApplicationDetailsDelete title={''} open={openAlert} handleClose={handleAlertClose} id={ApplicationDetailss.applicationDetailsId!} />}
//         </>
//     );
// };

// export default AddEditApplicationDetails;











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
import AlertProffesionalQualificationDelete from './DeleteProffesionalMembership';

// assets
import { DeleteFilled, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

// types
import { dispatch } from 'store';
import { ProffesionalQualification } from 'types/proffesional-membership';
import { addProffesionalQualification, updateProffesionalQualification } from 'store/reducers/proffesional-membership';

// constant
const getInitialValues = (ProffesionalQualifications: FormikValues | null) => {
    const newProffesionalQualification = {
        actlProffesionalQualificationId: undefined,
        membershipType: '',
        gradeMembership: '',
        methodOfEntry: '',
        address: '',
        startDate: null,
        endDate: null,
        cv: null
    };

    if (ProffesionalQualifications) {
        return _.merge({}, newProffesionalQualification, ProffesionalQualifications);
    }

    return newProffesionalQualification;
};

const methodOfEntrys = [
    { value: 'Examination', label: 'Examination' },
    { value: 'Exemption', label: 'Exemption' }
];

export interface Props {
    ProffesionalQualifications?: ProffesionalQualification;
    onCancel: () => void;
}

const AddEditProffesionalQualification = ({ ProffesionalQualifications, onCancel }: Props) => {
    const isCreating = !ProffesionalQualifications;
    const [openAlert, setOpenAlert] = useState(false);
    const [cvFileName, setCvFileName] = useState('');

    const ProffesionalQualificationSchema = yup.object().shape({
        membershipType: yup.string().required('Membership Type is required'),
        gradeMembership: yup.string().required('Grade / Membership is required'),
        methodOfEntry: yup.string().required('Method Of Entry is required'),
        address: yup.string().required('Address is required'),
        startDate: yup.date()
            .required('Start Date is required')
            .max(new Date(), 'Start Date cannot be in the future'),
        endDate: yup.date()
            .required('End Date is required')
            .max(new Date(), 'End Date cannot be in the future'),
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
        initialValues: getInitialValues(ProffesionalQualifications!),
        validationSchema: ProffesionalQualificationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (ProffesionalQualifications) {
                    dispatch(
                        updateProffesionalQualification({
                            ...values
                        })
                    );
                } else {
                    dispatch(
                        addProffesionalQualification({
                            membershipType: values.membershipType,
                            gradeMembership: values.gradeMembership,
                            methodOfEntry: values.methodOfEntry,
                            address: values.address,
                            startDate: values.startDate,
                            endDate: values.endDate,
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
                        <DialogTitle>{ProffesionalQualifications ? 'Edit Proffesional Membership' : 'Add Proffesional Membership'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={1}>

                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="membershipType">Membership Type<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="membershipType"
                                            placeholder="Enter Membership Type"
                                            {...getFieldProps('membershipType')}
                                            error={Boolean(touched.membershipType && errors.membershipType)}
                                            helperText={touched.membershipType && errors.membershipType}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="gradeMembership">Grade / Membership Level<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="gradeMembership"
                                            placeholder="Enter Grade / Membership Level"
                                            {...getFieldProps('gradeMembership')}
                                            error={Boolean(touched.gradeMembership && errors.gradeMembership)}
                                            helperText={touched.gradeMembership && errors.gradeMembership}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="methodOfEntry">Method Of Entry<span style={{ color: 'red' }}>*</span></InputLabel>
                                        <Select
                                            fullWidth
                                            id="methodOfEntry"
                                            {...getFieldProps('methodOfEntry')}
                                            error={Boolean(touched.methodOfEntry && errors.methodOfEntry)}
                                        >
                                            {methodOfEntrys.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.methodOfEntry && errors.methodOfEntry && (
                                            <div style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '3px' }}>
                                                {errors.methodOfEntry}
                                            </div>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="address">Address <span style={{ color: 'red' }}>*</span></InputLabel>
                                        <TextField
                                            fullWidth
                                            id="address"
                                            placeholder="Enter Address"
                                            {...getFieldProps('address')}
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
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
                                        <Tooltip title="Delete ProffesionalQualification" placement="top">
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
                                            {ProffesionalQualifications ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertProffesionalQualificationDelete title={''} open={openAlert} handleClose={handleAlertClose} id={ProffesionalQualifications.proffesionalQualificationId!} />}
        </>
    );
};

export default AddEditProffesionalQualification;
