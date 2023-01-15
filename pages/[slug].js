import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../components/GlobalContext';
import Image from 'next/image';
import logo from '../public/logo.png';
import { Video, CloudinaryContext } from 'cloudinary-react';

import { PortableText } from '@portabletext/react';

import Nav from '../components/Nav';
import NavBar from '../components/NavBar';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../lib/sanityClient';

import poster from '../public/poster-home.png';

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
			<CloudinaryContext cloud_name='amircloud'>
				<Video className='h-screen w-full object-cover' publicId='marc/plategyptien' autoPlay loop poster={poster} />
			</CloudinaryContext>
			<div className='md:hidden'>
				<NavBar />
			</div>
			<nav className='hidden md:block w-[320px] absolute text-white z-10 top-12 left-12 '>
				<Nav />
			</nav>
		</main>
	);
};

export default Creation;
