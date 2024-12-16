import React from "react";
import {  Box, Button, Container,  Typography,  Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Navbar from "../components/navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar/>
      

      {/* Contenu */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#000",
          py: 3,
        }}
      >
          <Grid container spacing={2} >
            <Grid >
              <Button  variant="text">
                News
              </Button>
            </Grid>
            <Grid >
              <Button  variant="text">
                Help
              </Button>
            </Grid>
            <Grid >
              <Button  variant="text">
                Contact
              </Button>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="text">
              Get the App
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            &copy; 2024 YOULINK. All rights reserved
          </Typography>
      </Box>
    </Box>
  );
};

const YouLinkPage: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ textAlign: "center", py: 5 }}>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid >
            <Typography variant="h4" gutterBottom >
              YOULINK
            </Typography>
          </Grid>

          <Grid >
            <Divider sx={{ width: "100%" }}>
              <span >🔗</span>
            </Divider>
          </Grid>

          <Grid >
            <Typography variant="body1" sx={{ mb: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna quis magna lobortis, eget
              finibus urna vestibulum. Sed nec ex non justo dictum venenatis. Fusce nec purus nec mauris posuere
              malesuada.
            </Typography>
          </Grid>

          <Grid >
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button variant="text">
                Inscription
              </Button>
              <Button variant="contained" >
                Connexion
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default YouLinkPage;
