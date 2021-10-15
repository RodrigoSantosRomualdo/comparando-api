const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users'); 

const app = express();

const cors = require('cors')
app.use(cors())

const db = require('./config/database')
//db('mongodb://localhost:27017/4not2020')
db(process.env.MONGODB_URI)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// MEXENDO AQUI

// Rota que trás os supermecados através da lat e log.
const location = require('./routes/supermecado')
app.use('/location', location)

const locationCombustivel = require('./routes/posto_combustivel')
app.use('/combustivel', locationCombustivel)


// Buscar o produto do mercado
const produto = require('./routes/produto_mercado')
app.use('/produto', produto)

const listamercado = require('./routes/lista_user_produtos')
app.use('/listamercado', listamercado)

const users = require('./routes/users')
app.use('/users', users)




module.exports = app;




/*


app.use('/users', usersRouter);

let teste = require('./routes/teste')
app.use('/teste', teste)

const fornecedor = require('./routes/fornecedor')
app.use('/fornecedor', fornecedor)

const produto = require('./routes/produto')
app.use('/produto', produto)

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)

const venda = require('./routes/venda')
app.use('/venda', venda)

const item_venda = require('./routes/item_venda')
app.use('/item-venda', item_venda)



*/