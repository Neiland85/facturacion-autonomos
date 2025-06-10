module.exports = {
  ignores: [
    'coverage/',
    'generated/',
    'facturas-xml/',
    'hello-prisma/',
    'invoice-service/',
    'signature-service/'
  ],
  files: ['src/**/*.js'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
};
