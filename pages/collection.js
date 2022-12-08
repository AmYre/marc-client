import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useNextSanityImage } from 'next-sanity-image';
import { sanity } from '../sanityClient';
import { createClient } from 'next-sanity';
import bg1 from '../public/bg1.jpg';

import Image from 'next/image';

const Blog = ({ products }) => {
	const imageBuilder = imageUrlBuilder(sanity);

	function urlFor(source) {
		return imageBuilder.image(source);
	}

	useEffect(() => {}, []);

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
							<img src={urlFor(product.images)} alt='product thumbnail' />
							<h2 key={product.title}>{product.title}</h2>
						</>
					))}
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const client = createClient({
		projectId: 'r1wp5yv2',
		dataset: 'production',
		apiVersion: '2022-03-14',
		useCdn: false,
	});

	const products = await client.fetch(`*[_type == "product"]`);

	return {
		props: {
			products,
		},
	};
};
export default Blog;
