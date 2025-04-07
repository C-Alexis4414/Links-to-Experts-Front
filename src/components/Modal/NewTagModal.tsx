import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import axiosInstance from "@/utils/axiosConfig";

interface NewTagModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface Category {
    id: number;
    name: string;
}

const NewTagModal: React.FC<NewTagModalProps> = ({ open, onClose, onSuccess }) => {
    const [tagName, setTagName] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | "">("");
    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {
        if (open) {
            axiosInstance.get("/category/allCategory").then((res) => {
                setCategories(res.data);
            });
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!tagName || !selectedCategory) return;

        try {
            await axiosInstance.post("/tags/createTag", {
                name: tagName,
                categoryId: selectedCategory,
            });

            setTagName("");
            setSelectedCategory("");
            setToastOpen(true);
            onSuccess?.();
        } catch (error) {
            console.error("Erreur lors de la création du tag :", error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#fdf6f4",
                    p: 4,
                    borderRadius: 4,
                    boxShadow: 24,
                    width: 400,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Nouveau tag
                </Typography>

                <TextField
                    label="Nom"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    fullWidth
                    sx={{ mb: 3 }}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as number)}
                        label="Catégorie"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                    backgroundColor: "#4a2c2a",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#3a1f1d" },
                }}
                >
                    Ajouter
                </Button>

                <Snackbar
                    open={toastOpen}
                    autoHideDuration={3000}
                    onClose={() => setToastOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert severity="success" sx={{ width: "100%" }}>
                        Tag créé avec succès !
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
};

export default NewTagModal;
