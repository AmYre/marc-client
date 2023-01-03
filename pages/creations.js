import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Link from 'next/link';
import Image from 'next/image';

import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import ProductsMasonry from '../components/ProductsMasonry';
import Nav from '../components/Nav';
import logo from '../public/logo.png';

const Creations = ({ products }) => {
	const { lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();
	const [filter, setFilter] = useState();

	useEffect(() => {
		if (lang == 'fr') {
			setSlugLang('slugfr');
		}
		if (lang == 'en') {
			setSlugLang('slugen');
		}
	}, [lang]);

	const filterByCat = (cat) => {
		if (cat == 'all') {
			setFilter('');
		}
		if (cat == 'nouveau') {
			setFilter('nouveau');
		}
		if (cat == 'artisanats') {
			setFilter('artisanats');
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
			<main className='w-full bg-black bg-opacity-90 text-white font-nunito p-12 text-center'>
				<h2 className='text-3xl tracking-widest font-thin mb-12'>Collection</h2>
				<div className='text-md p-4 mb-8 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex justify-center gap-8'>
					<button onClick={() => filterByCat('all')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
						Tout
					</button>
					<button onClick={() => filterByCat('artists')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
						Artistes
					</button>
					<button onClick={() => filterByCat('nouveau')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
						Art-Nouveau
					</button>
					<button onClick={() => filterByCat('artisanats')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
						Art & Artisanats
					</button>
					<button onClick={() => filterByCat('autre')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
						Autre
					</button>
				</div>

				{products && (
					<div className=''>
						{lang == 'fr' && <ProductsMasonry data={products} filter={filter} />}

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
	const products = await sanityClient.fetch(`*[_type == "products"]{ ..., category-> }`);

	return {
		props: {
			products,
		},
	};
};
export default Creations;
