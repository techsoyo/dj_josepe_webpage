<?php
require_once __DIR__ . '/../config/database.php';

class User {
    public static function login($email, $password) {
        // Hashear la contraseña para comparar
        $password_hash = hash('sha256', $password);
        
        $query = "SELECT id, email, role FROM users 
                 WHERE email = ? AND password = ? AND active = 1 
                 LIMIT 1";
        
        $user = db_get_one($query, [$email, $password_hash]);
        
        if ($user) {
            // Actualizar último login
            $update_query = "UPDATE users SET last_login = NOW() WHERE id = ?";
            db_execute($update_query, [$user['id']]);
            
            return $user;
        }
        
        return false;
    }
    
    public static function find($id) {
        $query = "SELECT id, email, role, active, created_at, last_login 
                 FROM users WHERE id = ? LIMIT 1";
        
        return db_get_one($query, [$id]);
    }
    
    public static function findByEmail($email) {
        $query = "SELECT id, email, role, active, created_at, last_login 
                 FROM users WHERE email = ? LIMIT 1";
        
        return db_get_one($query, [$email]);
    }
    
    public static function create($email, $password, $role = 'admin') {
        $password_hash = hash('sha256', $password);
        
        $query = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
        
        return db_insert($query, [$email, $password_hash, $role]);
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
        
        $query = "UPDATE users SET " . implode(", ", $fields) . " WHERE id = ?";
        
        return db_execute($query, $params);
    }
    
    public static function changePassword($id, $password) {
        $password_hash = hash('sha256', $password);
        
        $query = "UPDATE users SET password = ? WHERE id = ?";
        
        return db_execute($query, [$password_hash, $id]);
    }
}
?>