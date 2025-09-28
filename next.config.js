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
        exclude: /\.(svg|png)$/,
      },
    ],
    withSourceMaps,
  ],
  {
    output: 'standalone',
    env: {
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || process.env.SERVICE_FQDN_NEXT,
      JWT_SECRET: process.env.JWT_SECRET || process.env.SERVICE_BASE64_JWT
    },
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
