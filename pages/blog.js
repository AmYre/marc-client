import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { sanity } from '../sanityClient';
import Image from 'next/image';
import PostCard from '../components/PostCard';
import bg1 from '../public/bg1.jpg';

const Blog = ({ products }) => {
	const [mappedPosts, setMappedPosts] = useState([]);
	useEffect(() => {
		if (products.length) {
			const imageBuilder = imageUrlBuilder(sanity);
			setMappedPosts(
				products.map((product) => {
					return {
						...product,
						mainImage: imageBuilder.image(product.mainImage).width(450).height(500),
					};
				})
			);
		} else {
			setMappedPosts([]);
		}
	}, [products]);

	return (
		<div className='container'>
			<h1 className='my-5'>Marc Maison</h1>
			<nav>
				<></>
			</nav>
			<div className='row'>
				{mappedPosts &&
					mappedPosts.length &&
					mappedPosts.map((product, index) => (
						<>
							<h2 key={product.title}>
								{console.log(product)}
								{product.title}
							</h2>
						</>
					))}
			</div>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const query = encodeURIComponent(`*[ _type == "product" ]`);
	const url = `https://r1wp5yv2.api.sanity.io/v2021-06-07/data/query/production?query=${query}`;
	const data = await fetch(url).then((res) => res.json());
	const products = data.result;
	if (!products || !products.length === 0) {
		return {
			props: {
				products: [],
			},
		};
	} else {
		return {
			props: {
				products,
			},
		};
	}
};
export default Blog;
