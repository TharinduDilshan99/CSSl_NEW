import { useState, ReactNode } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
import ApplicationDetailsForm, { ShippingData } from './ApplicationDetailsForm';
import WorkExperienceDetailsForm from './NewEmployementDetailsForm';
import AcademicQualificationForm from './NewAcademicQualificationForm';
import ProffesionalMembershipForm from './NewProfessionalMembershipForm';
import ReviewMemberApplicationForm from './ReviewMemberApplicationForm';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Application Details', 'Employment details', 'Academic Qualfication', 'Proffesional Membership', 'Review Membrship Details'];

const getStepContent = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  shippingData: ShippingData,
  setShippingData: (d: ShippingData) => void
) => {
  switch (step) {
    case 0:
      return (
        <ApplicationDetailsForm
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          shippingData={shippingData}
          setShippingData={setShippingData}
        />
      );
    case 1:
      return (
        <WorkExperienceDetailsForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
        />
      );
    case 2:
      return (
        <AcademicQualificationForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
        />
      );
    case 3:
      return (
        <ProffesionalMembershipForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
        />
      );
    case 4:
      return <ReviewMemberApplicationForm />
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const AllApplicationDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard sx={{ mt: 5, mb: 5 }} title="Application Details">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps: { error?: boolean; optional?: ReactNode } = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Application Details Creation Successful !
            </Typography>
            {/* <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has
              shipped.
            </Typography> */}
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setShippingData({});
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, shippingData, setShippingData)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
};

export default AllApplicationDetails;


















// import { useState, ReactNode } from 'react';

// // material-ui
// import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// // project imports
// import ApplicationDetailsForm, { ShippingData } from './ApplicationDetailsForm';
// // import WorkExperienceDetailsForm, { EmployeeData } from './WorkExperienceDetailsForm';
// // import AcademicQualificationForm, { AcademicData } from './AcademicQualificationForm';
// // import ProffesionalMembershipForm, { ProffesionalData } from './ProffesionalMembershipForm';


// import EmployementDetailsList from 'pages/forms/updateForm/EmployementDetails/list';
// import AcademicQualificationList from 'pages/forms/updateForm/AcademicQualification/list';
// import ProffesionalMembershipList from 'pages/forms/updateForm/ProffesionalMembership/list';


// import MainCard from 'components/MainCard';
// import AnimateButton from 'components/@extended/AnimateButton';

// // step options
// const steps = ['Application Details', 'Employment details', 'Academic Qualfication', 'Proffesional Membership'];

// const getStepContent = (
//   step: number,
//   handleNext: () => void,
//   handleBack: () => void,
//   setErrorIndex: (i: number | null) => void,
//   shippingData: ShippingData,
//   setShippingData: (d: ShippingData) => void,
//   // EmployeeData: EmployeeData,
//   // setEmployeeData: (d: EmployeeData) => void,
//   // AcademicData: AcademicData,
//   // setAcademicData: (d: AcademicData) => void,
//   // ProffesionalData: ProffesionalData,
//   // setProffesionalData: (d: ProffesionalData) => void
// ) => {
//   switch (step) {
//     case 0:
//       return (
//         <ApplicationDetailsForm
//           handleNext={handleNext}
//           setErrorIndex={setErrorIndex}
//           shippingData={shippingData}
//           setShippingData={setShippingData}
//         />
//       );
//     case 1:
//       return (
//         <EmployementDetailsList />
//         // <WorkExperienceDetailsForm
//         //   handleNext={handleNext}
//         //   handleBack={handleBack}
//         //   setErrorIndex={setErrorIndex}
//         //   EmployeeData={EmployeeData}
//         //   setEmployeeData={setEmployeeData}
//         // />
//       );
//     case 2:
//       return (
//         <AcademicQualificationList />
//         // <AcademicQualificationForm
//         //   handleNext={handleNext}
//         //   handleBack={handleBack}
//         //   setErrorIndex={setErrorIndex}
//         //   AcademicData={AcademicData}
//         //   setAcademicData={setAcademicData}
//         // />
//       );
//     case 3:
//       return (
//         <ProffesionalMembershipList />
//         // <ProffesionalMembershipForm
//         //   handleNext={handleNext}
//         //   handleBack={handleBack}
//         //   setErrorIndex={setErrorIndex}
//         //   ProffesionalData={ProffesionalData}
//         //   setProffesionalData={setProffesionalData}
//         // />
//       );
//     default:
//       throw new Error('Unknown step');
//   }
// };

// // ==============================|| FORMS WIZARD - VALIDATION ||============================== //

// const AllApplicationDetails = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [shippingData, setShippingData] = useState({});
//   // const [EmployeeData, setEmployeeData] = useState({});
//   // const [AcademicData, setAcademicData] = useState({});
//   // const [ProffesionalData, setProffesionalData] = useState({});
//   const [errorIndex, setErrorIndex] = useState<number | null>(null);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//     setErrorIndex(null);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <MainCard sx={{ mt: 5, mb: 5 }} title="Application Details">
//       <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//         {steps.map((label, index) => {
//           const labelProps: { error?: boolean; optional?: ReactNode } = {};

//           if (index === errorIndex) {
//             labelProps.optional = (
//               <Typography variant="caption" color="error">
//                 Error
//               </Typography>
//             );

//             labelProps.error = true;
//           }

//           return (
//             <Step key={label}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       <>
//         {activeStep === steps.length ? (
//           <>
//             <Typography variant="h5" gutterBottom>
//               Thank you for your order.
//             </Typography>
//             <Typography variant="subtitle1">
//               Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has
//               shipped.
//             </Typography>
//             <Stack direction="row" justifyContent="flex-end">
//               <AnimateButton>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => {
//                     setShippingData({});
//                     // setEmployeeData({});
//                     // setAcademicData({});
//                     // setProffesionalData({});
//                     setActiveStep(0);
//                   }}
//                   sx={{ my: 3, ml: 1 }}
//                 >
//                   Reset
//                 </Button>
//               </AnimateButton>
//             </Stack>
//           </>
//         ) : (
//           <>
//             {/* {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, shippingData, setShippingData, EmployeeData, setEmployeeData, AcademicData, setAcademicData, ProffesionalData, setProffesionalData)} */}
//             {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, shippingData, setShippingData)}
//             {activeStep === steps.length - 1 && (
//               <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
//                 {activeStep !== 0 && (
//                   <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
//                     Back
//                   </Button>
//                 )}
//                 <AnimateButton>
//                   <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
//                     {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                   </Button>
//                 </AnimateButton>
//               </Stack>
//             )}
//           </>
//         )}
//       </>
//     </MainCard>
//   );
// };

// export default AllApplicationDetails;

