// /* eslint-disable prettier/prettier */
// import { Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

// // material-ui
// import { Button, Dialog, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, alpha, useMediaQuery, useTheme } from '@mui/material';

// // third-party
// import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

// // project import
// import { PopupTransition } from 'components/@extended/Transitions';
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// // import { HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
// import { HeaderSort1, SortingSelect1, TablePagination1, TableRowSelection1 } from 'components/third-party/ReactTable1';
// import { GlobalFilter, renderFilterTypes } from 'utils/react-table';

// // assets
// import { CloseOutlined, DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';

// //types
// import { useDispatch, useSelector } from 'store';

// import { openSnackbar } from 'store/reducers/snackbar';
// import { ReactTableProps, AcademicProps, dataProps } from './types/types';


// import AddEditAcademicQualification from 'sections/forms/updateForm/AcademicQualification/AddEditAcademicQualification';
// import DeleteAcademicQualification from 'sections/forms/updateForm/AcademicQualification/DeleteAcademicQualification';
// import AcademicQualificationView from 'sections/forms/updateForm/AcademicQualification/ViewAcademicQualification';
// import { fetchAcademicQualifications, toInitialState1 } from 'store/reducers/academic-qualification';
// import { queryParamsProps1 } from 'types/academic-qualification';







// // ==============================|| REACT TABLE ||============================== //

// function ReactTable1({ columns, data, renderRowSubComponent, handleAddEdit, getHeaderProps }: ReactTableProps) {
//     const filterTypes = useMemo(() => renderFilterTypes, []);
//     const theme = useTheme();

//     const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
//     const sortBy = { id: 'id', desc: false };

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         allColumns,
//         visibleColumns,
//         rows,
//         page,
//         gotoPage,
//         setPageSize,
//         state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
//         preGlobalFilteredRows,
//         setGlobalFilter,
//         setSortBy,
//     } = useTable(
//         {
//             columns,
//             data,
//             filterTypes,
//             initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
//         },
//         useGlobalFilter,
//         useFilters,
//         useSortBy,
//         useExpanded,
//         usePagination,
//         useRowSelect
//     );

//     return (
//         <>

//             <TableRowSelection1 selected={Object.keys(selectedRowIds).length} />
//             <Stack spacing={3}>
//                 <Stack
//                     direction={matchDownSM ? 'column' : 'row'}
//                     spacing={1}
//                     justifyContent="space-between"
//                     alignItems="center"
//                     sx={{ p: 3, pb: 0 }}
//                 >
//                     <GlobalFilter
//                         preGlobalFilteredRows={preGlobalFilteredRows}
//                         globalFilter={globalFilter}
//                         setGlobalFilter={setGlobalFilter}
//                         size="small"
//                     />
//                     <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
//                         <SortingSelect1 sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
//                         <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddEdit} size="small">
//                             Add
//                         </Button>

//                     </Stack>
//                 </Stack>
//                 <Table {...getTableProps()}>
//                     <TableHead>
//                         {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
//                             <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
//                                 {headerGroup.headers.map((column: HeaderGroup) => (
//                                     <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
//                                         <HeaderSort1 column={column} />
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableHead>
//                     <TableBody {...getTableBodyProps()}>
//                         {page.map((row: Row, i: number) => {
//                             prepareRow(row);
//                             const rowProps = row.getRowProps();

//                             return (
//                                 <Fragment key={i}>
//                                     <TableRow
//                                         {...row.getRowProps()}
//                                         onClick={() => {
//                                             row.toggleRowSelected();
//                                         }}
//                                         sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
//                                     >
//                                         {row.cells.map((cell: Cell) => (
//                                             <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
//                                         ))}
//                                     </TableRow>
//                                     {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
//                                 </Fragment>
//                             );
//                         })}
//                         <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
//                             <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
//                                 <TablePagination1 gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </Stack>

//         </>
//     );
// }






// // ==============================|| Fuel Type - LIST ||============================== //

// const AcademicQualificationListPage = () => {
//     const theme = useTheme();
//     const dispatch = useDispatch();
//     const { academicQualifications, isLoading, error, success } = useSelector((state) => state.academicQualification);

//     // table
//     const [data, setData] = useState<dataProps[]>([]);

//     const columns = useMemo(
//         () =>
//             [
//                 {
//                     Header: '#',
//                     accessor: 'id',
//                     className: 'cell-center',
//                     Cell: ({ row }: { row: Row }) => {
//                         if (row.id === undefined || row.id === null || row.id === '') {
//                             return <>-</>;
//                         }
//                         if (typeof row.id === 'string') {
//                             return <>{(parseInt(row.id) + 1).toString()}</>;
//                         }
//                         if (typeof row.id === 'number') {
//                             return <>{row.id + 1}</>;
//                         }
//                         // Handle any other data types if necessary
//                         return <>-</>;
//                     }
//                 },
//                 {
//                     Header: 'Institute Name',
//                     accessor: 'instituteName',
//                     className: 'cell-center',
//                     Cell: ({ value }) => (value ? value : '-')
//                 },
//                 {
//                     Header: 'Qualification Name',
//                     accessor: 'qualificationName',
//                     className: 'cell-center',
//                     Cell: ({ value }) => (value ? value : '-')
//                 },
//                 {
//                     Header: 'Employement Type',
//                     accessor: 'employmentType',
//                     Cell: ({ value }) => (value ? value : '-')
//                 },
//                 {
//                     Header: 'Address',
//                     accessor: 'instituteAddress',
//                     Cell: ({ value }) => (value ? value : '-')
//                 },
//                 {
//                     Header: 'Actions',
//                     className: 'cell-center',
//                     accessor: 'actions',
//                     disableSortBy: true,
//                     Cell: ({ row }: { row: Row }) => {
//                         const collapseIcon = row.isExpanded ? (
//                             <CloseOutlined style={{ color: theme.palette.error.main }} />
//                         ) : (
//                             <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
//                         );
//                         return (
//                             <Stack direction="row" alignItems="center" justifyContent="left" spacing={0}>
//                                 <Tooltip title="View">
//                                     <IconButton
//                                         color="secondary"
//                                         onClick={(e: MouseEvent<HTMLButtonElement>) => {
//                                             e.stopPropagation();
//                                             row.toggleRowExpanded();
//                                         }}
//                                     >
//                                         {collapseIcon}
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="Edit">
//                                     <IconButton
//                                         color="primary"
//                                         onClick={(e: MouseEvent<HTMLButtonElement>) => {
//                                             //@ts-ignore
//                                             const data: VehicleType = row.original;
//                                             e.stopPropagation();
//                                             setVehicleType({ ...data });
//                                             handleAddEdit();
//                                         }}
//                                     >
//                                         <EditTwoTone twoToneColor={theme.palette.primary.main} />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="Delete">
//                                     <IconButton
//                                         color="error"
//                                         onClick={(e: MouseEvent<HTMLButtonElement>) => {
//                                             //@ts-ignore
//                                             const data: VehicleType = row.original;
//                                             e.stopPropagation();
//                                             setAcademicQualificationDeleteId(data.academicQualificationId);
//                                             setOpen(true);
//                                         }}
//                                     >
//                                         <DeleteTwoTone twoToneColor={theme.palette.error.main} />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Stack>
//                         );
//                     }
//                 }
//             ] as Column[],
//         []
//     );
//     const renderRowSubComponent = useCallback(({ row }: { row: Row<{}> }) => <AcademicQualificationView data={data[Number(row.id)]} />, [data]);

//     //dialog model
//     const [addEdit, setAddEdit] = useState<boolean>(false);
//     const [VehicleType, setVehicleType] = useState<AcademicProps>();

//     const handleAddEdit = () => {
//         setAddEdit(!addEdit);
//         if (VehicleType && !addEdit) setVehicleType(undefined);
//     };

//     const [open, setOpen] = useState<boolean>(false);
//     const [AcademicQualificationDeleteId, setAcademicQualificationDeleteId] = useState<any>('');

//     const handleAlertClose = () => {
//         setOpen(!open);
//     };

//     // ----------------------- | API Call - VehicleType | ---------------------

//     useEffect(() => {
//         const queryParams: queryParamsProps1 = {
//             direction: 'asc',
//             page: 0,
//             per_page: 100,
//             search: '',
//             sort: 'academicQualificationId'
//         };

//         dispatch(fetchAcademicQualifications(queryParams));
//     }, [success]);

//     useEffect(() => {
//         if (!academicQualifications) {
//             setData([]);
//             return;
//         }
//         if (academicQualifications == null) {
//             setData([]);
//             return;
//         }
//         setData(academicQualifications.result!);
//     }, [academicQualifications]);

//     useEffect(() => {
//         if (error != null) {
//             let defaultErrorMessage = 'ERROR';
//             // @ts-ignore
//             const errorExp = error as Template1Error;
//             if (errorExp.message) {
//                 defaultErrorMessage = errorExp.message;
//             }
//             dispatch(
//                 openSnackbar({
//                     open: true,
//                     message: defaultErrorMessage,
//                     variant: 'alert',
//                     alert: {
//                         color: 'error'
//                     },
//                     close: true
//                 })
//             );
//             dispatch(toInitialState1());
//         }
//     }, [error]);

//     useEffect(() => {
//         if (success != null) {
//             dispatch(
//                 openSnackbar({
//                     open: true,
//                     message: success,
//                     variant: 'alert',
//                     alert: {
//                         color: 'success'
//                     },
//                     close: true
//                 })
//             );
//             dispatch(toInitialState1());
//         }
//     }, [success]);

//     if (isLoading) {
//         return <>Loading...</>;
//     }

//     return (
//         <MainCard content={false}>
//             <ScrollX>
//                 <ReactTable1 columns={columns}
//                     getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
//                     renderRowSubComponent={renderRowSubComponent} data={data} handleAddEdit={handleAddEdit} />
//             </ScrollX>
//             {/* add Fuel type dialog */}
//             <Dialog
//                 maxWidth="sm"
//                 TransitionComponent={PopupTransition}
//                 keepMounted
//                 fullWidth
//                 onClose={handleAddEdit}
//                 open={addEdit}
//                 sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
//                 aria-describedby="alert-dialog-slide-description"
//             >
//                 <AddEditAcademicQualification AcademicQualifications={VehicleType} onCancel={handleAddEdit} />
//             </Dialog>
//             {/* alert model */}
//             <DeleteAcademicQualification title={AcademicQualificationDeleteId} open={open} handleClose={handleAlertClose} id={AcademicQualificationDeleteId} />
//         </MainCard>
//     );
// };










// export default AcademicQualificationListPage;














/* eslint-disable prettier/prettier */
import { Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { Button, Dialog, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, alpha, useMediaQuery, useTheme } from '@mui/material';

// third-party
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

// project import
import { PopupTransition } from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import { HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { HeaderSort1, SortingSelect1, TablePagination1, TableRowSelection1 } from 'components/third-party/ReactTable1';
import { GlobalFilter, renderFilterTypes } from 'utils/react-table';

// assets
import { CloseOutlined, DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';

//types
import { useDispatch, useSelector } from 'store';

import { openSnackbar } from 'store/reducers/snackbar';
import { ReactTableProps, AcademicProps, dataProps } from './types/types';


import AddEditAcademicQualification from 'sections/forms/updateForm/AcademicQualification/AddEditAcademicQualification';
import DeleteAcademicQualification from 'sections/forms/updateForm/AcademicQualification/DeleteAcademicQualification';
import AcademicQualificationView from 'sections/forms/updateForm/AcademicQualification/ViewAcademicQualification';
import { fetchAcademicQualifications, toInitialState1 } from 'store/reducers/academic-qualification';
import { queryParamsProps1 } from 'types/academic-qualification';







// ==============================|| REACT TABLE ||============================== //

function ReactTable1({ columns, data, renderRowSubComponent, handleAddEdit, getHeaderProps }: ReactTableProps) {
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const sortBy = { id: 'id', desc: false };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        visibleColumns,
        rows,
        page,
        gotoPage,
        setPageSize,
        state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
        preGlobalFilteredRows,
        setGlobalFilter,
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    );

    return (
        <>

            <TableRowSelection1 selected={Object.keys(selectedRowIds).length} />
            <Stack spacing={3}>
                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 3, pb: 0 }}
                >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        size="small"
                    />
                    <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
                        <SortingSelect1 sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
                        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddEdit} size="small">
                            Add
                        </Button>

                    </Stack>
                </Stack>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                                {headerGroup.headers.map((column: HeaderGroup) => (
                                    <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                                        <HeaderSort1 column={column} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row: Row, i: number) => {
                            prepareRow(row);
                            const rowProps = row.getRowProps();

                            return (
                                <Fragment key={i}>
                                    <TableRow
                                        {...row.getRowProps()}
                                        onClick={() => {
                                            row.toggleRowSelected();
                                        }}
                                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                                    >
                                        {row.cells.map((cell: Cell) => (
                                            <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                                        ))}
                                    </TableRow>
                                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                                </Fragment>
                            );
                        })}
                        <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                            <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                                <TablePagination1 gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>

        </>
    );
}






// ==============================|| Fuel Type - LIST ||============================== //

const AcademicQualificationListPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { academicQualifications, isLoading, error, success } = useSelector((state) => state.academicQualification);

    // table
    const [data, setData] = useState<dataProps[]>([]);

    const columns = useMemo(
        () =>
            [
                {
                    Header: '#',
                    accessor: 'id',
                    className: 'cell-center',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.id === undefined || row.id === null || row.id === '') {
                            return <>-</>;
                        }
                        if (typeof row.id === 'string') {
                            return <>{(parseInt(row.id) + 1).toString()}</>;
                        }
                        if (typeof row.id === 'number') {
                            return <>{row.id + 1}</>;
                        }
                        // Handle any other data types if necessary
                        return <>-</>;
                    }
                },
                {
                    Header: 'Institute Name',
                    accessor: 'instituteName',
                    className: 'cell-center',
                    Cell: ({ value }) => (value ? value : '-')
                },
                {
                    Header: 'Qualification Name',
                    accessor: 'qualificationName',
                    className: 'cell-center',
                    Cell: ({ value }) => (value ? value : '-')
                },
                {
                    Header: 'Employement Type',
                    accessor: 'employmentType',
                    Cell: ({ value }) => (value ? value : '-')
                },
                {
                    Header: 'Address',
                    accessor: 'instituteAddress',
                    Cell: ({ value }) => (value ? value : '-')
                },
                {
                    Header: 'Actions',
                    className: 'cell-center',
                    accessor: 'actions',
                    disableSortBy: true,
                    Cell: ({ row }: { row: Row }) => {
                        const collapseIcon = row.isExpanded ? (
                            <CloseOutlined style={{ color: theme.palette.error.main }} />
                        ) : (
                            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                        );
                        return (
                            <Stack direction="row" alignItems="center" justifyContent="left" spacing={0}>
                                <Tooltip title="View">
                                    <IconButton
                                        color="secondary"
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            row.toggleRowExpanded();
                                        }}
                                    >
                                        {collapseIcon}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton
                                        color="primary"
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            //@ts-ignore
                                            const data: VehicleType = row.original;
                                            e.stopPropagation();
                                            setVehicleType({ ...data });
                                            handleAddEdit();
                                        }}
                                    >
                                        <EditTwoTone twoToneColor={theme.palette.primary.main} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            //@ts-ignore
                                            const data: VehicleType = row.original;
                                            e.stopPropagation();
                                            setAcademicQualificationDeleteId(data.academicQualificationId);
                                            setOpen(true);
                                        }}
                                    >
                                        <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        );
                    }
                }
            ] as Column[],
        []
    );
    const renderRowSubComponent = useCallback(({ row }: { row: Row<{}> }) => <AcademicQualificationView data={data[Number(row.id)]} />, [data]);

    //dialog model
    const [addEdit, setAddEdit] = useState<boolean>(false);
    const [VehicleType, setVehicleType] = useState<AcademicProps>();

    const handleAddEdit = () => {
        setAddEdit(!addEdit);
        if (VehicleType && !addEdit) setVehicleType(undefined);
    };

    const [open, setOpen] = useState<boolean>(false);
    const [AcademicQualificationDeleteId, setAcademicQualificationDeleteId] = useState<any>('');

    const handleAlertClose = () => {
        setOpen(!open);
    };

    // ----------------------- | API Call - VehicleType | ---------------------

    useEffect(() => {
        const queryParams: queryParamsProps1 = {
            direction: 'asc',
            page: 0,
            per_page: 100,
            search: '',
            sort: 'academicQualificationId'
        };

        dispatch(fetchAcademicQualifications(queryParams));
    }, [success]);

    useEffect(() => {
        if (!academicQualifications) {
            setData([]);
            return;
        }
        if (academicQualifications == null) {
            setData([]);
            return;
        }
        setData(academicQualifications.result!);
    }, [academicQualifications]);

    useEffect(() => {
        if (error != null) {
            let defaultErrorMessage = 'ERROR';
            // @ts-ignore
            const errorExp = error as Template1Error;
            if (errorExp.message) {
                defaultErrorMessage = errorExp.message;
            }
            dispatch(
                openSnackbar({
                    open: true,
                    message: defaultErrorMessage,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(toInitialState1());
        }
    }, [error]);

    useEffect(() => {
        if (success != null) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: success,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(toInitialState1());
        }
    }, [success]);

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <MainCard content={false}>
            <ScrollX>
                <ReactTable1 columns={columns}
                    getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                    renderRowSubComponent={renderRowSubComponent} data={data} handleAddEdit={handleAddEdit} />
            </ScrollX>
            {/* add Fuel type dialog */}
            <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAddEdit}
                open={addEdit}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
            >
                <AddEditAcademicQualification AcademicQualifications={VehicleType} onCancel={handleAddEdit} />
            </Dialog>
            {/* alert model */}
            <DeleteAcademicQualification title={AcademicQualificationDeleteId} open={open} handleClose={handleAlertClose} id={AcademicQualificationDeleteId} />
        </MainCard>
    );
};










export default AcademicQualificationListPage;

