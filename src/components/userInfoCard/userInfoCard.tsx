import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { set } from 'react-hook-form';

const UserInfoCard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/profile/edit');
    };

    // const getName = async () => {
    //     try {
    //         const response = await axiosInstance.get('user/name')
    //         console.log(response.data)
    //     }
    //     catch (error) {
    //         console.error('Failed to get user info:', error)
    //     }
    // };

if (!user) {
    return null;
}
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center', flexDirection: 'row' }}>
                <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        Mes infos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.is_Youtuber && 'Youtuber'}
                        {user.is_Youtuber && user.is_Professional && ' / '}
                        {user.is_Professional && 'Professionnel'},
                        {user.tagChannel && ` ${user.tagChannel}`}
                        {user.tagChannel && user.urlLinkedin && ' / '}
                        {user.urlLinkedin && ` ${user.urlLinkedin}`},
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Tooltip title="Modifier les infos utilisateur" placement="top">
                        <IconButton onClick={handleEditClick} color="primary">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserInfoCard
