import React from 'react'

const EmployeeChangePassowrd = () => {
    return (
        <>
            <CustomizedAppBar />
            <Box height={15} />
            {/* backgroundColor: '#f2edf3' */}
            <Box sx={{ display: 'flex' }}>
                <DrawerSideBar />
                <Box container="main" sx={{ flexGrow: 1, p: 4, height: 600, backgroundColor: '#f2edf3' }}>
                    <Box height={30} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ minWidth: 49 + "%", height: 150, borderRadius: "20px 20px" }} className=''>
                                    <CardContent>
                                        
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </>

    )
}

export default EmployeeChangePassowrd