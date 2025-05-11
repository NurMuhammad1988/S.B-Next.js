/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [//next js rasimlarni tanib olishi uchun umumiy config
            {protocol: "https", hostname: "*"},
            {protocol: "http", hostname: "*"},
        ]
    }
}

module.exports = nextConfig
