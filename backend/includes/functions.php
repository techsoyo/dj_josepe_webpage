<?php
// Funciones auxiliares generales

function formatDate($date, $format = 'd/m/Y') {
    if (empty($date)) {
        return '';
    }
    
    $datetime = DateTime::createFromFormat('Y-m-d', $date);
    if (!$datetime) {
        $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    }
    
    return $datetime ? $datetime->format($format) : '';
}

function formatDateTime($datetime, $format = 'd/m/Y H:i') {
    if (empty($datetime)) {
        return '';
    }
    
    $dt = DateTime::createFromFormat('Y-m-d H:i:s', $datetime);
    return $dt ? $dt->format($format) : '';
}

function generateSlug($string) {
    $string = strtolower($string);
    $string = preg_replace('/[^a-z0-9\s-]/', '', $string);
    $string = preg_replace('/[\s-]+/', '-', $string);
    return trim($string, '-');
}

function truncateText($text, $length = 100, $suffix = '...') {
    if (strlen($text) <= $length) {
        return $text;
    }
    
    return substr($text, 0, $length) . $suffix;
}

function uploadFile($file, $allowed_types = ['jpg', 'jpeg', 'png', 'gif'], $max_size = null) {
    if (!$max_size) {
        $max_size = MAX_FILE_SIZE;
    }
    
    // Verificar errores de upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'error' => 'Error al subir el archivo'];
    }
    
    // Verificar tamaño
    if ($file['size'] > $max_size) {
        return ['success' => false, 'error' => 'El archivo es demasiado grande'];
    }
    
    // Verificar tipo
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed_types)) {
        return ['success' => false, 'error' => 'Tipo de archivo no permitido'];
    }
    
    // Generar nombre único
    $filename = uniqid() . '.' . $extension;
    $upload_path = UPLOAD_PATH . 'images/' . $filename;
    
    // Mover archivo
    if (move_uploaded_file($file['tmp_name'], $upload_path)) {
        return ['success' => true, 'filename' => $filename];
    } else {
        return ['success' => false, 'error' => 'Error al guardar el archivo'];
    }
}

function deleteFile($filename, $subfolder = 'images') {
    $file_path = UPLOAD_PATH . $subfolder . '/' . $filename;
    
    if (file_exists($file_path)) {
        return unlink($file_path);
    }
    
    return false;
}

function logError($message, $context = []) {
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => $message,
        'context' => $context
    ];
    
    error_log(json_encode($log_entry));
}

function sendEmail($to, $subject, $message, $headers = []) {
    $default_headers = [
        'From' => EMAIL_FROM,
        'Reply-To' => EMAIL_FROM,
        'Content-Type' => 'text/html; charset=UTF-8'
    ];
    
    $headers = array_merge($default_headers, $headers);
    $header_string = '';
    
    foreach ($headers as $key => $value) {
        $header_string .= "$key: $value\r\n";
    }
    
    return mail($to, $subject, $message, $header_string);
}

function getClientIP() {
    $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    
    foreach ($ip_keys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                
                if (filter_var($ip, FILTER_VALIDATE_IP, 
                    FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function rateLimitCheck($identifier, $max_requests = 10, $time_window = 3600) {
    // Implementación básica de rate limiting usando archivos
    $rate_limit_file = sys_get_temp_dir() . '/rate_limit_' . md5($identifier);
    
    $requests = [];
    if (file_exists($rate_limit_file)) {
        $requests = json_decode(file_get_contents($rate_limit_file), true) ?: [];
    }
    
    $now = time();
    $requests = array_filter($requests, function($timestamp) use ($now, $time_window) {
        return ($now - $timestamp) < $time_window;
    });
    
    if (count($requests) >= $max_requests) {
        return false;
    }
    
    $requests[] = $now;
    file_put_contents($rate_limit_file, json_encode($requests));
    
    return true;
}
?>