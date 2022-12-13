import React, { useEffect, useState } from 'react';

import { sanityClient } from '../lib/sanityClient';

const Creation = (props) => {
	const creation = props.creation[0];

	return <div>Ajouter la fiche pour {creation.title.fr}</div>;
};
export const getServerSideProps = async (context) => {
	const creation = await sanityClient.fetch(`*[ _type == "products" && slug.current == "${context.query.slug}" ]`);

	return {
		props: {
			creation,
		},
	};
};

export default Creation;
