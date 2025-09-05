<?php
// Configuración general del sistema
define('BASE_URL', 'http://localhost:8000');
define('API_URL', BASE_URL . '/api');
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 20 * 1024 * 1024); // 20MB

// Configuración de JWT
define('JWT_SECRET', 'dj-josepe-secret-key-2024'); // Cambiar en producción
define('JWT_EXPIRATION', 24 * 60 * 60); // 24 horas

// Configuración de CORS
define('CORS_ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
]);

// Configuración de email (para notificaciones)
define('EMAIL_FROM', 'contacto@djjosepe.com');
define('EMAIL_ADMIN', 'admin@djjosepe.com');

// Configuración de timezone
date_default_timezone_set('Europe/Madrid');

// Configuración de errores
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
?>