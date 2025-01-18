import React from 'react';
import { Card, CardContent, Avatar, Box, Typography, CardMedia, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserInfo from './userInfo'; // Assurez-vous que ce composant est importé correctement

interface ProfileCardProps {
  name: string;
  role: string;
  avatarSrc: string;
}

export default function UserCard({ name, role, avatarSrc }: ProfileCardProps) {
  return (<>
    <Box sx={{ backgroundColor: '#f7f1f1', width: '280px',height: '51px', display:'flex', justifyContent:'flex-start',  alignItems:'center', borderRadius: '10px' }}>
        <Grid container spacing={3} sx={{p:1 ,width:'100%',  display:'flex', justifyContent:'flex-start',  alignItems:'center'}}>
          <Grid size={2} sx={{ display:'flex', justifyContent:'flex-start',  alignItems:'center'}}>
            <Avatar 
            src={avatarSrc} 
            alt={name} 
            sx={{ width: 24, height: 24 }}
            /> 
          </Grid>
          <Grid size={10}>
            <Grid container sx={{width:'100%'}} >
              <Grid size={12} columns={1}>
                <Grid container spacing={1}sx={{width:'100%'}}  columns={1} >
                  <Grid size={5}>
                      {name}
                  </Grid>
                  {/* <Grid size={5}>
                      {name}
                  </Grid> */}
                </Grid>
              </Grid>
              {/* <Grid size={12}>
                {name}
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
    </Box>
    </>
  );
}
