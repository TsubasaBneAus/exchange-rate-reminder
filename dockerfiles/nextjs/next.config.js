/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const NextConfig = {
  reactStrictMode: true,
  i18n,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  // Uncomment below when developing the app in docker to enable hot reloading
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 5000,
      aggregateTimeout: 300,
    };
    return config;
  },

  output: "standalone",
};

module.exports = NextConfig;
