import React from 'react'
import Routes from '../routes'

function Layout(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <div>
                    <Nav/>
                    <Routes/>
                </div>
            </div>
        </div>
    )
}

export default Layout