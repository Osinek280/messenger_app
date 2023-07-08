import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const apiUrls = {
  production: "https://messenger-api-vcnc.onrender.com",
  development: "http://localhost:8888"
};

const processShim = {
  env: {
    NODE_ENV: environment,
    API_URL: apiUrls[environment]
  }
};

export default defineConfig({
  // base: '/messenger_app/',
  plugins: [react()],
  define: {
    'process': JSON.stringify(processShim)
  }
});
