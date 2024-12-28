const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/app.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [new CompressionPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Utilisez 'directory' pour 'static'
    },
    compress: true,
    watchFiles: ["src/**/*"], // Spécifiez les fichiers à surveiller
    port: 3000,
    host: "0.0.0.0", // Vous pouvez laisser l'adresse IP ou utiliser "localhost"
    open: true,
    hot: true,
    allowedHosts: "all", // Permet tous les hôtes si nécessaire
  },
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
};
