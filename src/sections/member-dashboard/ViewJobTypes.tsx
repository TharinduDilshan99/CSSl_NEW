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


// ==============================|| Usage - VIEW ||============================== //

const JobTypeView = ({ data }: any) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` }, overflow: 'hidden' }}>
      <TableCell colSpan={19} sx={{ p: 2.5, overflow: 'hidden' }}>
        <Transitions type="slide" direction="down" in={true}>     
            <Grid item xs={12} sm={7} md={8} lg={8} xl={9}>
              <Stack spacing={2.5}>
                <MainCard title="Job Type Details">
                  <List sx={{ py: 0 }}>


                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Work Flow Code</Typography>
                          <Typography>{data.workFlowCode ? data.workFlowCode:'-'}</Typography>
                        </Stack>
                      </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Description</Typography>
                            <Typography>{data.description ? data.description :'-'}</Typography>
                          </Stack>
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Status</Typography>
                            <Typography>
                            {data.flRStatus.description ? data.flRStatus.description :'-'}                           
                             </Typography>
                          </Stack>
                        </Grid> */}
                      </Grid>
                    </ListItem>

                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Job Type Name</Typography>
                          <Typography>{data.name ? data.name:'-'}</Typography>
                        </Stack>
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Job Type Code</Typography>
                            <Typography>
                              {data.JobTypeCode ? data.JobTypeCode :'-'}
                            </Typography>
                          </Stack>
                        </Grid> */}
                      </Grid>
                    </ListItem>

                    {/* <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Job Type Code</Typography>
                            <Typography>
                              {data.JobTypeCode ? data.JobTypeCode :'-'}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem> */}

                  </List>
                </MainCard>
              </Stack>
            </Grid>
        </Transitions>
      </TableCell>
    </TableRow>
  );
};

export default JobTypeView;
