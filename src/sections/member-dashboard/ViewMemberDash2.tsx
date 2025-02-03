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
// } from '@mui/material';
// import { Mail, Phone, MapPin, CheckCircle2, ShoppingCart, FileText } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const paymentData = [
//   { year: 2020, amount: 8000 },
//   { year: 2021, amount: 9000 },
//   { year: 2022, amount: 6000 },
// ];

// export default function MemberDashboard() {
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
//     { message: 'You have 3 pending tasks.', time: 'just now', icon: <FileText className="text-blue-500" /> },
//     { message: 'New order received', time: '1 day ago', icon: <ShoppingCart className="text-red-500" /> },
//     { message: 'You have 3 pending tasks.', time: '3 week ago', icon: <FileText className="text-green-500" /> },
//   ];

//   return (
//     <div className="bg-gray-50 p-6 min-h-screen">
//       <Grid container spacing={3}>
//         {/* Member Profile Section */}
//         <Grid item xs={12} md={4}>
//           <Card className="shadow-md">
//             <CardContent>
//               <Box className="text-center mb-4">
//                 <Avatar
//                   className="w-20 h-20 mx-auto mb-3"
//                   src="/api/placeholder/80/80"
//                 />
//                 <Typography className="text-xl font-semibold">{memberInfo.name}</Typography>
//                 <Typography className="text-gray-600">{memberInfo.role}</Typography>
//               </Box>
              
//               <Stack className="space-y-4 mb-4">
//                 <Box className="flex justify-between">
//                   <Typography className="text-gray-600">Member ID</Typography>
//                   <Typography>{memberInfo.memberId}</Typography>
//                 </Box>
//                 <Box className="flex justify-between">
//                   <Typography className="text-gray-600">Member Type</Typography>
//                   <Typography>{memberInfo.memberType}</Typography>
//                 </Box>
//               </Stack>

//               <List>
//                 <ListItem>
//                   <ListItemIcon><Mail className="text-blue-500" /></ListItemIcon>
//                   <ListItemText primary={memberInfo.email} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon><Phone className="text-blue-500" /></ListItemIcon>
//                   <ListItemText primary={memberInfo.phone} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon><MapPin className="text-blue-500" /></ListItemIcon>
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
//               <Card className="shadow-md">
//                 <CardContent>
//                   <Typography className="text-lg font-semibold mb-4">Renewal Year Status</Typography>
//                   <Box className="flex justify-between items-center">
//                     <Box>
//                       <Typography className="text-gray-600">Last Renewal Year</Typography>
//                       <Typography className="text-xl font-semibold">{memberInfo.lastRenewal}</Typography>
//                     </Box>
//                     <Chip
//                       icon={<CheckCircle2 className="text-green-500" size={16} />}
//                       label={memberInfo.membershipStatus}
//                       className="bg-green-100 text-green-700"
//                     />
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card className="shadow-md bg-orange-400">
//                 <CardContent>
//                   <Typography className="text-white text-lg font-semibold">Membership Status</Typography>
//                   <Box className="mt-4 text-white">
//                     <Typography>Effective Date: {memberInfo.effectiveDate}</Typography>
//                     <Typography>Valid Date: {memberInfo.validDate}</Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Payment Summary Section */}
//             <Grid item xs={12}>
//               <Card className="shadow-md">
//                 <CardContent>
//                   <Typography className="text-lg font-semibold mb-2">Pending Payment Summary</Typography>
//                   <Typography className="text-2xl font-bold text-red-500 mb-4">
//                     Rs.{memberInfo.totalDue.toLocaleString()}
//                   </Typography>
//                   <Box className="w-full h-64">
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
//           <Card className="shadow-md">
//             <CardContent>
//               <Box className="flex justify-between items-center mb-4">
//                 <Typography className="text-lg font-semibold">News Feed</Typography>
//                 <Button className="text-blue-500">View all</Button>
//               </Box>
//               <List>
//                 {newsFeeds.map((item, index) => (
//                   <ListItem key={index} className="py-2">
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText 
//                       primary={item.message}
//                       secondary={item.time}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//               <Button
//                 className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 py-2"
//               >
//                 Need Help?
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }