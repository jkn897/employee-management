import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DataTable from 'react-data-table-component';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CountUp from 'react-countup';
import UserService from '../services/UserService';
import { ProgressBar } from 'react-bootstrap';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import { Grid, Stack } from '@mui/material';
import "../layout/Dash.css";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/zustand-store';


function EmployeeDashboard(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    const [pendingTasks, setPendingTasks] = useState('');
    const [totalTasks, setTotalTasks] = useState('');
    const [totalProjects, setTotalProjects] = useState('');
    const [completedTasks, setCompletedTasks] = useState();
    const [projectModules, setProjectModules] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    // console.log(userName);
    let userRoles = [];

    const updateProjectId = useAppStore((state) => state.updateProjectId);
    const updateEmployeeId = useAppStore((state) => state.updateEmployeeId);
    const updateTaskName = useAppStore((state) => state.updateTaskName);
    const updateFunctionalityStatus = useAppStore((state) => state.updateFunctionalityStatus);

    const navigate = useNavigate();

    const columns = [
        { name: '#', selector: row => row.serialNo, }, { name: 'Task Name', selector: row => row.functionalityName, },
        { name: 'Year', selector: row => row.year, }, { name: 'Status', selector: row => row.status, },
        { name: 'Action', cell: (row) => <button className='btn btn-sm btn-primary' onClick={() => viewTask(row)} >View</button > },
    ];

    const viewTask = (row) => {
        // console.log('row : ' + JSON.stringify(row));
        setTaskId(row?.id);
        updateProjectId(row?.projectId);
        updateEmployeeId(row?.employeeId);
        updateTaskName(row?.functionalityName);
        updateFunctionalityStatus(row?.status);
        navigate('/viewTasks/' + row?.id)
    }

    useEffect(() => {
        if (userName) {
            UserService.getEmployeeDashboardData(userName).then((response) => {
                console.log('response : ' + JSON.stringify(response.data));
                if (response.data) {
                    setEmployeeId(response.data?.employeeId);
                    // setTasks(response.data?.tasks);
                    // populateTasks(response.data?.projects);
                    // populateTasks(response.data?.functionalities);
                    populateFunctionality(response.data?.functionalities);
                    // setTotalProjects(response.data?.projects.length);
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }, []);
    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });

    function populateTasks(projects) {
        let projectModules = projects.map((project, index) => {
            return project?.projectFunctionality;
        });
        let projectTasks = [];
        let tasksCount = 0;
        projectModules.map((moduleList, index) => {
            moduleList.map((functionality, index) => {
                // console.log(module);
                tasksCount++;
                projectTasks.push({
                    "serialNo": index + 1,
                    "moduleName": functionality,
                    // "status": module?.moduleStatus,
                    // "assignedOn": new Date().toISOString,
                    "year": "2022"
                });
            });
        });
        console.log(projectTasks);
        setTasks(projectTasks);
        setTotalTasks(tasksCount);
    }
    function populateFunctionality(functionalities) {
        console.log(functionalities);
        let tempArr = [];
        let completedTasksCount = 0;
        functionalities?.map((functionalityObj, index) => {
            // console.log(functionality);
            console.log(functionalityObj?.status === "DONE");
            console.log(functionalityObj?.status == "DONE");
            if (functionalityObj?.status === 'TO DO' || functionalityObj?.status === 'IN PROGRESS') {
                tempArr.push({
                    "serialNo": index + 1,
                    "id": functionalityObj?.functionalityId,
                    "projectId": functionalityObj?.project_id,
                    "employeeId": functionalityObj?.assignedTo,
                    "functionalityName": functionalityObj?.functionalityName,
                    "status": functionalityObj?.status,
                    // "assignedOn": new Date().toISOString,
                    "year": "2022"
                });
            } else if (functionalityObj?.status === "DONE") {
                completedTasksCount++;
            }

        });
        setTasks(tempArr);
        setPendingTasks(tempArr.length);
        setCompletedTasks(completedTasksCount);
        setTotalTasks(functionalities?.length);
    }

    return (
        <>
            {isLoggedIn && userRoles.includes('EMPLOYEE') == true ? (<div>
                <CustomizedAppBar />
                <Box height={15} />
                {/* backgroundColor: '#f2edf3' */}
                <Box sx={{ display: 'flex' }}>
                    <DrawerSideBar />
                    <Box container="main" sx={{ flexGrow: 1, p: 4, height: 800, backgroundColor: '#f2edf3' }}>
                        <Box height={30} />
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Stack spacing={2} direction="row">
                                    <Card sx={{ minWidth: 49 + "%", height: 150, borderRadius: "20px 20px" }} className='totalTasks'>
                                        <CardContent>
                                            <div className='iconStyle'>
                                                <CreditCardIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div"
                                                sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.4} end={totalTasks} duration={0.6} />
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#ccd1d1" }}>
                                                Total Tasks
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 49 + "%", height: 150, borderRadius: "20px 20px" }} className='completedTasks'>
                                        <CardContent>
                                            <div className='iconStyle'>
                                                <ShoppingBagIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.4} end={pendingTasks} duration={0.6} />
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#ccd1d1" }}>
                                                Pending Tasks
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 49 + "%", height: 150, borderRadius: "20px 20px" }} className='gradientLight'>
                                        <CardContent>
                                            <div className='iconStyle'>
                                                <ShoppingBagIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.4} end={completedTasks} duration={0.6} />
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#ccd1d1" }}>
                                                Completed Tasks
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{}}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{}}>
                                            Assigned Tasks
                                        </Typography>
                                        {/* {tasks && tasks.map((option, index) => (
                                            <div key={index} >{option}</div>
                                        ))} */}
                                        <DataTable columns={columns} data={tasks}
                                            pagination fixedHeader highlightOnHover
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box >
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

export default connect(mapStateToProps)(EmployeeDashboard)