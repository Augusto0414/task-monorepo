#!/usr/bin/env pwsh

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBA DE ENDPOINTS API DE TAREAS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:8000/api/v1"
$token = $null
$email = "juan@example.com"
$password = "password123"
$jsonHeaders = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

# 0. Registro (opcional si ya existe)
Write-Host "0. TESTING REGISTER" -ForegroundColor Yellow
Write-Host "POST $baseUrl/register" -ForegroundColor Gray

try {
    $registerBody = @{
        name = "Juan Pérez"
        email = $email
        password = $password
        password_confirmation = $password
    } | ConvertTo-Json

    Invoke-RestMethod -Uri "$baseUrl/register" `
      -Method POST `
            -Headers $jsonHeaders `
      -Body $registerBody `
      -ErrorAction Stop

    Write-Host "Registro exitoso" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Registro omitido (posible usuario existente)" -ForegroundColor DarkYellow
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        if ($body) {
            Write-Host $body -ForegroundColor DarkYellow
        }
    }
    Write-Host ""
}

# 1. Login
Write-Host "1. TESTING LOGIN" -ForegroundColor Yellow
Write-Host "POST $baseUrl/login" -ForegroundColor Gray

try {
    $loginBody = @{
        email = $email
        password = $password
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/login" `
      -Method POST `
            -Headers $jsonHeaders `
      -Body $loginBody

    Write-Host "Login exitoso" -ForegroundColor Green
    Write-Host "Usuario: $($response.user.name)" -ForegroundColor Green
    Write-Host "Email: $($response.user.email)" -ForegroundColor Green
    Write-Host "Token: $($response.token.Substring(0, 50))..." -ForegroundColor Green
    $token = $response.token
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        if ($body) {
            Write-Host $body -ForegroundColor Red
        }
    }
    Write-Host ""
    exit 1
}

# 2. Listar tareas
Write-Host "2. TESTING GET /tasks" -ForegroundColor Yellow
Write-Host "GET $baseUrl/tasks" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/tasks" `
      -Method GET `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"}

    Write-Host "Tareas obtenidas exitosamente" -ForegroundColor Green
    Write-Host "Total de tareas: $($response.data.Count)" -ForegroundColor Green
    
    Write-Host "Tareas del usuario:" -ForegroundColor Cyan
    foreach ($task in $response.data) {
        Write-Host "  - [$($task.status)] $($task.title)" -ForegroundColor Gray
    }
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# 3. Crear tarea
Write-Host "3. TESTING POST /tasks (CREATE)" -ForegroundColor Yellow
Write-Host "POST $baseUrl/tasks" -ForegroundColor Gray

try {
    $createBody = @{
        title = "Nueva tarea de prueba"
        description = "Tarea creada por script de testing"
        status = "pending"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/tasks" `
      -Method POST `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"} `
      -Body $createBody

    Write-Host "Tarea creada exitosamente" -ForegroundColor Green
    Write-Host "ID: $($response.task.id)" -ForegroundColor Green
    Write-Host "Titulo: $($response.task.title)" -ForegroundColor Green
    $newTaskId = $response.task.id
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    exit
}

# 4. Obtener tarea específica
Write-Host "4. TESTING GET /tasks/{id}" -ForegroundColor Yellow
Write-Host "GET $baseUrl/tasks/$newTaskId" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/tasks/$newTaskId" `
      -Method GET `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"}

    Write-Host "Tarea obtenida exitosamente" -ForegroundColor Green
    Write-Host "ID: $($response.task.id)" -ForegroundColor Green
    Write-Host "Titulo: $($response.task.title)" -ForegroundColor Green
    Write-Host "Status: $($response.task.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# 5. Actualizar tarea
Write-Host "5. TESTING PUT /tasks/{id} (UPDATE)" -ForegroundColor Yellow
Write-Host "PUT $baseUrl/tasks/$newTaskId" -ForegroundColor Gray

try {
    $updateBody = @{
        status = "in_progress"
        description = "Actualizado por script de testing"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/tasks/$newTaskId" `
      -Method PUT `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"} `
      -Body $updateBody

    Write-Host "Tarea actualizada exitosamente" -ForegroundColor Green
    Write-Host "Nuevo status: $($response.task.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# 6. Listar tareas filtradas
Write-Host "6. TESTING GET /tasks?status=pending" -ForegroundColor Yellow
Write-Host "GET $baseUrl/tasks?status=pending" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/tasks?status=pending" `
      -Method GET `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"}

    Write-Host "Tareas filtradas exitosamente" -ForegroundColor Green
    Write-Host "Tareas con status 'pending': $($response.data.Count)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# 7. Eliminar tarea
Write-Host "7. TESTING DELETE /tasks/{id}" -ForegroundColor Yellow
Write-Host "DELETE $baseUrl/tasks/$newTaskId" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/tasks/$newTaskId" `
      -Method DELETE `
            -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"; "Accept"="application/json"}

    Write-Host "Tarea eliminada exitosamente" -ForegroundColor Green
    Write-Host "Mensaje: $($response.message)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
