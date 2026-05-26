const express = require('express');
const cors = require('cors');
const pessoaRoutes = require('./src/routes/pessoasRoutes');
const produtosRoutes = require('./src/routes/produtosRoutes');
const vendasRoutes = require('./scr/routes/vendasRoutes');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(pessoaRoutes);
app.use(produtosRoutes);
app.use(vendasRoutes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
