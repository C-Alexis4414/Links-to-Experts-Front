import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import UserInfoCard from '../components/userInfoCard/userInfoCard';

const Profile = () => {
    const [error, setError] = useState<string | null>(null);
    const { deleteUser } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await deleteUser();
            navigate('/');
        } catch (err) {
            setError("Failed to delete account");
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
            }}
        >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <UserInfoCard />
                </Grid>
                <Grid size={12}>
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
                {error && <p>{error}</p>}
            </Grid>
        </Box>
    )
}

export default Profile
