'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');
const errorHandlers = require('./middleware/errorHandlers');

const { router: cohortRoutes } = require('./resources/cohorts/cohortRoutes');
const { router: userRoutes } = require('./resources/users/userRoutes');
const { router: studentRoutes } = require('./resources/students/studentRoutes');

const { PORT, URL } = require('./utils/constants');

const publicPath = path.resolve(__dirname, '..', 'build');
app.use('/', express.static(publicPath));

// applyMiddleware(middleWare, app);

app.use('/api/cohorts', cohortRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

applyMiddleware(errorHandlers, app);

const server = http.createServer(app);

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
