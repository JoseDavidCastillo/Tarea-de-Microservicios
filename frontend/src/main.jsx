import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './styles/global.css';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = 'openid profile email';

const missingAuth0Env = [];
if (!domain) missingAuth0Env.push('VITE_AUTH0_DOMAIN');
if (!clientId) missingAuth0Env.push('VITE_AUTH0_CLIENT_ID');
if (domain === 'YOUR_DOMAIN.auth0.com') missingAuth0Env.push('VITE_AUTH0_DOMAIN (replace placeholder)');
if (clientId === 'YOUR_CLIENT_ID') missingAuth0Env.push('VITE_AUTH0_CLIENT_ID (replace placeholder)');

if (missingAuth0Env.length > 0) {
  throw new Error(
    `Missing required Auth0 environment variables: ${missingAuth0Env.join(', ')}. ` +
      'Set them in frontend/.env and restart the Vite dev server.'
  );
}

const authorizationParams = {
  redirect_uri: window.location.origin,
  scope
};

if (audience) {
  authorizationParams.audience = audience;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
      cacheLocation="memory"
      useRefreshTokens
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);