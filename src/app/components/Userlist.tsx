// src/components/UserList.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AIRTABLE_API_URL, AIRTABLE_API_KEY } from '../../../config';

interface User {
    id: string;
    fields: {
        GivenName: string;
        Surname: string;
        UserName: string;
        password: string;
        EmailAddress: string;
        isYoutuber: boolean;
        IsPro: boolean;

        // Ajoutez ici les autres champs de la table utilisateur
    };
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${AIRTABLE_API_URL}`, {
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_API_KEY}`
                    }
                });
                console.log(response);

                setUsers(response.data.records);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.fields.GivenName} {user.fields.EmailAddress} {user.fields.password}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
