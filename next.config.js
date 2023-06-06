/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	fill={true},
	images: {
		domains: ['cdn.sanity.io', 'marc.sanity.studio', 'v.calameo.com', 'calameo.com', 'res.cloudinary.com'],
	},
};

module.exports = nextConfig;
