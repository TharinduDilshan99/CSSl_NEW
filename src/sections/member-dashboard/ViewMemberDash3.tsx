// import React from 'react';
// import { useEffect, useState } from 'react';
// import { Mail, Phone, MapPin, CheckCircle2, ShoppingCart, FileText } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//         {/* Member Profile Section */}
//         <div className="md:col-span-4">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
//                   <img src="/api/placeholder/80/80" alt="Profile" className="w-full h-full object-cover" />
//                 </div>
//                 <h3 className="text-xl font-semibold">{memberInfo.name}</h3>
//                 <p className="text-gray-600">{memberInfo.role}</p>
//               </div>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Member ID</span>
//                   <span>{memberInfo.memberId}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Member Type</span>
//                   <span>{memberInfo.memberType}</span>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Mail className="text-blue-500" />
//                   <span>{memberInfo.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="text-blue-500" />
//                   <span>{memberInfo.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <MapPin className="text-blue-500" />
//                   <span>{memberInfo.location}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Membership Status Section */}
//         <div className="md:col-span-8">
//           <div className="space-y-6">
//             <Card>
//               <CardContent className="pt-6">
//                 <h3 className="text-lg font-semibold mb-4">Renewal Year Status</h3>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-gray-600">Last Renewal Year</p>
//                     <p className="text-xl font-semibold">{memberInfo.lastRenewal}</p>
//                   </div>
//                   <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                     <CheckCircle2 size={16} />
//                     <span>{memberInfo.membershipStatus}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="bg-orange-400 rounded-lg p-6 text-white">
//               <h3 className="text-lg font-semibold">Membership Status</h3>
//               <div className="mt-4">
//                 <p>Effective Date: {memberInfo.effectiveDate}</p>
//                 <p>Valid Date: {memberInfo.validDate}</p>
//               </div>
//             </div>

//             <Card>
//               <CardContent className="pt-6">
//                 <h3 className="text-lg font-semibold mb-2">Pending Payment Summary</h3>
//                 <p className="text-2xl font-bold text-red-500 mb-4">
//                   Rs.{memberInfo.totalDue.toLocaleString()}
//                 </p>
//                 <div className="w-full h-64">
//                   <BarChart data={paymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="year" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="amount" fill="#4DB6AC" />
//                   </BarChart>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* News Feed Section */}
//         <div className="md:col-span-12">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">News Feed</h3>
//                 <button className="text-blue-500 hover:text-blue-600">View all</button>
//               </div>
//               <div className="space-y-4">
//                 {newsFeeds.map((item, index) => (
//                   <div key={index} className="flex items-center gap-4">
//                     <div className="flex-shrink-0">{item.icon}</div>
//                     <div>
//                       <p>{item.message}</p>
//                       <p className="text-sm text-gray-500">{item.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600 py-2 rounded-md">
//                 Need Help?
//               </button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }