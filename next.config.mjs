/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
            port: '',
            pathname: '/avatars/**',
            },
            {
            protocol: 'https',
            hostname: 'tlukhzbklwemmeibiqbq.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/team_images/**',
        },
        ],
    },
};

export default nextConfig;
