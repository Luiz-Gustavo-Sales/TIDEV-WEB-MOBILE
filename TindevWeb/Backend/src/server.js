const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors")
//importando arquivo routes para o servirdor
const routes = require('./routes')

const server = express();
//conexão com banco de dados
mongoose.connect('mongodb+srv://tindev:flamengo15@cluster0-xsmns.mongodb.net/DBTinDev?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology: true,})

//importando cors para que o Front End não seja bloqueado quando fizer requisições
server.use(cors());

//informando para meu servirdor que estou utilizando JSON
// deve coloocar sempre antes das rotas
server.use(express.json());

// adicionando alguma coisa a routes
server.use(routes);

//porta que os erver vai rodar
server.listen(3333);