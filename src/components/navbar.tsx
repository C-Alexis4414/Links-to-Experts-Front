import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { AppBar, Box, Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';  // Contexte pour l'authentification
import HomeIcon from '@mui/icons-material/Home';
import { useUserInfo } from '../hooks/userInfo';

enum NavAction {
  LOGOUT = 'logout',
  HOME = 'home',
  LOGIN = 'login',
  SIGNUP = 'signup',
  PROFILE = 'profile',
}
const navItemUnauthenticated = [
  { path: '/login', label: 'Login', action: NavAction.LOGIN },
  { path: '/register', label: 'Sign up', action: NavAction.SIGNUP },
  { path: '/', label: 'Home', icon: <HomeIcon />, action: NavAction.HOME },
];

const navItemAuthenticated = [
  { path: '/', label: 'Home', icon: <HomeIcon />, action: NavAction.HOME },
  { path: '/logout', label: 'Déconnexion', icon: <LogoutTwoToneIcon />, action: NavAction.LOGOUT },
  { path: '/profile', label: 'profile', action: NavAction.PROFILE },
];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout, isAuthenticated } = useAuth();  
  const navigate = useNavigate()
  const { userInfo, error } = useUserInfo();
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

  // if (error) {
  //   return <Typography variant="body1" color="error">{error}</Typography>;
  // }

  // if (!userInfo) {
  //   return <Typography variant="body1">Chargement...</Typography>;
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          {/* Menu Burger */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Icône de paramètres */}
          {isAuthenticated && (
            <Tooltip title="Ouvrir les paramètres">
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="settings"
                sx={{ ml: 'auto' }}
                onClick={handleOpenUserMenu}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Menu utilisateur */}
          <Box sx={{ flexGrow: 0 }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
