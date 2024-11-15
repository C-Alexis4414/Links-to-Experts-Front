import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Card, TextField, Button, Typography, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const loginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    // const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/authentication/login", { email, password });
            // const { token, user } = response.data;
            console.log(response.data);
            // login(token, user);
        } catch (err) {
            // setError("Invalid credentials");
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',

            }}
        >
            <Card>
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
                {/* <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>} */}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default loginCard
