import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';


const theme = createTheme();

function RegisterPage() {
    const navigate = useNavigate()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (userInfo) {
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState(null);
    const [profileImage, setProfileImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");

    // validate
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileNoError, setMobileNoError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [countryError, setCountryError] = useState("");
    const [streetAddressError, setStreetAddressError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [pinError, setPinError] = useState("");


    const handleBlur = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                setFirstNameError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "lastName":
                setLastNameError(value.trim() === "");
                break;
            case "email":
                setEmailError(value.trim() === "" || !/\S+@\S+\.\S+/.test(value));
                break;
            case "mobile":
                setMobileNoError(value.trim() === "" || value.trim().length !== 10);
                break;
            case "password":
                setPasswordError(value.trim() === "");
                break;
            case "confirmPassword":
                setConfirmPasswordError(value.trim() !== password);
                break;
            case "country":
                setCountryError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "city":
                setCityError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "streetAddress":
                setStreetAddressError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "state":
                setStateError(value.trim() === "" || value.trim().length <= 2);
                break;
            case "pin":
                setPinError(value.trim() === "" || value.trim().length <= 2);
                break;
            default:
                break;
        }
    };

    const handleProfileImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const readerb = new FileReader();
        readerb.readAsDataURL(file);
        readerb.onloadend = () => {
            setProfileImage(readerb.result);
        };
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmpassword) {
            setMessage("Password Do Not Match");
        } else {
            setMessage(null);
            console.log("handle");
            dispatch(register(profileImage, firstName, lastName, email, mobileno, password, country, streetAddress, city, state, pin));
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                    Upload Profile Picture
                                </Typography>

                                <input
                                    onChange={handleProfileImage}
                                    type="file"
                                    id="formupload"
                                    name="image"
                                    className="form-control"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onBlur={handleBlur}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    error={firstNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    onBlur={handleBlur}
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={lastNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onBlur={handleBlur}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile Number"
                                    name="mobile"
                                    autoComplete="mobileno"
                                    value={mobileno}
                                    onBlur={handleBlur}
                                    onChange={(e) => setMobileno(e.target.value)}
                                    error={mobileNoError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onBlur={handleBlur}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmpassword}
                                    onBlur={handleBlur}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={confirmPasswordError}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"

                                    value={country}
                                    onBlur={handleBlur}
                                    onChange={(e) => setCountry(e.target.value)}
                                    error={countryError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="streetAddress"
                                    label="Street Address"
                                    name="streetAddress"

                                    value={streetAddress}
                                    onBlur={handleBlur}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                    error={streetAddressError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"

                                    value={city}
                                    onBlur={handleBlur}
                                    onChange={(e) => setCity(e.target.value)}
                                    error={cityError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"

                                    value={state}
                                    onBlur={handleBlur}
                                    onChange={(e) => setState(e.target.value)}
                                    error={stateError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="pin"
                                    label="Pin"
                                    name="pin"

                                    value={pin}
                                    onBlur={handleBlur}
                                    onChange={(e) => setPin(e.target.value)}
                                    error={pinError}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}

export default RegisterPage
