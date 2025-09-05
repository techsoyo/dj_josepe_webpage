<?php
// Archivo de inicialización principal
require_once __DIR__ . '/constants.php';
require_once __DIR__ . '/database.php';

// Configurar CORS para el frontend
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, CORS_ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    
    // Manejar preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

// Función para enviar respuestas JSON
function sendResponse($status_code, $data) {
    setCorsHeaders();
    http_response_code($status_code);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Función para obtener datos JSON del request
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

// Inicializar sesión
session_start();

// Configurar CORS automáticamente
setCorsHeaders();
?>