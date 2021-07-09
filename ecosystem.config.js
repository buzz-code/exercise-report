module.exports = {
  apps: [
    {
      name: 'exercise-report',
      script: './index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
