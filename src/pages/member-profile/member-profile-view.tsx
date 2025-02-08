// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     CardHeader,
//     Grid,
//     TextField,
//     Modal,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     Paper,
//     CircularProgress
// } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';

// // Types
// interface MemberProfileProps {
//     data?: EmploymentDetail[];
//     academicData?: AcademicQualification[];
//     professionalData?: ProfessionalMembership[];
//     initialData?: {
//         headerData?: HeaderData;
//     };
//     loading?: boolean;
//     onSubmit: (values: any) => void;
//     onEditMemberProfile: (values: any) => void;
//     onEditMemberProfileDetails: (values: any) => void;
//     memberType?: Array<{ label: string; value: number }>;
// }

// interface HeaderData {
//     memNumber: string;
//     title: string;
//     firstname: string;
//     lastname: string;
//     MemberType: string;
//     DOB: string;
//     NIC: string;
//     addressNo: string;
//     addressSt: string;
//     addressCity: string;
//     Email: string;
//     Designation: string;
//     contactNumber: string;
// }

// interface EmploymentDetail {
//     id: string;
//     startdate: string;
//     enddate: string;
//     companyname: string;
//     desgnation: string;
//     adddress: string;
// }

// interface AcademicQualification {
//     id: string;
//     fromdate: string;
//     todate: string;
//     institutename: string;
//     qualificationname: string;
//     address: string;
// }

// interface ProfessionalMembership {
//     id: string;
//     startdate: string;
//     enddate: string;
//     entrymethod: string;
//     profession: string;
//     address: string;
// }

// interface TablePaginationState {
//     page: number;
//     rowsPerPage: number;
// }

// interface Column {
//     field: string;
//     headerName: string;
// }

// interface CustomTableProps {
//     data: any[];
//     columns: Column[];
//     pagination: TablePaginationState;
//     setPagination: React.Dispatch<React.SetStateAction<TablePaginationState>>;
// }

// const defaultHeaderData: HeaderData = {
//     memNumber: '',
//     title: '',
//     firstname: '',
//     lastname: '',
//     MemberType: '',
//     DOB: '',
//     NIC: '',
//     addressNo: '',
//     addressSt: '',
//     addressCity: '',
//     Email: '',
//     Designation: '',
//     contactNumber: ''
// };

// const validationSchema = Yup.object().shape({
//     contactNumber: Yup.string()
//         .required('Contact Number is required')
//         .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid contact number'),
//     addressNo: Yup.string().required('Address Line 1 is required').trim(),
//     addressSt: Yup.string().required('Address Line 2 is required').trim(),
//     designation: Yup.string()
//         .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed')
//         .required('Designation is required')
// });

// const CustomTable: React.FC<CustomTableProps> = ({
//     data,
//     columns,
//     pagination,
//     setPagination
// }) => {
//     const handlePageChange = (
//         _event: React.MouseEvent<HTMLButtonElement> | null,
//         newPage: number
//     ) => {
//         setPagination(prev => ({ ...prev, page: newPage }));
//     };

//     const handleRowsPerPageChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setPagination({
//             page: 0,
//             rowsPerPage: parseInt(event.target.value, 10)
//         });
//     };

//     return (
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//             <TableContainer sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.field}
//                                     sx={{
//                                         backgroundColor: 'primary.main',
//                                         color: 'common.white',
//                                         fontWeight: 'bold'
//                                     }}
//                                 >
//                                     {column.headerName}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data
//                             .slice(
//                                 pagination.page * pagination.rowsPerPage,
//                                 pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
//                             )
//                             .map((row, index) => (
//                                 <TableRow hover key={row.id || index}>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.field}>
//                                             {row[column.field] || ''}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 component="div"
//                 count={data.length}
//                 page={pagination.page}
//                 rowsPerPage={pagination.rowsPerPage}
//                 rowsPerPageOptions={[5, 10, 25]}
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//             />
//         </Paper>
//     );
// };

// const MemberProfileView: React.FC<MemberProfileProps> = ({
//     data = [],
//     academicData = [],
//     professionalData = [],
//     initialData = { headerData: defaultHeaderData },
//     loading = false,
//     onSubmit,
//     onEditMemberProfile,
//     onEditMemberProfileDetails,
//     memberType = []
// }) => {
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     // Safely access headerData with fallback to default values
//     const headerData = initialData?.headerData || defaultHeaderData;

//     // Pagination states
//     const [employmentPagination, setEmploymentPagination] = useState<TablePaginationState>({
//         page: 0,
//         rowsPerPage: 5
//     });
//     const [academicPagination, setAcademicPagination] = useState<TablePaginationState>({
//         page: 0,
//         rowsPerPage: 5
//     });
//     const [professionalPagination, setProfessionalPagination] = useState<TablePaginationState>({
//         page: 0,
//         rowsPerPage: 5
//     });

//     // Column definitions
//     const employmentColumns: Column[] = [
//         { field: 'startdate', headerName: 'Start Date' },
//         { field: 'enddate', headerName: 'End Date' },
//         { field: 'companyname', headerName: 'Company Name' },
//         { field: 'desgnation', headerName: 'Designation' },
//         { field: 'adddress', headerName: 'Address' }
//     ];

//     const academicColumns: Column[] = [
//         { field: 'fromdate', headerName: 'Start Date' },
//         { field: 'todate', headerName: 'End Date' },
//         { field: 'institutename', headerName: 'Institute' },
//         { field: 'qualificationname', headerName: 'Qualification' },
//         { field: 'address', headerName: 'Address' }
//     ];

//     const professionalColumns: Column[] = [
//         { field: 'startdate', headerName: 'Start Date' },
//         { field: 'enddate', headerName: 'End Date' },
//         { field: 'entrymethod', headerName: 'Institute/Body' },
//         { field: 'profession', headerName: 'Membership Name' },
//         { field: 'address', headerName: 'Address' }
//     ];

//     return (
//         <Box sx={{ p: 3 }}>
//             {/* User Account Details */}
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title="User Account Details" />
//                 <CardContent>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 fullWidth
//                                 label="Username"
//                                 value={headerData.firstname || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 fullWidth
//                                 label="Created At"
//                                 value={new Date().toLocaleDateString()}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 fullWidth
//                                 label="Expire Date"
//                                 value={new Date().toLocaleDateString()}
//                                 disabled
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             {/* Member Profile Details */}
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader
//                     title="Member Profile Details"
//                     action={
//                         <Button
//                             variant="contained"
//                             onClick={() => setIsEditModalOpen(true)}
//                         >
//                             Edit
//                         </Button>
//                     }
//                 />
//                 <CardContent>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Member No"
//                                 value={headerData.memNumber || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Title"
//                                 value={headerData.title || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 value={`${headerData.firstname || ''} ${headerData.lastname || ''}`}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Member Type"
//                                 value={headerData.MemberType || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Date Of Birth"
//                                 value={headerData.DOB || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Address"
//                                 value={`${headerData.addressNo || ''} ${headerData.addressSt || ''} ${headerData.addressCity || ''}`}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="NIC"
//                                 value={`${headerData.NIC || ''}`}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 value={headerData.Email || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Designation"
//                                 value={headerData.Designation || ''}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="contactNumber"
//                                 value={headerData.contactNumber || ''}
//                                 disabled
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             {/* Employment Details */}
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title="Employment Details" />
//                 <CardContent>
//                     {loading ? (
//                         <Box display="flex" justifyContent="center" p={2}>
//                             <CircularProgress />
//                         </Box>
//                     ) : (
//                         <CustomTable
//                             data={data}
//                             columns={employmentColumns}
//                             pagination={employmentPagination}
//                             setPagination={setEmploymentPagination}
//                         />
//                     )}
//                 </CardContent>
//             </Card>

//             {/* Academic Qualifications */}
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title="Academic Qualification Details" />
//                 <CardContent>
//                     {loading ? (
//                         <Box display="flex" justifyContent="center" p={2}>
//                             <CircularProgress />
//                         </Box>
//                     ) : (
//                         <CustomTable
//                             data={academicData}
//                             columns={academicColumns}
//                             pagination={academicPagination}
//                             setPagination={setAcademicPagination}
//                         />
//                     )}
//                 </CardContent>
//             </Card>

//             {/* Professional Memberships */}
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title="Professional Membership Details" />
//                 <CardContent>
//                     {loading ? (
//                         <Box display="flex" justifyContent="center" p={2}>
//                             <CircularProgress />
//                         </Box>
//                     ) : (
//                         <CustomTable
//                             data={professionalData}
//                             columns={professionalColumns}
//                             pagination={professionalPagination}
//                             setPagination={setProfessionalPagination}
//                         />
//                     )}
//                 </CardContent>
//             </Card>

//             {/* Edit Modal */}
//             <Modal
//                 open={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 aria-labelledby="edit-profile-modal"
//             >
//                 <Box sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: 400,
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: 1
//                 }}>
//                     <Formik
//                         initialValues={headerData}
//                         validationSchema={validationSchema}
//                         onSubmit={async (values, { setSubmitting }) => {
//                             setIsLoading(true);
//                             try {
//                                 await onEditMemberProfileDetails(values);
//                                 setIsEditModalOpen(false);
//                             } catch (error) {
//                                 console.error('Error updating profile:', error);
//                             } finally {
//                                 setIsLoading(false);
//                                 setSubmitting(false);
//                             }
//                         }}
//                     >
//                         {({ values, errors, touched, handleChange, handleBlur }) => (
//                             <Form>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             name="contactNumber"
//                                             label="Contact Number"
//                                             value={values.contactNumber || ''}
//                                             onChange={handleChange}
//                                             onBlur={handleBlur}
//                                             error={touched.contactNumber && Boolean(errors.contactNumber)}
//                                             helperText={touched.contactNumber && errors.contactNumber}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <Button
//                                             fullWidth
//                                             type="submit"
//                                             variant="contained"
//                                             disabled={isLoading}
//                                         >
//                                             {isLoading ? <CircularProgress size={24} /> : 'Update'}
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </Form>
//                         )}
//                     </Formik>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default MemberProfileView;

























import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    CircularProgress,
    MenuItem
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Types
interface MemberProfileProps {
    data?: EmploymentDetail[];
    academicData?: AcademicQualification[];
    professionalData?: ProfessionalMembership[];
    initialData?: {
        headerData?: HeaderData;
    };
    loading?: boolean;
    onSubmit: (values: any) => void;
    onEditMemberProfile: (values: any) => void;
    onEditMemberProfileDetails: (values: any) => void;
    memberType?: Array<{ label: string; value: number }>;
    schema_EditMemberProfile?: any;
    init_EditMemberProfileDetails?: any;
    EditMemberProfile_OnSubmit?: (values: any) => void | Promise<void>;
    loader3?: boolean;
}

interface HeaderData {
    memNumber: string;
    title: string;
    firstname: string;
    lastname: string;
    MemberType: string;
    DOB: string;
    NIC: string;
    addressNo: string;
    addressSt: string;
    addressCity: string;
    Email: string;
    Designation: string;
    contactNumber: string;
}

interface EmploymentDetail {
    id: string;
    startdate: string;
    enddate: string;
    companyname: string;
    desgnation: string;
    adddress: string;
}

interface AcademicQualification {
    id: string;
    fromdate: string;
    todate: string;
    institutename: string;
    qualificationname: string;
    address: string;
}

interface ProfessionalMembership {
    id: string;
    startdate: string;
    enddate: string;
    entrymethod: string;
    profession: string;
    address: string;
}

interface TablePaginationState {
    page: number;
    rowsPerPage: number;
}

interface Column {
    field: string;
    headerName: string;
}

interface CustomTableProps {
    data: any[];
    columns: Column[];
    pagination: TablePaginationState;
    setPagination: React.Dispatch<React.SetStateAction<TablePaginationState>>;
}

interface EditMemberProfileConfig {
    id: string;
    type: string;
    name: string;
    label: string;
    options?: Array<{ label: string; value: number }>;
    placeholder?: string;
    isClearable?: boolean;
    isSearchable?: boolean;
    contianerProps: {
        xs: number;
        sm: number;
        md: number;
    };
}

const defaultHeaderData: HeaderData = {
    memNumber: '',
    title: '',
    firstname: '',
    lastname: '',
    MemberType: '',
    DOB: '',
    NIC: '',
    addressNo: '',
    addressSt: '',
    addressCity: '',
    Email: '',
    Designation: '',
    contactNumber: ''
};

const validationSchema = Yup.object().shape({
    contactNumber: Yup.string()
        .required('Contact Number is required')
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid contact number'),
    addressNo: Yup.string().required('Address Line 1 is required').trim(),
    addressSt: Yup.string().required('Address Line 2 is required').trim(),
    designation: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed')
        .required('Designation is required')
});

const CustomTable: React.FC<CustomTableProps> = ({
    data,
    columns,
    pagination,
    setPagination
}) => {
    const handlePageChange = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPagination({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'common.white',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                pagination.page * pagination.rowsPerPage,
                                pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow hover key={row.id || index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {row[column.field] || ''}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                page={pagination.page}
                rowsPerPage={pagination.rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
};

const MemberProfileView: React.FC<MemberProfileProps> = ({
    data = [],
    academicData = [],
    professionalData = [],
    initialData = { headerData: defaultHeaderData },
    loading = false,
    onSubmit,
    onEditMemberProfile,
    onEditMemberProfileDetails,
    memberType = [],
    schema_EditMemberProfile,
    init_EditMemberProfileDetails,
    EditMemberProfile_OnSubmit,
    loader3 = false
}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const headerData = initialData?.headerData || defaultHeaderData;

    const [employmentPagination, setEmploymentPagination] = useState<TablePaginationState>({
        page: 0,
        rowsPerPage: 5
    });
    const [academicPagination, setAcademicPagination] = useState<TablePaginationState>({
        page: 0,
        rowsPerPage: 5
    });
    const [professionalPagination, setProfessionalPagination] = useState<TablePaginationState>({
        page: 0,
        rowsPerPage: 5
    });

    const CONFIG_EditMemberProfile: EditMemberProfileConfig[] = [
        {
            id: "designation",
            type: "text",
            name: "designation",
            label: "Designation",
            contianerProps: { xs: 4, sm: 4, md: 6 },
        },
        {
            id: "mem_type",
            type: "selectOpImproved",
            name: "mem_type",
            label: "Member Type *",
            options: memberType,
            placeholder: "Select Member Type",
            isClearable: true,
            isSearchable: true,
            contianerProps: { xs: 12, sm: 3, md: 3 },
        },
        {
            id: "remark",
            type: "text",
            name: "remark",
            label: "Remark",
            contianerProps: { xs: 4, sm: 4, md: 6 },
        },
        {
            id: "file",
            type: "file",
            name: "file",
            label: "Upload Service Letter *",
            contianerProps: { xs: 12, sm: 4, md: 4 },
        },
    ];

    const employmentColumns: Column[] = [
        { field: 'startdate', headerName: 'Start Date' },
        { field: 'enddate', headerName: 'End Date' },
        { field: 'companyname', headerName: 'Company Name' },
        { field: 'desgnation', headerName: 'Designation' },
        { field: 'adddress', headerName: 'Address' }
    ];

    const academicColumns: Column[] = [
        { field: 'fromdate', headerName: 'Start Date' },
        { field: 'todate', headerName: 'End Date' },
        { field: 'institutename', headerName: 'Institute' },
        { field: 'qualificationname', headerName: 'Qualification' },
        { field: 'address', headerName: 'Address' }
    ];

    const professionalColumns: Column[] = [
        { field: 'startdate', headerName: 'Start Date' },
        { field: 'enddate', headerName: 'End Date' },
        { field: 'entrymethod', headerName: 'Institute/Body' },
        { field: 'profession', headerName: 'Membership Name' },
        { field: 'address', headerName: 'Address' }
    ];

    const renderFormField = (config: EditMemberProfileConfig, formProps: any) => {
        const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formProps;

        switch (config.type) {
            case 'text':
                return (
                    <TextField
                        fullWidth
                        id={config.id}
                        name={config.name}
                        label={config.label}
                        value={values[config.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[config.name] && Boolean(errors[config.name])}
                        helperText={touched[config.name] && errors[config.name]}
                    />
                );
            case 'file':
                return (
                    <TextField
                        fullWidth
                        type="file"
                        id={config.id}
                        name={config.name}
                        label={config.label}
                        onChange={(event) => {
                            const file = (event.target as HTMLInputElement).files?.[0];
                            setFieldValue(config.name, file);
                        }}
                        error={touched[config.name] && Boolean(errors[config.name])}
                        helperText={touched[config.name] && errors[config.name]}
                        InputLabelProps={{ shrink: true }}
                    />
                );
            case 'selectOpImproved':
                return (
                    <TextField
                        select
                        fullWidth
                        id={config.id}
                        name={config.name}
                        label={config.label}
                        value={values[config.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[config.name] && Boolean(errors[config.name])}
                        helperText={touched[config.name] && errors[config.name]}
                    >
                        {config.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* User Account Details */}
            <Card sx={{ mb: 3 }}>
                <CardHeader title="User Account Details" />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={headerData.firstname || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Created At"
                                value={new Date().toLocaleDateString()}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Expire Date"
                                value={new Date().toLocaleDateString()}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Member Profile Details */}
            <Card sx={{ mb: 3 }}>
                <CardHeader
                    title="Member Profile Details"
                    action={
                        <Button
                            variant="contained"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            Edit
                        </Button>
                    }
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Member No"
                                value={headerData.memNumber || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={headerData.title || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={`${headerData.firstname || ''} ${headerData.lastname || ''}`}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Member Type"
                                value={headerData.MemberType || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Date Of Birth"
                                value={headerData.DOB || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={`${headerData.addressNo || ''} ${headerData.addressSt || ''} ${headerData.addressCity || ''}`}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="NIC"
                                value={headerData.NIC || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={headerData.Email || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Designation"
                                value={headerData.Designation || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="contactNumber"
                                value={headerData.contactNumber || ''}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Membership Information Modification Request */}
            <Card sx={{ mb: 3 }}>
                <CardHeader
                    title="Membership Information Modification Request"
                    subheader="Change Request for Member Type and Designation"
                />
                <CardContent>
                    {/* <Formik
                        initialValues={initialData?.headerData || init_EditMemberProfileDetails}
                        validationSchema={schema_EditMemberProfile}
                        onSubmit={EditMemberProfile_OnSubmit}
                    > */}
                    <Formik
                        initialValues={initialData?.headerData || init_EditMemberProfileDetails}
                        validationSchema={schema_EditMemberProfile}
                        onSubmit={(values) => {
                            if (EditMemberProfile_OnSubmit) {
                                EditMemberProfile_OnSubmit(values);
                            }
                        }}
                    >
                        {(formProps) => (
                            <Form>
                                <Grid container spacing={3}>
                                    {CONFIG_EditMemberProfile.map((config) => (
                                        <Grid
                                            key={config.id}
                                            item
                                            xs={config.contianerProps.xs}
                                            sm={config.contianerProps.sm}
                                            md={config.contianerProps.md}
                                        >
                                            {renderFormField(config, formProps)}
                                        </Grid>
                                    ))}
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={loader3}
                                            >
                                                {loader3 ? (
                                                    <CircularProgress size={24} />
                                                ) : (
                                                    'Request to Update'
                                                )}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            {/* Employment Details */}
            <Card sx={{ mb: 3 }}>
                <CardHeader title="Employment Details" />
                <CardContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" p={2}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CustomTable
                            data={data}
                            columns={employmentColumns}
                            pagination={employmentPagination}
                            setPagination={setEmploymentPagination}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Academic Qualifications */}
            <Card sx={{ mb: 3 }}>
                <CardHeader title="Academic Qualification Details" />
                <CardContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" p={2}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CustomTable
                            data={academicData}
                            columns={academicColumns}
                            pagination={academicPagination}
                            setPagination={setAcademicPagination}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Professional Memberships */}
            <Card sx={{ mb: 3 }}>
                <CardHeader title="Professional Membership Details" />
                <CardContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" p={2}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CustomTable
                            data={professionalData}
                            columns={professionalColumns}
                            pagination={professionalPagination}
                            setPagination={setProfessionalPagination}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Edit Modal */}
            <Modal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                aria-labelledby="edit-profile-modal"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1
                }}>
                    <Formik
                        initialValues={headerData}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setIsLoading(true);
                            try {
                                await onEditMemberProfileDetails(values);
                                setIsEditModalOpen(false);
                            } catch (error) {
                                console.error('Error updating profile:', error);
                            } finally {
                                setIsLoading(false);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="contactNumber"
                                            label="Contact Number"
                                            value={values.contactNumber || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.contactNumber && Boolean(errors.contactNumber)}
                                            helperText={touched.contactNumber && errors.contactNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <CircularProgress size={24} /> : 'Update'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
};

export default MemberProfileView;