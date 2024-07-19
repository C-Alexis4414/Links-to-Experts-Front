'use client';
import React, { useState } from "react";
import axios from "axios";

interface User {
    id: string;
    userName: string;
    password: string; // It's not recommended to fetch or store passwords in the frontend for security reasons
    email: string;
    is_Youtuber: boolean;
    is_Professional: boolean;
}

const UserSearchName: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchName, setSearchName] = useState<string>('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/user/name/${searchName}`);
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la récupération du nom de l\'utilisateur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Rechercher d'un nom utilisateur</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                <button type="submit">Rechercher</button>
            </form>
            {loading && <div>Chargement...</div>}
            {error && <div>{error}</div>}
            <ul>
                {Array.isArray(users) && users.map(user => (
                    <li key={user.id}>
                        <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Est YouTuber:</strong> {user.is_Youtuber ? 'Oui' : 'Non'}</p>
                        <p><strong>Est Professionnel:</strong> {user.is_Professional ? 'Oui' : 'Non'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearchName;
