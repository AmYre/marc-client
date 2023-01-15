import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import { Video, CloudinaryContext } from 'cloudinary-react';

import Head from 'next/head';
import Image from 'next/image';
import { MdVolumeUp } from 'react-icons/md';
import Link from 'next/link';

import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import locales from '../lang/locales.js';
import Nav from '../components/Nav';
import NavBar from '../components/NavBar';
import MobNav from '../components/MobNav';
import poster from '../public/poster-home.png';

export default function Home({ walls }) {
	const { lang, setLang } = useGlobalContext();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });
	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	/* 	const [currentSlide, setCurrentSlide] = useState(0);
	let sliderInterval = useRef();

	useEffect(() => {
		sliderInterval = setInterval(() => {
			if (currentSlide < walls.length - 1) {
				setCurrentSlide(currentSlide + 1);
			} else {
				setCurrentSlide(0);
			}
		}, 10000);
		return () => {
			clearInterval(sliderInterval);
		};
	}); */

	return (
		<div>
			<Head>
				<title>{locales.title[lang]}</title>
				<meta name='description' content={locales.desc[lang]} />
			</Head>
			<main className=''>
				<CloudinaryContext cloud_name='amircloud'>
					<Video className='h-screen w-full object-cover' publicId='marc/home' autoPlay muted loop poster={poster} />
				</CloudinaryContext>
				{/* 	<div className='h-screen -z-10 absolute overflow-hidden'>
		

					<Image src={urlFor(walls[currentSlide].image).quality(100).url()} className='anim -z-10 object-cover h-screen w-screen' alt='bg' width='2500' height='2500' />;
				</div> */}
				<div className='md:hidden'>
					<NavBar />
				</div>
				<nav className='hidden md:block w-[320px] absolute text-white z-10 top-12 left-12'>
					<Nav />
				</nav>
			</main>
		</div>
	);
}

export const getServerSideProps = async () => {
	const walls = await sanityClient.fetch(`*[_type == "walls"]`);

	return {
		props: {
			walls,
		},
	};
};
