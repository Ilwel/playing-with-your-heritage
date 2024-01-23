/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: 'https://heirs.onrender.com/graphql',
    WS: 'wss://heirs.onrender.com/graphql',
  },
}

module.exports = nextConfig
