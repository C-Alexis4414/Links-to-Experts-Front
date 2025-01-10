'use client'

import { createTheme } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import React from "react";

// Composant pour gérer le comportement de Link (Material UI -> React Router)
const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  }
);

// Création du thème MUI
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(165, 0, 0)',
      contrastText: 'rgb(255 255 255)',
    },
    secondary: {
      main: 'rgb(183 33 21)',
      contrastText: 'rgb(255 255 255)',
    },
    error: {
      main: 'rgb(186 26 26)',
      contrastText: 'rgb(255 255 255)',
    },
  },
  typography: {
    subtitle1: {
      fontSize: '36px',
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 300,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white', 
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            // Personnalisation des bordures et du fond
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white', 
              '&:hover fieldset': {
                borderColor: '#7d5260', // Bordure au survol
              },
              '&.Mui-focused fieldset': {
                border: '3px solid #341C1C'
              },
            },
            // Personnalisation du label
            '& .MuiInputLabel-root': {
              color: 'gray', // Couleur du label normal
            },
            '& .MuiInputLabel-shrink': {
              color: '#7d5260', // Couleur du label lorsqu'il est shrinké (focus ou contenu)
            },
            // Personnalisation de la couleur du texte à l'intérieur du champ
            '& .MuiOutlinedInput-input': {
              color: 'black', // Couleur du texte
            },
          },
        },
      ],
    },   
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: '2px solid #341C1C'
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(125, 82, 96, 0.8)', // Couleur de fond personnalisée de l'AppBar
          color: '#fff0ee', // Couleur du texte de l'AppBar
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', 
          textTransform: 'none', 
          fontWeight: 'bold', 
          width: '150px',
          fontSize: '16px',
          color: 'white', 
          backgroundColor: '#341C1C', 
          '&:hover': {
            backgroundColor: 'rgba(73, 57, 59, 0.9)', 
          },
        },
      },
      defaultProps: {
        variant: 'contained', // Variante par défaut
      },
      variants: [
        {
          props: { variant: 'text' }, // Nom du variant
          style: {
            backgroundColor: '#f2eaf8', 
            color: '#341C1C', 
            border: '2px solid #341C1C', 
            '&:hover': {
              backgroundColor: '#e8d4f7', 
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          //  width: '280px',
          //  height: '51px'
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            backgroundColor: '#f7f1f1', // Couleur de fond
            width: '250px', // Largeur de la carte
            height: '80px', // Hauteur de la carte
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark, // Changer la couleur au survol
              // boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
            },
          }),
        },
      ],
    }
  },    
});

export default theme;


