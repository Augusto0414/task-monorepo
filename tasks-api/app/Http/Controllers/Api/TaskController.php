<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService)
    {
    }

    /**
     * Obtener todas las tareas del usuario autenticado
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $status = $request->query('status');

        if ($status && !in_array($status, ['pending', 'in_progress', 'done'])) {
            return response()->json([
                'success' => false,
                'message' => 'El status debe ser: pending, in_progress o done',
            ], 422);
        }

        $tasks = $this->taskService->getUserTasks($user, $status);

        return response()->json([
            'success' => true,
            'message' => 'Tareas obtenidas exitosamente',
            'data' => $tasks->items(),
            'pagination' => [
                'current_page' => $tasks->currentPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),
                'last_page' => $tasks->lastPage(),
            ],
        ], 200);
    }

    /**
     * Crear una nueva tarea
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_progress,done',
            'assignee_id' => 'nullable|exists:users,id',
        ]);

        $user = $request->user();
        $result = $this->taskService->createTask($user, $validated);

        return response()->json([
            'success' => true,
            'message' => $result['message'],
            'task' => $result['task'],
        ], 201);
    }

    /**
     * Obtener una tarea específica
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $task = $this->taskService->getTask($id, $user);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Tarea no encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Tarea obtenida exitosamente',
            'task' => $task,
        ], 200);
    }

    /**
     * Actualizar una tarea existente
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_progress,done',
            'assignee_id' => 'nullable|exists:users,id',
        ]);

        $user = $request->user();
        $result = $this->taskService->updateTask($id, $user, $validated);

        if (!$result['success']) {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => $result['message'],
            'task' => $result['task'],
        ], 200);
    }

    /**
     * Eliminar una tarea
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $result = $this->taskService->deleteTask($id, $user);

        if (!$result['success']) {
            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => $result['message'],
        ], 200);
    }
}
