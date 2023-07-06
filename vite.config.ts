import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const apiUrls = {
  production: "huj",
  development: "http://localhost:8888"
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
