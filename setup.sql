-- Crear la base de datos principal
CREATE DATABASE facturacion_autonomos;

-- Crear la base de datos secundaria (shadow) para Prisma
CREATE DATABASE shadow_db;

-- Crear el usuario y otorgar permisos
CREATE ROLE usuario WITH LOGIN PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE facturacion_autonomos TO usuario;
GRANT ALL PRIVILEGES ON DATABASE shadow_db TO usuario;

-- Crear rol superusuario
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'tu_contraseña';

-- Conectar a la base de datos principal y crear tablas
\c facturacion_autonomos

-- Crear tabla Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Cliente
CREATE TABLE Cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    direccion VARCHAR(255),
    usuarioId INT REFERENCES Usuario(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Factura
CREATE TABLE Factura (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(255) UNIQUE NOT NULL,
    fecha TIMESTAMP NOT NULL,
    total FLOAT NOT NULL,
    usuarioId INT REFERENCES Usuario(id),
    clienteId INT REFERENCES Cliente(id),
    pdfUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
