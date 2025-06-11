const express = require('express');
const usuarioRoutes = require('./routes/usuario');
const clienteRoutes = require('./routes/cliente');
const facturaRoutes = require('./routes/factura');
const cors = require('cors');
require('./jobs/scheduler');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/facturas', facturaRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
