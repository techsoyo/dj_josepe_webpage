<?php
require_once __DIR__ . '/../config/database.php';

class Request {
    public static function getAll($limit = null) {
        $query = "SELECT * FROM solicitudes_contratacion ORDER BY fecha_solicitud DESC";
        $params = [];
        
        if ($limit) {
            $query .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return db_get_all($query, $params);
    }
    
    public static function find($id) {
        $query = "SELECT * FROM solicitudes_contratacion WHERE id = ? LIMIT 1";
        
        return db_get_one($query, [$id]);
    }
    
    public static function create($data) {
        $query = "INSERT INTO solicitudes_contratacion 
                 (nombre_contacto, email, telefono, tipo_evento, fecha_solicitada, 
                  presupuesto, mensaje, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        return db_insert($query, [
            $data['nombre_contacto'],
            $data['email'],
            $data['telefono'] ?? null,
            $data['tipo_evento'] ?? null,
            $data['fecha_solicitada'] ?? null,
            $data['presupuesto'] ?? null,
            $data['mensaje'] ?? null,
            $data['estado'] ?? 'pendiente'
        ]);
    }
    
    public static function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id') {
                $fields[] = "$key = ?";
                $params[] = $value;
            }
        }
        
        // Añadir ID al final para WHERE
        $params[] = $id;
        
        $query = "UPDATE solicitudes_contratacion SET " . implode(", ", $fields) . " WHERE id = ?";
        
        return db_execute($query, $params);
    }
    
    public static function delete($id) {
        $query = "DELETE FROM solicitudes_contratacion WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
    
    public static function getByStatus($status) {
        $query = "SELECT * FROM solicitudes_contratacion WHERE estado = ? ORDER BY fecha_solicitud DESC";
        
        return db_get_all($query, [$status]);
    }
}
?>