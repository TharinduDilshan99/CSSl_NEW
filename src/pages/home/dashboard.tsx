
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Chip,
    Stack,
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    Assignment,
    // ShoppingCart,
} from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MainCard from 'components/MainCard';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import OrdersTable2 from 'sections/dashboard/default/OrdersTable2';
import OrdersTable3 from 'sections/dashboard/default/OrdersTable3';


const MemberDashboard = () => {
    const memberInfo = {
        name: 'Anshan H.',
        role: 'Project Manager',
        memberId: 'M2988',
        memberType: 'Member',
        email: 'anshan.dh81@gmail.com',
        phone: '(+94) 76 734 5465',
        location: 'Kurunagala',
        lastRenewal: '2023',
        membershipStatus: 'Active',
        effectiveDate: '06/01/2023',
        validDate: '06/01/2024',
        totalDue: 10000,
    };

    const newsFeeds = [
        { message: 'You have 3 pending tasks.', time: 'just now', icon: <Assignment color="primary" /> },
        { message: 'You have 1 pending tasks.', time: '1 day ago', icon: <Assignment color="error" /> },
        { message: 'You have 10 pending tasks.', time: '3 week ago', icon: <Assignment color="success" /> },
        // { message: 'New order received', time: '1 day ago', icon: <ShoppingCart color="error" /> },
        // { message: 'You have 3 pending tasks.', time: '3 week ago', icon: <Assignment color="success" /> },
    ];


    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5db', minHeight: '100vh' }}>
            <Grid container spacing={3}>
                {/* Member Profile Section */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card elevation={2} sx={{ mt: 2, bgcolor: '#cbd4f187' }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <Avatar
                                            sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
                                            src="/path-to-avatar.jpg"
                                        />
                                        <Typography variant="h5">{memberInfo.name}</Typography>
                                        <Typography color="textSecondary">{memberInfo.role}</Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">Member ID</Typography>
                                            <Typography variant="body2">{memberInfo.memberId}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">Member Type</Typography>
                                            <Typography variant="body2">{memberInfo.memberType}</Typography>
                                        </Box>
                                    </Stack>

                                    <List>
                                        <ListItem>
                                            <ListItemIcon><Email color="primary" /></ListItemIcon>
                                            <ListItemText primary={memberInfo.email} sx={{ '& .MuiListItemText-primary': { marginLeft: 4 } }} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Phone color="primary" /></ListItemIcon>
                                            <ListItemText primary={memberInfo.phone} sx={{ '& .MuiListItemText-primary': { marginLeft: 4 } }} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><LocationOn color="primary" /></ListItemIcon>
                                            <ListItemText primary={memberInfo.location} sx={{ '& .MuiListItemText-primary': { marginLeft: 4 } }} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>




                        {/* Payment Summary Section */}
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Pending Payment Summary</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2, bgcolor: '#c1b0e21a' }} content={false}>
                                <Box sx={{ p: 3, pb: 0 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="h6" color="textSecondary">
                                            Total Due Amount
                                        </Typography>
                                        <Typography variant="h3">Rs. 10 000</Typography>
                                    </Stack>
                                </Box>
                                <MonthlyBarChart />
                            </MainCard>
                        </Grid>

                        {/* News Feed Section */}
                        {/* <Grid item xs={12}>
                            <Card elevation={2} sx={{ mt: 2, bgcolor: '#dce1e5' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">News Feed</Typography>
                                        <Button color="primary">View all</Button>
                                    </Box>
                                    <List>
                                        {newsFeeds.map((item, index) => (
                                            <ListItem key={index} sx={{ py: 1 }}>
                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                <ListItemText
                                                    primary={item.message}
                                                    secondary={item.time}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Need Help?
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid> */}
                    </Grid>
                </Grid>

                {/* Membership Status Section */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card elevation={2} sx={{ mt: 2, bgcolor: '#c1b0e23d' }} >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Renewal Year Status</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography color="textSecondary">Last Renewal Year</Typography>
                                            <Typography variant="h6">{memberInfo.lastRenewal}</Typography>
                                        </Box>
                                        <Chip
                                            label={memberInfo.membershipStatus}
                                            color="success"
                                            variant="outlined"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Membership Effective Date */}
                        <Grid item xs={12}>
                            <Card elevation={2} sx={{ mt: 2, bgcolor: '#ffa726' }}>
                                <CardContent>
                                    <Typography variant="h6" color="white">Membership Status</Typography>
                                    <Box sx={{ mt: 2, color: 'white' }}>
                                        <Typography>Effective Date: {memberInfo.effectiveDate}</Typography>
                                        <Typography>Valid Date: {memberInfo.validDate}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>


                        {/* pending invoice */}
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Pending Invoice</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2, bgcolor: '#3ca54236' }} content={false}>
                                <OrdersTable2 />
                            </MainCard>
                        </Grid>


                        {/* payment History */}
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Payment History</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2, bgcolor: '#3ca54236' }} content={false}>
                                <OrdersTable />
                            </MainCard>
                        </Grid>


                        {/* Events */}
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Events</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2, bgcolor: '#3ca54236' }} content={false}>
                                <OrdersTable3 />
                            </MainCard>
                        </Grid>



                        {/* Payment Summary Section */}
                        {/* <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Pending Payment Summary</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2 }} content={false}>
                                <Box sx={{ p: 3, pb: 0 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="h6" color="textSecondary">
                                            Total Due Amount
                                        </Typography>
                                        <Typography variant="h3">Rs. 10 000</Typography>
                                    </Stack>
                                </Box>
                                <MonthlyBarChart />
                            </MainCard>
                        </Grid> */}


                    </Grid>
                </Grid>





                <Grid item xs={12}>
                    <Grid container spacing={3}>

                        {/* News Feed Section */}
                        <Grid item xs={12}>
                            <Card elevation={2} sx={{ mt: 2, bgcolor: '#dce1e5' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">News Feed</Typography>
                                        <Button color="primary">View all</Button>
                                    </Box>
                                    <List>
                                        {newsFeeds.map((item, index) => (
                                            <ListItem key={index} sx={{ py: 1 }}>
                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                <ListItemText
                                                    primary={item.message}
                                                    secondary={item.time}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Need Help?
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>








            </Grid>
        </Box>
    );
};

export default MemberDashboard;