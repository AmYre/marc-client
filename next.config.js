/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['cdn.sanity.io', 'marc.sanity.studio'],
	},
};

module.exports = nextConfig;
