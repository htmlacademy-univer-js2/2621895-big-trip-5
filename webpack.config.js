const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  //точка входа
  entry: './src/main.js',
  //точка выхода
  output: {
    filename: 'bundle.[contenthash].js', // имя итогового бандла
    path: path.resolve(__dirname, 'build'), // абсолютный путь к папке build
    clean: true, // очистка папки build перед каждой сборкой
  },

  //Генерация source-map(карта исходного кода)
  devtool: 'source-map',
  plugins: [
        new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ]
  },
  //Режим разработки (можно поменять на 'production')
  mode: 'development',
};
