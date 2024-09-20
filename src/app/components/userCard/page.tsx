import React from 'react';
import { Card, CardContent, Avatar, Box } from '@mui/material';
import FollowButton from './followButton';
import UserInfo from './userInfo';

interface ProfileCardProps {
    name: string;
    role: string;
    avatarSrc: string;
}

const UserCard: React.FC<ProfileCardProps> = ({ name, role, avatarSrc }) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                backgroundColor: 'rgba(183, 33, 21, 0.4)',
                width: 280,
                p: 1,
            }}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar src={avatarSrc} alt={name} />
                <FollowButton />
                <UserInfo name={name} role={role} />
            </CardContent>
        </Card>
    );
};

export default UserCard;
