import React, { useState } from 'react';
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Container,
    Avatar,
    IconButton,
    InputAdornment,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Interface for form data
interface FormData {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const LogoImage = styled('img')({
    width: 150,
    height: 'auto',
    marginBottom: 16,
});

const PasswordReset = () => {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Password visibility state
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error state
    const [error, setError] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (field: keyof FormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    // Handle password reset
    const handlePasswordReset = async () => {
        try {
            // Validation
            if (!formData.email || !formData.otp || !formData.newPassword || !formData.confirmPassword) {
                setError('All fields are required');
                return;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Add your API call here
            // Example:
            // const response = await api.resetPassword(formData);

            // Clear form after successful reset
            setFormData({
                email: '',
                otp: '',
                newPassword: '',
                confirmPassword: '',
            });
            setError(null);

            // You can add success message or redirect here

        } catch (err) {
            setError('Failed to reset password. Please try again.');
        }
    };

    // Toggle password visibility
    const handleClickShowPassword = (field: 'new' | 'confirm') => () => {
        if (field === 'new') {
            setShowNewPassword(!showNewPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
            p: 2
        }}>
            <StyledCard elevation={3}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <LogoImage
                    src="/path/to/New-CSSL-Logo.png"
                    alt="CSSL Logo"
                />

                <Typography component="h1" variant="h5" gutterBottom>
                    Forgot Password
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={!!error && !formData.email}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="otp"
                        label="OTP"
                        id="otp"
                        value={formData.otp}
                        onChange={handleChange('otp')}
                        error={!!error && !formData.otp}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange('newPassword')}
                        error={!!error && !formData.newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('new')}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        error={!!error && !formData.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('confirm')}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handlePasswordReset}
                    >
                        Reset Password
                    </Button>
                </Box>
            </StyledCard>
        </Container>
    );
};

export default PasswordReset;