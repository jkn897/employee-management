import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import DrawerSideBar from '../layout/DrawerSideBar';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import { Alert, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UserService from '../services/UserService';

const Services = (props) => {
	const { isLoggedIn, message, user } = props;
	const authorities = user?.user?.authorities;
	const [showAlert, setShowAlert] = useState(false);

	let userRoles = [];
	authorities?.forEach((authorityObj, index) => {
		userRoles.push(authorityObj?.authority);
	});

	// Style object for the input element
	const input = {
		width: "400px",
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		fontSize: "14px",
		boxShadow: "0px 0px 10px 0px grey",
	};
	const inputFile = useRef(null);

	const [file, setFile] = useState();
	const [mailBody, setMailBody] = useState();
	const [base64textString, setBase64textString] = useState();
	const [imageName, setImageName] = useState();
	const [fileType, setFileType] = useState();


	useEffect(() => {
		UserService.getCurrentTemplateData({})
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	function handleChange(event) {
		const file = event.target.files[0];
		setFileType(file?.type);
		setImageName(file.name);
		setFile(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			setBase64textString(reader.result);
		};

		reader.onerror = (error) => {
			console.log('Error: ', error);
		};
	}

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	function handleSubmit(event) {
		event.preventDefault();
		const emailTemplateDate = {
			"base64Img": base64textString?.split('base64,')[1],
			"fileName": imageName,
			"fileType": fileType,
			"mailMessage": mailBody
		}
		console.log(emailTemplateDate);
		UserService.birthdayImageUpload(emailTemplateDate)
			.then((response) => {
				console.log(response.data);
				clearFields();
				setShowAlert(true);
			})
			.catch((e) => {
				setShowAlert(false);
				console.log(e);
			});

	}
	function clearFields() {
		setMailBody('');
		if (inputFile.current) {
			inputFile.current.value = "";
			inputFile.current.type = "text";
			inputFile.current.type = "file";
		}
	}

	return (
		<>
			{isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
				<CustomizedAppBar />
				<Box height={15} />
				{/* backgroundColor: '#f2edf3' */}
				<Box sx={{ display: 'flex' }}>
					<DrawerSideBar />
					<Box container="main" sx={{ flexGrow: 1, p: 4, height: 600, backgroundColor: '#f2edf3' }}>
						<Box height={30} />
						<Grid container spacing={2}>
							<Stack spacing={2} direction="row">
								<Card sx={{ height: 450, borderRadius: "20px 20px" }} className=''>
									<Box height={10} />
									<Typography sx={{ textAlign: "center" }} variant='h6' gutterBottom>Email Template</Typography>
									<Box height={10} />
									<CardContent>
										<form onSubmit={handleSubmit}>
											<Grid container spacing={2}>
												<Grid item xs={4}>
													<textarea id="mailbody" rows={5} cols={80} required
														value={mailBody} onChange={(e) => setMailBody(e.target.value)} name="mailbody" placeholder='Mail Body'
													/>
												</Grid>
												<Grid item xs={12} >
													<input style={input} type="file" ref={inputFile} onChange={handleChange} required />
												</Grid>

												<Grid item xs={12} >
													<button type="submit" variant='outlined' className='btn btn-primary' color='primary'>Upload</button>
												</Grid>
												<Grid xs={12} item sm={6}>
													{showAlert && (
														<Alert severity="success" variant='filled' iconMapping={{
															success: <CheckCircleOutlineIcon fontSize="inherit" />
														}}
															onClose={handleCloseAlert}>
															Mail Template Update Successfully.
														</Alert>
													)}
												</Grid>
											</Grid>
										</form>
									</CardContent>
								</Card>
							</Stack>
						</Grid>
					</Box>
				</Box>
				<div>Services</div>
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
export default connect(mapStateToProps)(Services)