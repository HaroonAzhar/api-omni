module.exports = {
  apps: [
    // Main API Hosting
    {
      name: "API",
      script: "dist/main.js",
      error_file: "log/api_err.log",
      out_file: "log/api_out.log",
      log_file: "log/api_combined.log",
      time: true,
      instances: 1,
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
    },
    {
      name: "CRON",
      script: "dist/cron/index.js",
      error_file: "log/cron_err.log",
      out_file: "log/cron_out.log",
      log_file: "log/cron_combined.log",
      time: true,
      instances: 1,
      exec_mode: "fork",
      cron_restart: "0 */1 * * *",
      watch: false,
      autorestart: false,
    },
  ],
};
