import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import axios from "axios";
import { GiDigitalTrace } from "react-icons/gi";
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useAppStore } from '../store/zustand-store';
import { connect } from 'react-redux';

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const sendMail = () => {
  axios.get(`http://localhost:8181/api/v1/sendBirthdayMail`);
}

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function DrawerSideBar(props) {
  const { isLoggedIn, message, user } = props;
  const authorities = user?.user?.authorities;
  const userName = user?.user?.username;

  let userRoles = [];

  // console.log('username : ' + userName);

  authorities.forEach((authorityObj, index) => {
    userRoles.push(authorityObj?.authority);
  });

  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const open = useAppStore((state) => state.dopen);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // drawer css to override
  /*PaperProps={{
    sx: {
      backgroundColor: "rgba(30, 139, 195, 0.8)"
    }
  }}*/

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          isLoggedIn && userRoles.includes('ADMIN') == true ? <List>
            <ListItem selected={pathname == '/adminDashboard'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/adminDashboard')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                <ListItemIcon sx={{}} >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/employees'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/employees')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                <ListItemIcon sx={{}} >
                  <FaIcons.FaUser />
                </ListItemIcon>
                <ListItemText primary="Employees" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/empRegister'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/empRegister')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <FaIcons.FaRegistered />
                </ListItemIcon>
                <ListItemText primary="Register" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/projects'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/projects')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <FaIcons.FaProjectDiagram />
                </ListItemIcon>
                <ListItemText primary="Projects" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/manageProjects'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/manageProjects')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Projects" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem selected={pathname == '/tasks'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/tasks')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <FaIcons.FaProjectDiagram />
                </ListItemIcon>
                <ListItemText primary="Tasks" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            <ListItem selected={pathname == '/assets'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/assets')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <GiDigitalTrace />
                </ListItemIcon>
                <ListItemText primary="Assets" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={sendMail}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <GiDigitalTrace />
                </ListItemIcon>
                <ListItemText primary="Send Mail Test" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/manageAssets'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/manageAssets')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <WebAssetIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Assets" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem selected={pathname == '/services'} disablePadding sx={{ display: 'block' }} onClick={() => navigate('/services')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <GiDigitalTrace />
                </ListItemIcon>
                <ListItemText primary="etc" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
          </List> : isLoggedIn && userRoles.includes('EMPLOYEE') == true ? (<List>

            <ListItem selected={pathname == '/employeeDashboard'} disablePadding sx={{ display: 'block' }} onClick={(e) => navigate('/employeeDashboard')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem selected={pathname == '/myInfo'} disablePadding sx={{ display: 'block' }} onClick={(e) => navigate('/myInfo')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <GiDigitalTrace />
                </ListItemIcon>
                <ListItemText primary="My Details" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem selected={pathname == '/leave'} disablePadding sx={{ display: 'block' }} onClick={(e) => navigate('/leave')}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{}} >
                  <EnergySavingsLeafIcon />
                </ListItemIcon>
                <ListItemText primary="Leave" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
          </List>) : (<div>Please Login First</div>)
        }
      </Drawer>
    </Box >
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
export default connect(mapStateToProps)(DrawerSideBar)