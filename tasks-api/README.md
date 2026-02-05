# API de Tareas - Documentación

## Levantar la API con Docker Compose

Desde la raíz del proyecto:

1. Construir y levantar contenedores:

```
docker compose -f docker/docker-compose.yml up -d --build
```

2. Verificar que esté en línea:

- API: http://localhost:8000
- Postgres: localhost:5434 (usuario: appuser, password: apppass, db: coredb)

Para detener y eliminar contenedores:

```
docker compose -f docker/docker-compose.yml down
```

## Tests

Nota: los tests usan SQLite en memoria. Asegúrate de tener habilitadas las extensiones `pdo_sqlite` y `sqlite3` en tu PHP (php.ini).

Ejecutar tests desde la raíz del proyecto:

```
php artisan test
```

Ejecutar tests desde Docker:

```
docker compose -f docker/docker-compose.yml exec api php artisan test
```

## Descripción General

Esta es una API REST implementada en Laravel para gestionar tareas de usuario con autenticación basada en JWT (JSON Web Tokens).

## Estructura del Proyecto

```
tasks-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   │   ├── AuthController.php      # Controlador de autenticación
│   │   │   └── TaskController.php      # Controlador de tareas
│   │   └── Middleware/
│   │       └── JwtMiddleware.php       # Middleware de validación JWT
│   ├── Models/
│   │   ├── User.php                   # Modelo de usuario
│   │   └── Task.php                   # Modelo de tarea
│   └── Services/
│       ├── AuthService.php            # Servicios de autenticación
│       └── TaskService.php            # Servicios de tareas
├── database/
│   └── migrations/
│       ├── create_users_table.php
│       └── create_tasks_table.php
├── routes/
│   └── api.php                        # Definición de rutas API
└── config/
    └── database.php                   # Configuración de base de datos
```

## Tecnologías Utilizadas

- **Framework**: Laravel 11
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (Firebase/php-jwt)
- **Validación**: Laravel Validator

## Configuración

### Base de Datos

Las variables de conexión están configuradas en `.env`:

```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5434
DB_DATABASE=coredb
DB_USERNAME=appuser
DB_PASSWORD=apppass
```

### JWT Secret

```
JWT_SECRET=your-secret-key-here-change-in-production
```

## Endpoints de la API

### Prefijo de API

Todos los endpoints comienzan con `/api/v1`

### 1. Autenticación

#### Registrar Usuario

- **Método**: POST
- **Ruta**: `/api/v1/register`
- **Descripción**: Registra un nuevo usuario
- **Validaciones**:
    - `name`: requerido, string, máximo 255 caracteres
    - `email`: requerido, email válido, único
    - `password`: requerido, mínimo 8 caracteres, debe confirmarse

**Solicitud**:

```json
{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Respuesta (201)**:

```json
{
    "success": true,
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "created_at": "2026-02-03T17:45:00Z",
        "updated_at": "2026-02-03T17:45:00Z"
    }
}
```

---

#### Iniciar Sesión (Login)

- **Método**: POST
- **Ruta**: `/api/v1/login`
- **Descripción**: Autentica un usuario y retorna un token JWT
- **Validaciones**:
    - `email`: requerido, email válido
    - `password`: requerido, string

**Solicitud**:

```json
{
    "email": "juan@example.com",
    "password": "password123"
}
```

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Autenticación exitosa",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "Bearer",
    "expires_in": 86400,
    "user": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "created_at": "2026-02-03T17:45:00Z",
        "updated_at": "2026-02-03T17:45:00Z"
    }
}
```

---

#### Cerrar Sesión (Logout)

- **Método**: POST
- **Ruta**: `/api/v1/logout`
- **Requiere**: Token JWT en header `Authorization: Bearer {token}`
- **Descripción**: Invalida la sesión actual

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Sesión cerrada exitosamente"
}
```

---

### 2. Tareas (Requieren autenticación)

**Cabecera requerida para todos los endpoints de tareas**:

```
Authorization: Bearer {token_jwt}
```

#### Listar Tareas

- **Método**: GET
- **Ruta**: `/api/v1/tasks`
- **Parámetros Opcionales**:
    - `status`: filtrar por estado (pending, in_progress, done)
    - `page`: número de página (default: 1)
    - `per_page`: registros por página (default: 10)

**Solicitud**:

```
GET /api/v1/tasks?status=pending&page=1
```

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Tareas obtenidas exitosamente",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "title": "Completar proyecto",
            "description": "Terminar implementación de API",
            "status": "in_progress",
            "created_at": "2026-02-03T17:50:00Z",
            "updated_at": "2026-02-03T17:50:00Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total": 5,
        "last_page": 1
    }
}
```

---

#### Crear Tarea

- **Método**: POST
- **Ruta**: `/api/v1/tasks`
- **Descripción**: Crea una nueva tarea para el usuario autenticado
- **Validaciones**:
    - `title`: requerido, string, máximo 255 caracteres
    - `description`: opcional, string
    - `status`: opcional, debe ser: pending, in_progress o done

**Solicitud**:

```json
{
    "title": "Implementar validaciones",
    "description": "Agregar validaciones a todos los endpoints",
    "status": "pending"
}
```

**Respuesta (201)**:

```json
{
    "success": true,
    "message": "Tarea creada exitosamente",
    "task": {
        "id": 2,
        "user_id": 1,
        "title": "Implementar validaciones",
        "description": "Agregar validaciones a todos los endpoints",
        "status": "pending",
        "created_at": "2026-02-03T18:00:00Z",
        "updated_at": "2026-02-03T18:00:00Z"
    }
}
```

---

#### Obtener Tarea Específica

- **Método**: GET
- **Ruta**: `/api/v1/tasks/{id}`
- **Descripción**: Obtiene los detalles de una tarea específica

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Tarea obtenida exitosamente",
    "task": {
        "id": 2,
        "user_id": 1,
        "title": "Implementar validaciones",
        "description": "Agregar validaciones a todos los endpoints",
        "status": "pending",
        "created_at": "2026-02-03T18:00:00Z",
        "updated_at": "2026-02-03T18:00:00Z"
    }
}
```

---

#### Actualizar Tarea

- **Método**: PUT
- **Ruta**: `/api/v1/tasks/{id}`
- **Descripción**: Actualiza una tarea existente
- **Validaciones**:
    - `title`: opcional, string, máximo 255 caracteres
    - `description`: opcional, string
    - `status`: opcional, debe ser: pending, in_progress o done

**Solicitud**:

```json
{
    "status": "in_progress",
    "description": "Comenzando implementación"
}
```

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Tarea actualizada exitosamente",
    "task": {
        "id": 2,
        "user_id": 1,
        "title": "Implementar validaciones",
        "description": "Comenzando implementación",
        "status": "in_progress",
        "created_at": "2026-02-03T18:00:00Z",
        "updated_at": "2026-02-03T18:05:00Z"
    }
}
```

---

#### Eliminar Tarea

- **Método**: DELETE
- **Ruta**: `/api/v1/tasks/{id}`
- **Descripción**: Elimina una tarea

**Respuesta (200)**:

```json
{
    "success": true,
    "message": "Tarea eliminada exitosamente"
}
```

---

## Códigos de Estado HTTP

| Código | Significado                                         |
| ------ | --------------------------------------------------- |
| 200    | OK - Solicitud exitosa                              |
| 201    | Created - Recurso creado exitosamente               |
| 401    | Unauthorized - Falta autenticación o token inválido |
| 404    | Not Found - Recurso no encontrado                   |
| 422    | Unprocessable Entity - Errores de validación        |

## Manejo de Errores

### Validación

```json
{
    "success": false,
    "message": "El email ya está registrado",
    "errors": {
        "email": ["El email ya está registrado"]
    }
}
```

### Autenticación Fallida

```json
{
    "success": false,
    "message": "Credenciales inválidas"
}
```

### Token Inválido

```json
{
    "success": false,
    "message": "Token inválido o expirado"
}
```

## Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**: Controllers, Services y Models están bien separados
2. **Validación Robusta**: Todas las entradas se validan antes de procesarse
3. **Seguridad**:
    - Contraseñas hasheadas con bcrypt (BCRYPT_ROUNDS=12)
    - JWT tokens con expiración de 24 horas
    - Middleware de autenticación en rutas protegidas
4. **RESTful**: Endpoints siguiendo convenciones REST
5. **Manejo de Errores**: Respuestas consistentes con códigos HTTP apropiados
6. **Relaciones**: Modelos con relaciones One-to-Many (User -> Tasks)
7. **Paginación**: Listados con paginación por defecto (10 registros por página)

## Testing Manual con cURL

### 1. Registrar Usuario

```bash
curl -X POST http://localhost:8000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### 2. Iniciar Sesión

```bash
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### 3. Crear Tarea (con token)

```bash
curl -X POST http://localhost:8000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token_aqui}" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "status": "pending"
  }'
```

### 4. Listar Tareas (con token)

```bash
curl -X GET http://localhost:8000/api/v1/tasks \
  -H "Authorization: Bearer {token_aqui}"
```

### 5. Actualizar Tarea (con token)

```bash
curl -X PUT http://localhost:8000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token_aqui}" \
  -d '{
    "status": "done"
  }'
```

### 6. Eliminar Tarea (con token)

```bash
curl -X DELETE http://localhost:8000/api/v1/tasks/1 \
  -H "Authorization: Bearer {token_aqui}"
```

## Iniciar el Servidor

```bash
php artisan serve
```

El servidor estará disponible en: `http://localhost:8000`
