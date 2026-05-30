# Contribución de la IA a la solución

## Herramienta utilizada

Claude (Anthropic) — asistente de IA conversacional.

## Cómo se usó

### 1. Guía paso a paso para Strapi (primera vez)

Al no tener experiencia previa con Strapi, la IA explicó:

- Qué son los Content Types y cómo crearlos desde el panel admin
- La diferencia entre Collection Type y Single Type
- Cómo hacer públicas las APIs desde Settings → Roles → Public
- Por qué Strapi v5 devuelve estructura plana (sin `.attributes`) vs v4

### 2. Diagnóstico de bugs en tiempo real

- **Bug 1**: `Cannot read properties of undefined (reading 'tech_stack')` — la IA identificó que el componente asumía estructura v4 cuando Strapi v5 devuelve datos planos.
- **Bug 2**: Skills no mostraban barras — la IA detectó el mismatch de mayúsculas entre los datos de Strapi (`"Backend"`) y el filtro del componente (`'backend'`).

### 3. Arquitectura del frontend

La IA propuso y generó:

- El hook `useStrapi` reutilizable con cancelación de requests (`cancelled = true`) para evitar memory leaks
- La separación `api/strapi.js` como capa de acceso a datos centralizada
- Estructura de carpetas por componente (co-location de JSX + CSS + test)

### 4. Pruebas unitarias

La IA generó tests con dos enfoques:

- **ProjectCard**: test de componente puro (sin dependencias externas)
- **Skills**: test con `vi.mock` para aislar el componente del hook y la API

## Lo que el desarrollador aportó

- Decisión del contenido real del portafolio (proyectos, skills, experiencia)
- Configuración del entorno Strapi y carga de datos reales
- Validación de cada paso y reporte de errores para iterar
- Comprensión del código generado para poder mantenerlo

## Conclusión

La IA aceleró significativamente el scaffolding inicial y el diagnóstico de errores,
pero el valor real estuvo en la comprensión del desarrollador de cada decisión tomada,
lo que permite mantener y extender el código de forma independiente.
