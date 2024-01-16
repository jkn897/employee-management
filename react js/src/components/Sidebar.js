import React, { Component, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Typography } from "@mui/material";

const Nav = styled.div`
    background: #15171c;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 1rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #15171c;
    width: 200px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

// const Sidebar = () => {
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.sidebar = true;
        this.showSidebar = this.showSidebar.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    showSidebar(e) {
        this.sidebar = !this.sidebar;
    }

    logOut() {
        console.log('logOut clicked');
        this.props.dispatch(logout());
        this.setState({
            currentUser: undefined,
        });
    }

    // const [sidebar, setSidebar] = useState('true');
    // const showSidebar = () => setSidebar(!sidebar);
    render() {
        return (
            <>
                <IconContext.Provider value={{ color: "#fff" }}>
                    <Nav>
                        <NavIcon to="#">
                            <FaIcons.FaBars
                                onClick={this.showSidebar}
                            />
                        </NavIcon>
                        <Typography sx={{ display: "flex", alignItems: "right" }}>
                            <h5
                                style={{
                                    textAlign: "right",
                                    marginLeft: "200px",
                                    color: "green",
                                }}
                            >
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    Logout
                                </a>
                            </h5>
                        </Typography>

                    </Nav>
                    <SidebarNav sidebar={this.sidebar}>
                        <SidebarWrap>
                            {/* <NavIcon to="#">
                                <AiIcons.AiOutlineClose
                                    onClick={this.showSidebar}
                                />
                            </NavIcon> */}
                            <div style={{ fontSize: '15px' }}>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <SubMenu
                                            item={item}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        </SidebarWrap>
                    </SidebarNav>
                </IconContext.Provider>
            </>
        );
    }
};
function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    // console.log('login component');
    console.log('isLoggedIn : ' + isLoggedIn);
    console.log('message : ' + message);
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(Sidebar);