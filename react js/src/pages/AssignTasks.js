import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DataTable from 'react-data-table-component';
import StorefrontIcon from "@mui/icons-material/Storefront";
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


function AssignTasks(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    const [pendingTasks, setPendingTasks] = useState('');
    const [totalTasks, setTotalTasks] = useState('');
    const [completedTasks, setCompletedTasks] = useState('');
    const [projectModules, setProjectModules] = useState([]);
    const [tasks, setTasks] = useState('');
    // console.log(userName);
    let userRoles = [];

    const columns = [
        {
            name: 'Module Name',
            selector: row => row.moduleName,
        },
        {
            name: 'Assigned On',
            selector: row => row.assignedOn,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];

    const data = [
        {
            id: 1,
            projectName: 'EPL',
            client: 'Royal Sundaram',
            budget: '6000$',
            year: '2020',
        },
        {
            id: 2,
            projectName: 'POT',
            client: 'FA PREMIUM',
            budget: '5000$',
            year: '2021',
        },
        {
            id: 3,
            projectName: 'Consumer Center',
            client: 'Synchrony Financial',
            budget: '10000$',
            year: '2019',
        },
    ]
    useEffect(() => {
        if (userName) {
            UserService.getEmployeeDashboardData(userName).then((response) => {
                // console.log('response : ' + JSON.stringify(response.data));
                if (response.data) {
                    // setTasks(response.data?.tasks);
                    populateTasks(response.data.projects);
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
            return project?.projectModules;
        });
        let projectTasks = [];
        setTotalTasks(projectModules?.length);
        projectModules.map((moduleList, index) => {
            moduleList.map((module, index) => {
                // console.log(module);
                projectTasks.push({
                    "moduleName": module?.moduleName,
                    "status": module?.moduleStatus,
                    "assignedOn": new Date().toISOString,
                    "year": "2022"
                });
            });
        });

    }

    return (
        <>
            {isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
                <CustomizedAppBar />
                <Box height={15} />
                {/* backgroundColor: '#f2edf3' */}
                <Box sx={{ display: 'flex' }}>
                    <DrawerSideBar />
                    <Box container="main" sx={{ flexGrow: 1, p: 3, height: 600, backgroundColor: '#f2edf3' }}>
                        <Box height={30} />
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Stack spacing={2}>
                                    <Card sx={{}} className=''>
                                        <CardContent>


                                        </CardContent>
                                    </Card>
                                    <Card sx={{}} className=''>
                                        <CardContent>

                                        </CardContent>
                                    </Card>
                                    <Card sx={{}} className=''>
                                        <CardContent>

                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ height: 45 + "vh" }}>
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

export default connect(mapStateToProps)(AssignTasks)