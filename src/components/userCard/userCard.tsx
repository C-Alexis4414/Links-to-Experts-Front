import React, {useState} from 'react';
import { Card, CardContent, Avatar, Box, Typography, CardMedia, Button, CircularProgress, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axiosInstance from '@/utils/axiosConfig';
import { useAuth } from '@/context/AuthContext';

interface UserCardProps {
  name: string;
  role: string;
  avatarSrc: string;
  followedUserId: number;
  isFollowed: boolean;
}

export default function UserCard({ 
  name, 
  role, 
  avatarSrc,
  followedUserId,
  isFollowed,
  }: UserCardProps) {
  const { isAuthenticated, checkAuthentication } = useAuth();
  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const [loading, setLoading] = useState(false);
  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      alert("Vous devez être connecté pour suivre un utilisateur.");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post(`/subscription/SubscribeToUser/me/${followedUserId}`, null,
        {withCredentials: true}
      );
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Subscription error :", err);
    } finally {
      setLoading(false);
    }
  }
  return (
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
                  <Grid size={5}>
                      {role}
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12}>
                <Button
                  onClick={handleFollowToggle}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    borderColor: '#815255',
                    color: '#815255',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={16} />
                  ): isFollowing ? '✓ Suivi' : '+ Suivre'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Box>
  );
}
