import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';

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

	return (
		<div className=''>
			<h1 className=''>Liste des créations avec possibilité de filtrer par artistes</h1>
			<div className=''>
				{products && lang == 'fr'
					? products.map((product, index) => (
							<Link key={index} href={product.slugfr.current}>
								<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
								<h2 key={product.title.fr}>{product.title.fr}</h2>
							</Link>
					  ))
					: lang == 'en'
					? products.map((product, index) => (
							<Link key={index} href={product.slugen.current}>
								<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
								<h2 key={product.title.en}>{product.title.en}</h2>
							</Link>
					  ))
					: lang == 'ru'
					? products.map((product, index) => (
							<Link key={index} href={product.slugru.current}>
								<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
								<h2 key={product.title.ru}>{product.title.ru}</h2>
							</Link>
					  ))
					: lang == 'cn' &&
					  products.map((product, index) => (
							<Link key={index} href={product.slugcn.current}>
								<Image src={urlFor(product.image).url()} alt='Image produit' width='300' height='300' />
								<h2 key={product.title.cn}>{product.title.cn}</h2>
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
