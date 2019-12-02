'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const path = require('path');

const router = express();

const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');
const errorHandlers = require('./middleware/errorHandlers');

const { router: cohortRoutes } = require('./resources/cohorts/cohortRoutes');
const { router: userRoutes } = require('./resources/users/userRoutes');
const { router: studentRoutes } = require('./resources/students/studentRoutes');

const { PORT, URL } = require('./utils/constants');

const publicPath = path.resolve(__dirname, '..', 'build');
router.use('/', express.static(publicPath));

applyMiddleware(middleWare, router);

router.use('/api/cohorts', cohortRoutes);
router.use('/api/users', userRoutes);
router.use('/api/students', studentRoutes);

applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log(`Connected to database at: ${URL}`);
    try {
      await require('./utils/seed').truncate();
      await require('./utils/seed').seed();

      server.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}`);
        if (process.send) {
          // NOTE: process is being run by pm2
          process.send('ready');
        }
      });
    } catch (e) {
      console.error(`Error starting server: ${e}`);
      throw e;
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
