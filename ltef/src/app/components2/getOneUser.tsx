'use client';
import React, { useState } from 'react';
import axios from 'axios';

const UserSearchComponent: React.FC = () => {
    interface User {
        id: string;
        userName: string;
        password: string;
        email: string;
        is_Youtuber: boolean;
        is_Professional: boolean;
    }

    const [userId, setUserId] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/user/id/${userId}`);
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la récupération de l\'id de l\'utilisateur.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Recherche d'un id</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID de l'utilisateur:
                    <input type="text" value={userId} onChange={handleInputChange} required />
                </label>
                <button type="submit">Rechercher</button>
            </form>

            {loading && <div>Chargement...</div>}
            {error && <div>{error}</div>}
            {user && (
                <div style={{ padding: '10px', marginTop: '10px' }}>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                    <p><strong>Mot de passe:</strong> {user.password}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>is YouTuber:</strong> {user.is_Youtuber ? 'Oui' : 'Non'}</p>
                    <p><strong>is Professionnel:</strong> {user.is_Professional ? 'Oui' : 'Non'}</p>
                </div>
            )
            }
        </div >
    );
};

export default UserSearchComponent;
