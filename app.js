const express = require('express');
const db = require('./database/dbConnect');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

db.then(() => {
    const connectionStatus = 'connected';
    console.log(connectionStatus)
})
//const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const { connection } = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);

module.exports = app;
