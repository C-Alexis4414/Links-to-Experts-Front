import React from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserCard from "@/components/userCard/userCard";
import SearchIcon from "@mui/icons-material/Search";

/**
 * This is a test of home page before it was replaced by welcome page
 * @returns  
 */
export default function HomePage () {
  return (
      <Grid container sx={{width: "100%",height:'100vh',background:'D6CCCC'}} spacing={2}>
        {/* Colonne de gauche */}
        <Grid size={6}  sx={{}}>
          <Grid container spacing={2} sx={{px:5 ,pb:3,pt:10}} >
            <Grid size={2} sx={{display:'flex'}} >
              <Typography
                // variant="h6"
                sx={{ fontWeight: "bold", color: "#4a2c2a" }}
              >
                Search
              </Typography>
            </Grid>

            <Grid size={10} sx={{display:'flex', justifyContent:'center', alignContent:'center'}} >

              <TextField
                variant="outlined"
                placeholder="catégorie name"
                // remplacer la methode du input props
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px", // Arrondi complet
                    "&.Mui-focused fieldset": {
                      borderWidth: "3px", // Épaissir la bordure au focus
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px 16px", // Espacement interne
                  },
                  "& .MuiInputAdornment-root": {
                    color: "#4a2c2a", // Couleur de l'icône
                  },
                  backgroundColor: "#f9f4f4", // Couleur de fond du champ
                }}
              />
            </Grid>
          </Grid>

          {/* Catégories */}
          <Grid container  spacing={0}  sx={{pb:5, px:5, pt:5}} >
            <Grid size={3} >
              <Button
                variant="text"
              >
                Science
              </Button>
            </Grid>
            <Grid size={3}>
              <Button
                variant="text"
              >
                Nature
              </Button>
            </Grid>
          </Grid>

          {/* Liste des utilisateurs */}
           <Grid container spacing={2} sx={{pl:5, pt:3,}}>
            <Grid size={12} sx={{ display:'flex',justifyContent:'center'}}>
              <UserCard
                name="Dr. Randy Wigham"
                role="General Medical Checkup"
                avatarSrc="https://via.placeholder.com/24"
              />
            </Grid>
            <Grid size={12} sx={{ display:'flex',justifyContent:'center'}}>
              <UserCard
                name="Gianni Accardi"
                role="CTO of this application"
                avatarSrc="https://via.placeholder.com/24"
              />
            </Grid>
            <Grid size={12} sx={{ display:'flex',justifyContent:'center'}}>
              <UserCard
                name="Alexis Chentre"
                role="Furious coder"
                avatarSrc="https://via.placeholder.com/24"
              />
            </Grid>
          </Grid>
        </Grid> 
      
        {/* Colonne de droite */}
        <Grid size={6}>
      <Grid container sx={{pt:5, pr:3}}>
        <Grid size={12} sx={{p:1}}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#4a2c2a" }}
          >
            Notre sélection ♡
          </Typography>
        </Grid>

        <Grid size={12} sx={{pt:1,pl:2}}>
          <Grid container sx={{mb:2}}>
            {/* .map here */}
            <Grid size={3}>
              <Button
                variant="text"
                sx={{
                  border: "1px solid #4a2c2a",
                  borderRadius: "20px",
                  px: 3,
                  color: "#4a2c2a",
                }}
              >
                tags
              </Button>
            </Grid>
            <Grid size={3}>
              <Button
                variant="text"
                sx={{
                  border: "1px solid #4a2c2a",
                  borderRadius: "20px",
                  px: 3,
                  color: "#4a2c2a",
                }}
              >
                Nature
              </Button>
            </Grid>
            <Grid size={3}>
              <Button
                variant="text"
                sx={{
                  border: "1px solid #4a2c2a",
                  borderRadius: "20px",
                  px: 3,
                  color: "#4a2c2a",
                }}
              >
                Nature
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12} sx={{p:1}}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
          >
            Nouveaux tags 💡
          </Typography>
          <Grid container spacing={2} sx={{mb:2}}>
            {[...Array(3)].map((_, i) => (
              <Grid key={i} size={3} sx={{pt:1,pl:1}}>
                <Button
                  variant="text"
                  sx={{
                    border: "1px solid #4a2c2a",
                    borderRadius: "20px",
                    px: 3,
                    color: "#4a2c2a",
                  }}
                >
                  Nature
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={12} sx={{p:1}}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
          >
            TOP 5 tendances ☆
          </Typography>
          <Grid container spacing={2} sx={{mb:2}}>
            {[...Array(5)].map((_, i) => (
              <Grid key={i} size={3} sx={{pt:1,pl:1}}>
                <Button
                  variant="text"
                  sx={{
                    border: "1px solid #4a2c2a",
                    borderRadius: "20px",
                    px: 3,
                    color: "#4a2c2a",
                  }}
                >
                  Nature
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
      </Grid>
  );
};
