import React from 'react'
import SignUpCard from '../components/signUp/signUpCard'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { WidthFull } from '@mui/icons-material'

export default function Register() {
    return (
   <Box  sx={{mt:5, display:'flex', justifyContent:'center',}}>
    <Grid container >
            <Grid size={12}  >
                <SignUpCard />
            </Grid>
    </Grid>
   </Box>
    )
}
