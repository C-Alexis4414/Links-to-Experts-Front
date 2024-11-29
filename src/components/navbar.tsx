import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { AppBar, Box, Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Contexte pour l'authentification

const navItem = [
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Sign up' },
  { path: '/', label: 'Home' },
  { path: '/logout', label: 'Déconnexion', icon: <LogoutTwoToneIcon />, action: 'logout' },
];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();  // Utilisation du contexte pour la déconnexion
  const navigate = useNavigate()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();  // Appel à la fonction de déconnexion du contexte
    navigate("/")
    handleCloseUserMenu();
  };

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
                  onClick={item.action === 'logout' ? handleLogout : handleCloseUserMenu}
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
