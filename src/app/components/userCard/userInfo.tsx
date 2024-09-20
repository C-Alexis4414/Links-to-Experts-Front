import React from 'react';
import { Box, Typography } from '@mui/material';

interface UserInfoProps {
    name: string;
    role: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, role }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 150 }}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: 13,
                    color: 'text.primary',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                }}
            >
                {name}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    fontSize: 10,
                    color: 'text.secondary',
                    fontWeight: 500,
                    letterSpacing: '0.16px',
                    mt: 1,
                }}
            >
                {role}
            </Typography>
        </Box>
    );
};

export default UserInfo;
