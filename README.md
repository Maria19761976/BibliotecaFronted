# Biblioteca Digital - Frontend

Frontend de una biblioteca digital construido con React y Vite.

## Descripción

Esta aplicación presenta una landing funcional con búsqueda por título, autor o ISBN, recomendaciones activas, navegación a gestión de libros y autores, y una página de inicio optimizada para presentación y demo.

## Requisitos

- Node.js 18+
- Backend REST disponible en `VITE_API_URL` (por defecto `http://localhost:8080`)

## Instalación

```bash
npm install
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

Abre la URL indicada por Vite (por defecto `http://localhost:5173`).

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Configuración por entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Luego edita `.env` con la URL de tu backend:

```env
VITE_API_URL=http://localhost:8080
```

Si no defines `VITE_API_URL`, la aplicación usa por defecto `http://localhost:8080`.

## Rutas principales

- `/` — Página de inicio
- `/books` — Listado de libros
- `/books?q=...` — Búsqueda de libros
- `/authors` — Listado de autores
- `/books/new` — Añadir libro
- `/books/edit/:id` — Editar libro
- `/authors/new` — Añadir autor
- `/authors/edit/:id` — Editar autor

## Demo recomendada

1. Abre `/`
2. Busca un título, autor o ISBN en el campo de búsqueda
3. Haz clic en `Buscar` o presiona Enter
4. Verifica que se filtra el listado de libros
5. Haz clic en `Ver todo` para ir al listado completo
6. Prueba el botón `Reservar ahora` para navegar a libros
7. Comprueba que los filtros y navegación funcionan sin errores

## Estructura del proyecto

- `src/components/` — Componentes reutilizables
- `src/pages/` — Páginas de la aplicación
- `src/services/` — Servicios API (bookService, authorService)
- `src/styles/` — Estilos globales
- `public/` — Assets estáticos

## Notas técnicas

- El frontend consume una API REST configurada en `VITE_API_URL`.
- Si el backend no está disponible, los servicios lanzarán errores que se muestran en la UI.
- La búsqueda funciona con filtrado local de los datos cargados.
- Los componentes usan React Router v7+ para navegación.

## Notas de desarrollo

- El proyecto usa Vite para desarrollo rápido con HMR.
- ESLint está configurado para mantener la calidad del código.
- Se recomienda usar la rama `feature/improve-search-and-navigation` para nuevas mejoras.

## Próximos pasos

- Implementar o mejorar el servicio de reservas de sala de estudio.
- Añadir autenticación y manejo de sesiones.
- Mejorar el diseño responsivo para móviles.

