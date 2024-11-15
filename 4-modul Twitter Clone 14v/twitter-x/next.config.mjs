/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // next config js rasimlarni obshi config qilish yani hostname bilan shunda rasim chaqirilgan saytni domenini yozish shartmasmi???
            {protocol: "https", hostname: "*"},
            {protocol: "http", hostname: "*"},
        ]
    }
};

export default nextConfig;
