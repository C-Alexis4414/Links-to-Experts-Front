import React from 'react'
import Grid from '@mui/material/Grid2'
import { Box } from '@mui/material'
import UserFormCard from '@/components/UserFormCard/userFormCard'

const userForm = () => {
    return (
        <Box  sx={{mt:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid container >
                <Grid size={12}  >
                    <UserFormCard />
                </Grid>
            </Grid>
        </Box>  
    )
}

export default userForm
