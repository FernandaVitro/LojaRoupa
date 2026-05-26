require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pessoaRoutes = require('./src/routes/pessoasRoutes');
const fornecedoresRoutes = require('./src/routes/fornecedoresRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use(pessoaRoutes);
app.use(fornecedoresRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));