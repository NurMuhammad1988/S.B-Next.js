// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:['fakestoreapi.com']
//     }
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
            },
        ],
    },
};
module.exports = nextConfig;
