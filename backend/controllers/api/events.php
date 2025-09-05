<?php
require_once __DIR__ . '/../../config/init.php';
require_once __DIR__ . '/../../models/Event.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/validation.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'POST':
        requireAdmin();
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
    $start_date = $_GET['start_date'] ?? null;
    $end_date = $_GET['end_date'] ?? null;
    
    if ($id) {
        // Obtener un evento específico
        $event = Event::find($id);
        
        if ($event) {
            sendResponse(200, ['event' => $event]);
        } else {
            sendResponse(404, ['error' => 'Evento no encontrado']);
        }
    } elseif ($start_date && $end_date) {
        // Obtener eventos por rango de fechas
        $events = Event::getByDateRange($start_date, $end_date);
        sendResponse(200, ['events' => $events]);
    } else {
        // Obtener todos los eventos
        $events = Event::getAll($limit);
        sendResponse(200, ['events' => $events]);
    }
}

function handlePost() {
    $data = getJsonInput();
    
    if (!$data) {
        sendResponse(400, ['error' => 'Datos inválidos']);
        return;
    }
    
    // Validar datos
    $errors = validateEvent($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Crear evento
    $id = Event::create($data);
    
    if ($id) {
        $event = Event::find($id);
        sendResponse(201, ['event' => $event, 'message' => 'Evento creado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al crear el evento']);
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
    
    // Verificar que el evento existe
    $event = Event::find($id);
    
    if (!$event) {
        sendResponse(404, ['error' => 'Evento no encontrado']);
        return;
    }
    
    // Validar datos
    $errors = validateEvent($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Actualizar evento
    $result = Event::update($id, $data);
    
    if ($result !== false) {
        $updated_event = Event::find($id);
        sendResponse(200, ['event' => $updated_event, 'message' => 'Evento actualizado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al actualizar el evento']);
    }
}

function handleDelete() {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendResponse(400, ['error' => 'ID no proporcionado']);
        return;
    }
    
    // Verificar que el evento existe
    $event = Event::find($id);
    
    if (!$event) {
        sendResponse(404, ['error' => 'Evento no encontrado']);
        return;
    }
    
    // Eliminar evento
    $result = Event::delete($id);
    
    if ($result !== false) {
        sendResponse(200, ['message' => 'Evento eliminado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al eliminar el evento']);
    }
}
?>