import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { FormValues } from '@/types/formValues';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const passwordRegexRules = [
  { regex: /^(?=.*[a-z])/, message: 'Doit contenir au moins une lettre minuscule.' },
  { regex: /^(?=.*[A-Z])/, message: 'Doit contenir au moins une lettre majuscule.' },
  { regex: /^(?=.*\d)/, message: 'Doit contenir au moins un chiffre.' },
  { regex: /^(?=.*[!@#$%^&*(),.?":{}|<>-])/, message: 'Doit contenir au moins un caractère spécial (ex: ?.!§¨).' },
  { regex: /^.{8,}$/, message: 'Doit contenir au moins 8 caractères.' }
];

export default function SignUpCard() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();
  const values = watch();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ruleValidation, setRuleValidation] = useState<boolean[]>(Array(passwordRegexRules.length).fill(false));
  const [showPasswords, setShowPasswords] = useState<{
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    newPassword: false,
    confirmPassword: false
  });

  // validate each Regex rules
  const validatePassword = (password: string ) => {
    const validationStates = passwordRegexRules.map((rule) => rule.regex.test(password));
   setRuleValidation(validationStates)
  };

  const onSubmit = async (event:React.FormEvent<HTMLElement> ) => {
  
    setLoading(true);
    setErrorMessage('');

    if (values?.user?.password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/authentication/signup', values.user);
      if (response.status === 201 || response.status === 200) {
        alert('Inscription réussie !');
        navigate('/');
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

  const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    if (values?.user?.password) {
      validatePassword(values?.user?.password);
    }
  }, [values?.user?.password]);

  return (
    <Box
      sx={{
        display: 'flex',
        maxHeight: '900px',
        width: '300px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', bgcolor: '#fef7ff', boxShadow: '0px 0px 6px' }}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid size={12}>
              <Typography variant="subtitle1" component="h1" align="center" gutterBottom>
                Inscription
              </Typography>
            </Grid>
            <Grid size={12} sx={{ mt: -2 }}>
              <Typography variant="subtitle2" component="p">
                Inscrivez-vous et partagez votre expertise.
              </Typography>
            </Grid>
          </Grid>
          <Box>
              <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Nom d'utilisateur"
                    {...register('user.userName', { required: 'Le nom d\'utilisateur est requis.' })}
                    error={!!errors.user?.userName}
                    helperText={errors.user?.userName?.message}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Adresse Email"
                    type="email"
                    {...register('user.email', { required: 'L\'adresse email est requise.' })}
                    error={!!errors?.user?.email}
                    helperText={errors?.user?.email?.message}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    {...register('user.password', { required: 'Le mot de passe est requis.' })}
                    error={!!errors?.user?.password}
                    helperText={errors?.user?.password?.message}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => togglePasswordVisibility('newPassword')}
                          edge="end"
                        >
                          {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  //   slotProps={{
                  //     input: {
                     
                  //     endAdornment: (
                  //         <InputAdornment position="end">
                  //             <IconButton onClick={() => toggleEdit(field.id)}>
                  //                 <EditIcon />
                  //             </IconButton>
                  //         </InputAdornment>
                  //     ),
                  // }
                  // }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Confirmez votre mot de passe"
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirmPassword')}
                          edge="end"
                        >
                          {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('user.is_Youtuber')}
                      checked={values?.user?.is_Youtuber ?? false}
                      onChange={(event) => setValue('user.is_Youtuber', event.target.checked)}
                    />
                  }
                  label="Êtes-vous YouTuber ?"
                />
                {values?.user?.is_Youtuber && (
                  <TextField
                    fullWidth
                    label="Tag de votre chaîne YouTube"
                    {...register('user.tagChannel')}
                  />
                )}
                <FormControlLabel
                  control={
                    <Switch
                      {...register('user.is_Professional')}
                      checked={values?.user?.is_Professional ?? false}
                      onChange={(event) => setValue('user.is_Professional', event.target.checked)}
                    />
                  }
                  label="Êtes-vous sur LinkedIn ?"
                />
              </FormGroup>
              {values?.user?.is_Professional && (
                <TextField
                  fullWidth
                  label="URL LinkedIn"
                  {...register('user.urlLinkedin')}
                />
              )}
              {errorMessage && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <Grid container>
              <Grid  size={12}>
                <Typography variant='subtitle2'>
                <ul style={{ paddingLeft: '20px', margin: '10px 0', fontSize: '14px', lineHeight: '1.2' }}>
                  {passwordRegexRules.map((rule, index) => (
                    <li key={index} style={{ color: ruleValidation[index] ? 'green' : 'red' }}>
                      {rule.message}
                    </li>
                  ))}
                  <li
                    style={{
                      color: values?.user?.password && values?.user?.password === confirmPassword ? 'green' : 'red'
                    }}
                  >
                    {values?.user?.password && values?.user?.password === confirmPassword
                      ? 'Les mots de passe sont similaires.'
                      : 'Les mots de passe doivent correspondre.'}
                  </li>
                </ul>
                </Typography>
              </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    disabled={loading}
                    onClick={onSubmit}
                  >
                    {loading ? 'Chargement...' : 'S\'inscrire'}
                  </Button>
                </Grid>
              </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
