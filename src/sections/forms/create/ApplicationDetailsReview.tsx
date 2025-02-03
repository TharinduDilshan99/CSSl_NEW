// // material-ui
// import {
//     Autocomplete,
//     Checkbox,
//     FormControlLabel,
//     Grid,
//     List,
//     ListItem,
//     Stack,
//     TextField,
//     Theme,
//     Typography,
//     useMediaQuery
// } from '@mui/material';
// //import { Box } from '@mui/system';
// import { useTheme } from '@mui/material/styles';
// // third-party

// // project imports
// import MainCard from 'components/MainCard';
// import { useDispatch, useSelector } from 'store';
// // assets
// import { useEffect, useState } from 'react';
// //   import { fetchArtworksFdd } from 'store/reducers/artwork-availability';
// //   import { fetchBrandsFdd } from 'store/reducers/brand';
// //   import { fetchCategoryCodesFdd } from 'store/reducers/category';
//   import { fetchClusterCodesFdd } from 'store/reducers/cluster-code';
// //   import { fetchCountryCodesFdd } from 'store/reducers/country-code';
// //   import { fetchCustomerCodesFdd } from 'store/reducers/customer-code';
// //   import { fetchProductSpecificationsFdd } from 'store/reducers/product-specification';
// //   import { fetchQualityStandardsFdd } from 'store/reducers/qualityStandard';
// //   import { fetchSampleStagesFdd } from 'store/reducers/sample-stage';
// //   import { fetchSeasonsFdd } from 'store/reducers/season';
// import { ShippingData } from './ApplicationDetailsForm';
// import { EmployeeData } from './WorkExperienceDetailsForm';
// import { AcademicData } from './AcademicQualificationForm';
// import { ProffesionalData } from './ProffesionalMembershipForm';
// //   import InquiryDesignsOverview from 'sections/Inquiry/view/InquiryDesignsOverview';
// import { DesignProps } from './types/types';

// // data

// // types

// // ==============================|| ApplicationDEtailsReview ||==============================

// interface ApplicationDEtailsReviewProps {
//     shippingData: ShippingData;
//     employeeData: EmployeeData;
//     academicData: AcademicData;
//     proffesionalData: ProffesionalData;
//     // inquiryId?: number;
// }

// const ApplicationDEtailsReview = ({ shippingData, employeeData, academicData, proffesionalData }: ApplicationDEtailsReviewProps) => {
//     const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

//     const [designData, setDesignData] = useState<DesignProps[] | null>(null);

//     const theme = useTheme();
//     const dispatch = useDispatch();

//     //get cluster code
//     const { clusterCodeFdd, success } = useSelector((state) => state.clusterCode);
//     useEffect(() => {
//         dispatch(fetchClusterCodesFdd());
//     }, [success, dispatch]);


//     return (
//         <>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={12}>
//                     <MainCard title="Application Details">
//                         <List sx={{ py: 0 }}>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Cluster</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 id="clusterId"
//                                                 disabled
//                                                 value={clusterCodeFdd?.find((option: any) => option.clusterId === ShippingData.clusterId) || null}
//                                                 options={clusterCodeFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Cluster"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Season</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 id="clusterId"
//                                                 disabled
//                                                 value={seasonListFdd?.find((option: any) => option.seasonId === ShippingData.seasonId) || null}
//                                                 options={seasonListFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select season"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Inquiry Date</Typography>
//                                             <Typography>{ShippingData.date}</Typography>
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Brand Name</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 id="clusterId"
//                                                 disabled
//                                                 value={brandsFdd?.find((option: any) => option.brandId === ShippingData.brandName) || null}
//                                                 options={brandsFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select brand"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Country</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 id="clusterId"
//                                                 disabled
//                                                 value={countryCodesFdd?.find((option: any) => option.countryId === ShippingData.countryId) || null}
//                                                 options={countryCodesFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select country"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         </List>
//                     </MainCard>
//                 </Grid>
//                 <Grid item xs={12} md={12}>
//                     <MainCard title="Customer Information">
//                         <List sx={{ py: 0 }}>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Customer Reference No</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 id="clusterId"
//                                                 disabled
//                                                 value={customerCodesFdd?.find((option: any) => option.customerId === customerInformationData.customerRefNo) || null}
//                                                 options={customerCodesFdd || []}
//                                                 getOptionLabel={(item) => `${item.customerRefNo} - ${item.customerName}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select customer reference no"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Customer Date</Typography>
//                                             <Typography>{customerInformationData.customerDate}</Typography>
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         </List>
//                     </MainCard>
//                 </Grid>
//                 <Grid item xs={12} md={12}>
//                     <MainCard title="Sample Information">
//                         <List sx={{ py: 0 }}>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={6} md={6}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Sample Stage</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 disabled
//                                                 id="sampleStageId"
//                                                 value={sampleStageListFdd?.find((option) => option.stageId === sampleInformationData.sampleStageId) || null}
//                                                 options={sampleStageListFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Sample Stage"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={6} md={6}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Category</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 disabled
//                                                 id="categoryId"
//                                                 value={CategoryListFdd?.find((option) => option.categoryId === sampleInformationData.categoryId) || null}
//                                                 options={CategoryListFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Category"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={4} md={4}>
//                                         <FormControlLabel
//                                             control={
//                                                 <Checkbox

//                                                     color="primary"
//                                                     name="availabilityOfOriginalSample"
//                                                     checked={sampleInformationData.availabilityOfOriginalSample}
//                                                 />
//                                             }
//                                             label="Availability Of Original Sample"
//                                             labelPlacement='start'
//                                             sx={{ marginLeft: '0px' }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <FormControlLabel
//                                             control={
//                                                 <Checkbox

//                                                     color="primary"
//                                                     name="availabilityOfPackingInstruction"
//                                                     checked={sampleInformationData.availabilityOfPackingInstruction}
//                                                 />
//                                             }
//                                             label="Availability Of Packing Instruction"
//                                             labelPlacement='start'
//                                             sx={{ marginLeft: '0px' }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Quality Standard</Typography>
//                                             <Autocomplete
//                                                 disabled
//                                                 fullWidth
//                                                 id="qualityStandardId"
//                                                 value={qualityStandardListFdd?.find((option) => option.qualityId === sampleInformationData.qualityStandardId) || null}

//                                                 options={qualityStandardListFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Quality Standard"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={6} md={6}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Product Specification</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 disabled
//                                                 id="productSpecificationId"
//                                                 value={productSpecificationListFdd?.find((option) => option.productSpecId === sampleInformationData.productSpecificationId) || null}

//                                                 options={productSpecificationListFdd || []}
//                                                 getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Product Specification"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                     <Grid item xs={6} md={6}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Artwork Availability</Typography>
//                                             <Autocomplete
//                                                 fullWidth
//                                                 disabled
//                                                 id="artworkAvailabilityId"
//                                                 value={artworkListFdd?.find((option) => option.artworkId === sampleInformationData.artworkAvailabilityId) || null}

//                                                 options={artworkListFdd || []}
//                                                 getOptionLabel={(item) => `${item.description}`}
//                                                 renderInput={(params) => {
//                                                     return (
//                                                         <TextField
//                                                             {...params}
//                                                             placeholder="Select Artwork Availability"
//                                                             sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                                                         />
//                                                     )
//                                                 }}
//                                             />
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={12} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Remarks</Typography>
//                                             <Typography>{sampleInformationData.remarks}</Typography>
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         </List>
//                     </MainCard>
//                 </Grid>
//                 <Grid item xs={12} md={12}>
//                     <MainCard title="Design Information">
//                         <Grid item xs={12}>
//                             <Typography variant="h6">Designs</Typography>
//                             <InquiryDesignsOverview inquiryId={inquiryId} designData={designData} setDesignData={setDesignData} />
//                         </Grid>
//                     </MainCard>
//                 </Grid>
//                 <Grid item xs={12} md={12}>
//                     <MainCard title="Delivery Information">
//                         <List sx={{ py: 0 }}>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Customer Need Date</Typography>
//                                             <Typography>{deliveryInformationData.customerNeedDate}</Typography>
//                                         </Stack>
//                                     </Grid>
//                                     {/* <Grid item xs={4} md={4}>
//                       <Stack spacing={0.5}>
//                         <Typography color="secondary">Sample Size</Typography>
//                         <Autocomplete
//                           fullWidth
//                           id="clusterId"
//                           disabled
//                           value={sizeListFdd?.find((option: any) => option.sizeId === deliveryInformationData.sampleSize) || null}
//                           options={sizeListFdd || []}
//                           getOptionLabel={(item) => `${item.code} - ${item.description}`}
//                           renderInput={(params) => {
//                             return (
//                               <TextField
//                                 {...params}
//                                 placeholder="Select sample Size"
//                                 sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
//                               />
//                             )
//                           }}
//                         />
//                       </Stack>
//                     </Grid>
//                     <Grid item xs={4} md={4}>
//                       <Stack spacing={0.5}>
//                         <Typography color="secondary">Target Price</Typography>
//                         <Typography>{deliveryInformationData.targetPrice}</Typography>
//                       </Stack>
//                     </Grid> */}
//                                 </Grid>
//                             </ListItem>
//                             <ListItem divider={!matchDownMD}>
//                                 <Grid container spacing={3}>
//                                     {/* <Grid item xs={4} md={4}>
//                       <Stack spacing={0.5}>
//                         <Typography color="secondary">Sample Quantity</Typography>
//                         <Typography>{deliveryInformationData.sampleQuantity}</Typography>
//                       </Stack>
//                     </Grid> */}
//                                     <Grid item xs={4} md={4}>
//                                         <Stack spacing={0.5}>
//                                             <Typography color="secondary">Marketing Coordinator</Typography>
//                                             <Typography>{deliveryInformationData.marketingCoordinator}</Typography>
//                                         </Stack>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         </List>
//                     </MainCard>
//                 </Grid>
//                 {/* <Grid item xs={12} md={12}>
//             <MainCard title="Attachments Information">
//               <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '10vh', py: 2 }}>
//                 <Grid item xs={12}>
//                   <Box sx={{ width: { xs: 50, sm: 230 } }}>
//                     <img src={construction} alt="mantis" style={{ width: '100%', height: 'auto' }} />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={2} justifyContent="center" alignItems="center">
//                     <Typography align="center" variant="h4">
//                       Under Construction
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </MainCard>
//           </Grid> */}
//             </Grid>
//         </>
//     );
// }

// export default ApplicationDEtailsReview; 