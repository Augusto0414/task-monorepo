# Construccion y pruebas con Docker

Este documento explica como construir los contenedores y ejecutar pruebas dentro del contenedor del backend.

## Repositorios originales sin Websockets

- https://github.com/Augusto0414/task-api
- https://github.com/Augusto0414/task-web

## Lo mas importante

- El `docker-compose.yml` raiz construye todos los servicios juntos: `api`, `reverb`, `postgres`, `web`.
- El contenedor del backend (`api`) corre Laravel y expone el puerto 8000.
- WebSockets se sirven desde `reverb` en el puerto 8081.
- El frontend (`web`) es un build estatico servido por Nginx en el puerto 3000.

## Construir y levantar

Desde la raiz del repositorio:

```
docker compose up --build -d
```

Para detener y borrar contenedores:

```
docker compose down
```

## Ejecutar tests del backend dentro del contenedor

Todas las pruebas del backend deben ejecutarse dentro del contenedor `api` para usar las mismas extensiones y entorno.

Opcion A (runner de Laravel):

```
docker compose exec api php artisan test
```

Opcion B (PHPUnit directo):

```
docker compose exec api ./vendor/bin/phpunit
```

Si quieres ejecutar una clase especifica:

```
docker compose exec api php artisan test --filter=TaskTest
```

## Verificacion rapida

- API: http://localhost:8000
- Web: http://localhost:3000
- Reverb WS: ws://localhost:8081
