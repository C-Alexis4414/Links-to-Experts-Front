import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';  // Contexte pour l'authentification
import { useUserInfo } from '../hooks/userInfo';
import { SettingsGearIcon } from './customIcon/settings-gear';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { HomeIcon } from './customIcon/home';
import { LogoutIcon } from './customIcon/logout';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { UserIcon } from './customIcon/user';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

enum NavAction {
  LOGOUT = 'logout',
  HOME = 'home',
  LOGIN = 'login',
  SIGNUP = 'signup',
  PROFILE = 'profile',
  DASHBOARD = 'dashboard',
  WELCOME = 'welcome'
}
const navItemUnauthenticated = [
  { path: '/welcome', label: 'Welcome', icon: <HomeIcon />, action: NavAction.WELCOME },
  { path: '/login', label: 'Login', icon: <LoginOutlinedIcon />, action: NavAction.LOGIN },
  { path: '/register', label: 'Sign up', icon: <HowToRegOutlinedIcon />, action: NavAction.SIGNUP },
];

const navItemAuthenticated = [
  { path: '/', label: 'Home', icon: <HomeIcon />, action: NavAction.HOME },
  // { path: '/', label: 'Dashboard', icon: <DashboardOutlinedIcon />, action: NavAction.HOME },
  { path: '/profile', label: 'Profile', icon: <UserIcon />, action: NavAction.PROFILE },
  { path: '/logout', label: 'Déconnexion', icon: <LogoutIcon />, action: NavAction.LOGOUT },
];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout, isAuthenticated } = useAuth();  
  const navigate = useNavigate()
  const { userInfo } = useUserInfo();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const actionHandlers: Record<NavAction, () => void | Promise<void>> = {
    [NavAction.LOGOUT]: async () => {
      await logout();  
      navigate('/');
    },
    [NavAction.HOME]: () => {
      navigate('/');
    },
    [NavAction.LOGIN]: () => {
      navigate('/login');
    },
    [NavAction.SIGNUP]: () => {
      navigate('/register');
    },
    [NavAction.PROFILE]: () => {
      navigate('/profile');
    },
    [NavAction.DASHBOARD]: () => {
      navigate('/dashboard');
    },
    [NavAction.WELCOME]: () => {
      navigate('/welcome');
    },
  };

  // Gestion de l'action dynamique en fonction de l'item
  const handleNavAction = (action: NavAction) => {
    const actionHandler = actionHandlers[action]; // Accède à la fonction associée à l'action
    if (actionHandler) {
      actionHandler();  // Appel de la fonction associée à l'action
    }
    handleCloseUserMenu();  // Fermer le menu après l'action
  };

  const navItem = isAuthenticated ? navItemAuthenticated : navItemUnauthenticated;

  const userInitial = userInfo?.userName?.charAt(0).toUpperCase() || '';

  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', left: 0, top: 0, right: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          {/* Menu Burger */}
          <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

            <Button onClick={() => navigate('/')} sx={{ backgroundColor: 'inherit', boxShadow: 'none', padding: 0, minWidth: 'auto', display: 'inline-flex', '&:hover': { opacity: 0.92, backgroundColor: 'inherit', boxShadow: 'none' } }}>
              <img src="/src/asset/logo-YouLink.png" alt="Retour à l'accueil" style={{ display: 'inline-block', maxWidth: '100%' }}/>
            </Button>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Icône de paramètres */}
          {isAuthenticated && (
            <Tooltip title="Ouvrir les paramètres">
              <IconButton
                size="large"
                // edge="end"
                color="inherit"
                aria-label="settings"
                sx={{ ml: 'auto' }}
                onClick={handleOpenUserMenu}
              >
                <SettingsGearIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Menu utilisateur */}
          <Box>
            <Tooltip title="Ouvrir les paramètres">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={userInfo?.userName} src="">
                  {userInitial}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {navItem.map((item) => (
                <MenuItem
                key={item.path}
                onClick={() => handleNavAction(item.action)}
                component="button" // Utilisation d'un bouton pour gérer les actions
              >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
    // </Box>
  );
}

export default Navbar;
