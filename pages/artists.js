import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '../lib/sanityClient';

import logo from '../public/logo.png';

import Nav from '../components/Nav';
import NavBar from '../components/NavBar';
import Products from '../components/Products';
import Artists from '../components/Artists';
import Museum from '../components/Museum';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

const Creations = ({ artists }) => {
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

	const router = useRouter();
	const slug = router.query.slug;

	return (
		<div className='flex min-h-screen md:gap-8 bg-bg md:p-12'>
			<div className='md:hidden'>
				<NavBar />
			</div>
			<nav className='hidden md:block w-[320px] h-fit text-white'>
				<Nav />
			</nav>
			<main className='w-full bg-layout bg-opacity-90 text-white font-nunito text-center'>
				<Artists artists={artists} />
				<div className='flex flex-row items-center justify-end'>
					<Image src={logo} className='w-20' alt='logo Marc Maison XIX' />
					<div className='flex flex-col'>
						<h1 className='mb-0 pb-0 text-[1.5rem] text-gray-200 pt-6 px-6 font-bodoni'>Marc Maison</h1>
						<h2 className='font-splash text-[#c49d50] text-[0.8rem] tracking-wide pb-4 text-gold'>- 19ème - </h2>
					</div>
				</div>
			</main>
		</div>
	);
};

export const getServerSideProps = async () => {
	const artists = await sanityClient.fetch(`*[_type == "artists"]`);

	return {
		props: {
			artists,
		},
	};
};

export default Creations;
