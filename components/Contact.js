import React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalContext';
import Image from 'next/image';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import locales from '../lang/locales.js';
import Nav from '../components/Nav';

const Contact = () => {
	const { lang, setLang } = useGlobalContext();
	const [walls, setWalls] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });
	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	useEffect(() => {
		sanityClient.fetch(`*[_type == "walls"]`).then((walls) => setWalls(walls));
	}, []);

	return (
		<>
			<h2 className='text-3xl tracking-widest font-thin mb-12'>Contact</h2>
			<div className='overflow-hidden w-full h-[400px]'>{walls && <Image src={urlFor(walls[2]?.image)?.quality(100)?.url()} className='anim -z-10 object-cover h-screen w-screen' alt='bg' width='2500' height='2500' />}</div>
			<div className='flex flex-col mt-12 mb-12 md:px-16 gap-12'>
				<div className='flex gap-12'>
					<TextField className='w-full max-w-[400px]' id='standard-basic' label='Nom' variant='standard' required />
					<TextField className='w-full max-w-[400px]' id='standard-basic' label='Prénom' variant='standard' required />
				</div>
				<div className='flex gap-12'>
					<TextField className='w-full max-w-[400px]' id='standard-basic' label='Email' variant='standard' required />
					<TextField className='w-full max-w-[400px]' id='standard-basic' label='Téléphone' variant='standard' />
				</div>
				<TextField className='w-full max-w-[800px]' id='standard-textarea' label='Message' multiline variant='standard' />
				<button className='bg-[#a87e2d] w-[200px] text-white px-8 py-4 rounded shadow shadow-black hover:shadow-none transition-all duration-300'>Envoyer</button>
			</div>
		</>
	);
};

export default Contact;
