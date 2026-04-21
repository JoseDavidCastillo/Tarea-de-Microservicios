# Frontend - Twitter Clone

SPA en React + Vite con autenticacion usando SDK oficial de Auth0 (`@auth0/auth0-react`).

## Arquitectura (simple)

- `src/main.jsx`: inicializa `Auth0Provider`.
- `src/App.jsx`: pantalla principal (stream, composer, perfil).
- `src/services/api.js`: cliente HTTP hacia backend.
- Componentes en `src/components`: UI reutilizable.

Flujo principal:

1. Usuario entra a la app y puede ver stream publico.
2. Login via Auth0 Universal Login.
3. Para endpoints protegidos, se obtiene access token con SDK.
4. El token se envia como `Authorization: Bearer <token>` al backend.

## Variables de entorno

Archivo: `.env`

- `VITE_AUTH0_DOMAIN`
  - Ejemplo: `TuDomain.us.auth0.com`
- `VITE_AUTH0_CLIENT_ID`
  - Ejemplo: `ClientId`
- `VITE_AUTH0_AUDIENCE`
  - Debe coincidir con backend/Auth0 API Identifier
  - Ejemplo: `https://twitter-clone-api`
- `VITE_API_BASE_URL` (fallback)
  - Ejemplo: `http://localhost:8080`
- `VITE_USER_API_URL`
- `VITE_POSTS_API_URL`
- `VITE_STREAM_API_URL`

Si usas monolito, normalmente los 3 URLs apuntan a `http://localhost:8080`.

## Requisitos Auth0 (SPA)

En la aplicacion Auth0 debes configurar:

- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

## Ejecucion local

Desde esta carpeta:

```bash
npm install
npm run dev
```

El script de desarrollo usa puerto fijo para evitar mismatch:

- `5173` con `--strictPort`