import React, { useState } from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { login } from "../actions/auth";
import "../layout/Dash.css";
import { clearMessage } from '../actions/message';

const Login_V2 = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message, isLoggedIn, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    const { ...obj } = props;
    const [loading, setLoading] = useState(false);

    let userRoles = [];
    if (authorities && authorities.length > 0) {
        authorities.forEach((authorityObj, index) => {
            userRoles.push(authorityObj?.authority);
        });
    }

    const [formData, setFormData] = useState({
        // username: "suman1987",
        // password: "+PD#430fjR",
        username: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: '', password: '' };
        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!formData.username || !formData.password) {
            newErrors.username = 'Username is required';
            newErrors.password = 'Password is required';
            valid = false;
        } /*else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
            valid = false;
        } */

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(login(formData.username, formData.password))
                .then((response) => {
                    dispatch(clearMessage());
                    setLoading(true);
                    handleNavigate();
                    // navigate('/adminDashboard');
                })
                .catch(() => {
                    setLoading(false);
                    console.log(obj);
                });

        } else {
            console.log('Login failed');
        }
    };

    function handleNavigate() {
        const roles = localStorage.getItem("roles");
        if (roles && roles.includes('ADMIN')) {
            navigate('/adminDashboard');
        } else if (roles && roles.includes('EMPLOYEE')) {
            navigate('/employeeDashboard');
        }
    }

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rememberMe' ? checked : value,
        });
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ marginTop: 3, }}>
                <Grid container>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} sx={{
                        backgroundImage: "url(https://source.unsplash.com/random)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                        <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center", }}>
                            <Typography component="h1" variant="h5">Sign in</Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >

                                <TextField margin="normal" required fullWidth label="Username"
                                    name="username" value={formData.username}
                                    onChange={handleChange}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username}
                                />

                                <TextField margin="normal" required fullWidth name="password" label="Password"
                                    type="password" id="password" autoComplete="current-password" value={formData.password}
                                    onChange={handleChange}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}

                                    sx={{ mt: 2 }} />

                                {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Sign In</span>
                                </Button>
                                {message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {/* {message} */}
                                            Invalid username or password, Please try with correct credentials
                                        </div>
                                    </div>
                                )}
                                {/* <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"New Employee? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid> */}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
function mapStateToProps(state) {
    console.log(state);
    const { isLoggedIn } = state.auth;
    const { message } = state?.message;
    const { user } = state.auth;
    return {
        user, message, isLoggedIn
    }
}
export default connect(mapStateToProps)(Login_V2)