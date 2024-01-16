import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import { Button, Grid, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UserDataService from "../services/UserService";
import "../layout/Dash.css";
import { connect } from 'react-redux';
import UserService from "../services/UserService";
import { redirect } from 'react-router-dom';

function ManageProjects(props) {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;

    let userRoles = [];

    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });

    const [empList, setEmpList] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [projectsMaster, setProjectsMaster] = useState([]);
    const [projectModules, setProjectModules] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [functionality, setFunctionality] = useState([]);
    const [functionalityId, setFunctionalityId] = useState('');

    const [moduleTasks, setModuleTasks] = React.useState([{ task: "" }]);
    const [project, setProject] = React.useState('');
    const [module, setModule] = React.useState('');

    let params = {};
    const employeesList = async () => {
        UserDataService.getAllEmployees(params).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            setEmpList(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        UserService.getAllProjects({}).then((response) => {
            setProjectsMaster(response.data?.projectsMaster);
            console.log(response.data?.projectsMaster);
        }).catch((e) => {
            console.log(e);
        });
        employeesList();
    }, []);

    const handleChange = (event) => {
        setProject(event.target.value);
        console.log(project);
        // filterProjectModules(event.target.value);
        filterProjectFunctionality(event.target.value);
    };

    const filterProjectModules = (projectId) => {
        console.log(projectId);
        projectsMaster.map((project, projectIndex) => {
            if (project?.projectModules?.length > 0 && projectId === project?.id) {
                projectModules.splice(0, projectModules.length);
                project.projectModules.map((module, moduleIndex) => {
                    projectModules.push(module);
                    console.log(module);
                });
                console.log(projectModules);
            }
        });
    }


    const filterProjectFunctionality = (projectId) => {
        console.log(projectId);
        projectsMaster.map((project, projectIndex) => {
            if (project?.functionalities?.length > 0 && projectId === project?.id) {
                functionality.splice(0, functionality.length);
                project.functionalities.map((projectFunctionality, functionalityIndex) => {
                    functionality.push(
                        {
                            "functionalityId": projectFunctionality?.functionalityId,
                            "functionalityName": projectFunctionality?.functionalityName
                        }
                    );

                });
                console.log(functionality);
            }
        });
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleProjectAssign = (event) => {
        const assignData = {
            "employeeId": employeeId,
            "projectId": project,
            "functionalityId": functionalityId
        }
        UserDataService.tagProjectToEmployee(assignData)
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    setShowAlert(true);
                    clearFields();
                    //     setProjectModules([{ projectModule: "" }]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const handleTicketSubmit = (event) => {
        const moduleTaskDetails = {
            // "moduleTasks": moduleTasks,
            "moduleTask": moduleTask,
            "projectId": project,
            "moduleId": module,
        }
        console.log('moduleTaskDetails : ' + JSON.stringify(moduleTaskDetails));
        UserDataService.createModuleTask(moduleTaskDetails)
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    setShowAlert(true);
                    clearFields();
                }
            })
            .catch((e) => {
                setShowAlert(false);
                console.log(e);
            });
    };

    const clearFields = () => {
        setProject('');
        setFunctionalityId('');
        setEmployeeId('');
    };

    const [moduleTask, setModuleTask] = useState('');

    const handleTaskAdd = () => {
        setModuleTasks([...moduleTasks, { task: "" }]);
    };

    const handleTaskChange = (event, index) => {
        console.log('index ' + index)
        let { name, value } = event.target;
        let onChangeModuleValue = [...moduleTasks];
        onChangeModuleValue[index][name] = value;
        console.log(onChangeModuleValue);
        setModuleTasks(onChangeModuleValue);
    };

    const handleTaskDelete = (index) => {
        const newArray = [...moduleTasks];
        newArray.splice(index, 1);
        setModuleTasks(newArray);
    };
    return (
        <>
            {isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
                <CustomizedAppBar />
                <Box height={15} />
                <Box sx={{ display: 'flex' }}>
                    <DrawerSideBar />
                    <Box container="main" sx={{ flexGrow: 1, p: 4 }}>
                        <Typography variant="h7" noWrap component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        > Assign Project Tasks/Functionality</Typography>
                        <Box height={30} />
                        <form onSubmit={handleProjectAssign}>
                        <Grid container spacing={2}>
                            
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select"
                                            value={project} label="Projects" onChange={handleChange} required >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {projectsMaster && projectsMaster.map((option, index) => (
                                                <MenuItem key={index} value={option?.id}>{option?.projectName}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Functionality</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" required
                                            value={functionalityId} label="Functionality" onChange={(e) => setFunctionalityId(e.target.value)}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {functionality && functionality.map((option, index) => (
                                                <MenuItem key={index} value={option?.functionalityId}>{option?.functionalityName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Project Module</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={module} label="Module" onChange={(e) => setModule(e.target.value)}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {projectModules && projectModules.map((option, index) => (
                                            <MenuItem key={index} value={option?.moduleId}>{option?.moduleName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid> */}
                                <Grid item xs={4}></Grid>
                                {/*<Typography gutterBottom sx={{ marginLeft: "15px", marginTop: "15px" }}>Add Module Tasks</Typography>
                             {moduleTasks.map((item, index) => (
                                <Grid container spacing={2} sx={{ marginLeft: "-5px", padding: "5px" }} key={index}>
                                    <Grid item xs={12} sm={4}>
                                        <textarea id="taskDetails" rows={5} cols={35}
                                            name="task" placeholder='Enter module or task details'
                                            value={item.task} onChange={(e) => handleTaskChange(e, index)}
                                        />
                                    </Grid>
                                    {moduleTasks.length > 1 && (
                                        <Grid item xs={12} sm={4}>
                                            <Button variant='outlined' onClick={() => handleTaskDelete(index)} color='primary'>Delete Task</Button>
                                        </Grid>
                                    )}
                                    {index === moduleTasks.length - 1 && (
                                        <Grid item xs={12} sm={4}>
                                            <Button variant='outlined' onClick={handleTaskAdd} color='primary'>Add Task</Button>
                                        </Grid>
                                    )}
                                </Grid>
                            ))} */}

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Employees</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select" required
                                            value={employeeId} label="Projects" onChange={(e) => setEmployeeId(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {empList.map((e, key) => {
                                                return <MenuItem key={key} value={e?.id}>{e.firstName + ' ' + e.lastName}</MenuItem>
                                            })}
                                            {/* {employees && employees.map((option, index) => (
                                            {JSON.stringify(option)}
                                            // <MenuItem key={index} value={option?.id}>{option?.projectName}</MenuItem>
                                        ))} */}

                                        </Select>
                                    </FormControl>
                                </Grid>



                                {/* <Typography gutterBottom sx={{ marginLeft: "15px", marginTop: "15px" }}>Add Module Tasks</Typography>
                            <Grid item xs={4}>
                                <textarea id="taskDetails" rows={5} cols={62}
                                    name="task" placeholder='Enter module or task details'
                                    value={moduleTask} onChange={(e) => setModuleTask(e.target.value)}
                                />
                            </Grid> */}
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* <Button type='submit' variant='outlined' color='primary' onClick={handleTicketSubmit}>Create Tasks</Button> */}
                                </Grid>

                                <Grid item xs={6}>
                                    <Button type='submit' variant='outlined' color='primary'>Assign Project</Button>
                                </Grid>

                                <Grid xs={12} item sm={6}>
                                    {showAlert && (
                                        <Alert severity="success" variant='filled' iconMapping={{
                                            success: <CheckCircleOutlineIcon fontSize="inherit" />
                                        }}
                                            onClose={handleCloseAlert}>
                                            Project Assigned Successfully.
                                        </Alert>
                                    )}
                                </Grid>
                            
                        </Grid>
                        </form>
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

export default connect(mapStateToProps)(ManageProjects)