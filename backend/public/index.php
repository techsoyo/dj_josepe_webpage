<?php
require_once __DIR__ . '/../config/init.php';

// Router simple para las APIs
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remover el prefijo del directorio si existe
$path = str_replace('/backend/public', '', $path);

// Enrutar las peticiones
switch ($path) {
    case '/api/auth':
        require_once __DIR__ . '/../controllers/api/auth.php';
        break;
    
    case '/api/sets':
        require_once __DIR__ . '/../controllers/api/sets.php';
        break;
    
    case '/api/events':
        require_once __DIR__ . '/../controllers/api/events.php';
        break;
    
    case '/api/requests':
        require_once __DIR__ . '/../controllers/api/requests.php';
        break;
    
    case '/':
    case '/api':
        sendResponse(200, [
            'message' => 'DJ Josepe Backend API',
            'version' => '1.0.0',
            'endpoints' => [
                '/api/auth' => 'Autenticación',
                '/api/sets' => 'Sets musicales',
                '/api/events' => 'Eventos',
                '/api/requests' => 'Solicitudes de contratación'
            ]
        ]);
        break;
    
    default:
        sendResponse(404, ['error' => 'Endpoint no encontrado']);
        break;
}
?>