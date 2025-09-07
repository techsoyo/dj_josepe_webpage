<?php
require_once __DIR__ . '/../../config/init.php';
require_once __DIR__ . '/../../models/Request.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/validation.php';
require_once __DIR__ . '/../../includes/functions.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        requireAdmin();
        handleGet();
        break;
    case 'POST':
        handlePost();
        break;
    case 'PUT':
        requireAdmin();
        handlePut();
        break;
    case 'DELETE':
        requireAdmin();
        handleDelete();
        break;
    default:
        sendResponse(405, ['error' => 'Método no permitido']);
}

function handleGet() {
    // Obtener parámetros
    $id = $_GET['id'] ?? null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
    $status = $_GET['status'] ?? null;
    
    if ($id) {
        // Obtener una solicitud específica
        $request = Request::find($id);
        
        if ($request) {
            sendResponse(200, ['request' => $request]);
        } else {
            sendResponse(404, ['error' => 'Solicitud no encontrada']);
        }
    } elseif ($status) {
        // Obtener solicitudes por estado
        $requests = Request::getByStatus($status);
        sendResponse(200, ['requests' => $requests]);
    } else {
        // Obtener todas las solicitudes
        $requests = Request::getAll($limit);
        sendResponse(200, ['requests' => $requests]);
    }
}

function handlePost() {
    $data = getJsonInput();
    
    if (!$data) {
        sendResponse(400, ['error' => 'Datos inválidos']);
        return;
    }
    
    // Rate limiting para formulario público
    $client_ip = getClientIP();
    if (!rateLimitCheck($client_ip, 5, 3600)) { // 5 solicitudes por hora
        sendResponse(429, ['error' => 'Demasiadas solicitudes. Inténtalo más tarde.']);
        return;
    }
    
    // Validar datos
    $errors = validateContactRequest($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Sanitizar datos
    $data['nombre_contacto'] = sanitizeString($data['nombre_contacto']);
    $data['email'] = sanitizeEmail($data['email']);
    if (isset($data['mensaje'])) {
        $data['mensaje'] = sanitizeString($data['mensaje']);
    }
    
    // Crear solicitud
    $id = Request::create($data);
    
    if ($id) {
        // Enviar email de notificación al admin
        $email_subject = 'Nueva solicitud de contratación - DJ Josepe';
        $email_message = "
            <h2>Nueva solicitud de contratación</h2>
            <p><strong>Nombre:</strong> {$data['nombre_contacto']}</p>
            <p><strong>Email:</strong> {$data['email']}</p>
            <p><strong>Teléfono:</strong> " . ($data['telefono'] ?? 'No proporcionado') . "</p>
            <p><strong>Tipo de evento:</strong> " . ($data['tipo_evento'] ?? 'No especificado') . "</p>
            <p><strong>Fecha solicitada:</strong> " . ($data['fecha_solicitada'] ?? 'No especificada') . "</p>
            <p><strong>Presupuesto:</strong> " . ($data['presupuesto'] ?? 'No especificado') . "</p>
            <p><strong>Mensaje:</strong></p>
            <p>" . ($data['mensaje'] ?? 'Sin mensaje') . "</p>
        ";
        
        sendEmail(EMAIL_ADMIN, $email_subject, $email_message);
        
        sendResponse(201, ['message' => 'Solicitud enviada exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al crear la solicitud']);
    }
}

function handlePut() {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendResponse(400, ['error' => 'ID no proporcionado']);
        return;
    }
    
    $data = getJsonInput();
    
    if (!$data) {
        sendResponse(400, ['error' => 'Datos inválidos']);
        return;
    }
    
    // Verificar que la solicitud existe
    $request = Request::find($id);
    
    if (!$request) {
        sendResponse(404, ['error' => 'Solicitud no encontrada']);
        return;
    }
    
    // Actualizar solicitud
    $result = Request::update($id, $data);
    
    if ($result !== false) {
        $updated_request = Request::find($id);
        sendResponse(200, ['request' => $updated_request, 'message' => 'Solicitud actualizada exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al actualizar la solicitud']);
    }
}

function handleDelete() {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendResponse(400, ['error' => 'ID no proporcionado']);
        return;
    }
    
    // Verificar que la solicitud existe
    $request = Request::find($id);
    
    if (!$request) {
        sendResponse(404, ['error' => 'Solicitud no encontrada']);
        return;
    }
    
    // Eliminar solicitud
    $result = Request::delete($id);
    
    if ($result !== false) {
        sendResponse(200, ['message' => 'Solicitud eliminada exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al eliminar la solicitud']);
    }
}
?>