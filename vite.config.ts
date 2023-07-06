import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const apiUrls = {
  production: "https://messenger-serwer.vercel.app/",
  development: "https://messenger-api-vcnc.onrender.com/"
};

const processShim = {
  env: {
    NODE_ENV: environment,
    API_URL: apiUrls[environment]
  }
};

export default defineConfig({
  base: '/vite-deploy/',
  plugins: [react()],
  define: {
    'process': JSON.stringify(processShim)
  }
});
