/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://marcmaison.art/",
	changefreq: "daily",
	priority: 0.7,
	sitemapSize: 5000,
	generateRobotsTxt: true,
	exclude: ["https://marcmaison.art/en", "https://marcmaison.art/es", "https://marcmaison.art/cn", "https://marcmaison.art/undefined"],
	// Default transformation function
	transform: async (config, path) => {
		return {
			loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
			changefreq: config.changefreq,
			priority: config.priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			alternateRefs: config.alternateRefs ?? [],
		};
	},
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: "Googlebot",
				allow: "/",
			},
		],
		//additionalSitemaps: "https://marcmaison.art/video-sitemap.xml",
	},
};
