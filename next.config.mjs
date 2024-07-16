import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, 'mannazo-nextjs-secret', '.env.local');
  return dotenv.config({ path: envPath }).parsed || {};
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: loadEnv(),
};

export default nextConfig;