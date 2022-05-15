require('dotenv-flow').config()

module.exports = {
  client: {
    includes: [
      './src/**/*.ts',
      './src/**/*.tsx',
      './pages/**/*.tsx',
      './pages/**/*.ts',
    ],
    service: {
      name: 'drunkcircle',
      url: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
}
