module.exports = {
  apps: [
    {
      name: 'exercise-report',
      script: './index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
