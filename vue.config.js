const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"))
      .set("router", resolve("/src/router"))
      .set("mock", resolve("src/mock"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/api"));
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001/",
        ws: true,
      },
      "/public": {
        target: "http://localhost:7001/",
        ws: true,
      },
    },
  },
};
