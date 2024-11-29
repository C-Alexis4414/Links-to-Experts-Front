import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { AppBar, Box, Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Contexte pour l'authentification

//toto
const navItem = [
  { path: '/login', label: 'Sign in' },
  { path: '/register', label: 'Sign up' },
  { path: '/', label: 'Home' },
  { path: '/company', label: 'Mon entreprise', icon: <CorporateFareTwoToneIcon /> },
  { path: '/employees', label: 'Mes collègues', icon: <EngineeringTwoToneIcon /> },
  { path: '/user', label: 'Mon profil', icon: <AccountCircleTwoToneIcon /> },
  { path: '/flow', label: 'Mes flux', icon: <AccountTreeTwoToneIcon /> },
  { path: '/logout', label: 'Déconnexion', icon: <LogoutTwoToneIcon />, action: 'logout' },
];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();  // Utilisation du contexte pour la déconnexion

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleLogout = async () => {
  //   await logout();  // Appel à la fonction de déconnexion du contexte
  //   handleCloseUserMenu();
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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

          {/* Menu utilisateur */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ouvrir les paramètres">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="photo de profil" src="" />
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
              {/* Création des éléments du menu avec leurs actions */}
              {navItem.map((item) => (
                <MenuItem
                  key={item.path}
                  // onClick={item.action === 'logout' ? handleLogout : handleCloseUserMenu}
                  component={NavLink}
                  to={item.path}
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
