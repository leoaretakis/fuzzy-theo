var path = require('path');

module.exports = {
  entry: './src/entry.js',

  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }]
  }
};

// var webpack = require('webpack');
// var path = require('path');
// var precss       = require('precss');
// var autoprefixer = require('autoprefixer');


// var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// var env = process.env.WEBPACK_ENV;

// var libraryName = 'bundle';
// var plugins = [], outputFile;

// if (env === 'build') {
//   plugins.push(new UglifyJsPlugin({ minimize: true }));
//   outputFile = libraryName + '.min.js';
// } else {
//   outputFile = libraryName + '.js';
// }

// var config = {
//   entry: __dirname + '/src/main.js',
//   devtool: 'source-map',
//   output: {
//     path: __dirname + '/lib',
//     filename: outputFile,
//     //library: libraryName,
//     //libraryTarget: 'umd',
//     //umdNamedDefine: true
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//         query: { presets: ['es2015'] }
//       },
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: "eslint-loader",
//         exclude: /node_modules/
//       },
//       {
//         test:   /\.css$/,
//         loader: "style-loader!css-loader!postcss-loader"
//       }
//     ]
//   },
//   postcss: function () {
//     return [precss, autoprefixer];
//   },
//   resolve: {
//     root: path.resolve('./src'),
//     extensions: ['', '.js']
//   },
//   plugins: plugins
// };

// module.exports = config;
