import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import DrawerSideBar from '../layout/DrawerSideBar';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import { useAppStore } from '../store/zustand-store';
import UserService from '../services/UserService';

function TaskView(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    const { taskId } = useParams();

    const navigate = useNavigate();

    const updateProjectId = useAppStore((state) => state.updateProjectId);
    const updateEmployeeId = useAppStore((state) => state.updateEmployeeId);
    const updateTaskName = useAppStore((state) => state.updateTaskName);
    const updateFunctionalityStatus = useAppStore((state) => state.updateFunctionalityStatus);

    const project_id = useAppStore((state) => state.project_id);
    const employee_id = useAppStore((state) => state.employee_id);
    const taskName = useAppStore((state) => state.task_name);
    const functionality_status = useAppStore((state) => state.functionality_status);

    const [showAlert, setShowAlert] = useState(false);
    const [taskStatus, setTaskStatus] = useState('');
    const [taskNote, setTaskNote] = useState('');
    // const [taskName, setTaskName] = useState('');
    let userRoles = [];
    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const taskUpdateData = {
            "taskId": taskId,
            "employeeId": employee_id,
            "projectId": project_id,
            "taskStatus": taskStatus,
            "taskName": taskName,
            "taskNote": taskNote,
            "functionalityStatus": functionality_status
        }
        console.log('taskUpdateData : ' + JSON.stringify(taskUpdateData));
        UserService.updateTaskWork(taskUpdateData)
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    setShowAlert(true);
                    setTaskNote('');
                    updateProjectId('');
                    updateEmployeeId('');
                    updateTaskName('');
                    updateFunctionalityStatus('');
                    navigate('/employeeDashboard');
                }
            })
            .catch((e) => {
                setShowAlert(false);
                console.log(e);
            });
    }

    return (
        <>
            {isLoggedIn && userRoles.includes('EMPLOYEE') == true ?
                (<div>
                    <div>TaskView</div>
                    <CustomizedAppBar />
                    {/* <Box height={15} /> */}
                    {/* backgroundColor: '#f2edf3' */}
                    <Box sx={{ display: 'flex' }}>
                        <DrawerSideBar />
                        <Box container="main" sx={{ flexGrow: 1, p: 3, height: 600, backgroundColor: '#f2edf3' }}>
                            <Box height={30} />
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Stack spacing={2} direction="row">
                                        <Card sx={{ minWidth: 150 + "%", height: 450, borderRadius: "20px 20px" }} className=''>
                                            <Box height={10} />
                                            <Typography sx={{ textAlign: "center" }} variant='h6' gutterBottom>Task Information</Typography>
                                            <Box height={10} />
                                            <CardContent>
                                                <form onSubmit={handleFormSubmit}>
                                                    <Grid item xs={4}>
                                                        <textarea id="taskDetails" rows={5} cols={40}
                                                            name="task" placeholder='Task Details'
                                                            value={taskName} disabled={true} />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <textarea id="taskNote" rows={5} cols={40} required
                                                            name="task" placeholder='Provide your task progress here'
                                                            value={taskNote} onChange={(e) => setTaskNote(e.target.value)}
                                                        />
                                                    </Grid>

                                                    <Grid xs={12} item sm={12}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" required
                                                                value={taskStatus} label="Status" onChange={(e) => setTaskStatus(e.target.value)}>
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value='to do'>To Do</MenuItem>
                                                                <MenuItem value='in progress'>In Progress</MenuItem>
                                                                <MenuItem value='done'>Done</MenuItem>
                                                                <MenuItem value='blocked'>Blocked</MenuItem>

                                                                {/* {functionality && functionality.map((option, index) => (
                                            <MenuItem key={index} value={option?.functionalityId}>{option?.functionalityName}</MenuItem>
                                        ))} */}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Box height={15} />
                                                    <Grid xs={12} item sm={4} sx={{ position: "center" }}>
                                                        <Button type='submit' variant='contained' color='primary'>Update</Button>
                                                    </Grid>
                                                    <Grid xs={12} item sm={6}>
                                                        {showAlert && (
                                                            <Alert severity="success" variant='filled' iconMapping={{
                                                                success: <CheckCircleOutlineIcon fontSize="inherit" />
                                                            }}
                                                                onClose={handleCloseAlert}>
                                                                Task Notes Updated Successfully.
                                                            </Alert>
                                                        )}
                                                    </Grid>
                                                </form>
                                            </CardContent>
                                        </Card>
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
export default connect(mapStateToProps)(TaskView)