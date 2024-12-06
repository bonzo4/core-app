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
            {
                protocol: 'https',
                hostname: "pbs.twimg.com",
                port: "",
                pathname: "/profile_images/**",
            },
            {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
            port: '',
            pathname: '/embed/**'
            },
        ],
    },
};

export default nextConfig;
