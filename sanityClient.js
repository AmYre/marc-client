import { createClient } from 'next-sanity';

const sanity = createClient({
	projectId: 'r1wp5yv2',
	dataset: 'production',
	apiVersion: '2022-03-25',
	useCdn: false,
});

export default sanity;
