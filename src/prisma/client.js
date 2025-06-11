// src/prisma/client.js
const { PrismaClient } = require('@prisma/client');

// Exportar como objeto para facilitar el mock en tests
const prisma = new PrismaClient();

module.exports = { prisma };