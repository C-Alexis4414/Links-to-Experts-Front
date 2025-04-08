import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserCard from "@/components/userCard/userCard";
import axiosInstance from "@/utils/axiosConfig";
import SearchIcon from '@mui/icons-material/Search';
import NewCategoryModal from "@/components/Modal/newCategoryModal";
import NewTagModal from "@/components/Modal/NewTagModal";
// import { useAuth } from "@/context/AuthContext";
import CategoryCard from "@/components/cards/categoryCard";
import TagCard from "@/components/cards/tagCard";


const HomePage = () => {
  const [search, setSearch] = useState("");
  const [userResults, setUserResults] = useState<any[]>([]);
  const [categoryResults, setCategoryResults] = useState<any[]>([]);
  const [tagResults, setTagResults] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  // const { categories, tags, toggleLike } = useLatest();
  // const { isAuthenticated, checkAuthentication } = useAuth();
  // const [loading, setLoading] = useState(false);
  // const { categories }: { categories: { id: number; name: string; likes?: { userId: number }[] }[] } = useLastCategories();
  // const { tags }: { tags: { id: number; name: string; likes?: { userId: number }[] }[] } = useLastTags();
  // const [likedCategories, setLikedCategories] = useState<number[]>([]);
  // const [likedTags, setLikedTags] = useState<number[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const [userRes, catRes, tagRes] = await Promise.all([
        axiosInstance.get(`user/search?name=${encodeURIComponent(search)}`),      
        axiosInstance.get(`category/search?name=${encodeURIComponent(search)}`),
        axiosInstance.get(`tags/search?name=${encodeURIComponent(search)}`),
      ]);
      setUserResults(userRes.data);
      setCategoryResults(catRes.data);
      setTagResults(tagRes.data);
    } catch (err) {
      console.error("Search error :", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleCategoryLike = async (categoryId: number) => {
    try {
      await axiosInstance.put(`/liked/likeOrUnlike/me/${categoryId}`);
      setCategoryResults((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? { ...cat, isLikedByCurrentUser: !cat.isLikedByCurrentUser }
            : cat
        )
      );
    } catch (error) {
      console.error("Erreur lors du toggle like de la catégorie :", error);
    }
  };
  
  const toggleTagLike = async (tagId: number) => {
    try {
      await axiosInstance.put(`/likedTag/likeOrUnlike/me/${tagId}`);
      setTagResults((prev) =>
        prev.map((tag) =>
          tag.id === tagId
            ? { ...tag, isLikedByCurrentUser: !tag.isLikedByCurrentUser }
            : tag
        )
      );
    } catch (error) {
      console.error("Erreur lors du toggle like du tag :", error);
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
          {/* <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
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
          </Box> */}

          {/* Liste de cartes */}
          <Grid container spacing={2}>
            {userResults.map((user, idx) => (
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
                  followedUserId={user.id}
                  isFollowed={user.isFollowed ?? false}
                />
              </Grid>
            ))}

            {categoryResults.map((cat) => (
              <Grid size={12}>
                <CategoryCard
                  id={cat.id}
                  name={cat.name}
                  isLiked={cat.isLikedByCurrentUser}
                  onToggleLike={() => toggleCategoryLike(cat.id)}
                />
              </Grid>
            ))}

            {tagResults.map((tag) => (
              <Grid size={12}>
                <TagCard
                  id={tag.id}
                  name={tag.name}
                  isLiked={tag.isLikedByCurrentUser}
                  onToggleLike={() => toggleTagLike(tag.id)}
                />
              </Grid>
            ))}
            {/* <Grid  size={12}>
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
            </Grid> */}
          </Grid>
        </Grid>

        {/* Colonne de droite */}
        <Grid size ={6}>
          <Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
              >
                Nouvelles catégories 🌌
              </Typography>
              <Button
                variant="contained"
                sx={{ borderRadius: "20px", px: 3 }}
                onClick={() => setOpenModal(true)}
              >
                + Nouveau
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {/* {categories.map((cat) => (
                <LikeableButton
                  key={cat.id}
                  label={cat.name}
                  liked={cat.isLikedByCurrentUser}
                  onToggleLike={() => toggleLike("category", cat.id)}
                />
              ))}             */}
              {/* <Button
                variant="text"
                sx={{
                  border: "1px solid #4a2c2a",
                  borderRadius: "20px",
                  px: 3,
                  color: "#4a2c2a",
                }}
              >
                Nature
              </Button> */}
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#4a2c2a" }}
              >
                Nouveaux tags ⭐
              </Typography>
              <Button
                onClick={() => setIsTagModalOpen(true)}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  px: 3,
                  color: "white",
                }}
              >
                + Nouveau
              </Button>
            </Box>
            {/* <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {tags.map((tag) => (
                <LikeableButton
                  key={tag.id}
                  label={tag.name}
                  liked={tag.isLikedByCurrentUser}
                  onToggleLike={() => toggleLike("tag", tag.id)}
                />
              ))}            
            </Box> */}

            {/* <Typography
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
            </Box> */}
          </Box>
          <NewCategoryModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
          <NewTagModal
            open={isTagModalOpen}
            onClose={() => setIsTagModalOpen(false)}
            onSuccess={() => {
              setIsTagModalOpen(false);
            }}
          />            
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
