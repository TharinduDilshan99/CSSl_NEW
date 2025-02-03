// import React from 'react';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Button,
//   Chip,
//   Stack,
//   IconButton,
// } from '@mui/material';
// import {
//   Email,
//   Phone,
//   LocationOn,
//   NotificationsNone,
//   Assignment,
//   ShoppingCart,
// } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const paymentData = [
//   { year: 2020, amount: 8000 },
//   { year: 2021, amount: 9000 },
//   { year: 2022, amount: 6000 },
// ];

// const MemberDashboard = () => {
//   const memberInfo = {
//     name: 'Anshan H.',
//     role: 'Project Manager',
//     memberId: 'M2999',
//     memberType: 'Member',
//     email: 'anshan.dh81@gmail.com',
//     phone: '(+1 876) 8654 239 581',
//     location: 'New York',
//     lastRenewal: '2023',
//     membershipStatus: 'Active',
//     effectiveDate: '06/01/2023',
//     validDate: '06/01/2024',
//     totalDue: 10000,
//   };

//   const newsFeeds = [
//     { message: 'You have 3 pending tasks.', time: 'just now', icon: <Assignment color="primary" /> },
//     { message: 'New order received', time: '1 day ago', icon: <ShoppingCart color="error" /> },
//     { message: 'You have 3 pending tasks.', time: '3 week ago', icon: <Assignment color="success" /> },
//   ];

//   return (
//     <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
//       <Grid container spacing={3}>
//         {/* Member Profile Section */}
//         <Grid item xs={12} md={4}>
//           <Card elevation={2}>
//             <CardContent>
//               <Box sx={{ textAlign: 'center', mb: 2 }}>
//                 <Avatar
//                   sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
//                   src="/path-to-avatar.jpg"
//                 />
//                 <Typography variant="h5">{memberInfo.name}</Typography>
//                 <Typography color="textSecondary">{memberInfo.role}</Typography>
//               </Box>
              
//               <Stack spacing={2}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body2" color="textSecondary">Member ID</Typography>
//                   <Typography variant="body2">{memberInfo.memberId}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body2" color="textSecondary">Member Type</Typography>
//                   <Typography variant="body2">{memberInfo.memberType}</Typography>
//                 </Box>
//               </Stack>

//               <List>
//                 <ListItem>
//                   <ListItemIcon><Email color="primary" /></ListItemIcon>
//                   <ListItemText primary={memberInfo.email} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon><Phone color="primary" /></ListItemIcon>
//                   <ListItemText primary={memberInfo.phone} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon><LocationOn color="primary" /></ListItemIcon>
//                   <ListItemText primary={memberInfo.location} />
//                 </ListItem>
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Membership Status Section */}
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Card elevation={2}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>Renewal Year Status</Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Box>
//                       <Typography color="textSecondary">Last Renewal Year</Typography>
//                       <Typography variant="h6">{memberInfo.lastRenewal}</Typography>
//                     </Box>
//                     <Chip
//                       label={memberInfo.membershipStatus}
//                       color="success"
//                       variant="outlined"
//                     />
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card elevation={2} sx={{ bgcolor: '#ffa726' }}>
//                 <CardContent>
//                   <Typography variant="h6" color="white">Membership Status</Typography>
//                   <Box sx={{ mt: 2, color: 'white' }}>
//                     <Typography>Effective Date: {memberInfo.effectiveDate}</Typography>
//                     <Typography>Valid Date: {memberInfo.validDate}</Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Payment Summary Section */}
//             <Grid item xs={12}>
//               <Card elevation={2}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>Pending Payment Summary</Typography>
//                   <Typography variant="h5" color="error" gutterBottom>
//                     Rs.{memberInfo.totalDue.toLocaleString()}
//                   </Typography>
//                   <Box sx={{ width: '100%', height: 300 }}>
//                     <BarChart data={paymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="year" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="amount" fill="#4DB6AC" />
//                     </BarChart>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* News Feed Section */}
//         <Grid item xs={12}>
//           <Card elevation={2}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6">News Feed</Typography>
//                 <Button color="primary">View all</Button>
//               </Box>
//               <List>
//                 {newsFeeds.map((item, index) => (
//                   <ListItem key={index} sx={{ py: 1 }}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText 
//                       primary={item.message}
//                       secondary={item.time}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{ mt: 2 }}
//               >
//                 Need Help?
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default MemberDashboard;