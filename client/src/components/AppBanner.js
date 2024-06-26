import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../resources/Playlister.png';
import Button from '@mui/material/Button';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    store.history = useHistory();


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRegister = () => {
        setAnchorEl(null);
        store.history.push('/register');
    }

    const handleLogin = () => {
        setAnchorEl(null);
        store.history.push('/login');
    }

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            disableScrollLock={true}
        >
            <MenuItem onClick={handleRegister}>Create New Account</MenuItem>
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            {/* <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem> */}
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            disableScrollLock={true}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    console.log("auth in appbanner")
    console.log(auth);
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) {
            if (auth.user == null) {
                return <AccountCircle />
            }
            return <div>{userInitials}</div>;
        }
        else
            return <AccountCircle />;
    }

    let cardStatus = false;
    if (store.listNameActive) {
        cardStatus = true;
    }

    return (
        <Box sx={{ flexGrow: 1 , height: '8%'}}>
            <AppBar position="static" style={{ background: '#ffffff' }}>
                <Toolbar>
                    <Box
                        component="img"
                        sx={{
                            maxHeight: '100%',
                            maxWidth: 150
                        }}
                        alt="Playlister"
                        src={logo}
                    />
                    {/* <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link
                            style={{ textDecoration: 'none', color: 'white' }}
                            to="/"
                            className={(cardStatus) ? "disabled-link" : "link"}
                            onClick={() => {
                                store.closeCurrentList();
                            }}
                        >
                            ⌂
                        </Link>
                    </Typography> */}
                    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            disabled={cardStatus}
                            onClick={handleProfileMenuOpen}
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}