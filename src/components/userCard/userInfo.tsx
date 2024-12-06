import React from 'react';
import { Box, Typography } from '@mui/material';

interface UserInfoProps {
    name: string;
    role: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, role }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
            >
                {name}
            </Typography>
            <Typography
            >
                {role}
            </Typography>
        </Box>
    );
};

export default UserInfo;
