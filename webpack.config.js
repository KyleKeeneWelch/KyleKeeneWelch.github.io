const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    entry: "./src/scripts/display.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/static/index.html",
      filename: "index.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/static/about.html",
      filename: "about.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/static/portfolio.html",
      filename: "portfolio.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/static/contact.html",
      filename: "contact.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/control-an-elevator.html",
      filename: "control-an-elevator.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/actigym.html",
      filename: "actigym.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/topedia.html",
      filename: "topedia.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-landing-page.html",
      filename: "odin-landing-page.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-rock-paper-scissors.html",
      filename: "odin-rock-paper-scissors.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-etch-a-sketch.html",
      filename: "odin-etch-a-sketch.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-calculator.html",
      filename: "odin-calculator.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-sign-up-form.html",
      filename: "odin-sign-up-form.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-library.html",
      filename: "odin-library.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-tic-tac-toe.html",
      filename: "odin-tic-tac-toe.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-restaurant-page.html",
      filename: "odin-restaurant-page.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-to-do-list.html",
      filename: "odin-to-do-list.html",
      favicon: "./src/assets/favicon/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/templates/projects/odin-weather-app.html",
      filename: "odin-weather-app.html",
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
