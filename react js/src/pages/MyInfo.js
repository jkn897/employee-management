import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { useState, useEffect, useMemo, useRef } from "react";
import CustomizedAppBar from '../layout/CustomizedAppBar';
import { connect, useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import DrawerSideBar from "../layout/DrawerSideBar"
import { Stack } from '@mui/material';;

function MyInfo(props) {
	const { isLoggedIn, message, user } = props;
	const authorities = user?.user?.authorities;
	const userName = user?.user?.username;
	let userRoles = [];

	authorities.forEach((authorityObj, index) => {
		userRoles.push(authorityObj?.authority);
	});
	const handleCloseAlert = () => {
		setShowAlert(false);
	};
	const [showAlert, setShowAlert] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [phone, setPhone] = useState('');
	const [highestQualification, setHighestQualification] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [primarySkill, setPrimarySkill] = useState('');
	const [secondarySkill, setSecondarySkill] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [pinCode, setPinCode] = useState('');

	const { employeeId } = useParams();
	const location = useLocation();

	// props to disable
	const [disableFname, setDisableFname] = useState(false);
	const [disableLname, setDisableLname] = useState(false);
	const [disableDob, setDisableDob] = useState(false);
	const [disableGender, setDisableGender] = useState(false);
	const [disableEmail, setDisableEmail] = useState(false);
	const [disablePhone, setDisablePhone] = useState(false);
	const [disableJobTitle, setDisableJobTitle] = useState(false);
	const [disableHighestQualification, setDisableHighestQualification] = useState(false);

	const [disablePrimarySkill, setDisablePrimarySkill] = useState(false);
	const [disableSecondarySkill, setDisableSecondarySkill] = useState(false);

	const [disableAddress, setDisableAddress] = useState(false);
	const [disableCity, setDisableCity] = useState(false);
	const [disableState, setDisableState] = useState(false);
	const [disableCountry, setDisableCountry] = useState(false);
	const [disablePincode, setDisablePincode] = useState(false);

	const [showHideButton, setShowHideButton] = useState(true);

	const handleChange = (event) => {
		setGender(event.target.value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const empData = {
			"userName": userName,
			"firstName": firstName, "lastName": lastName, "email": email, "gender": gender, "jobTitle": jobTitle,
			"dateOfBirth": dateOfBirth, "phone": phone, "highestQualification": highestQualification,
			"professionalDetail": { "primarySkill": primarySkill, "otherSkills": [secondarySkill] },
			"address": { "city": city, "state": state, "country": country, "pinCode": pinCode, "address": address }
		}

		console.log('data : ' + JSON.stringify(empData));
		// alert('data : ' + JSON.stringify(empData));

		UserService.updateEmployee(empData).then((response) => {
			console.log('response : ' + JSON.stringify(response.data.Employee));
			if (response.data?.Employee?.empId) {
				setShowAlert(true);
				setValueForView(response.data?.Employee);
			}
		}).catch((e) => {
			console.log(e);
		});
	};

	useEffect(() => {
		if (userName) {
			UserService.getEmployeeByUserName(userName).then((response) => {
				console.log('response : ' + JSON.stringify(response.data));
				if (response.data) {
					setValueForView(response.data);
					// disableForEmpInfoView();
				}
			}).catch((e) => {
				console.log(e);
			});
		}
	}, []);

	function disableForEmpInfoView() {
		setDisableFname(true);
		setDisableLname(true);
		setDisableGender(true);
		setDisableEmail(true);
		setDisableDob(true);
		setDisableHighestQualification(true);

		setDisablePrimarySkill(true);
		setDisableSecondarySkill(true);
		setDisableJobTitle(true);
		setDisablePhone(true);

		setDisableAddress(true);
		setDisableCity(true);
		setDisableState(true);
		setDisableCountry(true);
		setDisablePincode(true);
	}
	function enableEmpInfoToUpdate() {
		setDisableFname(false);
		setDisableLname(false);
		setDisableGender(false);
		setDisableEmail(false);
		setDisableDob(false);
		setDisableHighestQualification(false);

		setDisablePrimarySkill(false);
		setDisableSecondarySkill(false);

		setDisableAddress(false);
		setDisableCity(false);
		setDisableState(false);
		setDisableCountry(false);
		setDisablePincode(false);
	}
	function setValueForView(employee) {
		setFirstName(employee.firstName);
		setLastName(employee.lastName);
		setEmail(employee.email);
		setDateOfBirth(employee.dateOfBirth);
		setGender(employee.gender);
		setJobTitle(employee.jobTitle);
		setPhone(employee.contactNo);
		setHighestQualification(employee.highestQualification);

		if (employee?.professionalDetail) {
			setPrimarySkill(employee.professionalDetail.primarySkill);
			let otherSkills = employee.professionalDetail?.otherSkills.length > 0 ?
				employee.professionalDetail.otherSkills[0] : '';
			setSecondarySkill(otherSkills);
		}
		if (employee?.address) {
			setAddress(employee.address.address);
			setCity(employee.address.city);
			setState(employee.address.state);
			setCountry(employee.address.country);
			setPinCode(employee.address.pinCode);
		}
		function clearFields() {
			setFirstName('');
			setLastName('');
			setEmail('');
			setDateOfBirth('');
			setGender('');
			setJobTitle('');
			setPhone('');
			setHighestQualification('');

			setPrimarySkill('');
			setSecondarySkill('');

			setAddress('');
			setCity('');
			setState('');
			setCountry('');
			setPinCode('');
		}
	}

	return (
		<>
			{
				isLoggedIn && userRoles.includes('EMPLOYEE') == true ?
					(<div>
						<CustomizedAppBar />
						<Box height={30} />
						<Box sx={{ display: 'flex' }}>
							<DrawerSideBar />
							<Box container="main" sx={{ flexGrow: 1, p: 1, height: 600, backgroundColor: '#f2edf3' }}>
								<Box height={30} />
								<Grid container spacing={2}>
									<Grid item xs={8}>
										<Stack spacing={2} direction="row">
											<Card sx={{ minWidth: 150 + "%", height: 550, borderRadius: "20px 20px" }} className=''>
											<Box height={10} />
											<Typography sx={{textAlign:"center"}} variant='h6' gutterBottom>Employee Information</Typography>
											<Box height={10} />
												<CardContent>
													<form onSubmit={handleFormSubmit}>
														<Grid container spacing={2}>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' label="First Name" value={firstName} variant="outlined" onChange={e => setFirstName(e.target.value)} placeholder="Enter first name"
																	disabled={disableFname} fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' label="Last Name" value={lastName} variant="outlined" onChange={e => setLastName(e.target.value)} placeholder="Enter last name"
																	disabled={disableLname} fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='date' label="" value={dateOfBirth} variant="outlined" onChange={e => setDateOfBirth(e.target.value)} placeholder="Enter date of birth"
																	disabled={disableDob} fullWidth required />
															</Grid>


															<Grid item xs={12} sm={4}>
																<TextField size='small' type='email' value={email} label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} placeholder="Enter email"
																	disabled={disableEmail} fullWidth required />
															</Grid>
															<Grid xs={12} item sm={4}>
																<TextField size='small' type='text' label="Phone" value={phone} variant="outlined" onChange={e => setPhone(e.target.value)} placeholder="Enter phone"
																	disabled={disablePhone} fullWidth required />
															</Grid>
															<Grid xs={12} item sm={4}>
																<TextField size='small' type='text' value={highestQualification} label="Highest Qualification" variant="outlined" onChange={e => setHighestQualification(e.target.value)} placeholder="Enter highest qualification"
																	disabled={disableHighestQualification} fullWidth required />

															</Grid>

															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' value={jobTitle} label="Job Title" variant="outlined" onChange={e => setJobTitle(e.target.value)} placeholder="Enter job title"
																	disabled={disableJobTitle} fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
															</Grid>
															<Grid item xs={12} sm={4}>
															</Grid>

															<Grid item xs={12} sm={6}>
																<TextField size='small' type='text' disabled={disablePrimarySkill} value={primarySkill} label="Primary Skill" variant="outlined" onChange={e => setPrimarySkill(e.target.value)} placeholder="Enter primary skill" fullWidth required />
															</Grid>
															<Grid item xs={12} sm={6}>
																<TextField size='small' type='text' disabled={disableSecondarySkill} value={secondarySkill} label="Secondary Skill" variant="outlined" onChange={e => setSecondarySkill(e.target.value)} placeholder="Enter secondary skill" fullWidth required />
															</Grid>
															<br />

															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' disabled={disableAddress} value={address} label="Address" variant="outlined" onChange={e => setAddress(e.target.value)} placeholder="Enter address" fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' disabled={disableCity} value={city} label="City" variant="outlined" onChange={e => setCity(e.target.value)} placeholder="Enter city" fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' disabled={disableState} value={state} label="State" variant="outlined" onChange={e => setState(e.target.value)} placeholder="Enter state" fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' disabled={disableCountry} value={country} label="Country" variant="outlined" onChange={e => setCountry(e.target.value)} placeholder="Enter country" fullWidth required />
															</Grid>
															<Grid item xs={12} sm={4}>
																<TextField size='small' type='text' disabled={disablePincode} value={pinCode} label="Pincode" variant="outlined" onChange={e => setPinCode(e.target.value)} placeholder="Enter pincode" fullWidth required />
															</Grid>
															<Grid xs={12} style={{ marginLeft: '20px', marginTop: '5px' }}>
																<FormControl>
																	<FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
																	<RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
																		name="row-radio-buttons-group" value={gender} onChange={handleChange}>
																		<FormControlLabel value="female" control={<Radio />} label="Female" />
																		<FormControlLabel value="male" control={<Radio />} label="Male" />
																		<FormControlLabel value="other" control={<Radio />} label="Other" />
																	</RadioGroup>
																</FormControl>
															</Grid>
															<Grid container spacing={2}>
																<Grid item sm={6} xs={12} sx={{ textAlign: "center", marginLeft: '200px' }}>
																	<Button style={{}} type='submit' variant='outlined' color='primary' lign>Update</Button>
																</Grid>
																<Grid item sm={6}>
																	{showAlert && (
																		<Alert severity="success" variant='filled' iconMapping={{
																			success: <CheckCircleOutlineIcon fontSize="inherit" />,
																		}}
																			onClose={handleCloseAlert}>
																			Employee updated successfully.
																		</Alert>
																	)}
																	{/* <Alert variant="filled" severity="error">
																		Employee update failed.
																	</Alert> */}
																</Grid>
															</Grid>
														</Grid>
														<br></br>

													</form>
												</CardContent>
											</Card>
											{/* <Card sx={{ minWidth: 49 + "%", height: 150, borderRadius: "20px 20px" }} className=''>
												<CardContent>
													<div className='iconStyle'>
													</div>
													<Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
													</Typography>
													<Typography variant="body2" sx={{ color: "#ccd1d1" }}>
														Completed Tasks
													</Typography>
												</CardContent>
											</Card> */}
										</Stack>
									</Grid>
								</Grid>
							</Box>
						</Box>

					</div>)
					:
					(<div>Please Login First</div>)
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

export default connect(mapStateToProps)(MyInfo)
