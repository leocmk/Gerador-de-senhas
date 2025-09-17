import React from 'react';
import { createRoot } from 'react-dom/client';
import { LandingPage } from './pages/LandingPage';
import './styles/globals-futuristic.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
