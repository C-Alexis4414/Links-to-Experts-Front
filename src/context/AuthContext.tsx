import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface AuthContextType {
  isAuthenticated: boolean; // boolean qui indique si l'utilisateur est authentifié
  checkAuthentication: () => Promise<void>; // fonction qui va vérifier si le user est authentifié
  login: (email: string, password: string) => Promise<void>; // fonction pour se connecter
  logout: () => Promise<void>; // fonction pour se déconnecter
  isLoading: boolean; // boolean qui indique si le chargement est en cours ou non
}

type UserType = {
  id: number;
  email: string;
  userName: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAuthentication = async () => {
    console.log("Vérification de l'authentification...");
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/authentication/protected');
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data); // Exemple : définir l'utilisateur à partir de la réponse
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/authentication/login', { email, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Exemple : définir l'utilisateur à partir de la réponse
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/authentication/logout');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuthentication, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
