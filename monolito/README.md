# Monolito - Twitter Clone

Backend Spring Boot que expone API REST para stream publico y endpoints protegidos con Auth0.

## Arquitectura (simple)

- Capa controller: expone endpoints HTTP.
- Capa service: logica de negocio.
- Capa repository: acceso a datos (Spring Data JPA).
- Capa config: seguridad JWT (Auth0), CORS y Swagger/OpenAPI.
- Base de datos local: H2 en memoria para desarrollo.

Flujo principal:

1. El frontend llama `GET /api/stream` (publico).
2. Para `POST /api/posts` y `GET /api/me`, envia Bearer token.
3. El monolito valida JWT con issuer + audience de Auth0.

## Variables de entorno

Variables usadas por el monolito:

- `AUTH0_ISSUER_URI` (obligatoria en runtime real)
  - Ejemplo: `https://TuIssuer.us.auth0.com/`
- `AUTH0_AUDIENCE` (obligatoria en runtime real)
  - Ejemplo: `https://twitter-clone-api`
- `CORS_ALLOWED_ORIGINS` (recomendada)
  - Ejemplo: `http://localhost:5173`
- `SERVER_PORT` (opcional)
  - Default: `8080`

## Endpoints principales

- `GET /api/stream` -> publico
- `GET /api/posts` -> publico
- `POST /api/posts` -> protegido (requiere JWT valido)
- `GET /api/me` -> protegido (requiere JWT valido)
- Swagger UI: `GET /swagger-ui.html`

## Ejecucion local

Desde esta carpeta:

```bash
mvn spring-boot:run
```

Con variables (PowerShell):

```powershell
$env:AUTH0_ISSUER_URI="https://TuIssuer.us.auth0.com/"
$env:AUTH0_AUDIENCE="https://twitter-clone-api"
$env:CORS_ALLOWED_ORIGINS="http://localhost:5173"
mvn spring-boot:run
```

## Swagger (capturas)

Sube aqui tus imagenes y ajusta los nombres si quieres:

- `./docs/swagger-1.png`
![Swagger 1](./docs/swagger-1.png)

- `./docs/swagger-2.png`
![Swagger 2](./docs/swagger-1.png)