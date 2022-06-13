const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );
  app.use(
    ['/natwest', '/token'],
    createProxyMiddleware({
      target: 'https://ob.sandbox.natwest.com',
      changeOrigin: true
    })
  );
  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://www.google.com',
      changeOrigin: true
    })
  );
};