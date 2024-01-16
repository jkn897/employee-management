import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Stack, Button, Card, CardContent, Grid, TextField, Typography, Divider, Alert } from '@mui/material';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import UserDataService from "../services/UserService";
import Sidebar from '../components/Sidebar';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import { connect } from 'react-redux';

const ManageAssets = (props) => {

    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;

    let userRoles = [];
    // console.log('username : ' + userName);
    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });

    const [name, setName] = useState('');
    const [assetTaggedAlert, setAssetTaggedAlert] = useState(false);
    const [manufacturer, setManufacturer] = useState('');
    const [tagSerialNo, setTagSerialNo] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [masterAssets, setMasterAssets] = useState([]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const assetsData = {
            assetName: name,
            manufacturerName: manufacturer,
            serialNo: serialNo,
            assetPrice: 0.0
        }
        console.log('assetsData : ' + JSON.stringify(assetsData));
        UserDataService.saveMasterAsset(assetsData)
            .then((response) => {
                console.log(response.data);
                if (response.data?.assetMaster?.assetId) {
                    setShowAlert(true);
                    clearAssetFields();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    let params = {};
    const employeesList = async () => {
        UserDataService.getAllEmployees(params).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            setEmpList(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const [employeeId, setEmployeeId] = useState();
    const [empList, setEmpList] = useState([]);
    const [assetSerialNo, setAssetSerialNo] = useState('');

    const closeTaggedAssetAlert = () => {
        setAssetTaggedAlert(false);
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        employeesList();
    }, []);

    const handleTagAssign = (event) => {
        const tagAssetData = {
            'empCode': employeeId,
            'assetSerialNo': assetSerialNo
        }
        console.log('tagAssetData : ' + JSON.stringify(tagAssetData));

        UserDataService.tagAssetToEmp(tagAssetData)
            .then((response) => {
                console.log('response.data : ' + JSON.stringify(response.data));
                if (response.data) {
                    setAssetTaggedAlert(true);
                    setAssetSerialNo('');
                    setEmployeeId('');
                }

            })
            .catch((e) => {
                console.log(e);
            });
    }

    function clearAssetFields() {
        setName('');
        setManufacturer('');
        setSerialNo('');
    }

    useEffect(() => {
        UserDataService.getAllAssets({}).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            if (response.data?.assetsMaster) {
                setMasterAssets(response.data?.assetsMaster);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    return (
        <>
            {isLoggedIn && userRoles.includes('ADMIN') == true ? (<div>
                <CustomizedAppBar />
                <Box height={50} />
                <div class='' style={{ marginLeft: '250px' }}>
                    <DrawerSideBar />
                    <Stack>
                        <Box style={{ marginTop: '20px' }}>
                            <Card >
                                <CardContent>
                                    <Typography gutterBottom>Add New Assets</Typography>
                                    <form onSubmit={handleFormSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
                                                <TextField type='text' size='small' label="Asset Name" value={name} variant="outlined" onChange={e => setName(e.target.value)} placeholder="Enter asset name" fullWidth required />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField type='text' size='small' label="Manufacturer Name" value={manufacturer} variant="outlined" onChange={e => setManufacturer(e.target.value)} placeholder="Enter manufacturer name" fullWidth required />
                                            </Grid>
                                            {/*<Grid xs={12} item sm={3}>
                                         <TextField type='number' size='small' label="Quantity" value={quantity} variant="outlined" onChange={e => setQuantity(e.target.value)} placeholder="Enter quanity" fullWidth required /> 
                                    </Grid>*/}
                                            <Grid xs={12} item sm={4}>
                                                <TextField type='text' size='small' label="Serial No" value={serialNo} variant="outlined" onChange={e => setSerialNo(e.target.value)} placeholder="Enter asset serial no" fullWidth required />
                                            </Grid>

                                            <Grid xs={12} item sm={4}>
                                                <Button type='submit' variant='contained' color='primary'>Submit</Button>
                                            </Grid>
                                            <Grid xs={12} item sm={4}>
                                                {showAlert && (
                                                    <Alert severity="success" variant='filled' iconMapping={{
                                                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                                    }}
                                                        onClose={handleCloseAlert}>
                                                        Asset Added Successfully.
                                                    </Alert>
                                                )}
                                            </Grid>
                                            <Grid xs={12} item sm={4}>

                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Box>
                        <Divider sx={{ m: 1 }} />
                        <Box style={{}} sx={{ height: '75%' }}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom>Tag Assets To Employee</Typography>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} item sm={4}>
                                            <Form.Select aria-label="Employee"
                                                value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
                                                <option>Select Employee</option>
                                                {empList.map((e, key) => {
                                                    return <option key={key} value={e.id}>{e.firstName + ' ' + e.lastName}</option>;
                                                })}
                                            </Form.Select>
                                        </Grid>
                                        <Grid xs={12} item sm={4}>
                                            <Form.Select aria-label="Assets"
                                                value={assetSerialNo} onChange={(e) => setAssetSerialNo(e.target.value)} required>
                                                <option>Select Asset</option>
                                                {masterAssets.map((e, key) => {
                                                    return <option key={key} value={e.serialNo}>{e.assetName + ' ' + e.manufacturerName}</option>;
                                                })}
                                            </Form.Select>
                                        </Grid>
                                        <Grid xs={12} item sm={4}>
                                        </Grid>

                                        <Grid xs={12} item sm={4}>
                                            <Button type='submit' variant='contained' color='primary' onClick={handleTagAssign}>Submit</Button>
                                        </Grid>
                                        <Grid xs={12} item sm={4}>
                                            {assetTaggedAlert && (
                                                <Alert severity="success" variant='filled' iconMapping={{
                                                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                                }}
                                                    onClose={closeTaggedAssetAlert}>
                                                    Asset Tagged Successfully.
                                                </Alert>
                                            )}
                                        </Grid>
                                        <Grid xs={12} item sm={4}></Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    </Stack>
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

export default connect(mapStateToProps)(ManageAssets)