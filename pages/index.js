import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { BsYoutube } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { ImFacebook2 } from 'react-icons/im';
import locales from '../lang/locales.js';
import flagFR from '../public/fr.png';
import flagEN from '../public/en.png';
import flagRU from '../public/ru.png';
import flagCN from '../public/cn.png';

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
					<div className='text-center'>
						<h1 className='mb-0 pb-0 text-[2.5rem] text-gray-200 pt-6 px-6 font-splash'>Marc Maison</h1>
						<h2 className='font-splash text-[#c49d50] text-[1.3rem] tracking-wide pb-4 text-gold'>- 19ème - </h2>
					</div>
					<div className='z-10 w-full bg-black bg-opacity-80 flex flex-col'>
						<Link className='p-6 font-nunito text-sm  hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/creations'>
							{locales.menu1[lang]}
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/artists'>
							{locales.menu2[lang]}
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/museum'>
							{locales.menu3[lang]}
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/notable'>
							{locales.menu4[lang]}
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/galerie'>
							{locales.menu5[lang]}
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/contact'>
							{locales.menu6[lang]}
						</Link>
					</div>
					<div className='text-center pt-6'>
						<div className='flex justify-center items-center gap-6'>
							<Image
								onClick={() => {
									setLang('fr');
								}}
								className='hover:cursor-pointer'
								src={flagFR}
								alt='langue française'
								width='20'
								height='20'
							/>
							<Image
								onClick={() => {
									setLang('en');
								}}
								className='hover:cursor-pointer'
								src={flagEN}
								alt='English'
								width='20'
								height='20'
							/>
							<Image
								onClick={() => {
									setLang('ru');
								}}
								className='hover:cursor-pointer'
								src={flagRU}
								alt='Russian'
								width='20'
								height='20'
							/>
							<Image
								onClick={() => {
									setLang('cn');
								}}
								className='hover:cursor-pointer'
								src={flagCN}
								alt='Chinese'
								width='20'
								height='20'
							/>
						</div>
						<p className=' text-md p-6 font-nunito tracking-widest font-medium'>PARIS</p>
						<div className='flex justify-center items-center gap-6'>
							<Link href='https://www.facebook.com/marcmaisongalerie/' target='_blank'>
								<ImFacebook2 />
							</Link>
							<Link href='https://www.instagram.com/marcmaison_antiques/' target='_blank'>
								<AiFillInstagram className='text-[22px]' />
							</Link>
							<Link href='https://www.youtube.com/@GalerieMarcMaison/featured' target='_blank'>
								<BsYoutube className='text-[22px]' />
							</Link>
						</div>
						<p className=' text-xs p-6 text-gray-400 tracking-widest font-thin'>ALL RIGHTS RESERVED © 2023</p>
					</div>
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
