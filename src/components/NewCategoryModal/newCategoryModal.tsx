import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, TextField, Button, Fade } from '@mui/material';
import axiosInstance from '@/utils/axiosConfig';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const NewCategoryModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Le nom ne peut pas être vide.");
            return;
        }

        try {
            await axiosInstance.post('/category/createCategorie', { name });
            setName('');
            setError('');
            setShowSuccess(true);
            onSuccess?.();
            // onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erreur lors de la création.");
        }
    };

    useEffect(() => {
        if (showSuccess) {
            const timeout = setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [showSuccess]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300, bgcolor: 'background.paper',
                borderRadius: 2, p: 4, boxShadow: 24
            }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Nouvelle catégorie
                </Typography>
                <TextField
                    label="Nom"
                    fullWidth
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    sx={{ mb: 2 }}
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                    Ajouter
                </Button>
                <Fade in={showSuccess}>
                    <Typography
                        variant="body2"
                        sx={{ mt: 2, color: 'green', textAlign: 'center' }}
                    >
                        ✅ Catégorie ajoutée avec succès !
                    </Typography>
                </Fade>
            </Box>
        </Modal>
    );
};

export default NewCategoryModal;
