import axiosInstance from './axiosConfig';
import { UserFields } from '@/types/formValues';
    
export const getUserInfo = async (): Promise<UserFields> => {
    try {
        const response = await axiosInstance.get<UserFields>('/user/info');
        return response.data;
    } catch (error: any) {
        console.error('Failed to get user info:', error);
        throw new Error(error.response?.data?.message || 'Failed to get user info');
    }
};