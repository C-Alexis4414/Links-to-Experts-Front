'use client'

import Airtable from 'airtable';

const base = new Airtable({apiKey: 'AIRTABLE_API_TOKEN'}).base('AIRTABLE_BASE_ID');

import React, { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState(''); // 'youtuber' ou 'pro'

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    // Ajoutez le nouvel utilisateur à la base de données Airtable
        base('utilisateur').create([
            {
                "fields": {
                    "GivenName": "GivenName",
                    "Surname": "Surname",
                    "UserName": "UserName",
                    "password": "password",
                    "EmailAddress": "EmailAddress",
                    "isYoutuber": true,
                    "IsPro": true,
                }
            }
        ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        if (records) {
            records.forEach(function (record) {
                console.log(record.getId());
            });
        }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={type} onChange={e => setType(e.target.value)} required>
            <option value="">Sélectionnez votre type</option>
            <option value="youtuber">Youtuber</option>
            <option value="pro">Pro</option>
        </select>
        <button type="submit">S'inscrire</button>
        </form>
    );
};

export default Signup;