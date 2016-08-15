import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// Stop displaying annoying Warnings from UglifyJS for stripping down unreachable codes
const stopUglifyJSWarnings = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

// Setup index.html and where I want to put my bundled JS to
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

// Source & Destination path
const PATHS = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'prod';

process.env.BABEL_ENV = LAUNCH_COMMAND;

// Plugin for production
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

// Copy images from source to dist's iamge folder
const copyWebpackPlugin = new CopyWebpackPlugin(
  [{ from: 'src/images', to: 'images' }],
  { copyUnmodified: true}
);

// Webpack base setup
const base = {
  entry: [
    PATHS.source
  ],
  output: {
    path: PATHS.dist,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' },
      { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve('./src')
  }
};

// Development configuration
const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  plugins: [HtmlWebpackPluginConfig, copyWebpackPlugin]
};

// Production configuration
const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin, copyWebpackPlugin, stopUglifyJSWarnings]
};

// Determine if it is Production or Development and
// assign corresponding configuration
export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
);