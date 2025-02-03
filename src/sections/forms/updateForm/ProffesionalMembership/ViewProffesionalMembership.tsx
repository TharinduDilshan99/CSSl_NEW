// material-ui
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid,
    List,
    ListItem,
    Stack,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';

// third-party

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets


// ==============================|| Fuel TypeCode - VIEW ||============================== //

const FuelTypeView = ({ data }: any) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` }, overflow: 'hidden' }}>
            <TableCell colSpan={19} sx={{ p: 2.5, overflow: 'hidden' }}>
                <Transitions type="slide" direction="down" in={true}>
                    <Grid item xs={12} sm={7} md={8} lg={8} xl={9}>
                        <Stack spacing={2.5}>
                            <MainCard title="Fuel Type Details">
                                <List sx={{ py: 0 }}>
                                    <ListItem divider={!matchDownMD}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary">Fuel Type ID</Typography>
                                                    <Typography>{data.fuelTypeId ? data.fuelTypeId : '-'}</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary">Fuel Type Code</Typography>
                                                    <Typography>
                                                        {data.fuelTypeCode ? data.fuelTypeCode : '-'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem divider={!matchDownMD}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary"> Actual Fuel Type ID</Typography>
                                                    <Typography>{data.actlFuelTypeId ? data.actlFuelTypeId : '-'}</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary">Fuel Type Name</Typography>
                                                    <Typography>
                                                        {data.fuelTypeName ? data.fuelTypeName : '-'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem divider={!matchDownMD}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary">Description</Typography>
                                                    <Typography>{data.description ? data.description : '-'}</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={0.5}>
                                                    <Typography color="secondary">Status</Typography>
                                                    <Typography>
                                                        {data.flRStatus.description ? data.flRStatus.description : '-'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </MainCard>
                        </Stack>
                    </Grid>
                </Transitions>
            </TableCell>
        </TableRow>
    );
};

export default FuelTypeView;