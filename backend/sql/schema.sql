-- Crear base de datos
CREATE DATABASE IF NOT EXISTS webpageJosepe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webpageJosepe;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de sets musicales
CREATE TABLE IF NOT EXISTS sets_musicales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  fecha_publicacion DATE,
  url_soundcloud VARCHAR(500),
  genero VARCHAR(100),
  duracion INT,
  reproducciones INT DEFAULT 0,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  lugar VARCHAR(255),
  tipo_evento VARCHAR(100),
  estado VARCHAR(50) DEFAULT 'disponible',
  descripcion TEXT,
  fotos TEXT,
  set_asociado INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (set_asociado) REFERENCES sets_musicales(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabla de testimonios
CREATE TABLE IF NOT EXISTS testimonios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  autor VARCHAR(255) NOT NULL,
  evento_referencia VARCHAR(255),
  texto TEXT NOT NULL,
  fecha DATE,
  aprobado BOOLEAN DEFAULT false,
  email_contacto VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de solicitudes de contratación
CREATE TABLE IF NOT EXISTS solicitudes_contratacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_contacto VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  tipo_evento VARCHAR(100),
  fecha_solicitada DATE,
  presupuesto VARCHAR(100),
  mensaje TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de configuración del sitio
CREATE TABLE IF NOT EXISTS site_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insertar datos de ejemplo para configuración
INSERT INTO site_config (config_key, config_value) VALUES
('site_title', 'DJ Josepe - Sitio Oficial'),
('contact_email', 'contacto@djjosepe.com'),
('social_links', '{"facebook": "https://facebook.com/djjosepe", "instagram": "https://instagram.com/djjosepe", "soundcloud": "https://soundcloud.com/djjosepe"}');

-- Crear usuario admin por defecto
INSERT INTO users (email, password, role) VALUES
('admin@djjosepe.com', SHA2('admin123', 256), 'admin');