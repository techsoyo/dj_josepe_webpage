<?php
// Funciones de validación

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validateRequired($value) {
    return !empty(trim($value));
}

function validateMinLength($value, $min_length) {
    return strlen(trim($value)) >= $min_length;
}

function validateMaxLength($value, $max_length) {
    return strlen(trim($value)) <= $max_length;
}

function validateDate($date, $format = 'Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}

function validateUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL) !== false;
}

function sanitizeString($string) {
    return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
}

function sanitizeEmail($email) {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

// Validación específica para solicitudes de contratación
function validateContactRequest($data) {
    $errors = [];
    
    if (!validateRequired($data['nombre_contacto'] ?? '')) {
        $errors['nombre_contacto'] = 'El nombre es obligatorio';
    }
    
    if (!validateRequired($data['email'] ?? '')) {
        $errors['email'] = 'El email es obligatorio';
    } elseif (!validateEmail($data['email'])) {
        $errors['email'] = 'El email no es válido';
    }
    
    if (isset($data['telefono']) && !empty($data['telefono'])) {
        if (!validateMaxLength($data['telefono'], 20)) {
            $errors['telefono'] = 'El teléfono no puede tener más de 20 caracteres';
        }
    }
    
    if (isset($data['fecha_solicitada']) && !empty($data['fecha_solicitada'])) {
        if (!validateDate($data['fecha_solicitada'])) {
            $errors['fecha_solicitada'] = 'La fecha no es válida';
        }
    }
    
    return $errors;
}

// Validación para sets musicales
function validateSet($data) {
    $errors = [];
    
    if (!validateRequired($data['titulo'] ?? '')) {
        $errors['titulo'] = 'El título es obligatorio';
    }
    
    if (!validateRequired($data['url_soundcloud'] ?? '')) {
        $errors['url_soundcloud'] = 'La URL de SoundCloud es obligatoria';
    } elseif (!validateUrl($data['url_soundcloud'])) {
        $errors['url_soundcloud'] = 'La URL de SoundCloud no es válida';
    }
    
    if (isset($data['fecha_publicacion']) && !empty($data['fecha_publicacion'])) {
        if (!validateDate($data['fecha_publicacion'])) {
            $errors['fecha_publicacion'] = 'La fecha de publicación no es válida';
        }
    }
    
    if (isset($data['duracion']) && !empty($data['duracion'])) {
        if (!is_numeric($data['duracion']) || $data['duracion'] < 0) {
            $errors['duracion'] = 'La duración debe ser un número positivo';
        }
    }
    
    return $errors;
}

// Validación para eventos
function validateEvent($data) {
    $errors = [];
    
    if (!validateRequired($data['fecha'] ?? '')) {
        $errors['fecha'] = 'La fecha es obligatoria';
    } elseif (!validateDate($data['fecha'])) {
        $errors['fecha'] = 'La fecha no es válida';
    }
    
    if (isset($data['estado']) && !empty($data['estado'])) {
        $valid_states = ['disponible', 'reservado', 'tentativo'];
        if (!in_array($data['estado'], $valid_states)) {
            $errors['estado'] = 'El estado no es válido';
        }
    }
    
    return $errors;
}

// Validación para login
function validateLogin($data) {
    $errors = [];
    
    if (!validateRequired($data['email'] ?? '')) {
        $errors['email'] = 'El email es obligatorio';
    } elseif (!validateEmail($data['email'])) {
        $errors['email'] = 'El email no es válido';
    }
    
    if (!validateRequired($data['password'] ?? '')) {
        $errors['password'] = 'La contraseña es obligatoria';
    }
    
    return $errors;
}
?>