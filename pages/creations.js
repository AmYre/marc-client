import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Link from 'next/link';
import Image from 'next/image';

import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import Products from '../components/Products';
import Nav from '../components/Nav';
import logo from '../public/logo.png';

const Creations = ({ products }) => {
	const { lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();
	const [filter, setFilter] = useState();

	console.log(products[0]);

	useEffect(() => {
		if (lang == 'fr') {
			setSlugLang('slugfr');
		}
		if (lang == 'en') {
			setSlugLang('slugen');
		}
	}, [lang]);

	const filterByCat = (cat) => {
		if (cat == 'art-nouveau') {
			sanityClient
				.fetch(
					`*[_type == "categories"]{
				_id, title,
				"product": { "title" : *[_type == "products" && references(^._id)].title.fr,
							"image": *[_type == "products" && references(^._id)].image,
							"slug": *[_type == "products" && references(^._id)].slugfr}
			  }`
				)
				.then((res) => console.log(res));
		}
	};

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	return (
		<div className='flex gap-12 bg-[#E7E1DA] p-12'>
			<nav className='w-[320px] h-fit text-white bg-black bg-opacity-80'>
				<Nav />
			</nav>
			<main className='bg-black bg-opacity-90 text-white font-nunito p-12 text-center'>
				<h2 className='text-3xl tracking-widest font-thin mb-12'>Collection</h2>
				<div className='text-md p-4 mb-8 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex justify-center gap-8'>
					<p className='font-bold'>Tout</p>
					<p>Artistes</p>
					<p onClick={() => filterByCat('art-nouveau')}>Art-Nouveau</p>
					<p onClick={() => setFilter('art-artisanats')}>Art & Artisanats</p>
					<p>Autre</p>
				</div>

				{products && (
					<div className=''>
						{lang == 'fr' && <Products products={products} />}

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
				<div className='flex flex-row items-center justify-end mt-12'>
					<Image src={logo} className='w-20' alt='logo Marc Maison XIX' />
					<div className='flex flex-col'>
						<h1 className='mb-0 pb-0 text-[1.5rem] text-gray-200 pt-6 px-6 font-splash'>Marc Maison</h1>
						<h2 className='font-splash text-[#c49d50] text-[0.8rem] tracking-wide pb-4 text-gold'>- 19ème - </h2>
					</div>
				</div>
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
