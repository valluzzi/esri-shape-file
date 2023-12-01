const path = require('path');
const webpack = require('webpack');

module.exports  = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
    }
  },  
  plugins: [ 
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.NormalModuleReplacementPlugin(/node:/, resource => {  
      resource.request = resource.request.replace(/^node:/, "");
    }),
  ]
};