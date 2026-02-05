<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'juan@example.com'],
            [
                'name' => 'Juan Pérez',
                'password' => Hash::make('password123'),
            ]
        );

        $user2 = User::firstOrCreate(
            ['email' => 'maria@example.com'],
            [
                'name' => 'María García',
                'password' => Hash::make('password456'),
            ]
        );

        Task::create([
            'user_id' => $user->id,
            'title' => 'Completar proyecto',
            'description' => 'Terminar la implementación de la API REST',
            'status' => 'in_progress',
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Escribir documentación',
            'description' => 'Documentar todos los endpoints de la API',
            'status' => 'pending',
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Hacer testing',
            'description' => 'Realizar pruebas unitarias e integración',
            'status' => 'done',
        ]);

        Task::create([
            'user_id' => $user2->id,
            'title' => 'Revisar código',
            'description' => 'Revisar pull requests pendientes',
            'status' => 'pending',
        ]);

        Task::create([
            'user_id' => $user2->id,
            'title' => 'Actualizar dependencias',
            'description' => 'Actualizar paquetes de composer',
            'status' => 'in_progress',
        ]);
    }
}
