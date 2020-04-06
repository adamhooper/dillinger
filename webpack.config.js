const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  cache: true,
  entry: path.join(__dirname, 'public/js/app.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist/')
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    noParse: [
      /brace/,
      /angular/,
      /autoit.js/
    ],
    rules: [
      {
        test: /\.md$/i, // for importing the README.md
        use: 'raw-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get
      // source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  resolve: {
    modules: ['node_modules', 'plugins'],
    extensions: ['.webpack.js', '.web.js', '.js'],
    alias: {
      angular: 'angular/angular',
      md: 'core/markdown-it'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      angular: 'exports-loader?angular!angular'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}
