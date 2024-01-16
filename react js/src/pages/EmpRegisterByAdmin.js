import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { useState } from 'react'
import UserService from '../services/UserService';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DrawerSideBar from '../layout/DrawerSideBar';
import CustomizedAppBar from '../layout/CustomizedAppBar';


function EmpRegisterByAdmin() {

    const [pageTitle, setPageTitle] = useState('Add / Register Employee');

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
    const [disableHighestQualification, setDisableHighestQualification] = useState(false);

    const [disablePrimarySkill, setDisablePrimarySkill] = useState(false);
    const [disableSecondarySkill, setDisableSecondarySkill] = useState(false);

    const [disableAddress, setDisableAddress] = useState(false);
    const [disableCity, setDisableCity] = useState(false);
    const [disableState, setDisableState] = useState(false);
    const [disableCountry, setDisableCountry] = useState(false);
    const [disablePincode, setDisablePincode] = useState(false);

    const [showHideAssets, setShowHideAssets] = useState(false);

    const [showHideButton, setShowHideButton] = useState(true);

    if (location.pathname.includes("empRegister/view")) {
        console.log('matched : ');
        UserService.getEmployeeById(employeeId).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            if (response.data) {
                setShowHideButton(false);
                setPageTitle('Employee Details');
                setValueForView(response.data);
                disableForEmpInfoView();
                setShowHideAssets(true);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const empData = {
            "firstName": firstName, "lastName": lastName, "email": email, "gender": gender, "jobTitle": jobTitle,
            "dateOfBirth": dateOfBirth, "phone": phone, "highestQualification": highestQualification,
            "professionalDetail": { "primarySkill": primarySkill, "otherSkills": [secondarySkill] },
            "address": { "city": city, "state": state, "country": country, "pinCode": pinCode, "address": address }
        }

        console.log('data : ' + JSON.stringify(empData));
        // alert('data : ' + JSON.stringify(empData));

        UserService.register(empData).then((response) => {
            console.log('response : ' + JSON.stringify(response.data.Employee));
            if (response.data?.Employee?.empId) {
                setShowAlert(true);
                clear();
            }
        }).catch((e) => {
            console.log(e);
        });

        // event.target.reset();
    };
    /*setTimeout(() => {
        if (showAlert) {
            // console.log('inside setTimeout : ' + showAlert);
            setShowAlert(false);
        }

    }, 3000);*/
    function clear() {
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

    function disableForEmpInfoView() {
        setDisableFname(true);
        setDisableLname(true);
        setDisableGender(true);
        setDisableEmail(true);
        setDisableDob(true);
        setDisableHighestQualification(true);

        setDisablePrimarySkill(true);
        setDisableSecondarySkill(true);

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
    }

    return (
        <>
            {/* <Sidebar /> */}
            <CustomizedAppBar />
            <Box height={40} />
            <div className='' style={{ marginLeft: '220px', borderRadius: '60px 60px;' }}>
                <DrawerSideBar />
                <Box height={25} />
                {/* style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }} */}
                <Card>
                    <CardContent sx={{}}>
                        <Typography variant='h6' gutterBottom>{pageTitle}</Typography>
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
                                    {/*<select value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)} className='FormControl'
                                    placeholder='Select Highest Qualification'
                                    multiple={false}>
                                    <option value=''>Select</option>
                                    <option value='M.TECH'>M.TECH</option>
                                    <option value='MCA'>MCA</option>
                                    <option value='MBA'>MBA</option>
                                    <option value='B.TECH CS'>B.TECH CS</option>
                                    <option value='B.TECH EE'>B.TECH EE</option>
                                </select>*/}
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField size='small' type='text' value={jobTitle} label="Job Title" variant="outlined" onChange={e => setJobTitle(e.target.value)} placeholder="Enter job title" fullWidth required />
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
                                    <Grid item sm={6} xs={12}>
                                        {showHideButton && <Button style={{ marginLeft: '10px' }} type='submit' variant='outlined' color='primary' lign>Submit</Button>}
                                    </Grid>
                                    <Grid item sm={6}>
                                        {showAlert && (
                                            <Alert severity="success" variant='filled' iconMapping={{
                                                success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                            }}
                                                onClose={handleCloseAlert}>
                                                Employee Added Successfully.
                                            </Alert>
                                        )}
                                        {/* <Alert variant="filled" severity="error">
                                    Employee save failed.
                                </Alert> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            {showHideAssets && <Typography variant='h6' gutterBottom>Tagged Assets</Typography>
                            }
                            {/* <Grid container spacing={2}>

                            </Grid>  */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EmpRegisterByAdmin