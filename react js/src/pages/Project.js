import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Stack, Button, Card, CardContent, Grid, TextField, Typography, Alert } from '@mui/material';
import UserDataService from "../services/UserService";
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import Sidebar from '../components/Sidebar';
import "../layout/Dash.css";
import { connect } from 'react-redux';

const Projects = (props) => {

	const { isLoggedIn, message, user } = props;
	const authorities = user?.user?.authorities;
	const userName = user?.user?.username;

	let userRoles = [];
	// console.log('username : ' + userName);
	authorities?.forEach((authorityObj, index) => {
		userRoles.push(authorityObj?.authority);
	});

	const [projectName, setProjectName] = useState('');
	const [clientName, setClientName] = useState('');
	const [domain, setDomain] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const [projectModules, setProjectModules] = useState([{ projectModule: "" }]);
	const handleModuleAdd = () => {
		setProjectModules([...projectModules, { projectModule: "" }]);
	};

	const handleModuleChange = (event, index) => {
		console.log('index ' + index)
		let { name, value } = event.target;
		let onChangeModuleValue = [...projectModules];
		onChangeModuleValue[index][name] = value;
		setProjectModules(onChangeModuleValue);
	};

	const handleModuleDelete = (index) => {
		const newArray = [...projectModules];
		newArray.splice(index, 1);
		setProjectModules(newArray);
	};

	const [projectDuration, setProjectDuration] = useState('');
	const [projectStartDt, setProjectStartDt] = useState('');
	const [projectEndDt, setProjectEndDt] = useState('');

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const projectData = {
			"projectName": projectName,
			"clientName": clientName,
			"projectDuration": projectDuration,
			"projectModules": projectModules,
			"domain": domain,
		}
		// console.log('projectData : ' + JSON.stringify(projectData));
		UserDataService.saveMasterProject(projectData)
			.then((response) => {
				console.log(response.data);
				if (response.data?.projectMaster?.id) {
					setShowAlert(true);
					clearProjectFields();
					setProjectModules([{ projectModule: "" }]);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}
	const projectSaveSuccesAlert = () => {
		setShowAlert(true);
	};
	const projectSaveFailedAlert = () => {
		setShowAlert(false);
	};

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	function clearProjectFields() {
		setProjectName('');
		setClientName('');
		setDomain('');
		setProjectDuration('');
		setProjectStartDt('');
		setProjectEndDt('');
	}

	useEffect(() => {

	}, []);

	return (
		<>
			{isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
				{/* <Sidebar /> */}
				<CustomizedAppBar />
				<div className="" style={{ marginLeft: '250px' }}>
					<DrawerSideBar />
					<Box height={50} />
					{/* <Stack> */}
					<Box style={{ marginTop: '20px' }}>
						<Card >
							<CardContent>
								<Typography gutterBottom>Add New Project</Typography>
								<form onSubmit={handleFormSubmit}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<TextField type='text' size='small' label="Project Name" value={projectName} variant="outlined" onChange={e => setProjectName(e.target.value)} placeholder="Enter project name" fullWidth required />
										</Grid>
										<Grid item xs={12} sm={4}>
											<TextField type='text' size='small' label="Client Name" value={clientName} variant="outlined" onChange={e => setClientName(e.target.value)} placeholder="Enter client name" fullWidth required />
										</Grid>
										<Grid xs={12} item sm={4}>
											<TextField type='text' size='small' label="Project Duration" value={projectDuration} variant="outlined" onChange={e => setProjectDuration(e.target.value)} placeholder="Enter project duration year" fullWidth required />
										</Grid>
										<Grid xs={12} item sm={4}>
											<TextField type='text' size='small' label="Domain Name" value={domain} variant="outlined" onChange={e => setDomain(e.target.value)} placeholder="Enter domain name" fullWidth required />
										</Grid>
										<Grid item xs={12} sm={4}>
											<TextField size='small' type='date' label="" value={projectStartDt} variant="outlined" onChange={e => setProjectStartDt(e.target.value)} placeholder="Enter project start date"
												fullWidth required />
										</Grid>

										<Grid item xs={12} sm={4}>
											<TextField size='small' type='date' label="" value={projectEndDt} variant="outlined" onChange={e => setProjectEndDt(e.target.value)} placeholder="Enter project end date"
												fullWidth required />
										</Grid>
										<Typography gutterBottom sx={{ marginLeft: "15px", marginTop: "15px" }}>Add Project Functionality</Typography>
										{projectModules.map((item, index) => (
											<Grid container spacing={2} sx={{ marginLeft: "-5px", padding: "5px" }} key={index}>
												<Grid item xs={12} sm={4}>
													<TextField type='text' size='small' label="Module Name" value={item.projectModule} variant="outlined"
														name="projectModule" onChange={e => handleModuleChange(e, index)} placeholder="Enter module name" fullWidth required />
												</Grid>
												{projectModules.length > 1 && (
													<Grid item xs={12} sm={4}>
														<Button variant='outlined' onClick={() => handleModuleDelete(index)} color='primary'>Delete Module</Button>
													</Grid>
												)}
												{index === projectModules.length - 1 && (
													<Grid item xs={12} sm={4}>
														<Button variant='outlined' onClick={handleModuleAdd} color='primary'>Add Module</Button>
													</Grid>
												)}
											</Grid>
										))}
									</Grid>
									<Grid xs={12} item sm={6}>
										{showAlert && (
											<Alert severity="success" variant='filled' iconMapping={{
												success: <CheckCircleOutlineIcon fontSize="inherit" />
											}}
												onClose={handleCloseAlert}>
												Project Added Successfully.
											</Alert>
										)}
									</Grid>
									<Grid xs={12} item sm={6} sx={{ marginTop: "20px" }}>
										<Button type='submit' variant='outlined' color='primary'>Add Project</Button>
									</Grid>
								</form>
							</CardContent>
						</Card>
					</Box>
					{/* </Stack> */}
				</div>
			</div>) : (<div>Please Login First</div>)
			}
		</>
	);
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
export default connect(mapStateToProps)(Projects)