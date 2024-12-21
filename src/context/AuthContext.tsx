import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface AuthContextType {
  isAuthenticated: boolean; // boolean qui indique si l'utilisateur est authentifié
  checkAuthentication: () => Promise<void>; // fonction qui va vérifier si le user est authentifié
  login: (email: string, password: string) => Promise<void>; // fonction pour se connecter
  logout: () => Promise<void>; // fonction pour se déconnecter
  isLoading: boolean; // boolean qui indique si le chargement est en cours ou non
  deleteUser: () => Promise<void>; // fonction pour supprimer le compte utilisateur
  // user: UserType | null; // Propriété userName ajoutée à l'état user
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
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<UserType>('/authentication/protected');
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
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

  const deleteUser = async () => {
    try {
      setIsLoading(true);
      if (!user?.id) throw new Error('No user ID avalaible');
      await axiosInstance.delete('/user/deleteUser');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Delete account failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [ isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuthentication, login, logout, isLoading, deleteUser }}
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
