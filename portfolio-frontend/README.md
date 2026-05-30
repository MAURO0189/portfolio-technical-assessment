# Portfolio Personal — React + Strapi

Portafolio personal construido como prueba técnica, con arquitectura fullstack desacoplada.

## Stack

| Capa          | Tecnología                   |
| ------------- | ---------------------------- |
| Backend / CMS | Strapi v5                    |
| Frontend      | React 18 + Vite              |
| HTTP Client   | Axios                        |
| Tests         | Vitest + Testing Library     |
| Estilos       | CSS Variables + Mobile-first |

## Estructura del proyecto

src/
├── api/ # Cliente Axios centralizado
├── hooks/ # useStrapi: hook reutilizable para fetch
└── components/
├── Navbar/
├── Hero/
├── Projects/
├── Skills/
├── Experience/
└── Footer/

## Cómo correr el proyecto

```bash
# 1. Backend (Strapi)
cd strapi-backend
npm run develop       # http://localhost:1337

# 2. Frontend (React)
cd portfolio-frontend
npm install
npm run dev           # http://localhost:5173

# 3. Tests
npm test
```

## Decisiones de arquitectura

- **`useStrapi` hook**: abstrae toda la lógica de fetch, loading y error en un solo lugar reutilizable por todos los componentes.
- **`api/strapi.js`**: centraliza las URLs y el cliente Axios — si cambia el baseURL, se cambia en un solo archivo.
- **Mobile-first**: los estilos base son para móvil; los breakpoints amplían el layout para desktop.
- **CSS Variables**: toda la paleta y tipografía en `:root`, sin magic values dispersos.

## Cómo la IA contribuyó a la solución

Ver [AI_CONTRIBUTION.md](./AI_CONTRIBUTION.md)
