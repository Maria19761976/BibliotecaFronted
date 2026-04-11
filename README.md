# Biblioteca Frontend

Aplicación web para consultar y gestionar un catálogo de libros y autores. Está construida con React y Vite y consume una API REST externa para realizar operaciones CRUD.

## Estado real del proyecto

- Home orientada a demo con búsqueda, accesos rápidos y navegación al catálogo
- Listado de libros con filtro por texto usando el parámetro `q`
- Alta, edición y borrado de libros
- Listado, alta, edición y borrado de autores
- Gestión del backend mediante `VITE_API_URL`
- Página 404 para rutas no válidas

No incluye autenticación, reservas, préstamos ni páginas de detalle independientes para libro o autor.

## Stack actual

| Tecnología | Versión declarada |
| --- | --- |
| React | `^18.2.0` |
| React DOM | `^18.2.0` |
| React Router DOM | `^7.14.0` |
| Vite | `^5.0.8` |
| Axios | `^1.6.2` |
| Tailwind CSS | `^4.2.2` |
| ESLint | `^8.55.0` |

La interfaz combina utilidades de Tailwind con hojas de estilo CSS de componentes.

## Modelo de datos que usa el frontend

### Author

```json
{
  "id": 1,
  "name": "María",
  "surname": "Pérez",
  "nationality": "Española",
  "birthYear": 1985,
  "alive": true
}
```

### Book

```json
{
  "id": 10,
  "title": "Biblioteca Viva",
  "isbn": "9780000000000",
  "publicationYear": 2024,
  "image": "https://...",
  "author": {
    "id": 1,
    "name": "María",
    "surname": "Pérez"
  }
}
```

Para crear o editar un libro, el frontend envía el autor anidado en la propiedad `author`:

```json
{
  "title": "Biblioteca Viva",
  "isbn": "9780000000000",
  "publicationYear": 2024,
  "image": "https://...",
  "author": {
    "id": 1
  }
}
```

## Rutas disponibles

- `/`
- `/books`
- `/books/new`
- `/books/edit/:id`
- `/authors`
- `/authors/new`
- `/authors/edit/:id`

## Entorno

La aplicación lee la URL base del backend desde `VITE_API_URL`.

Ejemplo de `.env`:

```env
VITE_API_URL=https://mi-backend.example.com
```

Si no defines esa variable, el proyecto usa `http://localhost:8080` como valor por defecto. El código normaliza la URL para evitar problemas si se añade una barra final.

El archivo `.env.example` incluye un ejemplo mínimo.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Vite está configurado para abrir la app en `http://localhost:3000`.

## Build y calidad

```bash
npm run build
npm run lint
npm run test
```

## Flujo recomendado para la demo

1. Abrir la Home y usar la búsqueda principal.
2. Entrar en `Libros` y comprobar el filtro por `q`.
3. Crear o editar un libro.
4. Entrar en `Autores` y crear o editar un autor.
5. Verificar mensajes de éxito, estados vacíos y error 404.

## Estructura principal

```text
src/
  components/
  pages/
    authors/
    books/
  services/
  styles/
```

## Calidad y pruebas

- ESLint está configurado para React, hooks y refresco en caliente.
- Se ha añadido una base mínima de pruebas con Vitest y Testing Library.
- Ahora existe un smoke test inicial para la Home y sus acciones principales.

## Mejoras futuras

- Añadir pruebas automatizadas con Vitest y React Testing Library
- Incorporar estados de carga más ricos y manejo centralizado de errores
- Mejorar filtros y búsquedas del catálogo
- Añadir paginación o carga incremental si el volumen de datos crece

## Equipo

Proyecto desarrollado en el Bootcamp Inditex.
