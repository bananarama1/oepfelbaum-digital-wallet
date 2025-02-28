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
    ['/open-banking', '/token'],
    createProxyMiddleware({
      target: 'https://ob.sandbox.natwest.com',
      changeOrigin: true
    })
  );
  app.use(
    '/authorize',
    createProxyMiddleware({
      target: 'https://api.sandbox.natwest.com',
      changeOrigin: true
    })
  );
  
};