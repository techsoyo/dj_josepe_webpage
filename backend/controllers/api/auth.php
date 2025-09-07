<?php
require_once __DIR__ . '/../../config/init.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/validation.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        handleLogin();
        break;
    case 'DELETE':
        handleLogout();
        break;
    case 'GET':
        handleVerifyToken();
        break;
    default:
        sendResponse(405, ['error' => 'Método no permitido']);
}

function handleLogin() {
    $data = getJsonInput();
    
    if (!$data) {
        sendResponse(400, ['error' => 'Datos inválidos']);
        return;
    }
    
    // Validar datos
    $errors = validateLogin($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Intentar login
    $result = loginUser($data['email'], $data['password']);
    
    if ($result) {
        sendResponse(200, [
            'message' => 'Login exitoso',
            'user' => $result['user'],
            'token' => $result['token']
        ]);
    } else {
        sendResponse(401, ['error' => 'Credenciales inválidas']);
    }
}

function handleLogout() {
    logout();
    sendResponse(200, ['message' => 'Logout exitoso']);
}

function handleVerifyToken() {
    $auth_data = isAuthenticated();
    
    if ($auth_data) {
        sendResponse(200, [
            'authenticated' => true,
            'user' => [
                'id' => $auth_data['user_id'],
                'email' => $auth_data['email'],
                'role' => $auth_data['role']
            ]
        ]);
    } else {
        sendResponse(401, ['authenticated' => false]);
    }
}
?>