<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    private function authHeaders(User $user): array
    {
        $token = app(AuthService::class)->generateToken($user);

        return [
            'Authorization' => "Bearer {$token}",
        ];
    }

    public function test_tasks_list_requires_authentication(): void
    {
        $this->getJson('/api/v1/tasks')
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_create_task_with_authentication(): void
    {
        $user = User::factory()->create();

        $payload = [
            'title' => 'Completar proyecto',
            'description' => 'Terminar implementación de API',
            'status' => 'pending',
        ];

        $response = $this->postJson('/api/v1/tasks', $payload, $this->authHeaders($user));

        $response
            ->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Tarea creada exitosamente',
            ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Completar proyecto',
            'user_id' => $user->id,
        ]);
    }

    public function test_update_task_with_authentication(): void
    {
        $user = User::factory()->create();
        $task = $user->tasks()->create([
            'title' => 'Tarea inicial',
            'description' => null,
            'status' => 'pending',
        ]);

        $payload = [
            'status' => 'done',
            'title' => 'Tarea completada',
        ];

        $response = $this->putJson(
            "/api/v1/tasks/{$task->id}",
            $payload,
            $this->authHeaders($user)
        );

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Tarea actualizada exitosamente',
            ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Tarea completada',
            'status' => 'done',
        ]);
    }

    public function test_delete_task_with_authentication(): void
    {
        $user = User::factory()->create();
        $task = $user->tasks()->create([
            'title' => 'Eliminar tarea',
            'description' => 'Se eliminará',
            'status' => 'pending',
        ]);

        $response = $this->deleteJson(
            "/api/v1/tasks/{$task->id}",
            [],
            $this->authHeaders($user)
        );

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Tarea eliminada exitosamente',
            ]);

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);
    }
}
