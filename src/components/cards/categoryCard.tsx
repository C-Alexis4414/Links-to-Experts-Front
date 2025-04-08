// components/CategoryCard.tsx
import { IconButton, Paper, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

type CategoryCardProps = {
    id: number;
    name: string;
    isLiked: boolean;
    onToggleLike: () => void;
};

const CategoryCard = ({ name, isLiked, onToggleLike }: CategoryCardProps) => {
    return (
        <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>{name}</Typography>
            <IconButton onClick={onToggleLike}>
                {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
        </Paper>
    );
};

export default CategoryCard;
