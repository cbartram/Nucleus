const path = require('path');

module.exports = {
  entry: './src/nucleus.js',
  target: 'node',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
};
//https-proxy = "http://entproxy.kdc.capitalone.com:8099/"
//proxy = "http://entproxy.kdc.capitalone.com:8099/"
