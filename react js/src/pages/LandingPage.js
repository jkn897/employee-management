import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CountUp from 'react-countup';
import { ProgressBar } from 'react-bootstrap';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import EmployeeChart from '../components/EmployeeChart';
import { Grid, Stack } from '@mui/material';
import "../layout/Dash.css";
import UserService from '../services/UserService';
import { connect } from 'react-redux';

function LandingPage(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;
    const [allProjects, setAllProjects] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState('');
    const [totalProjects, setTotalProjects] = useState('');
    const [completedProjects, setCompletedProjects] = useState();

    let userRoles = [];
    // console.log('username : ' + userName);
    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });


    const adminDashboardData = async () => {
        UserService.getAdminDashboardData(userName).then((response) => {
            console.log('response : ' + JSON.stringify(response.data));
            setTotalEmployees(response.data?.totalEmployees);
            setTotalProjects(response.data?.totalProjects);
            addProjects(response.data?.allProjects);
        }).catch((e) => {
            console.log(e);
        });
    }

    function addProjects(allProjectResp) {

        allProjectResp?.map((projObj, index) => {
            allProjects.push(projObj);
        });
        // console.log(allProjects);
    }

    useEffect(() => {
        adminDashboardData();
    }, []);

    return (
        <>
            {isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
                <CustomizedAppBar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <DrawerSideBar />
                    <Box container="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f2edf3' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack spacing={2} direction="row">
                                    <Card sx={{ minWidth: 50 + "%", height: 150 }} className='gradient'>
                                        <CardContent>
                                            <div className='iconStyle'>
                                                <CreditCardIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div"
                                                sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.4} end={totalEmployees} duration={0.6} />
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: "#ccd1d1" }}>
                                                Total Employees
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 50 + "%", height: 150 }} className='gradientLight'>
                                        <CardContent>
                                            <div className='iconStyle'>
                                                <ShoppingBagIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.4} end={totalProjects} duration={0.6} />
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: "#ccd1d1" }}>
                                                Total Projects
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    {/* <Card sx={{ height: 50 + "vh", minWidth: 47 + "%" }}>
                                        <CardContent>
                                            <EmployeeChart />
                                        </CardContent>
                                    </Card> */}
                                </Stack>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Card sx={{ height: 40 + "vh" }}>
                                    <CardContent>
                                        <EmployeeChart />
                                    </CardContent>
                                </Card>
                            </Grid> */}
                            {/* <Grid item xs={4}>
                                <Stack spacing={2} >
                                    <Card sx={{ maxWidth: 345 }} className='gradientLight'>
                                        <Stack spacing={2} direction="row">
                                            <div className='iconStyle'>
                                                <StorefrontIcon />
                                            </div>
                                            <div className='paddingAll'>
                                                <span className='priceTitle'>$203k</span>
                                                <br />
                                                <span className='priceSubtitle'>Total Income</span>
                                            </div>
                                        </Stack>
                                    </Card>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <Stack spacing={2} direction="row">
                                            <div className='iconStyleBlack'>
                                                <StorefrontIcon />
                                            </div>
                                            <div className='paddingAll'>
                                                <span className='priceTitle'>$203k</span>
                                                <br />
                                                <span className='priceSubtitle'>Total Income</span>
                                            </div>
                                        </Stack>
                                    </Card>
                                </Stack>
                            </Grid> */}
                        </Grid>
                        <Box height={20} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card sx={{ height: 80 + "vh" }}>
                                    <CardContent>
                                        <div className="row">
                                            <div className="">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h6 >Projects</h6>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th> # </th>
                                                                        <th> Name </th>
                                                                        <th> Client Name </th>
                                                                        <th> Domain </th>
                                                                        {/* <th> Progress </th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {allProjects.map((project, key) => {
                                                                        return (<tr key={key + 1}>
                                                                            <td> {key + 1} </td>
                                                                            <td> {project?.projectName} </td>
                                                                            <td> {project?.clientName} </td>
                                                                            <td> {project?.domain} </td>
                                                                        </tr>);
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                            {/* <Grid item xs={4}>
                                <Card sx={{ height: 80 + "vh" }}>
                                    <CardContent>
                                    </CardContent>
                                </Card>
                            </Grid> */}
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

export default connect(mapStateToProps)(LandingPage)