
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.arweave.net",
      },
    ],
    domains: [
      "ipfs.io",
      "ipfs.filebase.io",
      "ipfs.infura.io",
      "nftstorage.link",
      "aptoslabs.com",
      "miro.medium.com",
      "www.gitbook.com",
      "raw.githubusercontent.com",
      "bafybeiafcvv5u3lntqbuuiu35kf6vzktkatprtsqlxwcyjjtl57bijlp7q.ipfs.w3s.link",
      "bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link",
      "rose-gentle-halibut-945.mypinata.cloud"
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false,  }
    return config;
  }
};

module.exports = nextConfig;
