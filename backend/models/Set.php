<?php
require_once __DIR__ . '/../config/database.php';

class Set {
    public static function getAll($limit = null, $destacados = false) {
        $query = "SELECT * FROM sets_musicales";
        $params = [];
        
        if ($destacados) {
            $query .= " WHERE destacado = 1";
        }
        
        $query .= " ORDER BY fecha_publicacion DESC";
        
        if ($limit) {
            $query .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return db_get_all($query, $params);
    }
    
    public static function find($id) {
        $query = "SELECT * FROM sets_musicales WHERE id = ? LIMIT 1";
        
        return db_get_one($query, [$id]);
    }
    
    public static function create($data) {
        $query = "INSERT INTO sets_musicales 
                 (titulo, fecha_publicacion, url_soundcloud, genero, 
                  duracion, destacado) 
                 VALUES (?, ?, ?, ?, ?, ?)";
        
        return db_insert($query, [
            $data['titulo'],
            $data['fecha_publicacion'] ?? null,
            $data['url_soundcloud'],
            $data['genero'] ?? null,
            $data['duracion'] ?? null,
            isset($data['destacado']) ? $data['destacado'] : 0
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
        
        $query = "UPDATE sets_musicales SET " . implode(", ", $fields) . " WHERE id = ?";
        
        return db_execute($query, $params);
    }
    
    public static function delete($id) {
        $query = "DELETE FROM sets_musicales WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
    
    public static function incrementPlays($id) {
        $query = "UPDATE sets_musicales SET reproducciones = reproducciones + 1 WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
}
?>