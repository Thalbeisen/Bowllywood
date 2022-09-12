// required
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/dbConnect');

db.then(() => {
    const connectionStatus = 'connected';
    return connectionStatus;
});

// get routers
// const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const stockRouter = require('./routes/stock');
const menuRouter = require('./routes/menu');
const prospectsRouter = require('./routes/prospects');
const reviewRouter = require('./routes/review');
// const reservRouter = require('./routes/reserv');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(
    '/mailRessources',
    express.static(path.join(__dirname, '/assets/mailRessources'))
);

// use routers
// app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/stock', stockRouter);
app.use('/menu', menuRouter);
app.use('/prospects', prospectsRouter);
app.use('/review', reviewRouter);

module.exports = app;
