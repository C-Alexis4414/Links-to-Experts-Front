import { Card, CardContent, Typography, Box, IconButton, Tooltip, Divider, Chip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { useUserInfo } from '@/hooks/userInfo';
import { ArrowRightIcon } from '../customIcon/arrow-right';

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

    const handleCategoryClick = () => {
        navigate('/profile/categories');
    };

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!userInfo) {
        return <Typography variant="body1">Chargement...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <Card variant="outlined" sx={{ width: 600, height: 'auto', margin: 'auto', padding: 0.1 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center', flexDirection: 'row', gap: 2 }}>
                { title === "Mes infos" && <Box>
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
                { title === "Mes relations" && <Box>
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
                { title === "Mes categories" && <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {userInfo.likes.length > 0
                            ? userInfo.likes.map((like) => like.name).join(', ')
                            : 'Aucune catégorie likée'
                        }
                    </Typography>
                </Box>}
                { title === "Mes activités" && <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Box sx = {{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body1" color="text.secondary">
                            Mes contrib pro :
                        </Typography>
                        <Divider orientation="vertical" flexItem aria-hidden = "true" sx = {{mx: 2}}/>
                        <Typography variant="body1" color="text.secondary">
                            Mes interviews :
                        </Typography>
                    </Box>
                </Box>}
                { title === "Mes infos" && <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les infos utilisateur" placement="top">
                        <IconButton onClick={handleUserFormClick} color="primary">
                            <ArrowRightIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
                { title === "Mes relations" && <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les subscriptions" placement="top">
                        <IconButton onClick={handleSubscriptionsClick} color="primary">
                            <ArrowRightIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
                { title === "Mes categories" && <Box display="flex" alignItems="center">
                    {isAuthenticated && <Tooltip title="Modifier les catégories" placement="top">
                        <IconButton onClick={handleCategoryClick} color="primary">
                            <ArrowRightIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
                { title === "Mes activités" && <Box display="flex" flexDirection="column" alignItems="center">
                    <Chip label="Bientôt" color="default" />
                    {isAuthenticated && <Tooltip title="Modifier les activités" placement="top">
                        <IconButton disabled onClick={handleCategoryClick} color="primary">
                            <ArrowRightIcon />
                        </IconButton>
                    </Tooltip>}
                </Box>}
            </CardContent>
        </Card>
        </Box>
    )
}

export default UserInfoCard
