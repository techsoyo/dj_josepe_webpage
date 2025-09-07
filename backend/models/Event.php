<?php
require_once __DIR__ . '/../config/database.php';

class Event {
    public static function getAll($limit = null) {
        $query = "SELECT e.*, s.titulo as set_titulo 
                 FROM eventos e 
                 LEFT JOIN sets_musicales s ON e.set_asociado = s.id 
                 ORDER BY e.fecha ASC";
        $params = [];
        
        if ($limit) {
            $query .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return db_get_all($query, $params);
    }
    
    public static function find($id) {
        $query = "SELECT e.*, s.titulo as set_titulo 
                 FROM eventos e 
                 LEFT JOIN sets_musicales s ON e.set_asociado = s.id 
                 WHERE e.id = ? LIMIT 1";
        
        return db_get_one($query, [$id]);
    }
    
    public static function create($data) {
        $query = "INSERT INTO eventos 
                 (fecha, lugar, tipo_evento, estado, descripcion, fotos, set_asociado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        return db_insert($query, [
            $data['fecha'],
            $data['lugar'] ?? null,
            $data['tipo_evento'] ?? null,
            $data['estado'] ?? 'disponible',
            $data['descripcion'] ?? null,
            $data['fotos'] ?? null,
            $data['set_asociado'] ?? null
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
        
        $query = "UPDATE eventos SET " . implode(", ", $fields) . " WHERE id = ?";
        
        return db_execute($query, $params);
    }
    
    public static function delete($id) {
        $query = "DELETE FROM eventos WHERE id = ?";
        
        return db_execute($query, [$id]);
    }
    
    public static function getByDateRange($start_date, $end_date) {
        $query = "SELECT e.*, s.titulo as set_titulo 
                 FROM eventos e 
                 LEFT JOIN sets_musicales s ON e.set_asociado = s.id 
                 WHERE e.fecha BETWEEN ? AND ? 
                 ORDER BY e.fecha ASC";
        
        return db_get_all($query, [$start_date, $end_date]);
    }
}
?>