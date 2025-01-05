import { useUserInfo } from '@/hooks/userInfo';
import { Box, Button, Card, CardContent, IconButton, InputAdornment, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { WidthFull } from '@mui/icons-material';

const UserFormCard = () => {
    const { userInfo, updateUserInfo } = useUserInfo();

    const [fields, setFields] = useState([
        { id: 'userName', label: 'Modifier le nom d\'utilisateur', value: userInfo?.userName || '', originalValue: userInfo?.userName || '', editable: false },
        { id: 'email', label: 'Modifier l\'adresse email', value: userInfo?.email || '', originalValue: userInfo?.email || '', editable: false },
        // { id: 'tagChannel', label: 'Modifier le tag de la chaîne', value: userInfo?.tagChannel || '', originalValue: userInfo?.tagChannel || '', editable: false },
        // { id: 'urlLinkedin', label: 'Modifier le lien Linkedin', value: userInfo?.urlLinkedin || '', originalValue: userInfo?.urlLinkedin || '', editable: false },
    ]);

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (id: string, newValue: string) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, value: newValue } : field
            )
        );
    };

    const toggleEdit = async (id: string) => {
        setFields(prevFields =>
            prevFields.map(field => {
                if (field.id === id) {
                    if (field.editable) {
                        return {
                            ...field,
                            editable: false,
                            value: field.originalValue
                        };
                    }
                    return {
                        ...field,
                        editable: true
                    };
                }
                return field;
            })
        );
    };

    const handleSave = async () => {
        try {
            const updatedData = fields.reduce((acc, field) => {
                if (field.value !== field.originalValue) {
                    acc[field.id] = field.value;
                }
                return acc;
            }, {} as Record<string, string>);

            await updateUserInfo(updatedData);

            setSnackbarMessage('Informations mises à jour avec succès');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Erreur lors de la mise à jour des informations');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                width: '600px',
                mx: 'auto',
            }}
        >
            <Card variant="outlined" sx={{ width: '100%', height: 'auto', boxShadow: '0px 0px 6px' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="subtitle1" align="center" gutterBottom>
                                Mes coordonnées personnelles
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body1" align="center" gutterBottom>
                                Ici, vous pouvez mettre à jour vos informations personnelles.
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            {fields.map((field) => (
                                <Box key={field.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h1">{field.label}</Typography>
                                    <TextField
                                        value={field.value}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        disabled={!field.editable}
                                        fullWidth
                                        slotProps={{
                                            input: {
                                            startAdornment: !field.editable && (
                                                <Typography variant="body2" width="100%">
                                                    {field.id === 'userName' ? userInfo?.userName : field.id === 'email' ? userInfo?.email : ''}
                                                </Typography>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => toggleEdit(field.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                        }}
                                    />
                                </Box>
                            ))}
                        </Grid>
                        <Grid size={12} display="flex" justifyContent="center">
                            <Button
                                onClick={handleSave}
                                color="primary"
                                variant="contained"
                                disabled={!fields.some((field) => field.editable)}
                            >
                                Sauvegarder
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserFormCard;