import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/500.css';
import './index.css';
import App from './App';
import { AuthProvider } from './features/auth/components/AuthProvider/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

