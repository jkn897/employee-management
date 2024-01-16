import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import { connect } from 'react-redux'
import { redirect } from 'react-router-dom/dist';

class Dashboard extends Component {
    render() {
        const { user: currentUser } = this.props;
        console.log('currentUser' + currentUser);
        if (!currentUser) {
            redirect('/login');
        }
        return (
            <>
                <Sidebar />
                <div className='home'>

                </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    // console.log('login component');
    // console.log('isLoggedIn : ' + isLoggedIn);
    console.log('message : ' + message);
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(Dashboard)