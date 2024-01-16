import React, { useEffect, useState } from 'react'
import UserDataService from "../services/UserService";
import DataTable from 'react-data-table-component';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import CustomizedAppBar from '../layout/CustomizedAppBar';
import DrawerSideBar from '../layout/DrawerSideBar';
import SweetAlert from 'react-bootstrap-sweetalert';

const Employees = () => {
    const [employeesMaster, setEmployeesMaster] = useState([]);
    const [filterEmployeeMaster, setFilterEmployeeMaster] = useState([]);
    const [search, setSearch] = useState("");
    const paginationUrl = 'http://localhost:8181/api/v1/getEmployeesWithPagination';

    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const currentPerPage = 5;

    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = page => {
        fetchUsers(page);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchUsers(page, newPerPage);
        setPerPage(newPerPage);
    };



    const navigate = useNavigate();

    /*const getAllEmp = async () => {
        UserDataService.getAll(params).then((response) => {
            // console.log('response : ' + JSON.stringify(response.data));
            // const { users, totalPages } = response.data;
            setEmployeesMaster(response.data?.employees);
            setFilterEmployeeMaster(response.data?.employees);
        }).catch((e) => {
            console.log(e);
        });
    }*/
    const getEmpList = () => {
        setLoading(true);
        axios.get(`${paginationUrl}?page=${page}&perPage=${currentPerPage}&delay=1`)
            .then(response => {
                // console.log('pagination : ' + JSON.stringify(response.data?.employees?.length));
                if (response.data?.employees?.length > 0) {
                    setEmployeesMaster(response.data?.employees);
                    setTotalRows(response.data?.totalRows);
                    setFilterEmployeeMaster(response.data?.employees);
                }
                setLoading(false);
            }).catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }
    const handleNavigate = () => {
        navigate('/empRegister')
    }

    const handleSearch = () => {
        navigate('/empRegister')
    }

    const viewEmployee = (row) => {
        console.log('row : ' + JSON.stringify(row));
        navigate('/empRegister/view/' + row.id)
    }
    const [enableAlert, setEnableAlert] = useState(false);
    const removeEmployee = (row) => {
        console.log('row : ' + JSON.stringify(row));
        UserDataService.removeEmployeeById(row.id).then((response) => {
            console.log('response : ' + JSON.stringify(response.data));
            setEnableAlert(true);
        }).catch((e) => {
            console.log(e);
        });
    }

    const columns = [
        { name: 'Employee Id', selector: (row) => row.id, sortable: true },
        { name: 'First Name', selector: (row) => row.firstName }, { name: 'Last Name', selector: (row) => row.lastName },
        { name: 'Gender', selector: (row) => row.gender }, { name: 'Email', selector: (row) => row.email },
        { name: 'Designation', selector: (row) => row.jobTitle },
        { name: 'Action', cell: (row) => <button className='btn btn-sm btn-primary' onClick={() => viewEmployee(row)} >View</button > },
        // { name: 'Action', cell: (row) => <button className='btn btn-sm btn-primary' onClick={() => removeEmployee(row)} >Remove</button > }
    ];
    useEffect(() => {
        // getAllEmp();
        getEmpList();
    }, [page]);

    useEffect(() => {
        const result = employeesMaster.filter(employee => {
            return (
                employee?.gender.match(search) || employee?.firstName.match(search)
                || employee?.lastName.match(search) || employee?.email.match(search)
            );
        });
        // console.log(result);
        setFilterEmployeeMaster(result);
    }, [search]);

    return (
        <>
            {/* <Sidebar /> */}
            <CustomizedAppBar />
            <Box height={50} />
            <Stack direction="row" spacing={2} className='home' >
                <div style={{ backgroundColor: '#f2edf3' }}>
                    <DrawerSideBar />
                    <DataTable title="Employees" columns={columns}
                        data={filterEmployeeMaster}
                        progressPending={loading}
                        fixedHeader
                        highlightOnHover
                        // subHeader commented to disappear search bar
                        subHeaderComponent={
                            <input type='text' placeholder='Search' className='w-25 form-control'
                                value={search} onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                        }
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        paginationPerPage={currentPerPage}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        onChangePage={page => setPage(page)}
                    />
                </div>
                <div style={{}}>
                    <Button size='small' variant='outlined'
                        onClick={handleNavigate}>Add Employee</Button>
                    {/* <Button size='small' variant='outlined'
                        onClick={handleSearch}>Search By</Button> */}
                </div>
                {/* {enableAlert && <SweetAlert success onConfirm={this.hideAlert}>
                    Employee Removed Successfully
                </SweetAlert>
                } */}
            </Stack>
        </>
    )
}
{/* https://codesandbox.io/p/sandbox/react-data-table-server-side-pagination-delete-xmdju?file=%2Fsrc%2Findex.js%3A1%2C1-3%2C1 */ }
export default Employees