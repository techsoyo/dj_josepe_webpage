<?php
require_once __DIR__ . '/../config/init.php';
require_once __DIR__ . '/../models/User.php';

// Generar un token JWT simple
function generateToken($user_id, $email, $role) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    
    $payload = base64_encode(json_encode([
        'user_id' => $user_id,
        'email' => $email,
        'role' => $role,
        'exp' => time() + JWT_EXPIRATION
    ]));
    
    $signature = base64_encode(
        hash_hmac('sha256', $header . '.' . $payload, JWT_SECRET, true)
    );
    
    return $header . '.' . $payload . '.' . $signature;
}

// Verificar token JWT
function verifyToken($token) {
    if (empty($token)) {
        return false;
    }
    
    $parts = explode('.', $token);
    
    if (count($parts) !== 3) {
        return false;
    }
    
    list($header, $payload, $signature) = $parts;
    
    $expected_signature = base64_encode(
        hash_hmac('sha256', $header . '.' . $payload, JWT_SECRET, true)
    );
    
    if ($signature !== $expected_signature) {
        return false;
    }
    
    $payload_data = json_decode(base64_decode($payload), true);
    
    // Verificar expiración
    if (isset($payload_data['exp']) && $payload_data['exp'] < time()) {
        return false;
    }
    
    return $payload_data;
}

// Login de usuario
function loginUser($email, $password) {
    $user = User::login($email, $password);
    
    if ($user) {
        // Guardar información en sesión
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_role'] = $user['role'];
        
        // Generar token JWT
        $_SESSION['token'] = generateToken($user['id'], $user['email'], $user['role']);
        
        return [
            'user' => $user,
            'token' => $_SESSION['token']
        ];
    }
    
    return false;
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
    // Verificar token en headers
    $headers = getallheaders();
    $token = null;
    
    if (isset($headers['Authorization'])) {
        $auth_header = $headers['Authorization'];
        if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
            $token = $matches[1];
        }
    }
    
    // Si no hay token en headers, verificar sesión
    if (!$token && isset($_SESSION['token'])) {
        $token = $_SESSION['token'];
    }
    
    if ($token) {
        $token_data = verifyToken($token);
        
        if ($token_data) {
            return $token_data;
        }
    }
    
    return false;
}

// Verificar si el usuario tiene un rol específico
function hasRole($role) {
    $auth_data = isAuthenticated();
    
    if (!$auth_data) {
        return false;
    }
    
    return $auth_data['role'] === $role;
}

// Cerrar sesión
function logout() {
    session_unset();
    session_destroy();
    return true;
}

// Middleware para proteger rutas
function requireAuth() {
    if (!isAuthenticated()) {
        sendResponse(401, ['error' => 'Acceso no autorizado']);
    }
}

// Middleware para requerir rol admin
function requireAdmin() {
    if (!hasRole('admin')) {
        sendResponse(403, ['error' => 'Acceso denegado. Se requiere rol de administrador']);
    }
}
?>