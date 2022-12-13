import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import { sanityClient } from '../lib/sanityClient';

import Image from 'next/image';

const Creations = ({ products }) => {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	return (
		<div className=''>
			<h1 className=''>Liste des créations avec possibilité de filtrer par artistes</h1>
			<div className=''>
				{products &&
					products.length &&
					products.map((product, index) => (
						<Link key={index} href={product.slug.current}>
							<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
							<h2 key={product.title.fr}>{product.title.fr}</h2>
						</Link>
					))}
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const products = await sanityClient.fetch(`*[_type == "products"]`);

	return {
		props: {
			products,
		},
	};
};
export default Creations;
