'use client'

import { createTheme } from "@mui/material";

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