import React, { useState } from 'react';
import { useGlobalContext } from './GlobalContext';

import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import locales from '../lang/locales.js';

import { motion } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const Museum = ({ products }) => {
	const { nav, setNav, lang, setLang } = useGlobalContext();
	const [filter, setFilter] = useState();
	const [museumNav, setMuseumNav] = useState();

	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

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

	return (
		<div className='p-12 pt-28 md:pt-12'>
			<h2 className='text-3xl tracking-widest font-thin font-bodoni mb-12'>{locales.menu3[lang]}</h2>

			<div className='flex flex-col md:flex-row gap-12'>
				<motion.div className='w-full' initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
					<Link href='/museum/sold' className='relative w-full cursor-pointer'>
						<div className='product-frame relative w-full overflow-hidden'>
							<div className='overlay relative'>
								<Image className='w-full h-[500px] hover:scale-105 object-cover transition-all duration-1000 overflow-hidden' src='/bg1.jpg' alt='Image produit' width='500' height='500' />
							</div>
							<div className='absolute bottom-0 w-full bg-black bg-opacity-50 py-[10px] shadow'>
								<h2 className='ellipse2 px-4'>{locales.sold[lang]}</h2>
							</div>
						</div>
					</Link>
				</motion.div>
				<motion.div className='w-full' initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
					<Link href='/museum/showcased' className='relative w-full cursor-pointer'>
						<div className='product-frame relative w-full overflow-hidden'>
							<div className='overlay relative'>
								<Image className='w-full h-[500px] hover:scale-105 object-cover transition-all duration-1000 overflow-hidden' src='/bg2.jpg' alt='Image produit' width='500' height='500' />
							</div>
							<div className='absolute bottom-0 w-full bg-black bg-opacity-50 py-[10px] shadow'>
								<h2 className='ellipse2 px-4 '>{locales.showcased[lang]}</h2>
							</div>
						</div>
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default Museum;
