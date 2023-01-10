import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '../lib/sanityClient';

import logo from '../public/logo.png';

import Nav from '../components/Nav';
import Products from '../components/Products';
import Artists from '../components/Artists';
import Museum from '../components/Museum';
import Notable from '../components/Notable';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

const Creations = ({ products, artists }) => {
	const { nav, setNav, lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();

	useEffect(() => {
		if (lang == 'fr') {
			setSlugLang('slugfr');
		}
		if (lang == 'en') {
			setSlugLang('slugen');
		}
	}, [lang]);

	return (
		<div className='flex gap-8 bg-[#E7E1DA] p-12'>
			<nav className='w-[320px] h-fit text-white bg-black bg-opacity-80'>
				<Nav />
			</nav>
			<main className='w-full bg-black bg-opacity-90 text-white font-nunito p-12 text-center'>
				{nav == 'creations' && <Products products={products} />}
				{nav == 'artists' && <Artists artists={artists} />}
				{nav == 'museum' && <Museum products={products} />}
				{nav == 'notable' && <Notable products={products} />}
				{nav == 'gallery' && <Gallery />}
				{nav == 'contact' && <Contact />}

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
	const artists = await sanityClient.fetch(`*[_type == "artistes"]`);

	return {
		props: {
			products,
			artists,
		},
	};
};

export default Creations;
