/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ["res.cloudinary.com", "i.pravatar.cc", "api.dicebear.com"],
  }
}
export default nextConfig;
