// import React, { useState, useCallback, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import * as Yup from 'yup';
// import {
//     Box,
//     Card,
//     CardContent,
//     TextField,
//     Button,
//     Typography,
//     Checkbox,
//     FormControlLabel,
//     IconButton,
//     InputAdornment,
//     Container,
//     Alert,
//     SxProps,
//     Theme,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { motion, Variants } from 'framer-motion'; // Added Variants type
// import { styled } from '@mui/material/styles';

// // Type definitions
// interface LoginResponse {
//     status: string;
// }

// interface LoginStatus {
//     status: string;
// }

// interface ValidationErrors {
//     userName?: string;
//     password?: string;
// }

// interface LoginViewProps {
//     onChangeHandler: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
//     userName: string;
//     loginStatus: LoginStatus;
//     password: string;
//     loginHandler: () => Promise<LoginResponse> | LoginResponse;
//     badCredentials: boolean;
//     showPassword: boolean;
//     togglePasswordVisibility: () => void;
// }

// // Styled components
// const StyledCard = styled(Card)(({ theme }) => ({
//     maxWidth: 400,
//     margin: 'auto',
//     marginTop: theme.spacing(8),
//     padding: theme.spacing(3),
// }));

// const LogoImage = styled('img')({
//     width: 150,
//     height: 'auto',
//     marginBottom: 16,
//     display: 'block',
//     margin: '0 auto',
// });

// // Animation variants with proper typing
// const variants: Variants = {
//     initial: {
//         x: 0,
//         opacity: 0.5
//     },
//     animate: {
//         x: [0, 15, 0, -15, 0, 15, 0, -15, 0],
//         opacity: 1,
//         transition: {
//             duration: 0.5,
//             repeat: Infinity,
//             type: "spring",
//             stiffness: 10,
//             repeatType: "loop",
//         },
//     },
// };

// // Validation schema
// const loginSchema = Yup.object().shape({
//     userName: Yup.string()
//         .required('Email is required'),
//     password: Yup.string()
//         .required('Password is required')
// });

// const LoginView: React.FC<LoginViewProps> = ({
//     onChangeHandler,
//     userName,
//     loginStatus,
//     password,
//     loginHandler,
//     badCredentials,
//     showPassword,
//     togglePasswordVisibility,
// }) => {
//     const [isPending, setIsPending] = useState<boolean>(false);
//     const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

//     const validateForm = async (): Promise<boolean> => {
//         try {
//             await loginSchema.validate({ userName, password }, { abortEarly: false });
//             setValidationErrors({});
//             return true;
//         } catch (err) {
//             if (err instanceof Yup.ValidationError) {
//                 const errors: ValidationErrors = {};
//                 err.inner.forEach((error) => {
//                     if (error.path) {
//                         errors[error.path as keyof ValidationErrors] = error.message;
//                     }
//                 });
//                 setValidationErrors(errors);
//             }
//             return false;
//         }
//     };

//     const handleLogin = useCallback(async () => {
//         const isValid = await validateForm();
//         if (!isValid) return;

//         setIsPending(true);
//         const startTime = Date.now();

//         const finishLogin = (success: boolean) => {
//             const elapsedTime = Date.now() - startTime;
//             const remainingTime = Math.max(2000 - elapsedTime, 0);

//             setTimeout(() => {
//                 setIsPending(false);
//                 if (success) {
//                     console.log("Login successful");
//                 }
//             }, remainingTime);
//         };

//         try {
//             const result = loginHandler();
//             if (result instanceof Promise) {
//                 result
//                     .then((response: LoginResponse) => {
//                         finishLogin(response.status === "success");
//                     })
//                     .catch(() => {
//                         finishLogin(false);
//                     });
//             } else {
//                 finishLogin(result.status === "success");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             finishLogin(false);
//         }
//     }, [loginHandler, userName, password]);

//     useEffect(() => {
//         const handleKeyPress = (event: KeyboardEvent) => {
//             if (event.key === "Enter") {
//                 handleLogin();
//             }
//         };

//         document.addEventListener("keypress", handleKeyPress);
//         return () => {
//             document.removeEventListener("keypress", handleKeyPress);
//         };
//     }, [handleLogin]);

//     const getErrorMessage = (): string => {
//         if (loginStatus.status === "user login attempt limitation is over") {
//             return "You have exceeded the login attempts. Please reset the password";
//         }
//         return badCredentials ? "Invalid Credentials" : "";
//     };

//     return (
//         <Container component="main" maxWidth="sm">
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//             >
//                 <StyledCard>
//                     <CardContent>
//                         <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//                             {/* Logo and Title */}
//                             <LogoImage
//                                 src="/path/to/CSSL-Logo.png"
//                                 alt="CSSL Logo"
//                             />
//                             <Typography component="h1" variant="h5">
//                                 Login
//                             </Typography>

//                             {/* Form Fields */}
//                             <Box component="form" width="100%" noValidate>
//                                 <TextField
//                                     fullWidth
//                                     margin="normal"
//                                     label="Email"
//                                     type="email"
//                                     value={userName}
//                                     onChange={onChangeHandler("userName")}
//                                     error={!!validationErrors.userName}
//                                     helperText={validationErrors.userName}
//                                     autoComplete="email"
//                                     autoFocus
//                                 />

//                                 <TextField
//                                     fullWidth
//                                     margin="normal"
//                                     label="Password"
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={onChangeHandler("password")}
//                                     error={!!validationErrors.password}
//                                     helperText={validationErrors.password}
//                                     autoComplete="current-password"
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <IconButton
//                                                     onClick={togglePasswordVisibility}
//                                                     edge="end"
//                                                     aria-label="toggle password visibility"
//                                                 >
//                                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         ),
//                                     }}
//                                 />

//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             color="primary"
//                                             name="remember"
//                                             id="remember"
//                                         />
//                                     }
//                                     label="Save Credentials"
//                                     sx={{ mt: 1 }}
//                                 />

//                                 {(badCredentials || loginStatus.status === "user login attempt limitation is over") && (
//                                     <Box component={motion.div}
//                                         variants={variants}
//                                         initial="initial"
//                                         animate={badCredentials ? "animate" : "initial"}
//                                     >
//                                         <Alert
//                                             severity="error"
//                                             sx={{
//                                                 mt: 2,
//                                                 width: '100%',
//                                                 '& .MuiAlert-message': {
//                                                     width: '100%',
//                                                     textAlign: 'center'
//                                                 }
//                                             }}
//                                         >
//                                             {loginStatus.status === "user login attempt limitation is over"
//                                                 ? "You have exceeded the login attempts. Please reset the password"
//                                                 : "Invalid Credentials"}
//                                         </Alert>
//                                     </Box>
//                                 )}

//                                 {/* Login Button */}
//                                 <Button
//                                     fullWidth
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={handleLogin}
//                                     disabled={isPending}
//                                     sx={{ mt: 3, mb: 2 }}
//                                 >
//                                     {isPending ? "Logging in..." : "Login"}
//                                 </Button>

//                                 {/* Links */}
//                                 <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
//                                     <Link to="/password-reset-member" style={{ textDecoration: 'none' }}>
//                                         <Typography color="primary" variant="body2">
//                                             Forgot password? Reset
//                                         </Typography>
//                                     </Link>

//                                     <Link to="/signup" style={{ textDecoration: 'none' }}>
//                                         <Typography color="primary" variant="body2">
//                                             Don't have an account? Sign Up
//                                         </Typography>
//                                     </Link>

//                                     <Link to="/user-inquiry-form" style={{ textDecoration: 'none' }}>
//                                         <Typography color="primary" variant="body2">
//                                             Having trouble logging in? Click Here
//                                         </Typography>
//                                     </Link>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </CardContent>
//                 </StyledCard>
//             </motion.div>
//         </Container>
//     );
// };

// export default LoginView;










import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import * as yup from 'yup';

interface LoginResponse {
    status: string;
    message?: string;
}

interface LoginViewProps {
    userName: string;
    setUserName: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    loginStatus: LoginResponse | null; // Changed to include null
    loginHandler: () => Promise<LoginResponse> | LoginResponse;
    badCredentials: boolean;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
}

interface ValidationErrors {
    userName?: string;
    password?: string;
}

const loginSchema = yup.object().shape({
    userName: yup.string().required('Email is required'),
    password: yup.string().required('Password is required')
});

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const shakeVariants = {
    initial: { x: 0 },
    animate: {
        x: [0, 15, 0, -15, 0, 15, 0, -15, 0],
        transition: {
            duration: 0.8,
            repeat: 0,
            type: 'spring',
            stiffness: 300,
            damping: 10
        }
    }
};

const LoginView: React.FC<LoginViewProps> = ({
    userName,
    setUserName,
    password,
    setPassword,
    loginStatus,
    loginHandler,
    badCredentials,
    showPassword,
    togglePasswordVisibility,
}) => {
    const [isPending, setIsPending] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = async (): Promise<boolean> => {
        try {
            await loginSchema.validate({ userName, password }, { abortEarly: false });
            setValidationErrors({});
            return true;
        } catch (err) {
            const errors: ValidationErrors = {};
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path as keyof ValidationErrors] = error.message;
                    }
                });
            }
            setValidationErrors(errors);
            return false;
        }
    };

    const handleLogin = useCallback(async () => {
        const isValid = await validateForm();
        if (!isValid) return;

        setIsPending(true);
        setError(null);
        const startTime = Date.now();

        const finishLogin = (success: boolean, errorMessage?: string) => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(2000 - elapsedTime, 0);

            setTimeout(() => {
                setIsPending(false);
                if (success) {
                    console.log("Login successful");
                } else if (errorMessage) {
                    setError(errorMessage);
                }
            }, remainingTime);
        };

        try {
            const result = await Promise.resolve(loginHandler());
            finishLogin(result.status === "success", result.message);
        } catch (error) {
            console.error("Login error:", error);
            finishLogin(false, "An unexpected error occurred");
        }
    }, [loginHandler, userName, password]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleLogin();
            }
        };

        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleLogin]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    p: 2
                }}
            >
                <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 5 }}>
                    <CardContent>
                        <Stack spacing={3} alignItems="center">
                            <Box
                                component={motion.div}
                                variants={shakeVariants}
                                animate={badCredentials ? "animate" : "initial"}
                                sx={{ textAlign: 'center' }}
                            >
                                <Box
                                    component="img"
                                    src="/src/assets/images/logo_1.png"
                                    alt="CSSL Logo"
                                    sx={{
                                        width: 150,
                                        height: 'auto',
                                        mb: 2,
                                        display: 'inline-block'
                                    }}
                                />
                            </Box>

                            <Typography variant="h4" component="h1">
                                Login
                            </Typography>

                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                error={!!validationErrors.userName}
                                helperText={validationErrors.userName}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={saveCredentials}
                                        onChange={(e) => setSaveCredentials(e.target.checked)}
                                    />
                                }
                                label="Save Credentials"
                                sx={{ alignSelf: 'start' }}
                            />

                            {(badCredentials || (loginStatus?.status === "user login attempt limitation is over") || error) && (
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {loginStatus?.status === "user login attempt limitation is over"
                                        ? "You have exceeded the login attempts. Please reset the password"
                                        : error || "Invalid Credentials"}
                                </Alert>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleLogin}
                                disabled={isPending}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    textTransform: 'none'
                                }}
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </Button>

                            <Stack spacing={2} alignItems="center" sx={{ width: '100%', mt: 2 }}>
                                <Link
                                    to="/password-reset-member"
                                    style={{
                                        textDecoration: 'none',
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography color="primary" variant="body2">
                                        Forgot password? Reset
                                    </Typography>
                                </Link>

                                <Link
                                    to="/signup"
                                    style={{
                                        textDecoration: 'none',
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography color="primary" variant="body2">
                                        Don't have an account? Sign Up
                                    </Typography>
                                </Link>

                                <Link
                                    to="/user-inquiry-form"
                                    style={{
                                        textDecoration: 'none',
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography color="primary" variant="body2">
                                        Having trouble logging in? Click Here
                                    </Typography>
                                </Link>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </motion.div>
    );
};

export default LoginView;