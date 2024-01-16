import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DrawerSideBar from '../layout/DrawerSideBar';
import UserDataService from "../services/UserService";
import CustomizedAppBar from '../layout/CustomizedAppBar';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Card, Stack } from 'react-bootstrap';

function Leave(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    let userRoles = [];

    authorities.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });

    const handleLeaveSubmit = (event) => {
        const empLeave = {
            // "moduleTasks": moduleTasks,
            "startDate": startDate,
            "endDate": endDate,
            // "leaveDays": leaveDays,
            "userName": userName,
            "leaveDescription": leaveDescription
        }
        console.log('empLeave : ' + JSON.stringify(empLeave));
        UserDataService.applyEmployeeLeave(empLeave)
            .then((response) => {
                console.log(response.data);
                if (response.data?.length > 0) {
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveDescription, setLeaveDescription] = useState('');

    return (
        <>{isLoggedIn && userRoles.includes('EMPLOYEE') == true ? (<div>
            <CustomizedAppBar />
            <Box height={50} />
            <Box sx={{ display: 'flex' }}>
                <DrawerSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, height: 600, backgroundColor: '#f2edf3' }}>
                    <Box height={30} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ minWidth: 250 + "%", height: 400, borderRadius: "20px 20px" }} className=''>
                                    <Box height={10} />
                                    <Typography sx={{ textAlign: "center" }} variant='h6' gutterBottom>Apply Leave</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField size='small' type='date' label="Start Date" value={startDate} variant="outlined" onChange={e => setStartDate(e.target.value)} placeholder="Enter start date"
                                                fullWidth required />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField size='small' type='date' label="End Date" value={endDate} variant="outlined" onChange={e => setEndDate(e.target.value)} placeholder="Enter end date"
                                                fullWidth required />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <textarea id="taskDetails" rows={5} cols={20}
                                                name="task" placeholder='Enter leave description'
                                                value={leaveDescription} onChange={(e) => setLeaveDescription(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Button variant='outlined' onClick={handleLeaveSubmit} color='primary'>Apply Leave</Button>
                                        </Grid>
                                    </Grid>
                                    <Box height={10} />
                                    <CardContent>
                                    </CardContent></Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>) : (<div>Please Login First</div>)
        }
        </>
    )
}
function mapStateToProps(state) {
    // console.log(state);
    const { isLoggedIn } = state.auth;
    const { message } = state?.message;
    const { user } = state?.auth;
    return {
        user, message, isLoggedIn
    };
}

export default connect(mapStateToProps)(Leave)