const sanityClient = require('@sanity/client');

const sanity = sanityClient({
	projectId: 'r1wp5yv2',
	dataset: 'production',
	apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
	token: '', // or leave blank for unauthenticated usage
	useCdn: false, // `false` if you want to ensure fresh data
});

export default sanity;
