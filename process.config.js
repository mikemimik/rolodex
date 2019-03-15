module.exports = {
  apps: [
    {
      name: 'api',
      script: './api/server.js',
      watch: ['api'],
      env: {
        'NODE_ENV': 'development',
        'PORT': 4000,
      },
      kill_timeout: 3000,
      wait_ready: true,
    },
  ],
};
