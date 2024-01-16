import React, { Component, useState } from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { connect } from 'react-redux';
import { login } from "../actions/auth";
// import { createBrowserHistory } from 'history';
import {withRouter} from '../common/withRouter';
class Login_V1 extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.loginSuccess = false;

        this.errors = {
            'username': '', 'password': '',
        };

        this.state = {
            username: "suman1987",
            password: "+PD#430fjR",
            loading: false,
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    validateForm = () => {
        let valid = true;
        const newErrors = { username: '', password: '' };
        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!this.state.username || !this.state.password) {
            newErrors.username = 'Username is required';
            newErrors.password = 'Password is required';
            valid = false;
        } /*else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
            valid = false;
        } */

        this.errors = newErrors;
        return valid;
    };

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        const { dispatch, history } = this.props;

        if (this.validateForm()) {
            dispatch(login(this.state.username, this.state.password))
                .then((response) => {
                    console.log(response);
                    this.setState({
                        loading: false,
                    });
                    this.loginSuccess = true;
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { isLoggedIn, message } = this.props;
        console.log('isLoggedIn : ' + isLoggedIn);
        console.log('message : ' + message);

        if (isLoggedIn) {

            // return <Redirect to="/dashboard" />;
        }
        return (
            <Container component="main" maxWidth="lg" >
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
                                <Box component="form" noValidate onSubmit={this.handleLogin} sx={{ mt: 1 }} >

                                    <TextField margin="normal" required fullWidth label="Username"
                                        name="username" value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        error={Boolean(this.errors.username)}
                                        helperText={this.errors.username}
                                    />

                                    <TextField margin="normal" required fullWidth name="password" label="Password"
                                        type="password" id="password" autoComplete="current-password" value={this.state.password}
                                        onChange={this.onChangePassword}
                                        error={Boolean(this.errors.password)}
                                        helperText={this.errors.password}

                                        sx={{ mt: 2 }} />

                                    {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign In</span>
                                    </Button>
                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}

                                    {/* {this.loginSuccess && useNavigate('/dashboard')} */}
                                    <Grid container>
                                        {/* <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                                        {/* <Grid item>
                                            <Link href="/newEmpRegister" variant="body2">
                                                {"New Employee? Sign Up"}
                                            </Link>
                                        </Grid> */}
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    // console.log('login component');
    // console.log('isLoggedIn : ' + isLoggedIn);
    console.log('message : ' + message);
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login_V1)