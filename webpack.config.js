const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    entry: "./src/scripts/index.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/index.html",
      filename: "index.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/about.html",
      filename: "about.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.docx$/i,
        loader: "file-loader",
        options: {
          name: "Kyle_Keene_Welch_Resume.docx",
        },
      },
    ],
  },
};
