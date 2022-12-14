import React, { useState } from 'react';
import { useGlobalContext } from './GlobalContext';

import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

import { motion } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const Artists = ({ artists }) => {
	const { nav, setNav, lang, setLang } = useGlobalContext();
	const [filter, setFilter] = useState();

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
		<>
			<h2 className='text-3xl tracking-widest font-thin mb-12'>Artistes</h2>
			<div className='text-sm p-4 mb-8 font-thin border-t-[1px] border-b-[1px] border-gray-100 flex justify-center gap-8'>
				<button onClick={() => filterByCat('all')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Tout
				</button>
				<button onClick={() => filterByCat('artists')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Céramistes
				</button>
				<button onClick={() => filterByCat('nouveau')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Verriers
				</button>
				<button onClick={() => filterByCat('artisanats')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Fondeurs
				</button>
				<button onClick={() => filterByCat('autre')} className='cursor-pointer hover:font-bold active:font-bold focus:font-bold focus:font-bold focus:font-bold transition-all duration-300'>
					Autre
				</button>
			</div>

			{artists && (
				<div className=''>
					{lang == 'fr' && (
						<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
							{artists.map((artist, index) => (
								<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
									{artist?.slug && (
										<Link key={index} href={artist.slug.current} className='relative w-full'>
											<div className='product-frame relative w-full overflow-hidden'>
												<div className='overlay relative'>
													<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(artist.image).url()} alt='Image produit' width='300' height='300'></Image>
												</div>
												<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={artist.title}>
													{artist.title}
												</h2>
											</div>
										</Link>
									)}
								</motion.div>
							))}
						</Masonry>
					)}
				</div>
			)}
		</>
	);
};

export default Artists;
