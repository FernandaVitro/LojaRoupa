require('dotenv').config('');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const pessoasRoutes = require('./src/routes/pessoasRoutes')
const funcionariosRoutes = require('./src/routes/funcionariosRoutes');
const produtosRoutes = require('./src/routes/produtosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(pessoasRoutes);
app.use(funcionariosRoutes);
app.use(produtosRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`server em http://localhost:${PORT}`))