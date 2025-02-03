import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    Avatar,
    useTheme
} from '@mui/material';
import { motion, Variants } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';

interface PasswordResetMemberProps {
    passwordResetHandler: () => void;
    badCredentials: boolean;
}

const PasswordResetMember: React.FC<PasswordResetMemberProps> = ({
    passwordResetHandler,
    badCredentials
}) => {
    const theme = useTheme();
    const [email, setEmail] = useState('');

    // Handle email change
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // Animation variants with proper typing
    const lockIconVariants: Variants = {
        initial: {
            x: 0,
            opacity: 0.5,
        },
        animate: {
            x: [0, 15, 0, -15, 0, 15, 0, -15, 0],
            opacity: 1,
            transition: {
                duration: 0.5,
                repeat: 1,
                type: "spring",
                stiffness: 10,
                repeatType: "reverse"
            }
        }
    };

    // Container animation variants
    const containerVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <Container component="main" maxWidth="xs">
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1 }}
            >
                <Box
                    sx={{
                        // marginTop: 8,
                        // display: 'flex',
                        // flexDirection: 'column',
                        // alignItems: 'center',
                        // justifyContent: 'center',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        bgcolor: 'background.default',
                        p: 2
                    }}
                >
                    <Card
                        elevation={3}
                        sx={{
                            width: '100%',
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {/* Logo */}
                                <Avatar
                                    src="/path/to/New-CSSL-Logo.png"
                                    alt="CSSL Logo"
                                    sx={{
                                        width: theme.spacing(12),
                                        height: theme.spacing(12),
                                        marginBottom: 2
                                    }}
                                />

                                {/* Lock Icon */}
                                <motion.div
                                    variants={lockIconVariants}
                                    initial="initial"
                                    animate={badCredentials ? "animate" : "initial"}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: theme.palette.primary.main,
                                            width: theme.spacing(7),
                                            height: theme.spacing(7),
                                        }}
                                    >
                                        <LockIcon fontSize="large" />
                                    </Avatar>
                                </motion.div>

                                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                                    Password Reset
                                </Typography>

                                {/* Email Input */}
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={badCredentials}
                                    helperText={badCredentials ? "Invalid email address" : ""}
                                    sx={{ mt: 2 }}
                                />

                                {/* Submit Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={passwordResetHandler}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Send OTP
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </motion.div>
        </Container>
    );
};

export default PasswordResetMember;