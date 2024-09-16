/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'web-based-pos.onrender.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
