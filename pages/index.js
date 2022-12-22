import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Head from 'next/head';
import Image from 'next/image';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import locales from '../lang/locales.js';
import Nav from '../components/Nav';

export default function Home({ walls }) {
	const { lang, setLang } = useGlobalContext();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });
	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const [currentSlide, setCurrentSlide] = useState(0);
	let sliderInterval = useRef();

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	});

	return (
		<div>
			<Head>
				<title>{locales.title[lang]}</title>
				<meta name='description' content={locales.desc[lang]} />
			</Head>
			<main>
				<div className='wrapanim h-screen -z-10 absolute overflow-hidden'>
					<Image src={urlFor(walls[currentSlide].image).url()} className='anim -z-10 object-cover h-screen w-screen' alt='bg' width='500' height='500' />;
				</div>
				<nav className='w-[320px] text-white z-10 relative top-10 left-10 bg-black bg-opacity-70'>
					<Nav />
				</nav>
			</main>

			<footer></footer>
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
