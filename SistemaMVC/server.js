require('dotenv').config();
const express = require('express')
const cors = require('cors')
const pessoaRoutes = require('./src/routes/pessoasRoutes')
const vendasRoutes = require('./src/routes/vendasRoutes');

const app = express();


app.use(cors());
app.use(express.json());

app.use(pessoaRoutes);
app.use(vendasRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server em http://localhost:${PORT}`))

