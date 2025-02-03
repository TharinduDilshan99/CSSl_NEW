// material-ui
import { Button, Stack, Grid } from '@mui/material';

// project imports

import AcademicDetailsList from 'pages/forms/updateForm/AcademicQualification/list';
import AnimateButton from 'components/@extended/AnimateButton';
// import { useFormik } from 'formik';
// ==============================|| FORMS WIZARD ||============================== //

interface WorkingExperienceDetailsFormProps {
    handleNext: () => void;
    handleBack: () => void;
    setErrorIndex: (i: number | null) => void;
}

const NewEmployeForm = ({ handleNext, handleBack, setErrorIndex }: WorkingExperienceDetailsFormProps) => {
    // const formik = useFormik({

    //             handleNext();
    //     });

    return (
        <Grid container spacing={3}>
            <Grid container spacing={2.5} justifyContent="center">
                <Grid item xs={12} >
                    <AcademicDetailsList />
                </Grid>
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

    );
};

export default NewEmployeForm;