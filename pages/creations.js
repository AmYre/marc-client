import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Masonry from 'react-masonry-css';

import Nav from '../components/Nav';

import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import { sanityClient } from '../lib/sanityClient';

import Image from 'next/image';

const Creations = ({ products }) => {
	const { lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();

	useEffect(() => {
		if (lang == 'fr') {
			setSlugLang('slugfr');
		}
		if (lang == 'en') {
			setSlugLang('slugen');
		}
	}, [lang]);

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	let productsFR = products.map(
		(product, index) =>
			product?.slugen && (
				<Link key={index} href={product.slugfr.current}>
					<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
					{/* <h2 key={product.title.fr}>{product.title.fr}</h2> */}
				</Link>
			)
	);

	return (
		<div className='flex gap-12 bg-[#E7E1DA] p-12'>
			<nav className='w-[320px] text-white bg-black bg-opacity-80'>
				<Nav />
			</nav>
			<main className='bg-black bg-opacity-90 text-white font-nunito p-12 text-center'>
				<h2 className='text-3xl tracking-widest font-thin mb-12'>Collection</h2>
				<div className='text-md p-4 mb-8 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex justify-center gap-8'>
					<p className='font-bold'>Tout</p>
					<p>Artistes</p>
					<p>Art Nouveau</p>
					<p>Autre</p>
				</div>

				{products && (
					<div className=''>
						{lang == 'fr' && (
							<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
								{productsFR}
							</Masonry>
						)}

						{lang == 'en' &&
							products.map(
								(product, index) =>
									product?.slugen && (
										<Link key={index} href={product.slugen.current}>
											<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
											<h2 key={product.title.en}>{product.title.en}</h2>
										</Link>
									)
							)}
						{lang == 'ru' &&
							products.map(
								(product, index) =>
									product?.slugru && (
										<Link key={index} href={product.slugru.current}>
											<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
											<h2 key={product.title.ru}>{product.title.ru}</h2>
										</Link>
									)
							)}
						{lang == 'cn' &&
							products.map(
								(product, index) =>
									product?.slugcn && (
										<Link key={index} href={product.slugcn.current}>
											<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
											<h2 key={product.title.cn}>{product.title.cn}</h2>
										</Link>
									)
							)}
					</div>
				)}
			</main>
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
