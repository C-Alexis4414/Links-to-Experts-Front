import React from 'react';
import { useAuth } from '../context/authContext'; // Assurez-vous que le chemin est correct

interface GuardProps {
    children: React.ReactNode;
  }

// Guard pour les pages publiques
export const Public: React.FC<GuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    // Pendant le chargement de la vérification d'authentification
    if (isLoading) {
      return <div>Chargement...</div>;
    }

    if (isAuthenticated) {
        return <>{children}</>;  // Laisse passer l'utilisateur sur cette page
      }
  
    // Rend toujours les enfants, même si l'utilisateur n'est pas authentifié
    return <>{children}</>;
  };