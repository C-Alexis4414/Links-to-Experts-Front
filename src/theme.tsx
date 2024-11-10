'use client'

import { createTheme } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import React from "react";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(165, 0, 0)',
            contrastText:'rgb(255 255 255)'
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
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'rgb(149 109 103)'
                }
            }
        }
    }
});

export default theme;