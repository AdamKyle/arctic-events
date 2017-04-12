const path                          = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack                       = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'index.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              'plugins': ['lodash'],
              'presets': ['es2015']
            },
        }]
    },
    plugins: [
      new LodashModuleReplacementPlugin,
      new webpack.optimize.OccurrenceOrderPlugin,
      new webpack.optimize.UglifyJsPlugin
    ]
}
