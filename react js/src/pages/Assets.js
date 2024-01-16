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


const Assets = (props) => {
    const { isLoggedIn, message, user } = props;
    const authorities = user?.user?.authorities;
    const userName = user?.user?.username;

    let userRoles = [];
    // console.log('username : ' + userName);
    authorities?.forEach((authorityObj, index) => {
        userRoles.push(authorityObj?.authority);
    });


    const assetColumns = [
        { name: 'Asset Id', selector: (row) => row.assetId, sortable: true },
        { name: 'Name', selector: (row) => row.assetName, sortable: true },
        { name: 'Serial No', selector: (row) => row.serialNo, sortable: true },
        { name: 'Manufacturer', selector: (row) => row.manufacturerName, sortable: true },
    ]
    const [assetsMaster, setAssetsMaster] = useState([]);

    useEffect(() => {
        UserDataService.getAllAssets({}).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            if (response.data?.assetsMaster) {
                setAssetsMaster(response.data?.assetsMaster);
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
                        <Box>
                            <DataTable title="Assets" columns={assetColumns} data={assetsMaster}
                                pagination fixedHeader highlightOnHover
                            />
                        </Box>
                    </Stack>
                </div>
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

export default connect(mapStateToProps)(Assets)