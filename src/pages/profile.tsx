import React, { useState, useEffect } from 'react'
import { Button, Box, Avatar, Typography } from '@mui/material'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import UserInfoCard from '../components/sections/userSection';
import { useUserInfo } from '../hooks/userInfo';

const Profile = () => {
    const [err, setErr] = useState<string | null>(null);
    const { isLoading, deleteUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { userInfo } = useUserInfo();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await deleteUser();
            navigate('/');
        } catch (err) {
            setErr("Failed to delete account");
            console.log(err);
        }
    };

    const userInitial = userInfo?.userName?.charAt(0).toUpperCase() || '';

    if (!isLoading && !isAuthenticated) {
        return <Typography variant="h5" component="div">Connectez-vous pour accéder à cette page</Typography>;
    }

    if (isLoading && isAuthenticated) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h5" component="div">
                    Chargement...
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
            }}
        >
            <Grid container spacing={1.5}>
                <Grid size={12} display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mb: 3 }}>
                    <Avatar alt={userInfo?.userName} src="" sx={{ width: 120, height: 120, fontSize: 96, margin: 1 }}>
                        {userInitial}
                    </Avatar>
                    <Typography variant="h6" component="div">
                        {`Bonjour ${userInfo?.userName}`}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {userInfo?.email}
                    </Typography>
                </Grid>
                <Grid size={12} display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1.5}>
                    <UserInfoCard title="Mes infos"/>
                    <UserInfoCard title="Mes relations"/>
                    <UserInfoCard title="Mes categories"/>
                    <UserInfoCard title="Mes activités"/>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary'
                        sx= {{ 
                            mt: 3,
                            width: '160px',
                        }}
                        onClick={handleDelete}
                        >
                            Delete Account
                    </Button>
                </Grid>
                {err && <p>{err}</p>}
            </Grid>
        </Box>
    )
}

export default Profile
