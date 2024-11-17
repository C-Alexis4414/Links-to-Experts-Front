import React from 'react';
import { Button, Box, Typography, Avatar } from '@mui/material';

const FollowButton: React.FC = () => {
    return (
        <Button
            sx={{
                borderRadius: '50px',
                backgroundColor: '#31111d',
                right: 0,
                top: 0,
                width: 75,
                height: 19,
                p: 0,
                overflow: 'hidden',
                '&:hover': {
                    backgroundColor: '#45172a',
                },
            }}
        >
            <Box
                sx={{
                    borderRadius: '4px',
                    backgroundColor: '#d6cccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    width: '100%',
                    height: '100%',
                    p: '10px 8px 10px 1px',
                }}
            >
                <Avatar
                    sx={{
                        width: 18,
                        height: 18,
                    }}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/779b8db5245032c12acbe252f8805f576a0291a63b95adee6619013674592c14?placeholderIfAbsent=true&apiKey=a52ed4049e9d4220be8387cf1f6bc02c"
                    alt=""
                />
                <Typography
                    sx={{
                        color: '#7d5260',
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: 1,
                        letterSpacing: '0.1px',
                        fontFamily: 'Roboto, sans-serif',
                    }}
                >
                    Suivre
                </Typography>
            </Box>
        </Button>
    );
};

export default FollowButton;
