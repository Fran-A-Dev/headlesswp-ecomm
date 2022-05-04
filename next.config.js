/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    domains: ["headlessecomm.wpengine.com"],
  },
};

module.exports = nextConfig;
