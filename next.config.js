const withSourceMaps = require('@zeit/next-source-maps')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['g-mapify'])

module.exports = withPlugins(
  [
    withTM,
    [
      withImages,
      {
        // Removed the invalid 'exclude' property
      },
    ],
    withSourceMaps,
  ],
  {
    env: { },
    publicRuntimeConfig: {},
    webpack: (configIm, options) => {
      const config = configIm
      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
      return config
    },
  },
)
