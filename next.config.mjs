/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '34.173.224.151',
                port: '8001',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
