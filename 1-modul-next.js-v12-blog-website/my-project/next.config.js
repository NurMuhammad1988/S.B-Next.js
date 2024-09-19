// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     images: {
//         domains: ["img.freepik.com"],

//     },
// };

// module.exports = nextConfig;

// next.config.js

// bu to'g'ri config
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.graphassets.com',//hygraphni rasimlari uchun next config shunday bo'lishi erak ekan
        },

        {
            protocol: 'https',
            hostname: 'img.freepik.com',
          },

       ]
      },
  }
  module.exports = nextConfig
// bu to'g'ri config
  