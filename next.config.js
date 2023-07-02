/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	sw: "service-worker.js",
})

const nextConfig = withPWA({
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["cdn.sanity.io", "marc.sanity.studio", "v.calameo.com", "calameo.com", "res.cloudinary.com"],
	},
})

module.exports = nextConfig
