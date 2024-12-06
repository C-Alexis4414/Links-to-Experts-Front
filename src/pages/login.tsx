import React from 'react'
import LoginCard from '../components/loginCard/loginCard';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2'

export default function Login() {
    return (
        <Box sx={{display:'flex', justifyContent:'center', mt:5}}>
            <Grid container>
                <Grid size={12}>
                    <LoginCard />
                </Grid>
            </Grid>
        </Box>
    )
}