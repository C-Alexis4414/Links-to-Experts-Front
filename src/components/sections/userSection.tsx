import { Card, CardContent, Typography, Box, IconButton, Tooltip, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { useUserInfo } from '@/hooks/userInfo';

interface UserInfoCardProps {
    title: string;
}

const UserInfoCard = ({ title }: UserInfoCardProps) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { userInfo, error } = useUserInfo();

    const handleUserFormClick = () => {
        navigate('/profile/edit');
    };

    const handleSubscriptionsClick = () => {
        navigate('/profile/subscriptions');
    };

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!userInfo) {
        return <Typography variant="body1">Chargement...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex'}}>
        <Card variant="outlined" sx={{ width: 600, margin: 'auto', mt: 4, padding: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center', flexDirection: 'row' }}>
            { title == "Mes infos" && <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {userInfo.is_Youtuber && 'Youtuber'}
                        {userInfo.is_Youtuber && userInfo.is_Professional && ' / '}
                        {userInfo.is_Professional && 'Professionnel'},
                        {userInfo.tagChannel && ` ${userInfo.tagChannel}`}
                        {userInfo.tagChannel && userInfo.urlLinkedin && ' / '}
                        {userInfo.urlLinkedin && ` ${userInfo.urlLinkedin}`}
                    </Typography>
                </Box>}
                { title == "Mes relations" && <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Box sx = {{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body1" color="text.secondary">
                            {`Abonnés: ${userInfo.followersCount}`}
                        </Typography>
                        <Divider orientation="vertical" flexItem aria-hidden = "true" sx = {{mx: 2}}/>
                        <Typography variant="body1" color="text.secondary">
                            {`Subscriptions: ${userInfo.subscriptionsCount}`}
                        </Typography>
                    </Box>
                </Box>}
                { title == "Mes infos" && <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les infos utilisateur" placement="top">
                        <IconButton onClick={handleUserFormClick} color="primary">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
                { title == "Mes relations" && <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les infos utilisateur" placement="top">
                        <IconButton onClick={handleSubscriptionsClick} color="primary">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
            </CardContent>
        </Card>
        </Box>
    )
}

export default UserInfoCard
