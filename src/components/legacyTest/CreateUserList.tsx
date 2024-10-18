// src/components/CreateUser.tsx
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { AIRTABLE_API_URL, AIRTABLE_API_TOKEN } from '../../config';

interface NewUser {
    GivenName: string;
    Surname: string;
    UserName: string;
    password: string;
    EmailAddress: string;
    isYoutuber: boolean;
    IsPro: boolean;
}

const CreateUser: React.FC = () => {
    const [newUser, setNewUser] = useState<NewUser>({
        GivenName: '',
        Surname: '',
        UserName: '',
        password: '',
        EmailAddress: '',
        isYoutuber: false,
        IsPro: false,
    });

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewUser({
            ...newUser,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${AIRTABLE_API_URL}`,
                {
                    fields: newUser,
                },
                {
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage('User created successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('Failed to create user');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="GivenName"
                    value={newUser.GivenName}
                    onChange={handleChange}
                    placeholder="Given Name"
                    required
                />
                <input
                    type="text"
                    name="Surname"
                    value={newUser.Surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    required
                />
                <input
                    type="text"
                    name="UserName"
                    value={newUser.UserName}
                    onChange={handleChange}
                    placeholder="User Name"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="email"
                    name="EmailAddress"
                    value={newUser.EmailAddress}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                />
                <label>
                    Is Youtuber:
                    <input
                        type="checkbox"
                        name="isYoutuber"
                        checked={newUser.isYoutuber}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Is Pro:
                    <input
                        type="checkbox"
                        name="IsPro"
                        checked={newUser.IsPro}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
