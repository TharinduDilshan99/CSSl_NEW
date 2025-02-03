import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Data {
    date: Date;
    time: Date;
    location: string;
}

function createData(date: Date, time: Date, location: string): Data {
    return { date, time, location };
}

const rows = [
    createData(new Date('2023-05-01'), new Date('2023-05-01T14:30:00'), 'Kurunagala'),
    createData(new Date('2023-06-17'), new Date('2023-06-17T09:45:00'), 'Colombo')
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy === 'date' || orderBy === 'time') {
        const dateA = (a[orderBy] as unknown) as Date;
        const dateB = (b[orderBy] as unknown) as Date;
        return dateB.getTime() - dateA.getTime();
    }

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string | Date }, b: { [key in Key]: number | string | Date }) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Date'
    },
    {
        id: 'time',
        align: 'left',
        disablePadding: false,
        label: 'Time'
    },
    {
        id: 'location',
        align: 'left',
        disablePadding: false,
        label: 'Location'
    }
];

interface OrderTableHeadProps {
    order: Order;
    orderBy: string;
}

function OrderTableHead({ order, orderBy }: OrderTableHeadProps) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function LocationTimeTable() {
    const [order] = useState<Order>('asc');
    const [orderBy] = useState<keyof Data>('time');

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table aria-labelledby="tableTitle">
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    tabIndex={-1}
                                    key={row.time.getTime()}
                                >
                                    <TableCell align="left">{row.date.toLocaleDateString()}</TableCell>
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="#262626" component={RouterLink} to="">
                                            {row.time.toLocaleTimeString()}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.location}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}