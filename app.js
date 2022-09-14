// required
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const db = require('./database/dbConnect');

db.then(() => {
    const connectionStatus = 'connected';
    return connectionStatus;
});

// get routers
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const stockRouter = require('./routes/stock');
const menuRouter = require('./routes/menu');
const prospectsRouter = require('./routes/prospects');
const reservRouter = require('./routes/reserv');
const reviewRouter = require('./routes/review');

const app = express();
// setup defini dans le dossier docs
const swaggerConfig = require('./docs/swagger');
// lie swagger ui et swagger jsdoc
const openapiSpecification = swaggerJsdoc(swaggerConfig);

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
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/stock', stockRouter);
app.use('/menu', menuRouter);
app.use('/prospects', prospectsRouter);
app.use('/reservation', reservRouter);
app.use('/review', reviewRouter);

// server
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

module.exports = app;
