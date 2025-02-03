import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';

// assets
import { ColorProps } from 'types/extended';

// types
interface Data {
  date: Date;
  year: number;
  invoice_no: number;
  receipt_no: string;
  carbs: number;
}

function createData(date: Date, year: number, invoice_no: number, receipt_no: string, carbs: number): Data {
  return { date, year, invoice_no, receipt_no, carbs };
}

const rows = [
  createData(new Date('2023-05-01'), 2023, 4001, 'IA40570', 2),
  createData(new Date('2023-06-17'), 2022, 3001, 'IA180139', 0)
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (orderBy === 'date') {
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
    id: 'year',
    align: 'left',
    disablePadding: true,
    label: 'Year'
  },
  {
    id: 'invoice_no',
    align: 'left',
    disablePadding: false,
    label: 'Invoice No.'
  },
  {
    id: 'receipt_no',
    align: 'left',
    disablePadding: false,
    label: 'Receipt No.'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: 'Status'
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

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default function OrderTable() {
  const [order] = useState<Order>('asc');
  const [orderBy] = useState<keyof Data>('invoice_no');

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
                  key={row.invoice_no}
                >
                  <TableCell align="left">{row.date.toLocaleDateString()}</TableCell>
                  <TableCell align="left">{row.year}</TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="#262626" component={RouterLink} to="">
                      {row.invoice_no}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.receipt_no}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}