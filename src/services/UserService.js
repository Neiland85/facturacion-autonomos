// src/services/UserService.js
const bcrypt = require('bcrypt');
const { prisma } = require('../prisma/client');
const { generateToken } = require('../config/jwt');

class UserService {
  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Object} Usuario creado y token
   */
  static async register(userData) {
    const { email, password, name, role = 'user' } = userData;
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });
    
    // Generar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // Excluir la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  /**
   * Iniciar sesión
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   * @returns {Object} Usuario y token
   */
  static async login(email, password) {
    // Buscar al usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }
    
    // Generar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // Excluir la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  /**
   * Obtener perfil de usuario
   * @param {string} userId - ID del usuario
   * @returns {Object} Datos del usuario
   */
  static async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Excluir la contraseña en la respuesta
    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  }
}

module.exports = UserService;
