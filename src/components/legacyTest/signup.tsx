'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { AIRTABLE_API_URL, AIRTABLE_API_TOKEN } from '../../config';

const CreateUser = () => {
  const [GivenName, setGivenName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [isYoutuber, setIsYoutuber] = useState('');
  const [isPro, setIsPro] = useState('');

  const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = { GivenName: GivenName, Surname:Surname, Username:Username, EmailAddress: EmailAddress, password: password, isYoutuber: isYoutuber, isPro: isPro};
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
          <div>
            <label htmlFor="givenName">Given name:</label>
            <input
              type="text"
              id="name"
              value={GivenName}
              onChange={(e) => setGivenName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              value={Surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="name"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={EmailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="youtuber">Youtubeur:</label>
            <input
              type="url"
              id="youtuber"
              value={isYoutuber}
              onChange={(e) => setIsYoutuber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pro">Linkedin:</label>
            <input
              type="url"
              id="pro"
              value={isPro}
              onChange={(e) => setIsPro(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
};

export default CreateUser;