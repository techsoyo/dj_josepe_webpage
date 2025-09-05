<?php
require_once __DIR__ . '/../../config/init.php';
require_once __DIR__ . '/../../models/Set.php';
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
    $destacados = isset($_GET['destacados']) && $_GET['destacados'] === 'true';
    
    if ($id) {
        // Obtener un set específico
        $set = Set::find($id);
        
        if ($set) {
            // Incrementar reproducciones si no es admin
            if (!isAuthenticated()) {
                Set::incrementPlays($id);
            }
            
            sendResponse(200, ['set' => $set]);
        } else {
            sendResponse(404, ['error' => 'Set no encontrado']);
        }
    } else {
        // Obtener todos los sets
        $sets = Set::getAll($limit, $destacados);
        sendResponse(200, ['sets' => $sets]);
    }
}

function handlePost() {
    $data = getJsonInput();
    
    if (!$data) {
        sendResponse(400, ['error' => 'Datos inválidos']);
        return;
    }
    
    // Validar datos
    $errors = validateSet($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Crear set
    $id = Set::create($data);
    
    if ($id) {
        $set = Set::find($id);
        sendResponse(201, ['set' => $set, 'message' => 'Set creado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al crear el set']);
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
    
    // Verificar que el set existe
    $set = Set::find($id);
    
    if (!$set) {
        sendResponse(404, ['error' => 'Set no encontrado']);
        return;
    }
    
    // Validar datos
    $errors = validateSet($data);
    
    if (!empty($errors)) {
        sendResponse(400, ['errors' => $errors]);
        return;
    }
    
    // Actualizar set
    $result = Set::update($id, $data);
    
    if ($result !== false) {
        $updated_set = Set::find($id);
        sendResponse(200, ['set' => $updated_set, 'message' => 'Set actualizado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al actualizar el set']);
    }
}

function handleDelete() {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendResponse(400, ['error' => 'ID no proporcionado']);
        return;
    }
    
    // Verificar que el set existe
    $set = Set::find($id);
    
    if (!$set) {
        sendResponse(404, ['error' => 'Set no encontrado']);
        return;
    }
    
    // Eliminar set
    $result = Set::delete($id);
    
    if ($result !== false) {
        sendResponse(200, ['message' => 'Set eliminado exitosamente']);
    } else {
        sendResponse(500, ['error' => 'Error al eliminar el set']);
    }
}
?>