// Filename - App.js

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import "@fortawesome/fontawesome-free/css/all.css";
//import "@fortawesome/fontawesome-free/js/all.js";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Register from "./pages/Register";
import Login_V1 from "./pages/Login_V1";
import { logout } from "./actions/auth";
import EventBus from "./common/EventBus";

import { Component } from "react";
import Employees from "./pages/Employees";
import Project from "./pages/Project";
import EmpRegisterByAdmin from "./pages/EmpRegisterByAdmin";
import Dashboard from "./pages/Dashboard";
import { connect, } from "react-redux";
import Services from "./pages/Services";
import LandingPage from "./pages/LandingPage";
import Login_V2 from "./pages/Login_V2";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManageProjects from "./pages/ManageProjects";
import AssignTasks from "./pages/AssignTasks";
import NewEmpRegister from "./pages/newEmpRegister";
import MyInfo from "./pages/MyInfo";
import Leave from "./pages/Leave";
import Assets from "./pages/Assets";
import ManageAssets from "./pages/ManageAssets";
import { AdvancedPaginationTable } from "./pages/PaginationTest";
import TaskView from "./pages/TaskView";
// import { history } from "./util/history";

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    /*history.listen((location) => {
      props.dispatch(clearMessage());
    });*/


  }

  handleLoggedInChange = () => {
    this.loggedIn = !this.loggedIn;
  }

  componentDidMount() {
    const user = this.props.user;
    // console.log(this);
    // console.log(this.props);

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      console.log('logOut eventbus is executed');
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    console.log('logOut clicked');
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    // console.log('isLoggedIn : ' + isLoggedIn);
    return (
      <div>
        {/* <MemoryRouter> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login_V2 />} />
            <Route path="/login" element={<Login_V2 />} />
            <Route path="/adminDashboard" element={<LandingPage />} />
            <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/myInfo" element={<MyInfo />} />
            <Route path="/empRegister" element={<EmpRegisterByAdmin />} />
            <Route path="/empRegister/view/:employeeId" element={<EmpRegisterByAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<AssignTasks />} />
            <Route path="/viewTasks/:taskId" element={<TaskView />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/manageAssets" element={<ManageAssets />} />
            <Route path="/manageProjects" element={<ManageProjects />} />
            

            -------------for new layout--------------------
            <Route path="/services" element={<Services />} />
            <Route path="/test" element={<AdvancedPaginationTable />} />
          </Routes>
        </Router>
        {/* </MemoryRouter> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log('app.js mapStateToProps');
  // console.log(state);
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);
