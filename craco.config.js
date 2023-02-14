const webpack = require('webpack')
module.exports = {
  plugins: {
    add: [
      new webpack.DefinePlugin({
        process: { env: {} }
      })
    ]
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],

    },
  },
}