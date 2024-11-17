import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function SignUpCard() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    is_Youtuber: false,
    is_Professional: false,
    tagChannel: '',
    urlLinkedin: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
  
    setFormData((prevState) => {
      const updatedState = { ...prevState, [name]: checked };
  
      // Réinitialiser les champs conditionnels si le switch est désactivé
      if (name === 'is_Youtuber' && !checked) {
        updatedState.tagChannel = '';
      }
      if (name === 'is_Professional' && !checked) {
        updatedState.urlLinkedin = '';
      }
  
      return updatedState;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axiosInstance.post('/authentication/signup', formData);
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
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'red', // Couleur du contour
                              },
                              '&:hover fieldset': {
                                borderColor: 'darkred', // Couleur au survol
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'crimson', // Couleur lors du focus
                              },
                            },
                          }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                        label="Adresse Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'red', // Couleur du contour
                              },
                              '&:hover fieldset': {
                                borderColor: 'darkred', // Couleur au survol
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'crimson', // Couleur lors du focus
                              },
                            },
                          }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'red', // Couleur du contour
                              },
                              '&:hover fieldset': {
                                borderColor: 'darkred', // Couleur au survol
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'crimson', // Couleur lors du focus
                              },
                            },
                          }}
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
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            //   '& fieldset': {
                            //     borderColor: 'red', // Couleur du contour
                            //   },
                              '&:hover fieldset': {
                                borderColor: 'darkred', // Couleur au survol
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'crimson', // Couleur lors du focus
                              },
                            },
                          }}
                    />
                </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_Youtuber}
                  onChange={handleSwitchChange}
                  name="is_Youtuber"
                />
              }
              label="Êtes-vous YouTuber ?"
            />
            {formData.is_Youtuber && (
              <TextField
                fullWidth
                margin="normal"
                label="Tag de votre chaîne YouTube"
                name="tagChannel"
                value={formData.tagChannel}
                onChange={handleInputChange}
                required
                sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                    //   '& fieldset': {
                    //     borderColor: 'red', // Couleur du contour
                    //   },
                      '&:hover fieldset': {
                        borderColor: 'darkred', // Couleur au survol
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'crimson', // Couleur lors du focus
                      },
                    },
                  }}
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_Professional}
                  onChange={handleSwitchChange}
                  name="is_Professional"
                />
              }
              label="Êtes-vous sur LinkedIn ?"
            />
            {formData.is_Professional && (
              <TextField
                fullWidth
                margin="normal"
                label="URL LinkedIn"
                name="urlLinkedin"
                value={formData.urlLinkedin}
                onChange={handleInputChange}
                required
                sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                    //   '& fieldset': {
                    //     borderColor: 'red', // Couleur du contour
                    //   },
                      '&:hover fieldset': {
                        borderColor: 'darkred', // Couleur au survol
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'crimson', // Couleur lors du focus
                      },
                    },
                  }}
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
