/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: 'http://localhost:3001/graphql',
    WS: 'ws://localhost:3001/graphql',
  },
}

module.exports = nextConfig
