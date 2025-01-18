import React from "react";
import { Typography, Divider, Stack, Box, Button } from "@mui/material";

const WelcomePage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 5,
        px: 2,
        backgroundColor: "#f9f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Titre */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#4a2c2a" }}>
        YOULINK
      </Typography>

      {/* Ligne avec icône */}
      <Divider
        sx={{
          width: "50%",
          margin: "auto",
          my: 3,
          "&::before, &::after": { borderTop: "1px solid #4a2c2a" },
        }}
      >
        <span style={{ fontSize: "1.5rem", color: "#4a2c2a" }}>🔗</span>
      </Divider>

      {/* TODO : Replace the lorem ipsum text by a description of the application */}
      <Typography
        variant="body1"
        sx={{
          color: "#4a2c2a",
          marginBottom: 4,
          lineHeight: 1.6,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna quis magna lobortis, eget finibus
        urna vestibulum. Sed nec ex non justo dictum venenatis. Fusce nec purus nec mauris posuere malesuada.
      </Typography>

      {/* Boutons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="text">Inscription</Button>
        <Button variant="contained">Connexion</Button>
      </Stack>
    </Box>
  );
};

export default WelcomePage;
