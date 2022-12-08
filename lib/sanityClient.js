import { createClient } from 'next-sanity';

export const sanityClient = createClient({
	projectId: 'r1wp5yv2',
	dataset: 'production',
	apiVersion: '2022-12-05',
	useCdn: true,
});
