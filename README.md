# Portfolio Technical Assessment
**Role:** Front-End Developer  
**Stack:** Strapi v5 + React 18 + Vite

---

## Estructura del repositorio

```
portfolio-technical-assessment/
├── strapiBack/          ← Backend CMS (Strapi v5)
├── portfolio-frontend/  ← Frontend SPA (React 18 + Vite)
└── README.md            ← Este archivo
```

---

## Cómo correr el proyecto localmente

### Requisitos previos
- Node.js 18+
- npm 9+

### 1. Backend — Strapi

```bash
cd strapiBack
npm install
npm run develop
```

Panel admin disponible en: `http://localhost:1337/admin`  
API disponible en: `http://localhost:1337/api`

> **Nota:** Al iniciar por primera vez, crear un usuario administrador en el panel. Luego ir a Settings → Roles → Public y habilitar `find` y `findOne` para todos los Content Types.

### 2. Frontend — React

```bash
cd portfolio-frontend
npm install
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

### 3. Tests

```bash
cd portfolio-frontend
npm test
```

---

## Ejercicio 1: Portafolio Personal Responsivo

### ¿Qué se construyó?
SPA con React 18 que consume una API de Strapi v5 para mostrar información dinámica de un portafolio personal: perfil, proyectos, skills y experiencia laboral.

### Content Types en Strapi
| Tipo | Descripción |
|------|-------------|
| `Profile` (Single Type) | Nombre, título, bio, email, GitHub, LinkedIn |
| `Project` (Collection) | Título, descripción, tech stack, URLs, destacado |
| `Skill` (Collection) | Nombre, categoría (Frontend/Backend/Tools), nivel % |
| `Experience` (Collection) | Empresa, rol, fechas, descripción |

### Estructura de componentes
```
src/
├── api/
│   └── strapi.js          ← Cliente Axios centralizado
├── hooks/
│   └── useStrapi.js       ← Hook reutilizable con cancelación de requests
└── components/
    ├── Navbar/             ← Navegación responsiva con hamburger menu
    ├── Hero/               ← Sección principal con datos del perfil
    ├── Projects/           ← Grid de proyectos con tags de tecnologías
    ├── Skills/             ← Barras de progreso agrupadas por categoría
    ├── Experience/         ← Timeline de experiencia laboral
    └── Footer/
```

### Decisiones técnicas
- **Mobile-first CSS**: estilos base para móvil, `@media (min-width: ...)` para ampliar en tablet y desktop.
- **CSS Variables**: toda la paleta en `:root`, sin magic values.
- **Hook `useStrapi`**: abstrae loading, error y cancelación de requests (evita memory leaks con flag `cancelled`).
- **Capa `api/strapi.js`**: centraliza el `baseURL` y todas las funciones de fetch. Si cambia el endpoint, se modifica en un solo lugar.
- **Co-location**: cada componente tiene su `.jsx`, `.css` y `.test.jsx` en la misma carpeta.

### Tests unitarios (Ejercicio 1)
```
ProjectCard.test.jsx — 4 tests
  ✓ renderiza el título del proyecto
  ✓ muestra el badge de destacado si featured es true
  ✓ renderiza las tecnologías como tags separados
  ✓ no muestra Live Demo si live_url es null
```

---

## Ejercicio 2: API Integration + Error Handling

### ¿Qué se construyó?
Página `/products` que consume `https://fakestoreapi.com/products` con manejo robusto de errores y contenido dinámico desde Strapi.

### Arquitectura del servicio
```
src/
├── api/
│   └── fakeStore.js       ← Servicio con clases de error personalizadas
├── hooks/
│   └── useFakeStore.js    ← Hook con estado de errorType para UI diferenciada
└── pages/
    └── ProductsPage/
        ├── ProductsPage.jsx
        ├── ProductCard.jsx
        └── ErrorMessage.jsx  ← UI diferenciada por tipo de error
```

### Tipos de error manejados
| Error | Cuándo ocurre | Clase | UI |
|-------|--------------|-------|----|
| `NetworkError` | Sin internet / timeout (8s) | `NetworkError extends Error` | 📡 Sin conexión |
| `ServerError` | Respuesta 5xx | `ServerError extends Error` | 🔥 Error del servidor |
| `ClientError` | Respuesta 4xx | `ClientError extends Error` | 🔍 No encontrado |

### Características
- **Timeout de 8 segundos** con `AbortController`
- **Skeleton loader** animado mientras cargan los productos
- **Skeleton loader responsivo**: 1 columna en mobile → 2 en tablet → 3 en desktop → 4 en wide
- Título y subtítulo de la página gestionados desde Strapi (`PageContent` Content Type)

### Tests unitarios (Ejercicio 2)
```
fakeStore.test.js — 5 tests
  ✓ retorna productos correctamente con respuesta 200
  ✓ lanza ServerError con respuesta 500
  ✓ lanza ClientError con respuesta 404
  ✓ lanza NetworkError cuando no hay conexión
  ✓ lanza NetworkError cuando el request supera el timeout
```

### Total de tests
```
Test Files  3 passed (3)
Tests      14 passed (14)
```

---

## AI Usage

Este proyecto fue desarrollado con asistencia de **Claude (Anthropic)** como herramienta de IA requerida por la prueba técnica.

### ¿Cómo contribuyó la IA?

**Ejercicio 1:**
- Guía paso a paso para configurar Strapi v5 por primera vez (Content Types, permisos públicos, Single Types vs Collection Types).
- Generación de la arquitectura de componentes y el hook `useStrapi` con cancelación de requests.
- Diagnóstico en tiempo real de bugs: estructura plana de Strapi v5 (sin `.attributes`) y mismatch de mayúsculas en categorías de skills.
- Generación de pruebas unitarias con Testing Library.

**Ejercicio 2:**
- Diseño del sistema de errores con clases personalizadas (`NetworkError`, `ServerError`, `ClientError`).
- Implementación de `fetchWithTimeout` con `AbortController`.
- Corrección de tests que fallaban por doble consumo de mocks (`mockResolvedValueOnce` → `.catch((e) => e)`).

### ¿Qué aportó el desarrollador?
- Toma de decisiones sobre contenido real del portafolio.
- Configuración del entorno y carga de datos en Strapi.
- Validación de cada paso, reporte de errores y criterio sobre qué incluir o descartar (ej: botones de simulación de error removidos del build final).
- Comprensión del código para poder mantenerlo y extenderlo.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Strapi | v5 | CMS headless / API REST |
| React | 18 | SPA frontend |
| Vite | 6 | Build tool y dev server |
| Axios | latest | Cliente HTTP para Strapi |
| React Router | v6 | Navegación SPA |
| Vitest | 4 | Test runner |
| Testing Library | latest | Tests de componentes |
