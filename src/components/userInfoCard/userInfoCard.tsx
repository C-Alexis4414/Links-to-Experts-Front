import React from 'react'
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInfoCard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/profile/edit');
    };

if (!user) {
    return null;
}

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center' }}>
                <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        Mes infos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.is_Youtuber && 'Youtuber'}
                        {user.is_Youtuber && user.professional && ' / '}
                        {user.professional && 'Professionnel'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserInfoCard
