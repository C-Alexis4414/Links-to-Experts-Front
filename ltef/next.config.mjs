import { config } from 'dotenv';

config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AIRTABLE_API_TOKEN: process.env.AIRTABLE_API_TOKEN,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    },
};

export default nextConfig;
