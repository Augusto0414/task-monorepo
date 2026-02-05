<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    private string $secretKey;
    private string $algorithm = 'HS256';

    public function __construct()
    {
        $this->secretKey = config('app.jwt_secret') ?? env('JWT_SECRET', 'secret-key-change-me');
    }

    public function register(array $data): array
    {
        if (User::where('email', $data['email'])->exists()) {
            return [
                'success' => false,
                'message' => 'El email ya está registrado',
                'errors' => ['email' => ['El email ya está registrado']],
            ];
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return [
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => $user,
        ];
    }


    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return [
                'success' => false,
                'message' => 'Credenciales inválidas',
            ];
        }

        $token = $this->generateToken($user);

        return [
            'success' => true,
            'message' => 'Autenticación exitosa',
            'token' => $token,
            'user' => $user,
        ];
    }

    public function generateToken(User $user): string
    {
        $issuedAt = time();
        $expire = $issuedAt + (24 * 60 * 60); 

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expire,
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
        ];

        return JWT::encode($payload, $this->secretKey, $this->algorithm);
    }


    public function validateToken(string $token): ?object
    {
        try {
            return JWT::decode($token, new Key($this->secretKey, $this->algorithm));
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Obtener usuario del token
     */
    public function getUserFromToken(string $token): ?User
    {
        $payload = $this->validateToken($token);

        if (!$payload) {
            return null;
        }

        return User::find($payload->sub);
    }
}
