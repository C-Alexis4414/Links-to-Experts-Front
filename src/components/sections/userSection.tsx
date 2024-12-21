import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { useUserInfo } from '@/hooks/userInfo';

const UserInfoCard: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { userInfo, error } = useUserInfo();

    const handleEditClick = () => {
        navigate('/profile/edit');
    };

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!userInfo) {
        return <Typography variant="body1">Chargement...</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center', flexDirection: 'row' }}>
                <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        Mes infos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {userInfo.is_Youtuber && 'Youtuber'}
                        {userInfo.is_Youtuber && userInfo.is_Professional && ' / '}
                        {userInfo.is_Professional && 'Professionnel'},
                        {userInfo.tagChannel && ` ${userInfo.tagChannel}`}
                        {userInfo.tagChannel && userInfo.urlLinkedin && ' / '}
                        {userInfo.urlLinkedin && ` ${userInfo.urlLinkedin}`}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les infos utilisateur" placement="top">
                        <IconButton onClick={handleEditClick} color="primary">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserInfoCard
