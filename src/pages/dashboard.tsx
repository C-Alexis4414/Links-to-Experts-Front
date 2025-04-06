import React, { useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserCard from "@/components/userCard/userCard";
import axiosInstance from "@/utils/axiosConfig";
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ 
    userName: string; 
    is_Youtuber?: boolean; 
    is_Professional?: boolean; 
    youtuber?: { tagChannel?: string }; 
    professional?: { urlLinkedin?: string }; 
  }[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const { data } = await axiosInstance.get(`user/search?name=${encodeURIComponent(search)}`);
      setResults(data);
    } catch (err) {
      console.error("Search error :", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f4f4",
        minHeight: "100vh",
        py: 5,
        px: 3,
      }}
    >
      <Grid container spacing={4}>
        {/* Colonne de gauche */}
        <Grid size={6} >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
          >
            Search
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              backgroundColor: "#fff",
              borderRadius: "20px",
              border: "1px solid #ccc",
              px: 2,
              py: 1,
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Entrez un nom"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
              }}
            />
            <Button variant="text" onClick={handleSearch}>🔍</Button>
          </Box>

          {/* Filtres */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
              variant="contained"
              sx={{
                minWidth: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#4a2c2a",
                color: "#fff",
                mr: 2,
              }}
            >
              ☰
            </Button>
            <Button
              variant="text"
              sx={{
                border: "1px solid #4a2c2a",
                borderRadius: "20px",
                px: 3,
                color: "#4a2c2a",
              }}
            >
              Science
            </Button>
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
          </Box>

          {/* Liste de cartes */}
          <Grid container spacing={2}>
            {results.map((user, idx) => (
              <Grid  size={12}>
                <UserCard
                  name={user.userName}
                  role={
                    user.is_Youtuber
                      ? `YouTuber - ${user.youtuber?.tagChannel || "N/A"}`
                      : user.is_Professional
                      ? `Professional - ${user.professional?.urlLinkedin || "N/A"}`
                      : "Utilisateur"
                  }
                  avatarSrc="https://via.placeholder.com/24"
                />
              </Grid>
            ))}
            <Grid  size={12}>
              <UserCard
                name="Gianni Accardi"
                role="CTO of this application"
                avatarSrc="https://via.placeholder.com/24"
              />
            </Grid>
            <Grid  size={12}>
              <UserCard
                name="Alexis Chentre"
                role="Furious coder"
                avatarSrc="https://via.placeholder.com/24"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Colonne de droite */}
        <Grid size ={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
            >
              Notre sélection ♡
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
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
            </Box>

            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
            >
              Nouveaux tags 💡
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
              {[...Array(3)].map((_, i) => (
                <Button
                  key={i}
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
              ))}
            </Box>

            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
            >
              TOP 5 tendances ☆
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {[...Array(5)].map((_, i) => (
                <Button
                  key={i}
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
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
