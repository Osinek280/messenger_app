import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './userContext';
import { ApiProvider } from './ApiContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={
            <UserProvider>
              <ApiProvider>
                <App />
              </ApiProvider>
            </UserProvider>
          } />
          <Route path="/:conversationId" element={
            <UserProvider>
              <ApiProvider>
                <App />
              </ApiProvider>
            </UserProvider>
          } />
        </Routes>
      </React.Fragment>
    </Router>
  </React.StrictMode>,
)
