/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@deck.gl/layers",
    "@mapbox/tiny-sdf",
    "@loaders.gl/core",
    "@loaders.gl/worker-utils",
  ],
  experimental: {
    esmExternals: "loose", // 'loose' allows to load @deck.gl/layers
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    })

    // Fixes warning Critical dependency: the request of a dependency is an expression
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    return config
  },
}

module.exports = nextConfig
