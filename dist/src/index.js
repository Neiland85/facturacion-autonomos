"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const firma_1 = __importDefault(require("./routes/firma"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Rutas
app.use('/api/usuario', usuario_1.default);
app.use('/api/cliente', cliente_1.default);
app.use('/api/firmas', firma_1.default);
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
