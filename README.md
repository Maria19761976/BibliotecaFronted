# 📚 Biblioteca Frontend

Aplicación web frontend para la gestión de una biblioteca de libros por autor, desarrollada con **React** y **Vite** como parte de un proyecto grupal.

Este repositorio corresponde al cliente web que consume la API REST del backend desarrollada con Spring Boot y MySQL. Permite realizar el CRUD completo de libros y autores desde el frontend, conectado con el backend en todo momento.

> **Backend del proyecto:** https://github.com/Suso777/Biblioteca-Backend

---

## Índice

- [Descripción del ejercicio](#descripción-del-ejercicio)
- [Requisitos cumplidos](#requisitos-cumplidos)
- [Funcionalidades](#funcionalidades)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Diagrama de páginas y navegación](#diagrama-de-páginas-y-navegación)
- [Conexión con el backend](#conexión-con-el-backend)
- [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
- [Scripts disponibles](#scripts-disponibles)
- [Errores comunes y soluciones](#errores-comunes-y-soluciones)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Próximas mejoras](#próximas-mejoras)
- [Equipo](#equipo)
- [Estado del proyecto](#estado-del-proyecto)

---

## Descripción del ejercicio

El objetivo del ejercicio es poner en práctica el desarrollo fullstack montando una biblioteca de libros organizados por autor, utilizando **Spring Boot** en el backend y **React** en el frontend.

El proyecto cubre el ciclo completo de desarrollo: modelado de datos, API REST, conexión a base de datos MySQL, diseño en Figma, diagrama de base de datos en Draw.io, gestión de tareas con Jira y una interfaz web responsive que realiza el CRUD completo de las dos entidades desde el front.

---

## Requisitos cumplidos

| Requisito | Estado |
|---|---|
| Modelo, controlador, repository y acceso a base de datos | ✅ Completado |
| CRUD completo de libros | ✅ Completado |
| CRUD completo de autores | ✅ Completado |
| Entidad libro con título, ISBN, año de publicación e imagen | ✅ Completado |
| Entidad autor con nombre, apellido, nacionalidad, año de nacimiento y vivo/fallecido | ✅ Completado |
| Relación one-to-many entre autores y libros | ✅ Completado |
| Diseño completo del front en Figma | ✅ Completado |
| Diagrama de base de datos en Draw.io | ✅ Completado |
| Gestión de tareas con Jira | ✅ Completado |
| Frontend en React conectado al backend con CRUD completo | ✅ Completado |
| Frontend responsive | ✅ Completado |
| Validación de endpoints con Postman | ✅ Completado |

---

## Funcionalidades

- Listado completo de todos los libros del catálogo con título, ISBN, año de publicación, portada y autor
- Listado completo de autores con nombre, apellido, nacionalidad, año de nacimiento y estado (vivo o fallecido)
- Consulta de un libro o autor concreto por su ID
- Añadir nuevos libros al catálogo indicando todos sus campos, incluyendo el autor al que pertenece
- Añadir nuevos autores al sistema
- Editar la información de cualquier libro o autor existente
- Eliminar libros y autores del sistema
- Navegación fluida entre las distintas secciones de la aplicación con React Router
- Diseño responsive adaptado a distintos tamaños de pantalla

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.x | Librería principal para construir la interfaz de usuario |
| Vite | 8.x | Bundler y servidor de desarrollo con Hot Module Replacement |
| React Router DOM | 7.x | Gestión de rutas y navegación entre páginas |
| Axios | 1.x | Realización de peticiones HTTP a la API REST del backend |
| ESLint | 9.x | Análisis estático del código para mantener su calidad |
| Figma | — | Diseño de la interfaz de usuario |
| Jira | — | Gestión de tareas y seguimiento del proyecto |

---

## Arquitectura del proyecto

```
BibliotecaFronted/
├── src/
│   ├── components/        # Componentes reutilizables de la interfaz
│   ├── pages/             # Páginas principales de la aplicación
│   ├── services/          # Lógica de llamadas a la API con Axios
│   └── main.jsx           # Punto de entrada de la aplicación React
├── index.html             # Punto de entrada HTML
├── package.json           # Dependencias y scripts del proyecto
├── vite.config.js         # Configuración de Vite
├── eslint.config.js       # Configuración de ESLint
└── .gitignore
```

---

## Diagrama de páginas y navegación

```
/                         → Página principal (inicio / bienvenida)
│
├── /books                → Listado de todos los libros
│   ├── /books/:id        → Detalle de un libro concreto
│   ├── /books/new        → Formulario para añadir un nuevo libro
│   └── /books/edit/:id   → Formulario para editar un libro existente
│
└── /authors              → Listado de todos los autores
    ├── /authors/:id      → Detalle de un autor concreto
    ├── /authors/new      → Formulario para añadir un nuevo autor
    └── /authors/edit/:id → Formulario para editar un autor existente
```

La navegación entre páginas se gestiona con React Router DOM. Desde el listado de libros se puede acceder al detalle de cada libro y desde ahí editar o volver al listado. El flujo es el mismo para autores.

---

## Conexión con el backend

Este frontend está diseñado para funcionar junto con el backend del proyecto:

**Backend:** https://github.com/Suso777/Biblioteca-Backend — API REST con Java, Spring Boot, Maven y MySQL, siguiendo el patrón MVC con capas `controller`, `service`, `repository` y `model`.

La URL base de la API es `http://localhost:8080`.

**Endpoints de autores**

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/authors` | Obtiene todos los autores |
| GET | `/authors/{id}` | Obtiene un autor por su ID |
| POST | `/authors` | Crea un nuevo autor |
| PUT | `/authors/{id}` | Actualiza un autor existente |
| DELETE | `/authors/{id}` | Elimina un autor |

**Endpoints de libros**

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/books` | Obtiene todos los libros |
| GET | `/books/{id}` | Obtiene un libro por su ID |
| POST | `/books` | Crea un nuevo libro |
| PUT | `/books/{id}` | Actualiza un libro existente |
| DELETE | `/books/{id}` | Elimina un libro |

**Modelo de datos**

Entidad `Author`: `id`, `name`, `surname`, `nationality`, `birthYear`, `alive`.

Entidad `Book`: `id`, `title`, `isbn`, `publicationYear`, `image`, `author_id`.

Relación: **one-to-many** entre `Author` y `Book`. Un autor puede tener varios libros; cada libro pertenece a un único autor.

---

## Instalación y puesta en marcha

### Requisitos previos

- Node.js versión 18 o superior
- npm (incluido con Node.js)
- El backend corriendo en `http://localhost:8080` antes de arrancar el frontend

### Pasos

1. Clona el repositorio:

```bash
git clone https://github.com/Maria19761976/BibliotecaFronted.git
cd BibliotecaFronted
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre el navegador en `http://localhost:5173`

> Importante: el backend debe estar arrancado y con la base de datos cargada antes de usar la aplicación. Consulta las instrucciones de configuración en el repositorio del backend.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local con HMR |
| `npm run build` | Genera la versión optimizada de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción en local |
| `npm run lint` | Ejecuta ESLint para detectar errores en el código |

---

## Errores comunes y soluciones

**La aplicación carga pero no muestra datos**

El backend no está arrancado o no es accesible en `http://localhost:8080`. Asegúrate de haber iniciado el servidor Spring Boot antes de abrir el frontend. Puedes verificarlo abriendo `http://localhost:8080/books` directamente en el navegador.

**Error de CORS al hacer peticiones a la API**

Si ves un error de tipo `Access-Control-Allow-Origin` en la consola del navegador, el backend no tiene CORS configurado para aceptar peticiones desde `http://localhost:5173`. Revisa la configuración CORS en el backend.

**Error `net::ERR_CONNECTION_REFUSED`**

La URL base de la API no es correcta o el backend no está en marcha. Comprueba que el backend arranca en el puerto 8080 y que no hay otro proceso ocupando ese puerto.

**Los libros aparecen sin imagen**

Las imágenes de los libros se cargan desde URLs externas (openlibrary.org). Si no tienes conexión a internet o la URL de la imagen no es válida, el campo `image` aparecerá vacío o roto.

**`npm install` falla o da errores de versión**

Comprueba que tienes Node.js 18 o superior instalado ejecutando `node -v`. Si tienes una versión anterior, actualiza Node.js desde https://nodejs.org.

---

## Capturas de pantalla

**Vista principal — listado de libros**

> _Añadir captura de pantalla aquí_

**Vista de detalle / formulario de edición**

> _Añadir captura de pantalla aquí_

---

## Próximas mejoras

Funcionalidades que quedaron fuera del alcance del proyecto pero que se consideran para futuras versiones:

- Buscador de libros por título o autor en tiempo real
- Filtrado y ordenación del catálogo por año, nacionalidad del autor o título
- Paginación del listado de libros para manejar catálogos grandes
- Sistema de autenticación y login con roles (administrador y usuario lector)
- Gestión de préstamos: registrar qué usuario tiene prestado qué libro y en qué fecha
- Modo oscuro en la interfaz
- Despliegue en producción con Vercel o Netlify para el frontend y Railway o Render para el backend
- Tests unitarios y de integración con Vitest y React Testing Library

---

## Equipo

Proyecto desarrollado en grupo durante el **Bootcamp Inditex**:

| Nombre | Rol |
|---|---|
| David Navarro | Desarrollo |
| Facundo Garavagalia | Desarrollo |
| Javier Galvañ | Desarrollo |
| María Pérez | Desarrollo  |
| Suso Suárez | Desarrollo  |

---

## Estado del proyecto

El proyecto cuenta con una base funcional completa que cubre las operaciones CRUD sobre autores y libros, integración con la API REST del backend, navegación entre páginas y diseño responsive. Cumple con todos los requisitos del ejercicio y está listo para ser ejecutado en local siguiendo los pasos de instalación descritos en este documento.
