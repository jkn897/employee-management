import React, { useState } from 'react';
import { TextField, Button, Stack, Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';

import { Link } from "react-router-dom";
import UserService from "../services/UserService";


const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [qualification, setQualification] = useState('');
    const [desktop, setDesktop] = useState('')
    const [desktopSerialNo, setDesktopSerialNo] = useState('')
    const [laptop, setLaptop] = useState('')
    const [laptopSerialNo, setLaptopSerialNo] = useState('')

    function handleChange(event) {
        setQualification(event.target.value);
    }
    function clear() {
        setFirstName('')
        setLastName('')
        setEmail('')
        setDateOfBirth('')
        setPassword('')
        setGender('')
        setQualification('');
        setDesktop('')
        setDesktopSerialNo('')
        setLaptop('')
        setLaptopSerialNo('')
    }

    const onRadioSelect = e => {
        setGender(e.target.value);
        console.log(gender + " selected");
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(firstName, lastName, email, dateOfBirth, password);
        const data = {
            "firstName": firstName, "lastName": lastName, "email": email,
            "dateOfBirth": dateOfBirth, "password": password, "qualification": qualification,
            "desktop": desktop, "desktopSlNo": desktopSerialNo, "laptop": laptop, "laptopSlNo": laptopSerialNo
        }
        console.log('data : ' + JSON.stringify(data));
        UserService.register(data).then((response) => {
            // console.log('response : '+JSON.stringify(response));
            console.log(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <React.Fragment>
            <div style={{
                marginTop: "30px", display: "flex", marginLeft: "170px", marginBottom: "30px",
                borderRadius: '2px black'
            }}>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" >
                        <TextField type="text" variant='outlined' color='secondary'
                            label="First Name" onChange={e => setFirstName(e.target.value)}
                            value={firstName} fullWidth required
                        />
                        <TextField type="text" variant='outlined' color='secondary'
                            label="Last Name" onChange={e => setLastName(e.target.value)}
                            value={lastName} fullWidth required
                        />
                    </Stack>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group" >
                            <FormControlLabel value="female" onChange={onRadioSelect} control={<Radio />} label="Female" />
                            <FormControlLabel value="male" onChange={onRadioSelect} control={<Radio />} label="Male" />
                            <FormControlLabel value="other" onChange={onRadioSelect} control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <Stack spacing={3} direction="row">
                        <TextField type="email" variant='outlined' color='secondary'
                            label="Email" onChange={e => setEmail(e.target.value)}
                            value={email} fullWidth required
                        />
                        <TextField type="password" variant='outlined' color='secondary'
                            label="Password" onChange={e => setPassword(e.target.value)}
                            value={password} required fullWidth
                        />
                        <input type="date" variant='outlined' color='secondary'
                            label="Date of Birth" onChange={e => setDateOfBirth(e.target.value)}
                            value={dateOfBirth} fullWidth required style={{ minWidth: '280px' }}
                        />

                    </Stack>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Highest Qualification</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select"
                            value={qualification} label="Highest Qualification" onChange={handleChange}>
                            <MenuItem value="BCA">BCA</MenuItem>
                            <MenuItem value="MCA">MCA</MenuItem>
                            <MenuItem value="BTECH CS">B.Tech. Computer Science</MenuItem>
                        </Select>
                    </FormControl>
                    {"\n"}
                    <Divider sx={{ fontWeight: 'light', fontSize: '20px' }}>Tagged Assets</Divider>
                    <Stack spacing={4} direction="row">
                        <FormControl sx={{ m: 1, minWidth: 200 }} >
                            <InputLabel id="demo-select-small-label">Desktop</InputLabel>
                            <Select labelId="demo-select-small-label" id="demo-select-small" required
                                value={desktop} label="Desktop" onChange={e => setDesktop(e.target.value)} >
                                <MenuItem value="None"><em>None</em></MenuItem>
                                <MenuItem value="Microsoft Surface">Microsoft Surface</MenuItem>
                                <MenuItem value="Lenovo Thinkpad">Lenovo Thinkpad</MenuItem>
                                <MenuItem value="Dell">Dell</MenuItem>
                                <MenuItem value="Asus">Asus</MenuItem>
                                <MenuItem value="Acer">Acer</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField type="text" variant='outlined' color='secondary'
                            label="Desktop Serial No" onChange={e => setDesktopSerialNo(e.target.value)}
                            value={desktopSerialNo} fullWidth />

                        <FormControl sx={{ m: 1, minWidth: 200 }} >
                            <InputLabel id="demo-select-small-label">Laptop</InputLabel>
                            <Select labelId="demo-select-small-label" id="demo-select-small" required
                                value={laptop} label="Laptop" onChange={e => setLaptop(e.target.value)} >
                                <MenuItem value="None"><em>None</em></MenuItem>
                                <MenuItem value="Microsoft Surface">Microsoft Surface</MenuItem>
                                <MenuItem value="Lenovo Thinkpad">Lenovo Thinkpad</MenuItem>
                                <MenuItem value="Dell">Dell</MenuItem>
                                <MenuItem value="Asus">Asus</MenuItem>
                                <MenuItem value="Acer">Acer</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField type="text" variant='outlined' color='secondary'
                            label="Laptop  Serial No" onChange={e => setLaptopSerialNo(e.target.value)}
                            value={laptopSerialNo} fullWidth />
                    </Stack>
                    <Divider sx={{ fontWeight: 'light', fontSize: '20px' }}>Professional Details</Divider>
                    <Stack spacing={2} direction="row">

                    </Stack>
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                </form>
            </div>
            {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}

        </React.Fragment>
    )
}

export default Register