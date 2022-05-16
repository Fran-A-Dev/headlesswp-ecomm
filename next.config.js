/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    domains: ["headlessecostg.wpengine.com"],
  },
};

module.exports = nextConfig;
