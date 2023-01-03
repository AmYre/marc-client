import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

import { motion } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const ArtistsMasonry = ({ data, filter }) => {
	const imageBuilder = imageUrlBuilder({ projectId: 'r1wp5yv2', dataset: 'production' });

	const urlFor = (source) => {
		return imageBuilder.image(source);
	};

	console.log('masonry', data);

	return (
		<>
			<Masonry breakpointCols={3} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
				{data.map((el, index) => (
					<motion.div key={index} initial={{ y: '50%', opacity: 0, scale: 0.5, borderRadius: '1000%' }} animate={{ y: 0, opacity: 1, scale: 1, borderRadius: '50%' }} transition={{ duration: 0.5, ease: 'easeOut' }} exit={{ opacity: 0, scale: 0.1 }}>
						{el?.slug && (
							<Link key={index} href={el.slug.current} className='relative w-full'>
								<div className='product-frame relative w-full overflow-hidden'>
									<div className='overlay relative'>
										<Image className='hover:scale-105 transition-all duration-1000 overflow-hidden' src={urlFor(el.image).url()} alt='Image produit' width='300' height='300'></Image>
									</div>
									<h2 className='absolute ellipse2 px-4 w-full bottom-0 translate-y-40 transition-all duration-1000 ease-in-out' key={el.title}>
										{el.title}
									</h2>
								</div>
							</Link>
						)}
					</motion.div>
				))}
			</Masonry>
		</>
	);
};

export default ArtistsMasonry;
