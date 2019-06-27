const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = ({ config, mode }) => {
  /* PostCSS Support */
  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './config/',
          },
        },
      },
    ],

    include: path.resolve(__dirname, '../'),
  });

  return config;
};