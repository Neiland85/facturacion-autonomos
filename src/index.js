
const express = require('express');
const usuarioRoutes = require('./routes/usuario');
const clienteRoutes = require('./routes/cliente');
const facturaRoutes = require('./routes/factura');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/facturas', facturaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
