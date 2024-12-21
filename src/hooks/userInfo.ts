import { useState, useEffect } from 'react';
import { getUserInfo } from '../utils/getUserInfo';
import { UserFields } from '../types/formValues';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserFields | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchUserInfo();
    }, []);

    return { userInfo, error };
};