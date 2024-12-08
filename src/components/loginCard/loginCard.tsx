import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Box, Card, TextField, Button, Typography, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/profile");
        } catch (err) {
            setError("Invalid credentials");
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: '900px',
                width: '300px',
            }}
        >
            <Card sx={{ maxWidth: 500, width: '100%', bgcolor: '#fef7ff', boxShadow: '0px 0px 6px' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <Typography>
                            Se connecter
                        </Typography>
                        </Grid>
                        <Grid size={12}>
                        <Typography>
                            Saisissez les identifiants de votre compte YouLink
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Adresse email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Mot de passe"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <SentimentVeryDissatisfiedIcon />
                            &nbsp; J'ai oublié mon mot de passe
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            size={12}
                        >
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ mt: 3 }}
                                onClick={handleSubmit}
                            >
                                Se connecter
                            </Button>
                        </Grid>
                        {error && <p>{error}</p>}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginCard

