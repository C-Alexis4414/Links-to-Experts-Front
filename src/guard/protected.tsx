import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

interface GuardProps {
  children: React.ReactNode;
}


// Guard pour les pages protégées
export const Protected: React.FC<GuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Pendant le chargement de la vérification d'authentification
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, redirection vers la page de login
  if (!isAuthenticated) {
    console.log("Utilisateur non authentifié, redirection vers /login");
    navigate('/login');
    return null; // Empêche le rendu du composant tant que la redirection n'est pas effectuée
  }

  // Si l'utilisateur est authentifié, rend les enfants
  return <>{children}</>;
};