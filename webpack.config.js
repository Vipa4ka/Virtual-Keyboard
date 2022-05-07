const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './virtual-keyboard/src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
    module: {
      rules: [
        {
          test: /\.scss$/i,        
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        },
        {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        },
        {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
      ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'virtual-keyboard/src/index.html',
  }),
    new MiniCssExtractPlugin({ filename: "style.css", }),
  new CleanWebpackPlugin(),
  ],

  devServer: {
    open: true,    
  },
};