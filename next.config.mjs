/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.ctfassets.net",
            pathname: "/**",
          },
        ],
    },
};

export default nextConfig;

