const path = require('path');
const webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const config = require('./config');

module.exports = {
  // debug: config.DEBUG,

  // Serves `webpack-assets.json` from memory (bypassing disk)
  // in development mode.
  // (it is recommended to turn this setting on)
  port: config.assetTransferPort,

  webpack_assets_file_path: './build/webpack-assets.json',
  webpack_stats_file_path: './build/webpack-stats.json',

  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    html: {
      extension: 'html'
    },
    fonts: {
      extensions: ['woff', 'woff2', 'eot', 'ttf']
    },
    styles: {
      extension: 'css',
      filter(module, regularExpression, options, log) {
        if (options.development) {
        // In development mode there's Webpack "style-loader",
        // which outputs `module`s with `module.name == asset_path`,
        // but those `module`s do not contain CSS text.
        //
        // The `module`s containing CSS text are
        // the ones loaded with Webpack "css-loader".
        // (which have kinda weird `module.name`)
        //
        // Therefore using a non-default `filter` function here.
        //
          return webpack_isomorphic_tools_plugin.style_loader_filter(module, regularExpression, options, log);
        }

      // In production mode there will be no CSS text at all
      // because all styles will be extracted by Webpack Extract Text Plugin
      // into a .css file (as per Webpack configuration).
      //
      // Therefore in production mode `filter` function always returns non-`true`.
      },

      // How to correctly transform kinda weird `module.name`
      // of the `module` created by Webpack "css-loader"
      // into the correct asset path:
      path: webpack_isomorphic_tools_plugin.style_loader_path_extractor,

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser: webpack_isomorphic_tools_plugin.css_loader_parser
    }
  }
};
