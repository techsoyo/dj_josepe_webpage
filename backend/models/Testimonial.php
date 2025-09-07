<?php
require_once __DIR__ . '/../config/database.php';

class Testimonial {
    public static function getAll($limit = null, $approved_only = true) {
        $query = "SELECT * FROM testimonios";
        $params = [];
        
        if ($approved_only) {
            $query .= " WHERE aprobado = 1";
        }
        
        $query .= " ORDER BY fecha DESC";
        
        if ($limit) {
            $query .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return db_get_all($query, $params);
    }
    
    public static function find($id) {
        $query = "SELECT * FROM testimonios WHERE id = ? LIMIT 1";
        
        return db_get_one($query, [$id]);
    }
    
    public static function create($data) {
        $query = "INSERT INTO testimonios 
                 (autor, evento_referencia, texto, fecha, aprobado, email_contacto) 
                 VALUES (?, ?, ?, ?, ?, ?)";
        
        return db_insert($query, [
            $data['autor'],
            $data['evento_referencia'] ?? null,
            $data['texto'],
            $data['fecha'] ?? date('Y-m-d'),
            $data['aprobado'] ?? 0,
            $data['email_contacto'] ?? null
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
        
        $query = "UPDATE testimonios SET " . implode(", ", $fields) . " WHERE id = ?";
        
        return db_execute($query, $params);
    }
    
    public static function delete($id) {
        $query = "DELETE FROM testimonios WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
    
    public static function approve($id) {
        $query = "UPDATE testimonios SET aprobado = 1 WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
}
?>