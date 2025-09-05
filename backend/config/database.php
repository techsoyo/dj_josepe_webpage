<?php
// Configuración de la base de datos
$db_host = 'localhost';
$db_name = 'webpageJosepe';
$db_user = 'user';
$db_pass = 'resu';
$db_port = 3306;

// Conexión a la base de datos con mysqli
function db_connect() {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    
    $connection = mysqli_connect($db_host, $db_user, $db_pass, $db_name, $db_port);
    
    if (!$connection) {
        die("Error de conexión: " . mysqli_connect_error());
    }
    
    mysqli_set_charset($connection, "utf8mb4");
    
    return $connection;
}

// Ejecutar consulta y devolver resultados
function db_query($query, $params = []) {
    $connection = db_connect();
    
    // Preparar la consulta con parámetros
    if (!empty($params)) {
        $stmt = mysqli_prepare($connection, $query);
        
        if ($stmt) {
            // Determinar tipos de parámetros
            $types = '';
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i'; // integer
                } elseif (is_float($param)) {
                    $types .= 'd'; // double
                } elseif (is_string($param)) {
                    $types .= 's'; // string
                } else {
                    $types .= 'b'; // blob
                }
            }
            
            // Enlazar parámetros
            mysqli_stmt_bind_param($stmt, $types, ...$params);
            
            // Ejecutar consulta
            mysqli_stmt_execute($stmt);
            
            // Obtener resultados
            $result = mysqli_stmt_get_result($stmt);
            
            // Cerrar statement
            mysqli_stmt_close($stmt);
        } else {
            die("Error en la preparación de la consulta: " . mysqli_error($connection));
        }
    } else {
        // Consulta sin parámetros
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die("Error en la consulta: " . mysqli_error($connection));
        }
    }
    
    // Cerrar conexión
    mysqli_close($connection);
    
    return $result;
}

// Obtener todas las filas como array asociativo
function db_get_all($query, $params = []) {
    $result = db_query($query, $params);
    $rows = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    
    mysqli_free_result($result);
    
    return $rows;
}

// Obtener una sola fila como array asociativo
function db_get_one($query, $params = []) {
    $result = db_query($query, $params);
    $row = mysqli_fetch_assoc($result);
    mysqli_free_result($result);
    
    return $row;
}

// Insertar datos y devolver el ID insertado
function db_insert($query, $params = []) {
    $connection = db_connect();
    
    // Preparar la consulta con parámetros
    $stmt = mysqli_prepare($connection, $query);
    
    if ($stmt) {
        // Determinar tipos de parámetros
        $types = '';
        foreach ($params as $param) {
            if (is_int($param)) {
                $types .= 'i'; // integer
            } elseif (is_float($param)) {
                $types .= 'd'; // double
            } elseif (is_string($param)) {
                $types .= 's'; // string
            } else {
                $types .= 'b'; // blob
            }
        }
        
        // Enlazar parámetros
        mysqli_stmt_bind_param($stmt, $types, ...$params);
        
        // Ejecutar consulta
        mysqli_stmt_execute($stmt);
        
        // Obtener ID insertado
        $insert_id = mysqli_insert_id($connection);
        
        // Cerrar statement
        mysqli_stmt_close($stmt);
    } else {
        die("Error en la preparación de la consulta: " . mysqli_error($connection));
    }
    
    // Cerrar conexión
    mysqli_close($connection);
    
    return $insert_id;
}

// Actualizar o eliminar y devolver filas afectadas
function db_execute($query, $params = []) {
    $connection = db_connect();
    
    // Preparar la consulta con parámetros
    $stmt = mysqli_prepare($connection, $query);
    
    if ($stmt) {
        // Determinar tipos de parámetros
        $types = '';
        foreach ($params as $param) {
            if (is_int($param)) {
                $types .= 'i'; // integer
            } elseif (is_float($param)) {
                $types .= 'd'; // double
            } elseif (is_string($param)) {
                $types .= 's'; // string
            } else {
                $types .= 'b'; // blob
            }
        }
        
        // Enlazar parámetros
        mysqli_stmt_bind_param($stmt, $types, ...$params);
        
        // Ejecutar consulta
        mysqli_stmt_execute($stmt);
        
        // Obtener filas afectadas
        $affected_rows = mysqli_stmt_affected_rows($stmt);
        
        // Cerrar statement
        mysqli_stmt_close($stmt);
    } else {
        die("Error en la preparación de la consulta: " . mysqli_error($connection));
    }
    
    // Cerrar conexión
    mysqli_close($connection);
    
    return $affected_rows;
}
?>