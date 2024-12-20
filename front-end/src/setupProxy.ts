const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
};
