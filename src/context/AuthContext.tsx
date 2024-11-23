import axiosInstance from '../utils/axiosInstance';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface AuthContextProps {
    user: any | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const user = useState<any | null>(null); // setUser in array
    const [isLoading] = useState(true); // setIsLoading in array

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const { data } = await axiosInstance.get('/authentication/protected');
    //             setUser(data);
    //         } catch (error) {
    //             console.error("This route is not protected");
    //             setUser(null);
    //         }
    //         finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     if (!user && isLoading) {
    //         fetchUser();
    //     }
    // }, [user, isLoading]);

    const login = async (email: string, password: string) => {
        try {
            await axiosInstance.post('/authentication/login', { email, password });
            // const { data } = await axiosInstance.get('/authentication/protected');
            // setUser(data);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/authentication/logout');
            // setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};