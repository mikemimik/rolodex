'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');

const router = express();

const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');
const errorHandlers = require('./middleware/errorHandlers');

const { router: cohortRoutes } = require('./routes/cohorts/cohortRoutes');
const { router: userRoutes } = require('./routes/users/userRoutes');
// $2a$10$AkuCDUQKViI1Np0c2yDO9O6OHZJh06EBzmM0vqrnC0vusJAqCwGs6
const { PORT, URL } = require('./utils/constants');

applyMiddleware(middleWare, router);

router.use('/api/cohorts', cohortRoutes);
router.use('/api/users', userRoutes);

applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

mongoose
  .connect(URL, { useNewUrlParser: true })
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
  });
