# Task Web

Aplicación web para gestionar tareas con tablero Kanban, autenticación y cambios de estado en tiempo real.

## Repositorios originales

- https://github.com/Augusto0414/task-api
- https://github.com/Augusto0414/task-web

## Características

- Registro e inicio de sesión.
- Tablero Kanban con estados: pendiente, en progreso y finalizada.
- Crear, editar y actualizar tareas.
- Arrastrar y soltar tareas entre columnas para cambiar su estado.
- Actualizaciones optimistas para reflejar cambios al instante.

## Stack

- React + TypeScript + Vite
- Redux Toolkit
- Axios
- Tailwind CSS
- Lucide Icons
- Framer Motion

## Requisitos

- Node.js 18+
- API disponible con endpoint base en `VITE_API_URL`

## Configuración

Renombra `.env.example` a `.env` y configura la URL de la API:

```
VITE_API_URL=http://localhost:8000/api/v1
```

## Antes de probar

Arranca la API primero para que la app pueda leer y actualizar las tareas.

## Docker

Para construir y levantar la app usando Docker y la variable de entorno del `.env`:

```
docker compose --env-file .env -f docker/docker-compose.yml up --build
```

Si prefieres pasar la variable directamente sin `.env`:

```bash
VITE_API_URL=http://localhost:8000/api/v1 docker compose -f docker/docker-compose.yml up --build
```

## Scripts

```
npm run dev
npm run build
npm run lint
npm run preview
```

## Estructura del proyecto

```
src/
  api/               Cliente HTTP y manejo de errores
  assets/            Recursos estáticos
  components/        Componentes compartidos
  feature/
    auth/            Login/registro y slice
    home/            Vista principal
    tasks/           Tablero Kanban, hooks y slice
  helpers/           Utilidades
  interfaces/        Tipos y contratos
  store/             Configuración Redux
```

## Flujo de tareas

1. Al iniciar sesión se cargan las tareas desde la API.
2. Crear/editar una tarea actualiza el estado local de inmediato.
3. Arrastrar una tarea entre columnas actualiza su estado y sincroniza con la API.

## Notas

- El token se guarda en `localStorage` y se envía en cada request.
- Si la API falla, se muestra el error en la interfaz.
