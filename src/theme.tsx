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
          backgroundColor: 'white', // Fond du champ de texte
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white', // Fond par défaut des champs de texte
              '&:hover fieldset': {
                borderColor: 'darkred', // Couleur du contour au survol
              },
              '&.Mui-focused fieldset': {
                borderColor: 'crimson', // Couleur du contour lorsqu'il est focus
              },
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'rgb(149 109 103)', // Couleur du contour du champ de texte
        },
      },
    },
  },
});

export default theme;
