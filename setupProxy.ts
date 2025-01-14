const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://wordly.org',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Убирает /api из пути
            },
        })
    );
};
