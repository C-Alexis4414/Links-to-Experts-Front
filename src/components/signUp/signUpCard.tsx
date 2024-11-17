import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import {  useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, CircularProgress, FormGroup } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { FormValues } from '@/types/FormValues';


export default function SignUpCard() {
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const form = useForm<FormValues>();
  const values = form.watch();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    form.setValue(name, value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'is_Youtuber') {
        form.setValue('user.is_Youtuber', checked);
      } else if (name === 'is_Professional') {
        form.setValue('user.is_Professional', checked);
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    if (values?.user?.password !== confirmPassword) {
        setErrorMessage('Les mots de passe ne correspondent pas.');
        setLoading(false);
        return;
      }
    try {
      const response = await axiosInstance.post('/authentication/signup', values);
      if (response.status === 201 || response.status === 200) {
        alert('Inscription réussie !');
        console.log(response.data);
        navigate('/')
      } else {
        setErrorMessage('Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };


    useEffect((
    ) => {console.log(values); },[values])

  return (
    <Box
      sx={{
        display: 'flex',
        maxHeight: '680px',
        width: '300px',
        backgroundColor: '#f5f5f5',
        // border: '2px solid blue',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', bgcolor:'#fef7ff' , boxShadow: '0px 0px 6px '  }}>
        <CardContent>
            <Grid container spacing={0}>
                <Grid size={12}>
                    <Typography variant="subtitle1" component="h1" align="center" gutterBottom>
                    Inscription
                    </Typography>
                </Grid>
                <Grid size={12} sx={{mt:-2}} >
                    <Typography variant="subtitle2" component="p">
                    Inscrivez-vous et partager votre expertise.
                    </Typography>
                </Grid>
            </Grid> 
          <Box component="form" onSubmit={handleSubmit} sx={{m:1}}>
            <Grid container spacing={1} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid size={12}>
                     <TextField
                        fullWidth
                        label="Nom d'utilisateur"
                        name="userName"
                        value={values?.user?.userName}
                        onChange={handleInputChange}
                        required
                        
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                        label="Adresse Email"
                        name="email"
                        type="email"
                        value={values?.user?.email}
                        onChange={handleInputChange}
                        required
                        
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        value={values?.user?.password}
                        onChange={handleInputChange}
                        required
                        
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                        label="Confirmez votre mot de passe"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        
                    />
                </Grid>
            </Grid>
            <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={values?.user?.is_Youtuber ?? false }
                  onChange={handleSwitchChange}
                  name="is_Youtuber"
                />
              }
              label="Êtes-vous YouTuber ?"
            />
            {values?.user?.is_Youtuber && (
              <TextField
                fullWidth
                label="Tag de votre chaîne YouTube"
                name="tagChannel"
                value={values?.user?.tagChannel }
                onChange={handleInputChange}
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={values?.user?.is_Professional ?? false }
                  onChange={handleSwitchChange}
                  name="is_Professional"
                />
              }
              label="Êtes-vous sur LinkedIn ?"
            />
            </FormGroup>
            {values?.user?.is_Professional && (
              <TextField
                fullWidth
                label="URL LinkedIn"
                name="urlLinkedin"
                value={values?.user?.urlLinkedin}
                onChange={handleInputChange}
              />
            )}
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'S\'inscrire'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
