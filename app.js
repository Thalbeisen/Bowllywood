// required 
const express = require('express');
const db = require('./database/dbConnect');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// ddb connexion
db.then(() =>
{
    const connectionStatus = 'connected';
    console.log(connectionStatus)
})

// get routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const  menuRouter = require('./routes/menu');
const { connection } = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);

module.exports = app;