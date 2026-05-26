require('dotenv').config();
const express = require('express')
const cors = require('cors')
const pessoaRoutes = require('./scr/routes/pessoasRoutes')
const vendasRoutes = require('./scr/routes/vendasRoutes');
app.use(vendasRoutes);
const app = express();


app.use(cors());
app.use(express.json());

app.use(pessoaRoutes);


const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server em http://localhost:${PORT}`))

