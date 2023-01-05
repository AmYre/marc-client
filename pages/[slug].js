import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../components/GlobalContext';
import Image from 'next/image';
import logo from '../public/logo.png';

import { PortableText } from '@portabletext/react';

import Nav from '../components/Nav';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../lib/sanityClient';

const Creation = () => {
	const { nav, setNav, lang, setLang } = useGlobalContext();
	const [slugLang, setSlugLang] = useState();
	const [creation, setCreation] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const router = useRouter();
	const slug = router.query.slug;

	useEffect(() => {
		if (nav == 'creations') {
			if (lang == 'fr') {
				sanityClient.fetch(`*[ _type == "products" && slugfr.current == "${slug}" ]`).then((res) => setCreation(res[0]));
			} else if (lang == 'en') {
				sanityClient.fetch(`*[ _type == "products" && slugen.current == "${slug}" ]`).then((res) => setCreation(res[0]));
			} else if (lang == 'ru') {
				sanityClient.fetch(`*[ _type == "products" && slugru.current == "${slug}" ]`).then((res) => setCreation(res[0]));
			} else {
				sanityClient.fetch(`*[ _type == "products" && slugcn.current == "${slug}" ]`).then((res) => setCreation(res[0]));
			}
		}
		if (nav == 'artists') {
			sanityClient.fetch(`*[ _type == "artists" && slug.current == "${slug}" ]`).then((res) => setCreation(res[0]));
		}
	}, []);

	console.log('inslugdetail', creation);

	return (
		<main>
			{creation && nav == 'creations' && (
				<>
					<div className='wrapanim h-screen -z-10 absolute overflow-hidden'>
						<Image src={urlFor(creation?.image).url()} className='anim -z-10 object-cover h-screen w-screen' alt='bg' width='500' height='500' />;
					</div>
					<nav className='w-[320px] text-white z-10 relative top-12 left-12 bg-black bg-opacity-70'>
						<Nav />
					</nav>
				</>
			)}
			<div className='flex gap-12 bg-[#E7E1DA] p-12'>
				<nav className='w-[320px] h-fit text-white bg-black bg-opacity-80'>
					<Nav />
				</nav>
				<div className='w-full bg-black bg-opacity-90 text-white font-nunito p-12 text-center'>
					<p>{creation?.title}</p>
					{/* 					<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(creation?.image).url()} alt='Image produit' width='300' height='300'></Image>
					 */}{' '}
					<PortableText className='text-sm' value={creation?.description[lang]} />
					<div className='flex flex-row items-center justify-end mt-12'>
						<Image src={logo} className='w-20' alt='logo Marc Maison XIX' />
						<div className='flex flex-col'>
							<h1 className='mb-0 pb-0 text-[1.5rem] text-gray-200 pt-6 px-6 font-splash'>Marc Maison</h1>
							<h2 className='font-splash text-[#c49d50] text-[0.8rem] tracking-wide pb-4 text-gold'>- 19ème - </h2>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Creation;
