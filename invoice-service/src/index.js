import express from 'express';
import usuarioRoutes from './routes/usuario';
import clienteRoutes from './routes/cliente';
import firmaRoutes from './routes/firma';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/usuario', usuarioRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/firmas', firmaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});