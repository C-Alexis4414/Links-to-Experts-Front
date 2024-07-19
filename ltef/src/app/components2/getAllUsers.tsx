'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/user/allUsers';

const AllUsersComponent: React.FC = () => {

    interface Users {
        id: string;
        userName: string;
        password: string;
        email: string;
        is_Youtuber: boolean;
        is_Professional: boolean;
    }
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(url);
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des utilisateurs.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            {users.length === 0 ? (
                <div>Aucun utilisateur trouvé.</div>
            ) : (
                <div>
                    {users.map((user) => (
                        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                            <p><strong>Mot de passe:</strong> {user.password}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Est YouTuber:</strong> {user.is_Youtuber ? 'Oui' : 'Non'}</p>
                            <p><strong>Est Professionnel:</strong> {user.is_Professional ? 'Oui' : 'Non'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllUsersComponent;
