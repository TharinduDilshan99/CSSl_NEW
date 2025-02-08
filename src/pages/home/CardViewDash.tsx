// import { AuditOutlined } from '@ant-design/icons';
// import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// import { styled } from '@mui/system';
// import { SummaryDashboard } from 'types/territory-user-mapping';

// // Styled card with gradient border and modern hover effects
// const StyledCard = styled(Card)(({ theme }) => ({
//     borderRadius: '16px',
//     padding: '1px', // Gradient border effect
//     background: 'linear-gradient(145deg, #e0e0e0, #f8f8f8)',
//     boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
//     transition: 'all 0.3s ease-in-out',
//     '&:hover': {
//         transform: 'scale(1.01)',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
//     },
// }));

// // Inner content wrapper for gradient border effect
// const ContentWrapper = styled(Box)(({ theme }) => ({
//     borderRadius: '14px',
//     backgroundColor: theme.palette.background.paper,
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// const IconWrapper = styled(Box)(({ theme }) => ({
//     width: '60px',
//     height: '60px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '50%',
//     marginBottom: '15px',
//     background: 'linear-gradient(145deg, #e3e3e3, #f5f5f5)',
//     boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
// }));

// const StatCard = ({ title, value, icon, bgColor }: { title: string; value: number | undefined; icon: JSX.Element; bgColor: string }) => {
//     return (
//         <StyledCard>
//             <ContentWrapper>
//                 <IconWrapper style={{ background: bgColor }}>
//                     {icon}
//                 </IconWrapper>
//                 <Typography
//                     variant="h6"
//                     color="text.secondary"
//                     textAlign="center"
//                     sx={{ fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}
//                 >
//                     {title}
//                 </Typography>
//                 <Typography
//                     variant="h4"
//                     color="text.primary"
//                     textAlign="center"
//                     sx={{
//                         fontWeight: 'bold',
//                         color: '#003366',
//                         textShadow: '0 2px 5px rgba(0, 51, 102, 0.4)',
//                     }}
//                 >
//                     {value ?? 'N/A'}
//                 </Typography>
//             </ContentWrapper>
//         </StyledCard>
//     );
// };

// interface TableProps {
//     scheduleSummaryDashboardData: SummaryDashboard;
// }

// function CardViews({ scheduleSummaryDashboardData }: TableProps) {
//     const data = [
//         {
//             title: 'Total Employees',
//             value: scheduleSummaryDashboardData?.numberOfJointPartners,
//             icon: <AuditOutlined style={{ fontSize: '28px', color: '#fff' }} />,
//             bgColor: 'linear-gradient(145deg, #ff8c94, #ffb3b3)',
//         },
//         {
//             title: 'Total no of CIF',
//             value: scheduleSummaryDashboardData?.totalNumberOfCIF,
//             icon: <AuditOutlined style={{ fontSize: '28px', color: '#fff' }} />,
//             bgColor: 'linear-gradient(145deg, #9f7bf7, #e2d4f7)',
//         },
//         {
//             title: 'Joint Partners',
//             value: scheduleSummaryDashboardData?.maximumNumberOfJointPartners,
//             icon: <AuditOutlined style={{ fontSize: '28px', color: '#fff' }} />,
//             bgColor: 'linear-gradient(145deg, #7cd3a5, #b3f0e6)',
//         },
//         {
//             title: 'Loan Applications',
//             value: scheduleSummaryDashboardData?.numberOfLoans,
//             icon: <AuditOutlined style={{ fontSize: '28px', color: '#fff' }} />,
//             bgColor: 'linear-gradient(145deg, #ff7f5b, #ffcc99)',
//         },
//     ];

//     return (
//         <Stack direction="row" spacing={0} mr={1}>
//             <Grid container spacing={3}>
//                 {data.map((item, index) => (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//                         <StatCard
//                             title={item.title}
//                             value={item.value}
//                             icon={item.icon}
//                             bgColor={item.bgColor}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>
//         </Stack>
//     );
// }

// export default CardViews;















import { UserOutlined, FormOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { SummaryDashboard } from 'types/territory-user-mapping';

const StyledCard = styled(Card)<{ isClickable?: boolean }>(({ theme, isClickable }) => ({
    borderRadius: '16px',
    padding: '1px',
    background: 'linear-gradient(145deg, #e0e0e0, #f8f8f8)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease-in-out',
    cursor: isClickable ? 'pointer' : 'default',
    height: '100%',
    '&:hover': {
        transform: isClickable ? 'scale(1.02)' : 'scale(1.01)',
        boxShadow: isClickable ? '0 12px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.25)',
    },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
    borderRadius: '14px',
    backgroundColor: theme.palette.background.paper,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '280px',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginBottom: '15px',
    background: 'linear-gradient(145deg, #e3e3e3, #f5f5f5)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const StatCard = ({
    title,
    value,
    icon,
    bgColor,
    cardType = 'default',
    statusText,
    onClick,
}: {
    title: string;
    value?: number | string;
    icon: JSX.Element;
    bgColor: string;
    cardType?: 'welcome' | 'status' | 'date' | 'action' | 'default';
    statusText?: string;
    onClick?: () => void;
}) => {
    const isClickable = Boolean(onClick);

    const CardContent = () => {
        if (cardType === 'welcome') {
            return (
                <ContentWrapper>
                    <IconWrapper style={{ background: bgColor }}>
                        {icon}
                    </IconWrapper>
                    <Typography
                        variant="h5"
                        color="text.primary"
                        textAlign="center"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            color: '#003366',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Here are some ways to get started
                    </Typography>
                    {value && (
                        <Typography
                            variant="h6"
                            color="text.primary"
                            textAlign="center"
                            sx={{
                                fontWeight: 'medium',
                                color: '#003366',
                            }}
                        >
                            {value}
                        </Typography>
                    )}
                </ContentWrapper>
            );
        }

        if (cardType === 'status' || cardType === 'action') {
            return (
                <ContentWrapper>
                    <IconWrapper style={{ background: bgColor }}>
                        {icon}
                    </IconWrapper>
                    <Typography
                        variant="h5"
                        color="text.primary"
                        textAlign="center"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            color: '#003366',
                        }}
                    >
                        {title}
                    </Typography>
                    {statusText && (
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            textAlign="center"
                            sx={{
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            {statusText}
                        </Typography>
                    )}
                    {value && (
                        <Typography
                            variant="h6"
                            color="text.primary"
                            textAlign="center"
                            sx={{
                                fontWeight: 'medium',
                                color: '#003366',
                                padding: '4px 12px',
                                borderRadius: '16px',
                                backgroundColor: cardType === 'action' ? '#fff7e6' : '#e6f7ff',
                            }}
                        >
                            {value}
                        </Typography>
                    )}
                </ContentWrapper>
            );
        }

        if (cardType === 'date') {
            return (
                <ContentWrapper>
                    <IconWrapper style={{ background: bgColor }}>
                        {icon}
                    </IconWrapper>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        {title}
                    </Typography>
                    {value && (
                        <Typography
                            variant="h5"
                            color="text.primary"
                            textAlign="center"
                            sx={{
                                fontWeight: 'medium',
                                color: '#003366',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: '#f0f7ff',
                            }}
                        >
                            {value}
                        </Typography>
                    )}
                </ContentWrapper>
            );
        }

        return (
            <ContentWrapper>
                <IconWrapper style={{ background: bgColor }}>
                    {icon}
                </IconWrapper>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h4"
                    color="text.primary"
                    textAlign="center"
                    sx={{
                        fontWeight: 'bold',
                        color: '#003366',
                        textShadow: '0 2px 5px rgba(0, 51, 102, 0.4)',
                    }}
                >
                    {value ?? 'N/A'}
                </Typography>
            </ContentWrapper>
        );
    };

    return (
        <StyledCard isClickable={isClickable} onClick={onClick}>
            <CardContent />
        </StyledCard>
    );
};

interface TableProps {
    scheduleSummaryDashboardData: SummaryDashboard;
}

function CardViews({ scheduleSummaryDashboardData }: TableProps) {
    const navigate = useNavigate();
    const { user } = useAuth()

    const data = [
        {
            title: `Welcome, ${user?.firstName} ${user?.lastName}`,
            icon: <UserOutlined style={{ fontSize: '28px', color: '#fff' }} />,
            bgColor: 'linear-gradient(145deg, #ff8c94, #ffb3b3)',
            cardType: 'welcome' as const,
        },
        {
            title: 'Application Status',
            statusText: 'New Applicant',
            icon: <FormOutlined style={{ fontSize: '28px', color: '#fff' }} />,
            bgColor: 'linear-gradient(145deg, #9f7bf7, #e2d4f7)',
            cardType: 'status' as const,
            onClick: () => navigate('/home/new-forms'),
        },
        {
            title: 'Initial Registration Date',
            value: '2024-01-28',
            icon: <CalendarOutlined style={{ fontSize: '28px', color: '#fff' }} />,
            bgColor: 'linear-gradient(145deg, #7cd3a5, #b3f0e6)',
            cardType: 'date' as const,
        },
        {
            title: 'Next Action',
            statusText: 'Pending Applicant',
            icon: <ClockCircleOutlined style={{ fontSize: '28px', color: '#fff' }} />,
            bgColor: 'linear-gradient(145deg, #ff7f5b, #ffcc99)',
            cardType: 'action' as const,
            onClick: () => navigate('/pending-actions'),
        },
    ];

    return (
        <Stack direction="row" spacing={0} mr={1}>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <StatCard
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            bgColor={item.bgColor}
                            cardType={item.cardType}
                            statusText={item.statusText}
                            onClick={item.onClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default CardViews;