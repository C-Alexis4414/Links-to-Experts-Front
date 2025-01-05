import { useState, useEffect } from 'react';
import { getUserInfo, putUserInfo } from '../utils/methodUserInfo';
import { UserFields } from '../types/formValues';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserFields | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserInfo = async () => {
        try {
            setIsLoading(true);
            const data = await getUserInfo();
            setUserInfo(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserInfo = async (userData: Partial<UserFields>) => {
        try {
            setIsLoading(true);
            const updateUser = await putUserInfo(userData);
            setUserInfo(updateUser);
        } catch(error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return { userInfo, error, isLoading, updateUserInfo, fetchUserInfo };
};