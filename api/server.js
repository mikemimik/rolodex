'use strict';

const express = require('express');
const http = require('http');

const router = express();

const { applyMiddleware, appleRoutes } = require('./utils');
const middleWare = require('./middleware');
const errorHandlers = require('./middleware/errorHandlers');
const bookRoutes = require('./routes/books/bookRoutes');

const { PORT } = require('./utils/constants');

applyMiddleware(middleWare, router);
appleRoutes(routes);
applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  process.send('ready');
});
