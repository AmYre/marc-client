import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from '../lib/sanityClient';
import bg1 from '../public/bg1.jpg';

import Image from 'next/image';

const Blog = ({ products }) => {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const imageProps = useNextSanityImage(sanityClient, products[0].image);

	return (
		<div className='container'>
			<h1 className='my-5'>Marc Maison</h1>
			<nav>
				<></>
			</nav>
			<div className='row'>
				{products &&
					products.length &&
					products.map((product, index) => (
						<>
							<Image
								{...imageProps}
								alt='Image produit'
								style={{ width: '100%', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
								sizes='(max-width: 800px) 100vw, 800px'
							/>
							<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
							<h2 key={product.title}>{product.title}</h2>
						</>
					))}
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const products = await sanityClient.fetch(`*[_type == "product"]`);

	return {
		props: {
			products,
		},
	};
};
export default Blog;
