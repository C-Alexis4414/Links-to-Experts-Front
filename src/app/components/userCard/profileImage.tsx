import React from 'react';
import { Box, Avatar } from '@mui/material';

interface ProfileImageProps {
    src: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24 }}>
            <Avatar
                src={src}
                alt="Profile"
                sx={{
                    aspectRatio: '1',
                    objectFit: 'contain',
                    width: 24,
                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                }}
            />
        </Box>
    );
};

export default ProfileImage;
