import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { BsYoutube } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { ImFacebook2 } from 'react-icons/im';

export default function Home({ walls }) {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	const [currentSlide, setCurrentSlide] = useState(0);
	// useRef does not cause a re-render
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
	});

	return (
		<div>
			<Head>
				<title>Marc Maison 19ème</title>
				<meta name='description' content='La Galerie Marc Maison' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link href='https://fonts.googleapis.com/css2?family=Splash&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap' rel='stylesheet' />
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
							Créations
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/artists'>
							Artistes
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/museum'>
							Ventes au musée
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300 tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/notable'>
							Ventes notables
						</Link>
						<Link className='p-6 font-nunito text-sm hover:font-medium transition-all ease-in-out duration-300tracking-widest font-thin uppercase border-b-[1px] border-gray-900' href='/contact'>
							Contact
						</Link>
					</div>
					<div className='text-center pb-6'>
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
	const walls = await sanityClient.fetch(`*[_type == "home"]`);

	return {
		props: {
			walls,
		},
	};
};
