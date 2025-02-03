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
    Tooltip,
    SelectChangeEvent
} from '@mui/material';
import { CloudUpload, Delete, Download } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';

// Add institute address mapping
const instituteAddresses: { [key: string]: string } = {
    "University of Colombo": "University of Colombo, 94, Cumarathunga Munidasa Mawatha, Colombo 03, Sri Lanka",
    "University of Peradeniya": "University of Peradeniya, Galaha Road, Peradeniya 20400, Sri Lanka",
    "University of Ruhuna": "University of Ruhuna, Wellamadama, Matara 81000, Sri Lanka",
    "University of Kelaniya": "University of Kelaniya, Dalugama, Kelaniya 11600, Sri Lanka",
    "University of Moratuwa": "University of Moratuwa, Bandaranayake Mawatha, Moratuwa 10400, Sri Lanka",
    "University of Sri Jayewardenepura": "University of Sri Jayewardenepura, Gangodawila, Nugegoda 10250, Sri Lanka",
    "University of Jaffna": "University of Jaffna, P.O. Box 57, Thirunelvely, Jaffna, Sri Lanka",
    "Rajarata University": "Rajarata University of Sri Lanka, Mihintale 50300, Sri Lanka",
    "Wayamba University of Sri Lanka": "Wayamba University of Sri Lanka, Kuliyapitiya 60200, Sri Lanka",
    "Sabaragamuwa University": "Sabaragamuwa University of Sri Lanka, P.O. Box 02, Belihuloya 70140, Sri Lanka",
    "Open University of Sri Lanka": "The Open University of Sri Lanka, Nawala, Nugegoda 10250, Sri Lanka",
    "Eastern University of Sri Lanka": "Eastern University of Sri Lanka, Vantharumoolai, Chenkalady 30350, Sri Lanka",
    "Sri Lanka Institute of Information Technology": "Sri Lanka Institute of Information Technology, New Kandy Road, Malabe 10115, Sri Lanka",
    "General Sir John Kotelawala Defence University": "General Sir John Kotelawala Defence University, Kandawala Road, Ratmalana 10390, Sri Lanka",
    "South Eastern University of Sri Lanka": "South Eastern University of Sri Lanka, University Park, Oluvil 32360, Sri Lanka",
    "Uva Wellassa University": "Uva Wellassa University, Passara Road, Badulla 90000, Sri Lanka",
    "National Institute of Fundamental Studies Sri Lanka": "National Institute of Fundamental Studies, Hantana Road, Kandy 20000, Sri Lanka",
    "Informatics Institute of Technology Sri Lanka": "Informatics Institute of Technology, 57, Ramakrishna Road, Colombo 06, Sri Lanka",
    "Sri Lanka Technological Campus": "Sri Lanka Technological Campus, Padukka 10500, Sri Lanka",
    "National Institute of Education Sri Lanka": "National Institute of Education, High Level Road, Maharagama 10280, Sri Lanka",
    "ESOFT Metro Campus": "ESOFT Metro Campus, 3rd Floor, 290 High Level Road, Colombo 05, Sri Lanka",
    "Industrial Technology Institute": "Industrial Technology Institute, 363, Bauddhaloka Mawatha, Colombo 07, Sri Lanka",
    "National Institute of Business Management": "National Institute of Business Management, 120/5, Wijerama Mawatha, Colombo 07, Sri Lanka",
    "NSBM Green University": "NSBM Green University, Mahenwatta, Pitipana, Homagama 10200, Sri Lanka",
    "CINEC Campus": "CINEC Campus, Millennium Drive, IT Park, Malabe 10115, Sri Lanka",
    "Asia Pacific Institute of Information Technology Sri Lanka": "Asia Pacific Institute of Information Technology, 388, Union Place, Colombo 02, Sri Lanka",
    "University of the Visual & Performing Arts": "University of the Visual & Performing Arts, 21, Albert Crescent, Colombo 07, Sri Lanka",
    "BMS Business Management School": "BMS Business Management School, 591, Galle Road, Colombo 06, Sri Lanka",
    "ANC Education": "ANC Education, 308/310, R.A. De Mel Mawatha, Colombo 03, Sri Lanka",
    "Sri Lanka Institute of Advanced Technological Education": "Sri Lanka Institute of Advanced Technological Education, Mahenwaththa, Pitipana, Homagama 10200, Sri Lanka",
    "Arthur C Clarke Institute of Modern Technologies": "Arthur C Clarke Institute of Modern Technologies, Katubedda, Moratuwa 10400, Sri Lanka",
    "Horizon Campus": "Horizon Campus, 88, Thimbirigasyaya Road, Colombo 05, Sri Lanka",
    "Australian College of Business and Technology": "Australian College of Business and Technology, 442, R.A. De Mel Mawatha, Colombo 03, Sri Lanka",
    "Sri Lanka Institute of Development Administration Colombo": "Sri Lanka Institute of Development Administration, 28/10, Malalasekera Mawatha, Colombo 07, Sri Lanka",
    "International Institute of Health Sciences": "International Institute of Health Sciences, 704, Negombo Road, Welisara 11300, Sri Lanka",
    "Buddhist & Pali University of Sri Lanka": "Buddhist & Pali University of Sri Lanka, 214, Bauddhaloka Mawatha, Colombo 07, Sri Lanka",
    "University of Vocational Technology Ratmalana": "University of Vocational Technology, 100, Kandawala Road, Ratmalana 10390, Sri Lanka",
    "American College of Higher Education": "American College of Higher Education, 36, Park Road, Colombo 05, Sri Lanka",
    "Sri Lanka Institute of Architects": "Sri Lanka Institute of Architects, 120/7, Vidya Mawatha, Colombo 07, Sri Lanka",
    "Institute of Engineering Technology": "Institute of Engineering Technology, 1B, Dharmapala Mawatha, Colombo 07, Sri Lanka",
    "South Asian Institute of Technology and Medicine Malabe": "South Asian Institute of Technology and Medicine, New Kandy Road, Malabe 10115, Sri Lanka",
    "Royal Institute of Colombo": "Royal Institute of Colombo, 189, Havelock Road, Colombo 05, Sri Lanka",
    "Imperial Institute of Higher Education": "Imperial Institute of Higher Education, 27, Railway Avenue, Colombo 05, Sri Lanka",
    "Aquinas College of Higher Studies Colombo": "Aquinas College of Higher Studies, 30, Maradana Road, Colombo 10, Sri Lanka",
    "Sri Lanka Press Institute": "Sri Lanka Press Institute, 96, Kirula Road, Colombo 05, Sri Lanka",
    "IDM Nations Campus": "IDM Nations Campus, 51/2, Rohini Road, Colombo 06, Sri Lanka",
    "Northshore College": "Northshore College, 100, Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka",
    "Saegis Campus": "Saegis Campus, 135, S De S Jayasinghe Mawatha, Nugegoda 10250, Sri Lanka",
    "Ocean University of Sri Lanka": "Ocean University of Sri Lanka, Crow Island, Mattakkuliya, Colombo 15, Sri Lanka",
    "Kaatsu International University Sri Lanka": "Kaatsu International University, 110, Elvitigala Mawatha, Colombo 08, Sri Lanka",
    "National Institute of Social Development": "National Institute of Social Development, 488A, Nawala Road, Rajagiriya 10107, Sri Lanka",
    "Sri Lanka International Buddhist Academy SIBA": "Sri Lanka International Buddhist Academy, 361, Kandy Road, Pallekele 20000, Sri Lanka",
    "Bhiksu University of Sri Lanka": "Bhiksu University of Sri Lanka, Puttalam Road, Anuradhapura 50000, Sri Lanka",
    "SLIIT Academy": "SLIIT Academy, New Kandy Road, Malabe 10115, Sri Lanka",
    "IUHS Campus": "IUHS Campus, 82, Ward Place, Colombo 07, Sri Lanka",
    "Nagananda International Institute for Buddhist Studies": "Nagananda International Institute for Buddhist Studies, 417, Bauddhaloka Mawatha, Colombo 07, Sri Lanka",
    "IESL College of Engineering": "IESL College of Engineering, 120/15, Wijerama Mawatha, Colombo 07, Sri Lanka",
    "Slintec Academy": "Slintec Academy, Nanotechnology & Science Park, Mahenwatte, Pitipana, Homagama 10200, Sri Lanka",
    "IDM University": "IDM University, 51/2, Rohini Road, Colombo 06, Sri Lanka",
    "ICBT": "ICBT Campus, 36A, Baden Powell Road, Moratuwa 10400, Sri Lanka"
};




const validationSchema = yup.object({
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
        .max(new Date(), 'Received Date cannot be in the future')
});

export type AcademicData = {
    instituteName?: string;
    otherInstituteName?: string;
    qualificationName?: string;
    otherqualificationName?: string;
    employmentType?: string;
    instituteAddress?: string;
    fromDate?: string | Date | null;
    toDate?: string | Date | null;
    receivedDate?: string | Date | null;
    cv?: {
        file: File;
        url: string;
        name: string;
    } | null;
};

interface WorkingExperienceDetailsFormProps {
    AcademicData: AcademicData;
    setAcademicData: (d: AcademicData) => void;
    handleNext: () => void;
    handleBack: () => void;
    setErrorIndex: (i: number | null) => void;
}

const WorkingExperienceDetailsForm = ({ AcademicData, setAcademicData, handleNext, handleBack, setErrorIndex }: WorkingExperienceDetailsFormProps) => {
    const formik = useFormik({
        initialValues: {
            instituteName: AcademicData.instituteName || '',
            otherInstituteName: AcademicData.otherInstituteName || '',
            qualificationName: AcademicData.qualificationName || '',
            otherqualificationName: AcademicData.otherqualificationName || '',
            employmentType: AcademicData.employmentType || '',
            instituteAddress: AcademicData.instituteAddress || '',
            fromDate: AcademicData.fromDate ? new Date(AcademicData.fromDate) : null,
            toDate: AcademicData.toDate ? new Date(AcademicData.toDate) : null,
            receivedDate: AcademicData.receivedDate ? new Date(AcademicData.receivedDate) : null,
            cv: AcademicData.cv || null
        },
        validationSchema,
        onSubmit: (values) => {
            const submissionData = {
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
            };
            setAcademicData(submissionData);
            handleNext();
        }
    });

    const handleInstituteNameChange = (event: SelectChangeEvent<string>) => {
        const instituteName = event.target.value;
        formik.setFieldValue('instituteName', instituteName);

        if (instituteName !== 'Other') {
            const address = instituteAddresses[instituteName] || '';
            formik.setFieldValue('instituteAddress', address);
        } else {
            formik.setFieldValue('instituteAddress', '');
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

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Academic Qualification
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Institute Name (If not found, Please select Other)</InputLabel>
                            <Select
                                id="instituteName"
                                name="instituteName"
                                value={formik.values.instituteName}
                                onChange={handleInstituteNameChange}
                                error={formik.touched.instituteName && Boolean(formik.errors.instituteName)}
                                fullWidth
                            >
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="University of Colombo">University of Colombo</MenuItem>
                                <MenuItem value="University of Peradeniya">University of Peradeniya</MenuItem>
                                <MenuItem value="University of Ruhuna">University of Ruhuna</MenuItem>
                                <MenuItem value="University of Kelaniya">University of Kelaniya</MenuItem>
                                <MenuItem value="University of Moratuwa">University of Moratuwa</MenuItem>
                                <MenuItem value="University of Sri Jayewardenepura">University of Sri Jayewardenepura</MenuItem>
                                <MenuItem value="University of Jaffna">University of Jaffna</MenuItem>
                                <MenuItem value="Rajarata University">Rajarata University</MenuItem>
                                <MenuItem value="Wayamba University of Sri Lanka">Wayamba University of Sri Lanka</MenuItem>
                                <MenuItem value="Sabaragamuwa University">Sabaragamuwa University</MenuItem>
                                <MenuItem value="Open University of Sri Lanka">Open University of Sri Lanka</MenuItem>
                                <MenuItem value="Eastern University of Sri Lanka">Eastern University of Sri Lanka</MenuItem>
                                <MenuItem value="Sri Lanka Institute of Information Technology">Sri Lanka Institute of Information Technology</MenuItem>
                                <MenuItem value="General Sir John Kotelawala Defence University">General Sir John Kotelawala Defence University</MenuItem>
                                <MenuItem value="South Eastern University of Sri Lanka">South Eastern University of Sri Lanka</MenuItem>
                                <MenuItem value="Uva Wellassa University">Uva Wellassa University</MenuItem>
                                <MenuItem value="National Institute of Fundamental Studies Sri Lanka">National Institute of Fundamental Studies Sri Lanka</MenuItem>
                                <MenuItem value="Informatics Institute of Technology Sri Lanka">Informatics Institute of Technology Sri Lanka</MenuItem>
                                <MenuItem value="Sri Lanka Technological Campus">Sri Lanka Technological Campus</MenuItem>
                                <MenuItem value="National Institute of Education Sri Lanka">National Institute of Education Sri Lanka</MenuItem>
                                <MenuItem value="ESOFT Metro Campus">ESOFT Metro Campus</MenuItem>
                                <MenuItem value="Industrial Technology Institute">Industrial Technology Institute</MenuItem>
                                <MenuItem value="National Institute of Business Management">National Institute of Business Management</MenuItem>
                                <MenuItem value="NSBM Green University">NSBM Green University</MenuItem>
                                <MenuItem value="CINEC Campus">CINEC Campus</MenuItem>
                                <MenuItem value="Asia Pacific Institute of Information Technology Sri Lanka">Asia Pacific Institute of Information Technology Sri Lanka</MenuItem>
                                <MenuItem value="University of the Visual & Performing Arts">University of the Visual & Performing Arts</MenuItem>
                                <MenuItem value="BMS Business Management School">BMS Business Management School</MenuItem>
                                <MenuItem value="ANC Education">ANC Education</MenuItem>
                                <MenuItem value="Sri Lanka Institute of Advanced Technological Education">Sri Lanka Institute of Advanced Technological Education</MenuItem>
                                <MenuItem value="Arthur C Clarke Institute of Modern Technologies">Arthur C Clarke Institute of Modern Technologies</MenuItem>
                                <MenuItem value="Horizon Campus">Horizon Campus</MenuItem>
                                <MenuItem value="Australian College of Business and Technology">Australian College of Business and Technology</MenuItem>
                                <MenuItem value="Sri Lanka Institute of Development Administration Colombo">Sri Lanka Institute of Development Administration Colombo</MenuItem>
                                <MenuItem value="International Institute of Health Sciences">International Institute of Health Sciences</MenuItem>
                                <MenuItem value="Buddhist & Pali University of Sri Lanka">Buddhist & Pali University of Sri Lanka</MenuItem>
                                <MenuItem value="University of Vocational Technology Ratmalana">University of Vocational Technology Ratmalana</MenuItem>
                                <MenuItem value="American College of Higher Education">American College of Higher Education</MenuItem>
                                <MenuItem value="Sri Lanka Institute of Architects">Sri Lanka Institute of Architects</MenuItem>
                                <MenuItem value="Institute of Engineering Technology">Institute of Engineering Technology</MenuItem>
                                <MenuItem value="South Asian Institute of Technology and Medicine Malabe">South Asian Institute of Technology and Medicine Malabe</MenuItem>
                                <MenuItem value="Royal Institute of Colombo">Royal Institute of Colombo</MenuItem>
                                <MenuItem value="Imperial Institute of Higher Education">Imperial Institute of Higher Education</MenuItem>
                                <MenuItem value="Aquinas College of Higher Studies Colombo">Aquinas College of Higher Studies Colombo</MenuItem>
                                <MenuItem value="Sri Lanka Press Institute">Sri Lanka Press Institute</MenuItem>
                                <MenuItem value="IDM Nations Campus">IDM Nations Campus</MenuItem>
                                <MenuItem value="Northshore College">Northshore College</MenuItem>
                                <MenuItem value="Saegis Campus">Saegis Campus</MenuItem>
                                <MenuItem value="Ocean University of Sri Lanka">Ocean University of Sri Lanka</MenuItem>
                                <MenuItem value="Kaatsu International University Sri Lanka">Kaatsu International University Sri Lanka</MenuItem>
                                <MenuItem value="National Institute of Social Development">National Institute of Social Development</MenuItem>
                                <MenuItem value="Sri Lanka International Buddhist Academy SIBA">Sri Lanka International Buddhist Academy SIBA</MenuItem>
                                <MenuItem value="Bhiksu University of Sri Lanka">Bhiksu University of Sri Lanka</MenuItem>
                                <MenuItem value="SLIIT Academy">SLIIT Academy</MenuItem>
                                <MenuItem value="IUHS Campus">IUHS Campus</MenuItem>
                                <MenuItem value="Nagananda International Institute for Buddhist Studies">Nagananda International Institute for Buddhist Studies</MenuItem>
                                <MenuItem value="IESL College of Engineering">IESL College of Engineering</MenuItem>
                                <MenuItem value="Slintec Academy">Slintec Academy</MenuItem>
                                <MenuItem value="IDM University">IDM University</MenuItem>
                                <MenuItem value="ICBT">ICBT</MenuItem>
                            </Select>
                            {formik.touched.instituteName && formik.errors.instituteName && (
                                <Typography color="error" variant="caption">{formik.errors.instituteName}</Typography>
                            )}
                        </Stack>
                    </Grid>

                    {formik.values.instituteName === 'Other' && (
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>Other Institute Name</InputLabel>
                                <TextField
                                    id="otherInstituteName"
                                    name="otherInstituteName"
                                    placeholder="Institute Name (Please enter if not in select box) *"
                                    value={formik.values.otherInstituteName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otherInstituteName && Boolean(formik.errors.otherInstituteName)}
                                    helperText={formik.touched.otherInstituteName && formik.errors.otherInstituteName}
                                    fullWidth
                                    autoComplete="off"
                                />
                            </Stack>
                        </Grid>
                    )}





                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Qualification</InputLabel>
                            <Select
                                id="qualificationName"
                                name="qualificationName"
                                value={formik.values.qualificationName}
                                onChange={formik.handleChange}
                                error={formik.touched.qualificationName && Boolean(formik.errors.qualificationName)}
                                fullWidth
                            >
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="Certificate (GCE O/L or Equ">Certificate (GCE O/L or Equivalent)</MenuItem>
                                <MenuItem value="Advanced Certificate (GCE A/L or Equivalent)">Advanced Certificate (GCE A/L or Equivalent)</MenuItem>
                                <MenuItem value="Diploma">Diploma</MenuItem>
                                <MenuItem value="Higher Diploma">Higher Diploma</MenuItem>
                                <MenuItem value="Bachelors">Bachelors</MenuItem>
                                <MenuItem value="Bachelors Honours">Bachelors Honours</MenuItem>
                                <MenuItem value="Postgraduate Certificate">Postgraduate Certificate</MenuItem>
                                <MenuItem value="Postgraduate Diploma">Postgraduate Diploma</MenuItem>
                                <MenuItem value="Masters by Course Work">Masters by Course Work</MenuItem>
                                <MenuItem value="Masters by Course Work and a Research Component">Masters by Course Work and a Research Component</MenuItem>
                                <MenuItem value="Master of Philosophy">Master of Philosophy</MenuItem>
                                <MenuItem value="Doctor of Philosophy/ MD with Board Certification/ Doctor of Letters/ Doctor of Science">Doctor of Philosophy/ MD with Board Certification/ Doctor of Letters/ Doctor of Science</MenuItem>
                            </Select>
                            {formik.touched.qualificationName && formik.errors.qualificationName && (
                                <Typography color="error" variant="caption">{formik.errors.qualificationName}</Typography>
                            )}
                        </Stack>
                    </Grid>

                    {formik.values.qualificationName === 'Other' && (
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>Other Qualification Name</InputLabel>
                                <TextField
                                    id="otherqualificationName"
                                    name="otherqualificationName"
                                    placeholder="Qualification Name (Please enter if not in select box) *"
                                    value={formik.values.otherqualificationName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otherqualificationName && Boolean(formik.errors.otherqualificationName)}
                                    helperText={formik.touched.otherqualificationName && formik.errors.otherqualificationName}
                                    fullWidth
                                    autoComplete="off"
                                />
                            </Stack>
                        </Grid>
                    )}


                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Part time or Full time</InputLabel>
                            <Select
                                id="employmentType"
                                name="employmentType"
                                value={formik.values.employmentType}
                                onChange={formik.handleChange}
                                error={formik.touched.employmentType && Boolean(formik.errors.employmentType)}
                                fullWidth
                            >
                                <MenuItem value="Full time">Full time</MenuItem>
                                <MenuItem value="Part time">Part time</MenuItem>
                            </Select>
                            {formik.touched.employmentType && formik.errors.employmentType && (
                                <Typography color="error" variant="caption">{formik.errors.employmentType}</Typography>
                            )}
                        </Stack>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <Stack spacing={0.5}>
                            <InputLabel>Institute Address</InputLabel>
                            <TextField
                                id="instituteAddress"
                                name="instituteAddress"
                                placeholder="Institute Address *"
                                value={formik.values.instituteAddress}
                                onChange={formik.handleChange}
                                error={formik.touched.instituteAddress && Boolean(formik.errors.instituteAddress)}
                                helperText={formik.touched.instituteAddress && formik.errors.instituteAddress}
                                fullWidth
                                autoComplete="given-name"
                                disabled={formik.values.instituteName !== 'Other'}
                            />
                        </Stack>
                    </Grid>


                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>From Date</InputLabel>
                                    <TextField
                                        id="fromDate"
                                        name="fromDate"
                                        type="date"
                                        value={formik.values.fromDate ? new Date(formik.values.fromDate).toISOString().split('T')[0] : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
                                        helperText={formik.touched.fromDate && formik.errors.fromDate}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>To Date</InputLabel>
                                    <TextField
                                        id="toDate"
                                        name="toDate"
                                        type="date"
                                        value={formik.values.toDate ? new Date(formik.values.toDate).toISOString().split('T')[0] : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.toDate && Boolean(formik.errors.toDate)}
                                        helperText={formik.touched.toDate && formik.errors.toDate}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Date Received</InputLabel>
                                    <TextField
                                        id="receivedDate"
                                        name="receivedDate"
                                        type="date"
                                        value={formik.values.receivedDate ? new Date(formik.values.receivedDate).toISOString().split('T')[0] : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.receivedDate && Boolean(formik.errors.receivedDate)}
                                        helperText={formik.touched.receivedDate && formik.errors.receivedDate}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
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

export default WorkingExperienceDetailsForm;